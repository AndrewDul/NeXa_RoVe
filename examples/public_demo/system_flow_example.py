"""Simplified public system-flow example for NeXa RoVe.

This is not production NeXa code. It uses hardcoded sample commands and has no
hardware, microphone, camera, model, network or file access.
"""

from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class MovementState:
    emergency_stop: bool = False
    obstacle_detected: bool = False
    target_visible: bool = True
    distance_cm: int = 120


def classify_command(text: str) -> str:
    """Classify a small set of sample commands."""
    normalised = text.strip().lower()
    if normalised in {"status", "system status", "how are you"}:
        return "status"
    if normalised in {"help", "what can you do"}:
        return "help"
    if "study" in normalised or "quiz" in normalised or "learn" in normalised:
        return "learning"
    if "move" in normalised or "follow" in normalised or "come here" in normalised:
        return "movement"
    return "unknown"


def movement_decision(state: MovementState) -> str:
    """Return a conservative movement decision for fake state."""
    if state.emergency_stop:
        return "STOP"
    if state.obstacle_detected:
        return "STOP"
    if not state.target_visible:
        return "WAIT"
    if state.distance_cm <= 80:
        return "HOLD_DISTANCE"
    return "MOVE_FORWARD_SLOWLY"


def handle_command(text: str, movement_state: MovementState | None = None) -> dict[str, str]:
    """Run a small shared command pipeline."""
    intent = classify_command(text)
    if intent == "status":
        response = "NeXa RoVe demo status: ready for public concept examples."
    elif intent == "help":
        response = "Try: status, help, study fractions, follow me."
    elif intent == "learning":
        response = "Learning request detected. I would open a study support flow."
    elif intent == "movement":
        decision = movement_decision(movement_state or MovementState())
        response = f"Movement request checked. Decision: {decision}."
    else:
        response = "I am not sure what that means in this demo."

    return {
        "input": text,
        "intent": intent,
        "response": response,
    }


def demo() -> list[dict[str, str]]:
    """Run a few hardcoded sample commands."""
    return [
        handle_command("status"),
        handle_command("study fractions"),
        handle_command("follow me", MovementState(obstacle_detected=True)),
        handle_command("open the pod bay doors"),
    ]


if __name__ == "__main__":
    for item in demo():
        print(f"{item['intent']}: {item['response']}")
