"""Run all simplified public NeXa RoVe examples."""

from __future__ import annotations

import sys
from pathlib import Path

CURRENT_DIR = Path(__file__).resolve().parent
if str(CURRENT_DIR) not in sys.path:
    sys.path.insert(0, str(CURRENT_DIR))

from detection_demo import choose_safe_target, sample_detections
from follow_me_safety_demo import TargetState, decide_follow_me_action
from sensor_snapshot_demo import get_public_safe_sample_snapshot, snapshot_as_dict
from speech_pipeline_demo import demo_speech_pipeline
from time_intent_demo import answer_time_question
from voice_activity_demo import demo_voice_activity


def main() -> None:
    """Print clean output from each public concept example."""
    print("NeXa RoVe public demo examples")
    print()
    print(f"Voice activity: {demo_voice_activity()}")
    print(f"Speech pipeline: {demo_speech_pipeline()}")
    print(f"Sensor snapshot: {snapshot_as_dict(get_public_safe_sample_snapshot())}")
    print(f"Detection target: {choose_safe_target(sample_detections())}")

    target_state = TargetState(
        target_visible=True,
        distance_cm=140,
        obstacle_detected=False,
        emergency_stop=False,
    )
    print(f"Follow-me safety decision: {decide_follow_me_action(target_state)}")
    print(f"Time intent: {answer_time_question('What time is it?')}")


if __name__ == "__main__":
    main()
