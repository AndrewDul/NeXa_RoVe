"""Simplified public command router example for NeXa_RoVe.

This is a simplified public example for the NeXa_RoVe repository.
It is not production code and does not include private NeXa logic.
"""


def handle_command(command: str) -> str:
    """Return a simple response for a small set of public demo commands."""
    normalised = command.strip().lower()

    responses = {
        "hello": "Hello. This is a safe public NeXa RoVe example.",
        "status": "NeXa RoVe public demo mode",
        "help": "Available commands: hello, status, help",
    }

    return responses.get(normalised, "Unknown command. Try: hello, status, help")


if __name__ == "__main__":
    for demo_command in ("hello", "status", "help", "unknown"):
        print(f"{demo_command}: {handle_command(demo_command)}")
