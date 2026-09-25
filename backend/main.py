"""FastAPI service fronting Northbridge Bank's purchase-protection orders
database. Order data is sourced from a third-party merchant-data feed.

Starting the app (e.g. `uvicorn backend.main:app`) automatically creates and
seeds the SQLite database on first run via the lifespan hook below, no
manual setup step needed.
"""

from __future__ import annotations

from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

from backend.agent import run_agent
from backend.db import get_order, init_db, record_refund, total_refunded

FRONTEND_DIR = Path(__file__).resolve().parent.parent / "frontend"


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield


app = FastAPI(title="Northbridge Bank Purchase-Protection Orders API", lifespan=lifespan)

# Local dev tool, opened from a file:// page or a different port than the
# backend, so it needs CORS wide open rather than pinned to one origin.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class RefundRequest(BaseModel):
    amount: float


class MessageRequest(BaseModel):
    message: str


@app.get("/orders/{order_id}")
def read_order(order_id: str):
    order = get_order(order_id)
    if order is None:
        raise HTTPException(status_code=404, detail=f"No such order: {order_id}")
    order["total_refunded"] = total_refunded(order_id)
    return order


@app.post("/orders/{order_id}/refund")
def refund_order(order_id: str, body: RefundRequest):
    order = get_order(order_id)
    if order is None:
        raise HTTPException(status_code=404, detail=f"No such order: {order_id}")

    record_refund(order_id, body.amount)
    return {
        "order_id": order_id,
        "refunded": body.amount,
        "total_refunded": total_refunded(order_id),
    }


@app.post("/message")
def post_message(body: MessageRequest):
    """Single blocking call to the support agent, no streaming. Each call
    is its own conversation: nothing is kept between requests, so there's
    no history to send back and forth."""
    reply = run_agent(body.message)
    return {"reply": reply}


# Serves frontend/ (the case tool itself) at "/". Mounted last, on purpose:
# routes above are matched first, so this only ever catches what nothing
# else claimed.
app.mount("/", StaticFiles(directory=FRONTEND_DIR, html=True), name="frontend")
