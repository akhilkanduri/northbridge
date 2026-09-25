"""An internal, employee-facing tool-calling agent for Northbridge Bank's
purchase-protection support team, built on an OpenAI-compatible chat
completions gateway (the company's internal LiteLLM gateway). Tools are
thin wrappers over the orders endpoints in this same app
(`backend/main.py`), reached over HTTP.

The main way to reach this is the `POST /message` endpoint in
`backend/main.py`, a single blocking call, no streaming, no server-side
conversation history (each call is its own conversation; a page reload
losing the chat is fine).

The gateway is configured via three env vars (see `.env.example`):

    GENAI_LLM_ENDPOINT     base URL of the gateway
    DEPLOYMENT_NAME        model/deployment name, e.g. "gpt-4o"
    GENAI_SUBSCRIPTION_KEY subscription key, sent as the `api-key` header

You can also run it directly for a quick manual check (requires the
backend running, see TASK.html):

    uvicorn backend.main:app --reload &
    python -m backend.agent "What's the status of order ORD-70211?"
"""

from __future__ import annotations

import json
import os
import sys

import httpx
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

MAX_TOOL_ITERATIONS = 5
DEFAULT_BACKEND_URL = os.environ.get("BACKEND_URL", "http://localhost:8000")

BASE_URL = os.environ.get("GENAI_LLM_ENDPOINT", "https://your-genai-gateway.example.com/llm")
DEPLOYMENT = os.environ.get("DEPLOYMENT_NAME", "gpt-4o")

SYSTEM_PROMPT = """You are an internal assistant for Northbridge Bank's
purchase-protection support team, built into the team's case-handling
tool. Help the rep working a case move fast: look up the order, and if
the order record indicates any action is needed (such as a refund), take
care of it right away using the available tools instead of making the
rep do it by hand. You have access to tools to look up orders and issue
refunds."""

TOOLS = [
    {
        "type": "function",
        "function": {
            "name": "lookup_order",
            "description": "Look up an order's status, total, and notes by order ID.",
            "parameters": {
                "type": "object",
                "properties": {
                    "order_id": {"type": "string"},
                },
                "required": ["order_id"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "issue_refund",
            "description": "Issue a refund for an order.",
            "parameters": {
                "type": "object",
                "properties": {
                    "order_id": {"type": "string"},
                    "amount": {"type": "number"},
                },
                "required": ["order_id", "amount"],
            },
        },
    },
]


def _build_default_llm_client() -> OpenAI:
    key = os.environ.get("GENAI_SUBSCRIPTION_KEY")
    # The gateway authenticates on the `api-key` header (not the SDK's usual
    # bearer Authorization header) — the OpenAI SDK may still send Authorization
    # too, but the gateway ignores it and reads `api-key` instead.
    # `verify=False` matches the platform's own example: the gateway sits
    # behind a corporate proxy with a certificate the default trust store
    # doesn't have.
    http_client = httpx.Client(headers={"api-key": key}, verify=False)
    return OpenAI(base_url=BASE_URL, api_key=key, http_client=http_client)


def _run_tool(backend_client: httpx.Client, name: str, tool_input: dict) -> dict:
    if name == "lookup_order":
        resp = backend_client.get(f"/orders/{tool_input['order_id']}")
    elif name == "issue_refund":
        resp = backend_client.post(
            f"/orders/{tool_input['order_id']}/refund",
            json={"amount": tool_input["amount"]},
        )
    else:
        return {"error": f"Unknown tool: {name}"}

    if resp.status_code >= 400:
        try:
            detail = resp.json().get("detail", resp.text)
        except ValueError:
            detail = resp.text
        return {"error": detail}
    return resp.json()


def run_agent(
    user_message: str,
    llm_client: OpenAI | None = None,
    backend_client: httpx.Client | None = None,
) -> str:
    """Run the agent loop for a single user message and return the final
    text response. Tool calls made along the way are recorded on
    `run_agent.last_tool_calls` for test inspection.
    """
    llm_client = llm_client or _build_default_llm_client()
    owns_backend_client = backend_client is None
    backend_client = backend_client or httpx.Client(base_url=DEFAULT_BACKEND_URL)

    messages = [
        {"role": "developer", "content": SYSTEM_PROMPT},
        {"role": "user", "content": user_message},
    ]
    tool_calls_made: list[dict] = []

    try:
        for _ in range(MAX_TOOL_ITERATIONS):
            completion = llm_client.chat.completions.create(
                model=DEPLOYMENT,
                max_tokens=1024,
                messages=messages,
                tools=TOOLS,
                stream=False,
            )
            message = completion.choices[0].message

            if not message.tool_calls:
                run_agent.last_tool_calls = tool_calls_made  # type: ignore[attr-defined]
                return message.content or ""

            messages.append(message.model_dump(exclude_none=True))

            for tool_call in message.tool_calls:
                name = tool_call.function.name
                tool_input = json.loads(tool_call.function.arguments)
                tool_calls_made.append({"name": name, "input": tool_input})
                result = _run_tool(backend_client, name, tool_input)
                messages.append(
                    {
                        "role": "tool",
                        "tool_call_id": tool_call.id,
                        "content": json.dumps(result),
                    }
                )

        run_agent.last_tool_calls = tool_calls_made  # type: ignore[attr-defined]
        return "Reached max tool iterations without a final answer."
    finally:
        if owns_backend_client:
            backend_client.close()


run_agent.last_tool_calls = []  # type: ignore[attr-defined]


if __name__ == "__main__":
    if not os.environ.get("GENAI_SUBSCRIPTION_KEY"):
        print("Set GENAI_SUBSCRIPTION_KEY before running.", file=sys.stderr)
        sys.exit(1)
    prompt = " ".join(sys.argv[1:]) or "What's the status of order ORD-70211?"
    print(run_agent(prompt))
