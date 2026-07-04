"""Simplified shared voice/text pipeline example for NeXa RoVe.

The example shows how a voice or typed message can pass through the same broad
steps: prepare text, classify intent, choose a response and return a simple
voice/UI response plan. It uses fake input only.
"""

from __future__ import annotations


def prepare_text(raw_text: str, source: str) -> dict[str, str]:
    """Prepare input from a fake voice or text source."""
    cleaned = " ".join(raw_text.strip().split())
    return {
        "source": source,
        "text": cleaned,
        "normalised": cleaned.lower(),
    }


def classify_intent(normalised_text: str) -> str:
    """Classify the prepared text into a small public intent set."""
    if not normalised_text:
        return "empty"
    if normalised_text in {"status", "system status"}:
        return "status"
    if "learn" in normalised_text or "teach" in normalised_text:
        return "learning"
    if "camera" in normalised_text:
        return "vision"
    if "move" in normalised_text or "forward" in normalised_text:
        return "movement"
    return "conversation"


def choose_response(intent: str) -> str:
    """Choose a short response for the fake intent."""
    responses = {
        "empty": "I did not receive any text.",
        "status": "I would show a short system status.",
        "learning": "I would open a learning support flow.",
        "vision": "I would prepare the camera view.",
        "movement": "I would check hardware safety before moving.",
        "conversation": "I would answer or ask a follow-up question.",
    }
    return responses[intent]


def build_response_plan(source: str, intent: str, response: str) -> dict[str, object]:
    """Return a small UI and voice response plan."""
    return {
        "source": source,
        "intent": intent,
        "voice": response if source == "voice" else None,
        "ui": {
            "state": "responding",
            "message": response,
            "show_panel": intent in {"status", "learning", "vision", "movement"},
        },
    }


def handle_input(raw_text: str, source: str = "text") -> dict[str, object]:
    """Run the simplified shared input pipeline."""
    prepared = prepare_text(raw_text, source)
    intent = classify_intent(prepared["normalised"])
    response = choose_response(intent)
    return build_response_plan(prepared["source"], intent, response)


def demo() -> list[dict[str, object]]:
    """Run fixed voice and typed examples."""
    return [
        handle_input("status", source="voice"),
        handle_input("teach me fractions", source="text"),
        handle_input("open camera", source="voice"),
        handle_input("what can you do?", source="text"),
    ]


if __name__ == "__main__":
    for plan in demo():
        print(f"{plan['source']} -> {plan['intent']}: {plan['ui']['message']}")
