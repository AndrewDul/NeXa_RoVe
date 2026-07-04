"""Simplified hardware safety gate example for NeXa RoVe.

The example shows why movement-style actions should be checked before they are
allowed. It uses fake sensor state only and never touches real hardware.
"""

from __future__ import annotations

from dataclasses import dataclass


ALLOW = "ALLOW"
WAIT = "WAIT"
STOP = "STOP"
BLOCKED = "BLOCKED"


@dataclass(frozen=True)
class FakeHardwareState:
    """Fake sensor and hardware state for a movement decision."""

    obstacle_close: bool = False
    battery_low: bool = False
    sensors_fresh: bool = True
    hardware_ready: bool = True


def safety_gate(state: FakeHardwareState) -> str:
    """Return a conservative action decision for fake hardware state."""
    if state.obstacle_close:
        return STOP
    if not state.hardware_ready:
        return BLOCKED
    if state.battery_low or not state.sensors_fresh:
        return WAIT
    return ALLOW


def explain_decision(decision: str) -> str:
    """Explain the safety decision in one short sentence."""
    explanations = {
        ALLOW: "The fake checks are clear enough to continue.",
        WAIT: "The action should wait until conditions improve.",
        STOP: "The action should stop because something is too close.",
        BLOCKED: "The action is blocked because hardware is not ready.",
    }
    return explanations[decision]


def demo() -> list[tuple[FakeHardwareState, str, str]]:
    """Run a few fixed fake hardware states."""
    states = [
        FakeHardwareState(),
        FakeHardwareState(obstacle_close=True),
        FakeHardwareState(battery_low=True),
        FakeHardwareState(sensors_fresh=False),
        FakeHardwareState(hardware_ready=False),
    ]
    return [(state, safety_gate(state), explain_decision(safety_gate(state))) for state in states]


if __name__ == "__main__":
    for state, decision, explanation in demo():
        print(f"{state} -> {decision}: {explanation}")
