"""Simplified command router example for NeXa RoVe.

The example maps a few demo commands to short responses using plain Python.
"""


def handle_command(command: str) -> str:
    """Return a simple response for a small set of public demo commands."""
    normalised = command.strip().lower()

    responses = {
        "hello": "Hello. This is a NeXa RoVe example.",
        "status": "NeXa RoVe demo mode",
        "help": "Available commands: hello, status, help",
    }

    return responses.get(normalised, "Unknown command. Try: hello, status, help")


if __name__ == "__main__":
    for demo_command in ("hello", "status", "help", "unknown"):
        print(f"{demo_command}: {handle_command(demo_command)}")
