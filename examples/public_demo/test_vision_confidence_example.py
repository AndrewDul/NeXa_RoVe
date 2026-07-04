"""Tests for vision_confidence_example."""

from __future__ import annotations

import sys
import unittest
from pathlib import Path

CURRENT_DIR = Path(__file__).resolve().parent
if str(CURRENT_DIR) not in sys.path:
    sys.path.insert(0, str(CURRENT_DIR))

from vision_confidence_example import (
    DO_NOT_USE_FOR_MOVEMENT,
    IGNORE_LOW_CONFIDENCE,
    USE_FOR_FEEDBACK,
    WAIT_FOR_FRESH_FRAME,
    FakeDetection,
    best_feedback_detection,
    evaluate_detection,
)


class VisionConfidenceExampleTests(unittest.TestCase):
    def test_uses_confident_fresh_detection_for_feedback(self) -> None:
        result = evaluate_detection(FakeDetection("person", 0.8, 1.4, True))
        self.assertEqual(result, USE_FOR_FEEDBACK)

    def test_ignores_low_confidence(self) -> None:
        result = evaluate_detection(FakeDetection("person", 0.4, 1.4, True))
        self.assertEqual(result, IGNORE_LOW_CONFIDENCE)

    def test_waits_for_fresh_frame(self) -> None:
        result = evaluate_detection(FakeDetection("person", 0.9, 1.4, False))
        self.assertEqual(result, WAIT_FOR_FRESH_FRAME)

    def test_rejects_close_detection_for_movement(self) -> None:
        result = evaluate_detection(FakeDetection("person", 0.9, 0.3, True))
        self.assertEqual(result, DO_NOT_USE_FOR_MOVEMENT)

    def test_selects_best_feedback_detection(self) -> None:
        selected = best_feedback_detection(
            [
                FakeDetection("person", 0.72, 1.4, True),
                FakeDetection("person", 0.91, 1.7, True),
            ]
        )
        self.assertIsNotNone(selected)
        self.assertEqual(selected.confidence, 0.91)


if __name__ == "__main__":
    unittest.main()
