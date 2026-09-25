# coding-challenge

This is the repo for the coding-challenge portion of your Head of AI
Applications interview. We're sending it a few days ahead of time, on
purpose, and there's no task attached yet. Clone it, read it, run it,
click around. When we sit down for the interview we'll hand you the actual
brief and work from there together — you don't need to have "solved"
anything before then, just be comfortable with how the app works and how
it's put together.

## The scenario

Everything below, and everything in the app itself, is a fictional
scenario the exercise runs on — a made-up bank, not a real client. Play
along with it as the premise for the code you're looking at.

You're advising **Northbridge Bank**, a fictional bank that hired an
outside consultancy, **Vaguely Strategic Partners, LLC**, to build an
internal tool for their purchase-protection support team: reps look up a
customer's order and issue a refund when one is warranted, with an AI
assistant built in to help them move faster. Order data is pulled
automatically from a third-party merchant feed the bank doesn't control.

The consultancy shipped a working first pass and the engagement ended
before anything past that first pass happened — no handoff docs beyond
what's in this repo, and the practices behind it were inconsistent (you'll
notice, for instance, that there's no automated test suite to lean on).
It's been running internally ever since, employees only, hosted locally on
a support rep's machine or a low-traffic internal box, nothing fancy.

Northbridge doesn't have in-house AI expertise, which is why they've
brought in outside help: they want someone to pick this up, get it into a
shape they'd actually trust, and take it somewhere new.
[ROADMAP.html](ROADMAP.html) has more on where they're trying to go.

## Structure

```
.
├── README.md                    this file
├── ROADMAP.html                 where the bank wants to take this next
├── backend/
│   ├── main.py                  FastAPI app: orders API + POST /message (the agent)
│   ├── agent.py                 tool-calling agent, talks to the GenAI gateway over HTTP
│   ├── db.py                    SQLite setup, seeds itself from fixtures/ on first run
│   ├── fixtures/orders.json     seeded orders
│   └── api.http                 manual test requests (VS Code REST Client)
├── frontend/                    the case tool, served by backend/main.py itself, not a separate server
│   ├── index.html               React (CDN, no build step): order lookup, refund, chat pop-up
│   ├── styles.css               design tokens and component styles
│   └── content.js               copy for the static pages (about, privacy, terms, security, status)
├── .devcontainer/devcontainer.json
├── .vscode/extensions.json
├── .env.example
└── pyproject.toml / uv.lock     dependencies, managed with uv
```

Not in the repo yet, created as you work:

- **`SOLUTION.md`**, at the root: your running notes. More on this when we
  sit down for the interview.
- **`backend/acme.db`**: SQLite file, created and seeded automatically the
  first time the backend starts. Gitignored.
- **`.env`**: copied from `.env.example` and filled in with real
  credentials. Gitignored.

## Quick start

**Option A, devcontainer** (recommended, fastest): open this repo in your
editor's devcontainer or Codespaces and it installs dependencies
automatically.

**Option B, local:** this project uses [uv](https://docs.astral.sh/uv/) for
dependencies. Install it first if you don't have it:
`curl -LsSf https://astral.sh/uv/install.sh | sh` (or see the link for
other install options).

```bash
uv sync
```

That creates `.venv` and installs everything. Run commands with
`uv run <command>`, or activate the venv once with
`source .venv/bin/activate` and run things directly.

Then, either way:

```bash
cp .env.example .env
# add your own GENAI_SUBSCRIPTION_KEY to .env
# adjust GENAI_LLM_ENDPOINT / DEPLOYMENT_NAME if yours differ from the defaults
```

Start the backend (this creates and seeds the SQLite database automatically
on first run, no separate migration step):

```bash
uv run uvicorn backend.main:app --reload
```

That one process serves the API and the case tool itself — open
[http://localhost:8000](http://localhost:8000) to see it: order lookup,
refund, and a chat pop-up in the bottom-right that talks to the assistant.
Or poke the API directly at `http://localhost:8000/docs`, or use
`backend/api.http` if you're in VS Code with the REST Client extension.

In the scenario, this is exactly how it runs at Northbridge today: locally,
for whichever rep has it open, nothing shared or centrally hosted.

## Between now and the interview

Get familiar with it the way a new hire would. Look up a few orders, issue
a refund, have an actual back-and-forth with the chat assistant, not just
one message. Skim the code in `backend/` and `frontend/`. No deliverable is
due beforehand — we'll give you the specific brief when we sit down.
