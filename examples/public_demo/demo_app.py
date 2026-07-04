"""Run simplified NeXa RoVe demo examples together."""

from __future__ import annotations

import sys
from pathlib import Path

CURRENT_DIR = Path(__file__).resolve().parent
if str(CURRENT_DIR) not in sys.path:
    sys.path.insert(0, str(CURRENT_DIR))

from command_understanding_example import classify_command
from detection_demo import choose_safe_target, sample_detections
from follow_me_safety_demo import TargetState, decide_follow_me_action
from hardware_safety_gate_example import FakeHardwareState, safety_gate
from learning_flow_example import choose_study_mode
from local_model_route_example import choose_route
from runtime_pipeline_example import handle_input
from sensor_snapshot_demo import get_public_safe_sample_snapshot, snapshot_as_dict
from speech_pipeline_demo import demo_speech_pipeline
from ui_state_example import build_ui_state
from vision_confidence_example import FakeDetection, evaluate_detection
from time_intent_demo import answer_time_question
from voice_activity_demo import demo_voice_activity


def main() -> None:
    """Print clean output from the concept examples."""
    print("NeXa RoVe demo examples")
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
    print(f"Command understanding: {classify_command('show hardware')}")
    print(f"Runtime pipeline: {handle_input('open camera', source='voice')}")
    print(f"Hardware safety gate: {safety_gate(FakeHardwareState(obstacle_close=True))}")
    print(f"Vision confidence: {evaluate_detection(FakeDetection('person', 0.82, 1.8, True))}")
    print(f"UI state: {build_ui_state('thinking')}")
    print(f"Local model route: {choose_route('make a study plan')}")
    print(f"Learning flow: {choose_study_mode('quiz me')}")


if __name__ == "__main__":
    main()
