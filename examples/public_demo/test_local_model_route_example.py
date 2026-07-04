"""Tests for local_model_route_example."""

from __future__ import annotations

import sys
import unittest
from pathlib import Path

CURRENT_DIR = Path(__file__).resolve().parent
if str(CURRENT_DIR) not in sys.path:
    sys.path.insert(0, str(CURRENT_DIR))

from local_model_route_example import (
    DETERMINISTIC_COMMAND,
    FALLBACK,
    SMALL_LOCAL_RESPONSE,
    TASK_HELPER,
    choose_route,
)


class LocalModelRouteExampleTests(unittest.TestCase):
    def test_known_command_uses_deterministic_route(self) -> None:
        self.assertEqual(choose_route("status")["route"], DETERMINISTIC_COMMAND)

    def test_question_uses_small_local_response(self) -> None:
        self.assertEqual(choose_route("what is a sensor")["route"], SMALL_LOCAL_RESPONSE)

    def test_study_plan_uses_task_helper(self) -> None:
        self.assertEqual(choose_route("make a study plan")["route"], TASK_HELPER)

    def test_unclear_request_uses_fallback(self) -> None:
        self.assertEqual(choose_route("blue triangle later maybe")["route"], FALLBACK)


if __name__ == "__main__":
    unittest.main()
