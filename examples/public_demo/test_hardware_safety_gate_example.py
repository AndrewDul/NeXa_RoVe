"""Tests for hardware_safety_gate_example."""

from __future__ import annotations

import sys
import unittest
from pathlib import Path

CURRENT_DIR = Path(__file__).resolve().parent
if str(CURRENT_DIR) not in sys.path:
    sys.path.insert(0, str(CURRENT_DIR))

from hardware_safety_gate_example import (
    ALLOW,
    BLOCKED,
    STOP,
    WAIT,
    FakeHardwareState,
    explain_decision,
    safety_gate,
)


class HardwareSafetyGateExampleTests(unittest.TestCase):
    def test_allows_clear_state(self) -> None:
        self.assertEqual(safety_gate(FakeHardwareState()), ALLOW)

    def test_stops_when_obstacle_close(self) -> None:
        self.assertEqual(safety_gate(FakeHardwareState(obstacle_close=True)), STOP)

    def test_waits_when_battery_low(self) -> None:
        self.assertEqual(safety_gate(FakeHardwareState(battery_low=True)), WAIT)

    def test_blocks_when_hardware_not_ready(self) -> None:
        self.assertEqual(safety_gate(FakeHardwareState(hardware_ready=False)), BLOCKED)

    def test_explains_decision(self) -> None:
        self.assertIn("wait", explain_decision(WAIT).lower())


if __name__ == "__main__":
    unittest.main()
