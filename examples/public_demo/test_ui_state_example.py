"""Tests for ui_state_example."""

from __future__ import annotations

import sys
import unittest
from pathlib import Path

CURRENT_DIR = Path(__file__).resolve().parent
if str(CURRENT_DIR) not in sys.path:
    sys.path.insert(0, str(CURRENT_DIR))

from ui_state_example import build_ui_state, transition_sequence


class UiStateExampleTests(unittest.TestCase):
    def test_listening_state(self) -> None:
        state = build_ui_state("listening")
        self.assertEqual(state["face"], "listening")
        self.assertEqual(state["message"], "Listening.")

    def test_blocked_state_uses_status_panel(self) -> None:
        state = build_ui_state("blocked")
        self.assertEqual(state["panel"], "status")

    def test_unknown_state_falls_back_to_idle(self) -> None:
        state = build_ui_state("missing")
        self.assertEqual(state["state"], "idle")

    def test_transition_sequence_has_hardware_check(self) -> None:
        states = [item["state"] for item in transition_sequence()]
        self.assertIn("hardware_check", states)


if __name__ == "__main__":
    unittest.main()
