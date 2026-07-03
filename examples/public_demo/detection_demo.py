"""Simplified public detection concept.

This uses fake detections only. It does not use real camera input, real
images, depth data, face recognition, or person identification.
"""

from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class FakeDetection:
    """A public-safe fake detection result."""

    label: str
    confidence: float
    distance_cm: int
    centred: bool


def sample_detections() -> list[FakeDetection]:
    """Return fake detections for the public demo."""
    return [
        FakeDetection(label="chair", confidence=0.66, distance_cm=90, centred=False),
        FakeDetection(label="person", confidence=0.82, distance_cm=120, centred=True),
        FakeDetection(label="box", confidence=0.74, distance_cm=70, centred=False),
    ]


def choose_safe_target(detections: list[FakeDetection]) -> FakeDetection | None:
    """Choose a simple person target from fake detections."""
    person_targets = [
        detection
        for detection in detections
        if detection.label == "person" and detection.confidence >= 0.5 and detection.distance_cm >= 50
    ]
    if not person_targets:
        return None
    return sorted(person_targets, key=lambda item: (not item.centred, -item.confidence))[0]


if __name__ == "__main__":
    print(choose_safe_target(sample_detections()))
