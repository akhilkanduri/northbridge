"""SQLite-backed storage for orders and refunds.

The database is created and seeded from `fixtures/orders.json` automatically
the first time the app starts (see `init_db`, called from the FastAPI
lifespan in `backend/main.py`) — there's no separate migration step.
"""

from __future__ import annotations

import json
import sqlite3
from pathlib import Path

DB_PATH = Path(__file__).parent / "acme.db"
FIXTURES_PATH = Path(__file__).parent / "fixtures" / "orders.json"


def get_connection() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db() -> None:
    """Create tables if needed, and seed orders from fixtures if the table
    is empty. Safe to call on every app startup."""
    conn = get_connection()
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS orders (
            order_id TEXT PRIMARY KEY,
            status TEXT NOT NULL,
            total REAL NOT NULL,
            notes TEXT NOT NULL
        )
        """
    )
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS refunds (
            order_id TEXT NOT NULL,
            amount REAL NOT NULL,
            FOREIGN KEY (order_id) REFERENCES orders (order_id)
        )
        """
    )
    conn.commit()

    (count,) = conn.execute("SELECT COUNT(*) FROM orders").fetchone()
    if count == 0:
        orders = json.loads(FIXTURES_PATH.read_text())
        conn.executemany(
            "INSERT INTO orders (order_id, status, total, notes) "
            "VALUES (:order_id, :status, :total, :notes)",
            orders,
        )
        conn.commit()

    conn.close()


def reset_db() -> None:
    """Drop everything and reseed from fixtures. Used by tests so each test
    starts from a known state."""
    if DB_PATH.exists():
        DB_PATH.unlink()
    init_db()


def get_order(order_id: str) -> dict | None:
    conn = get_connection()
    row = conn.execute(
        "SELECT * FROM orders WHERE order_id = ?", (order_id,)
    ).fetchone()
    conn.close()
    return dict(row) if row else None


def total_refunded(order_id: str) -> float:
    conn = get_connection()
    (total,) = conn.execute(
        "SELECT COALESCE(SUM(amount), 0) FROM refunds WHERE order_id = ?",
        (order_id,),
    ).fetchone()
    conn.close()
    return total


def record_refund(order_id: str, amount: float) -> None:
    conn = get_connection()
    conn.execute(
        "INSERT INTO refunds (order_id, amount) VALUES (?, ?)", (order_id, amount)
    )
    conn.commit()
    conn.close()
