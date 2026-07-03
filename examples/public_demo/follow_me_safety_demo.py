"""Simplified public follow-me safety decision concept.

This is not real robot control logic and not production safety logic. It does
not control motors, read sensors, track people, or connect to hardware.
"""

from __future__ import annotations

from dataclasses import dataclass


STOP = "STOP"
WAIT = "WAIT"
MOVE_FORWARD_SLOWLY = "MOVE_FORWARD_SLOWLY"
HOLD_DISTANCE = "HOLD_DISTANCE"


@dataclass(frozen=True)
class TargetState:
    """Fake target and safety state for the public demo."""

    target_visible: bool
    distance_cm: int
    obstacle_detected: bool
    emergency_stop: bool


def decide_follow_me_action(target_state: TargetState, close_distance_cm: int = 80) -> str:
    """Return a conservative public demo movement decision."""
    if target_state.emergency_stop:
        return STOP
    if target_state.obstacle_detected:
        return STOP
    if not target_state.target_visible:
        return WAIT
    if target_state.distance_cm <= close_distance_cm:
        return HOLD_DISTANCE
    return MOVE_FORWARD_SLOWLY


if __name__ == "__main__":
    demo_state = TargetState(
        target_visible=True,
        distance_cm=140,
        obstacle_detected=False,
        emergency_stop=False,
    )
    print(decide_follow_me_action(demo_state))
