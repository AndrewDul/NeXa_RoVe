"""Tests for learning_flow_example."""

from __future__ import annotations

import sys
import unittest
from pathlib import Path

CURRENT_DIR = Path(__file__).resolve().parent
if str(CURRENT_DIR) not in sys.path:
    sys.path.insert(0, str(CURRENT_DIR))

from learning_flow_example import choose_study_mode


class LearningFlowExampleTests(unittest.TestCase):
    def test_teach_me_uses_lesson_mode(self) -> None:
        self.assertEqual(choose_study_mode("teach me")["mode"], "lesson")

    def test_quiz_me_uses_quiz_mode(self) -> None:
        self.assertEqual(choose_study_mode("quiz me")["mode"], "quiz")

    def test_make_plan_uses_study_plan_mode(self) -> None:
        self.assertEqual(choose_study_mode("make a plan")["mode"], "study_plan")

    def test_explain_again_uses_retry_mode(self) -> None:
        self.assertEqual(choose_study_mode("explain again")["mode"], "retry_explanation")

    def test_unknown_learning_phrase_asks_for_topic(self) -> None:
        result = choose_study_mode("help")
        self.assertEqual(result["mode"], "clarify")
        self.assertIn("topic", result["response"])


if __name__ == "__main__":
    unittest.main()
