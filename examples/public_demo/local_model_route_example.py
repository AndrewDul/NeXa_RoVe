"""Simplified local model route example for NeXa RoVe.

This demo shows a public routing idea: some requests can be deterministic,
some can use a small local response path, some can use a task helper, and some
fall back to a clearer prompt. It uses fake routes only.
"""

from __future__ import annotations


DETERMINISTIC_COMMAND = "deterministic_command"
SMALL_LOCAL_RESPONSE = "small_local_response"
TASK_HELPER = "task_helper"
FALLBACK = "fallback"


def choose_route(text: str) -> dict[str, str]:
    """Choose a fake response route for a sample user request."""
    normalised = " ".join(text.lower().strip().split())
    if normalised in {"status", "time", "show hardware"}:
        route = DETERMINISTIC_COMMAND
        reason = "Known command with a predictable answer."
    elif any(word in normalised for word in {"explain", "what is", "why"}):
        route = SMALL_LOCAL_RESPONSE
        reason = "Short question that can be answered locally in this demo."
    elif any(word in normalised for word in {"plan", "study", "quiz", "practice"}):
        route = TASK_HELPER
        reason = "Task-shaped request that benefits from a helper flow."
    else:
        route = FALLBACK
        reason = "The request needs a clearer wording."
    return {
        "input": text,
        "route": route,
        "reason": reason,
    }


def demo() -> list[dict[str, str]]:
    """Run a few fixed fake route decisions."""
    return [
        choose_route("status"),
        choose_route("what is a sensor"),
        choose_route("make a study plan"),
        choose_route("blue triangle later maybe"),
    ]


if __name__ == "__main__":
    for item in demo():
        print(f"{item['input']} -> {item['route']}: {item['reason']}")
