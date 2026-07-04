"""Simplified learning support flow example for NeXa RoVe.

This demo maps a few learning phrases to small study modes. It has no model,
database, documents, microphone, camera or file access.
"""

from __future__ import annotations


def choose_study_mode(text: str) -> dict[str, str]:
    """Choose a simple learning mode for a sample phrase."""
    normalised = " ".join(text.lower().strip().split())
    if "teach me" in normalised:
        return {
            "mode": "lesson",
            "response": "I would start with a short explanation and one example.",
        }
    if "quiz me" in normalised:
        return {
            "mode": "quiz",
            "response": "I would ask a small question and wait for your answer.",
        }
    if "make a plan" in normalised:
        return {
            "mode": "study_plan",
            "response": "I would split the topic into short study steps.",
        }
    if "explain again" in normalised:
        return {
            "mode": "retry_explanation",
            "response": "I would explain the same idea in simpler words.",
        }
    return {
        "mode": "clarify",
        "response": "Tell me what topic you want to learn.",
    }


def demo() -> list[dict[str, str]]:
    """Run a few fixed learning phrases."""
    return [
        choose_study_mode("teach me"),
        choose_study_mode("quiz me"),
        choose_study_mode("make a plan"),
        choose_study_mode("explain again"),
        choose_study_mode("help"),
    ]


if __name__ == "__main__":
    for item in demo():
        print(f"{item['mode']}: {item['response']}")
