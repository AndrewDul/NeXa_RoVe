"""Tests for runtime_pipeline_example."""

from __future__ import annotations

import sys
import unittest
from pathlib import Path

CURRENT_DIR = Path(__file__).resolve().parent
if str(CURRENT_DIR) not in sys.path:
    sys.path.insert(0, str(CURRENT_DIR))

from runtime_pipeline_example import classify_intent, handle_input, prepare_text


class RuntimePipelineExampleTests(unittest.TestCase):
    def test_prepare_text_keeps_source(self) -> None:
        prepared = prepare_text("  Open   Camera ", "voice")
        self.assertEqual(prepared["source"], "voice")
        self.assertEqual(prepared["normalised"], "open camera")

    def test_classifies_learning(self) -> None:
        self.assertEqual(classify_intent("teach me fractions"), "learning")

    def test_voice_plan_includes_voice_response(self) -> None:
        plan = handle_input("status", source="voice")
        self.assertEqual(plan["intent"], "status")
        self.assertIsNotNone(plan["voice"])

    def test_text_plan_has_ui_message(self) -> None:
        plan = handle_input("what can you do?", source="text")
        self.assertEqual(plan["intent"], "conversation")
        self.assertIn("message", plan["ui"])


if __name__ == "__main__":
    unittest.main()
