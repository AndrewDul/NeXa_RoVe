"""Simplified public time intent concept.

This uses the Python standard library only. It does not use the internet,
external APIs, private prompts, or private assistant logic.
"""

from __future__ import annotations

from datetime import datetime


def answer_time_question(question: str, now: datetime | None = None) -> str:
    """Return a simple local time answer for public demo questions."""
    normalised = question.strip().lower()
    if normalised not in {"what time is it?", "what time is it", "what's the time?", "time"}:
        return "This public demo only answers simple time questions."

    current_time = now or datetime.now()
    return f"The local time is {current_time:%H:%M}."


if __name__ == "__main__":
    print(answer_time_question("What time is it?"))
