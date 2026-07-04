"""Tests for command_understanding_example."""

from __future__ import annotations

import sys
import unittest
from pathlib import Path

CURRENT_DIR = Path(__file__).resolve().parent
if str(CURRENT_DIR) not in sys.path:
    sys.path.insert(0, str(CURRENT_DIR))

from command_understanding_example import classify_command, normalise_command


class CommandUnderstandingExampleTests(unittest.TestCase):
    def test_normalise_command_trims_and_lowercases(self) -> None:
        self.assertEqual(normalise_command("  Show   Hardware "), "show hardware")

    def test_classifies_status(self) -> None:
        self.assertEqual(classify_command("status")["intent"], "status")

    def test_classifies_show_hardware(self) -> None:
        self.assertEqual(classify_command("show hardware")["intent"], "show_hardware")

    def test_unknown_command_gets_unknown_intent(self) -> None:
        result = classify_command("launch fireworks")
        self.assertEqual(result["intent"], "unknown")
        self.assertIn("clearer", result["description"])


if __name__ == "__main__":
    unittest.main()
