"""Tests for the simplified public system-flow example."""

from __future__ import annotations

import sys
import unittest
from pathlib import Path

CURRENT_DIR = Path(__file__).resolve().parent
if str(CURRENT_DIR) not in sys.path:
    sys.path.insert(0, str(CURRENT_DIR))

from system_flow_example import MovementState, classify_command, handle_command, movement_decision


class SystemFlowExampleTests(unittest.TestCase):
    def test_classifies_status(self) -> None:
        self.assertEqual(classify_command("status"), "status")

    def test_classifies_learning(self) -> None:
        self.assertEqual(classify_command("study fractions"), "learning")

    def test_classifies_movement(self) -> None:
        self.assertEqual(classify_command("follow me"), "movement")

    def test_unknown_gets_fallback(self) -> None:
        result = handle_command("something else")
        self.assertEqual(result["intent"], "unknown")
        self.assertIn("not sure", result["response"])

    def test_movement_stops_on_obstacle(self) -> None:
        decision = movement_decision(MovementState(obstacle_detected=True))
        self.assertEqual(decision, "STOP")

    def test_movement_waits_without_target(self) -> None:
        decision = movement_decision(MovementState(target_visible=False))
        self.assertEqual(decision, "WAIT")

    def test_pipeline_returns_response(self) -> None:
        result = handle_command("help")
        self.assertEqual(result["intent"], "help")
        self.assertIn("Try:", result["response"])


if __name__ == "__main__":
    unittest.main()
