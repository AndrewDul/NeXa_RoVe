"""Simplified command understanding example for NeXa RoVe.

This demo classifies a small set of example phrases into broad command
categories. It uses only hardcoded sample text and has no hardware, network,
model, microphone, camera or file access.
"""

from __future__ import annotations


KNOWN_COMMANDS = {
    "status": ("status", "Show a short system status summary."),
    "show hardware": ("show_hardware", "Open the hardware overview."),
    "start learning": ("start_learning", "Open a learning support flow."),
    "open camera": ("open_camera", "Prepare a camera feedback view."),
    "move forward": ("move_forward", "Request a movement action."),
}


def normalise_command(text: str) -> str:
    """Return a lowercase command string with extra spacing removed."""
    return " ".join(text.strip().lower().split())


def classify_command(text: str) -> dict[str, str]:
    """Classify a sample command into a deterministic public category."""
    normalised = normalise_command(text)
    intent, description = KNOWN_COMMANDS.get(
        normalised,
        ("unknown", "Ask for a clearer command."),
    )
    return {
        "input": text,
        "normalised": normalised,
        "intent": intent,
        "description": description,
    }


def demo() -> list[dict[str, str]]:
    """Run a few fixed command examples."""
    return [
        classify_command("status"),
        classify_command("show hardware"),
        classify_command("start learning"),
        classify_command("open camera"),
        classify_command("move forward"),
        classify_command("make me a sandwich"),
    ]


if __name__ == "__main__":
    for result in demo():
        print(f"{result['normalised']}: {result['intent']} - {result['description']}")
