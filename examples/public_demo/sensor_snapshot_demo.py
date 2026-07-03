"""Simplified public sensor snapshot concept.

This uses fake values only. It does not access GPIO, I2C, serial devices,
real sensors, hardware IDs, private configuration, or diagnostics.
"""

from __future__ import annotations

from dataclasses import asdict, dataclass


@dataclass(frozen=True)
class SensorSnapshot:
    """Public-safe fake sensor state."""

    battery_percent: int
    distance_cm: int
    temperature_c: float
    sensors_available: bool
    obstacle_detected: bool
    movement_allowed: bool


def get_public_safe_sample_snapshot() -> SensorSnapshot:
    """Return a fake sensor snapshot for documentation and demo use."""
    return SensorSnapshot(
        battery_percent=76,
        distance_cm=120,
        temperature_c=42.5,
        sensors_available=True,
        obstacle_detected=False,
        movement_allowed=True,
    )


def snapshot_as_dict(snapshot: SensorSnapshot) -> dict[str, int | float | bool]:
    """Convert a fake snapshot to a plain dictionary."""
    return asdict(snapshot)


if __name__ == "__main__":
    print(snapshot_as_dict(get_public_safe_sample_snapshot()))
