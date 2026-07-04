"""Simplified UI state example for NeXa RoVe.

The Visual Shell direction is about making assistant state visible. This demo
maps a few public events to small UI state dictionaries.
"""

from __future__ import annotations


STATE_MESSAGES = {
    "idle": ("idle", "Ready."),
    "listening": ("listening", "Listening."),
    "thinking": ("thinking", "Thinking."),
    "responding": ("responding", "Responding."),
    "blocked": ("blocked", "Action blocked."),
    "learning": ("learning", "Learning mode."),
    "hardware_check": ("hardware_check", "Checking hardware."),
}


def build_ui_state(state: str, detail: str = "") -> dict[str, str]:
    """Build a simple fake UI state update."""
    face_state, message = STATE_MESSAGES.get(state, STATE_MESSAGES["idle"])
    return {
        "state": state if state in STATE_MESSAGES else "idle",
        "face": face_state,
        "panel": "status" if state in {"blocked", "hardware_check"} else "home",
        "message": detail or message,
    }


def transition_sequence() -> list[dict[str, str]]:
    """Return a typical fake assistant UI sequence."""
    return [
        build_ui_state("idle"),
        build_ui_state("listening"),
        build_ui_state("thinking"),
        build_ui_state("hardware_check"),
        build_ui_state("responding", "Movement will wait until the path is clear."),
    ]


if __name__ == "__main__":
    for item in transition_sequence():
        print(f"{item['state']}: {item['message']}")
