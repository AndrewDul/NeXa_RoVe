"""Tests for simplified public NeXa RoVe examples."""

from __future__ import annotations

import sys
import unittest
from datetime import datetime
from pathlib import Path

CURRENT_DIR = Path(__file__).resolve().parent
if str(CURRENT_DIR) not in sys.path:
    sys.path.insert(0, str(CURRENT_DIR))

from detection_demo import choose_safe_target, sample_detections
from follow_me_safety_demo import STOP, WAIT, TargetState, decide_follow_me_action
from sensor_snapshot_demo import get_public_safe_sample_snapshot, snapshot_as_dict
from speech_pipeline_demo import run_speech_pipeline
from time_intent_demo import answer_time_question
from voice_activity_demo import detect_voice_activity


class PublicDemoTests(unittest.TestCase):
    def test_voice_activity_detects_active_fake_samples(self) -> None:
        result = detect_voice_activity([0.0, 0.1, -0.12, 0.08])
        self.assertTrue(result["voice_detected"])

    def test_voice_activity_rejects_quiet_fake_samples(self) -> None:
        result = detect_voice_activity([0.0, 0.01, -0.01, 0.0])
        self.assertFalse(result["voice_detected"])

    def test_speech_pipeline_handles_hello(self) -> None:
        result = run_speech_pipeline([0.0, 0.12, -0.1], "hello")
        self.assertEqual(result["intent"], "greeting")
        self.assertIn("Hello", str(result["response"]))

    def test_speech_pipeline_handles_unknown_command_safely(self) -> None:
        result = run_speech_pipeline([0.0, 0.12, -0.1], "open private files")
        self.assertEqual(result["intent"], "unknown")
        self.assertIn("public demo", str(result["response"]))

    def test_sensor_snapshot_has_public_safe_fields(self) -> None:
        snapshot = snapshot_as_dict(get_public_safe_sample_snapshot())
        self.assertIn("battery_percent", snapshot)
        self.assertIn("distance_cm", snapshot)
        self.assertIn("temperature_c", snapshot)
        self.assertIn("sensors_available", snapshot)
        self.assertIn("obstacle_detected", snapshot)
        self.assertIn("movement_allowed", snapshot)

    def test_detection_selects_person_target(self) -> None:
        target = choose_safe_target(sample_detections())
        self.assertIsNotNone(target)
        self.assertEqual(target.label, "person")

    def test_follow_me_stops_on_obstacle(self) -> None:
        state = TargetState(
            target_visible=True,
            distance_cm=140,
            obstacle_detected=True,
            emergency_stop=False,
        )
        self.assertEqual(decide_follow_me_action(state), STOP)

    def test_follow_me_waits_when_target_is_lost(self) -> None:
        state = TargetState(
            target_visible=False,
            distance_cm=140,
            obstacle_detected=False,
            emergency_stop=False,
        )
        self.assertEqual(decide_follow_me_action(state), WAIT)

    def test_time_intent_returns_a_string(self) -> None:
        response = answer_time_question("What time is it?", now=datetime(2026, 7, 3, 9, 5))
        self.assertIsInstance(response, str)
        self.assertEqual(response, "The local time is 09:05.")


if __name__ == "__main__":
    unittest.main()
