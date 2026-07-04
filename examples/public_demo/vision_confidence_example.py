"""Simplified vision confidence example for NeXa RoVe.

This demo uses fake detections to show why confidence, distance and freshness
matter before a vision result is used for feedback or movement decisions.
"""

from __future__ import annotations

from dataclasses import dataclass


USE_FOR_FEEDBACK = "USE_FOR_FEEDBACK"
IGNORE_LOW_CONFIDENCE = "IGNORE_LOW_CONFIDENCE"
WAIT_FOR_FRESH_FRAME = "WAIT_FOR_FRESH_FRAME"
DO_NOT_USE_FOR_MOVEMENT = "DO_NOT_USE_FOR_MOVEMENT"


@dataclass(frozen=True)
class FakeDetection:
    """Fake detection result from a camera or vision model."""

    label: str
    confidence: float
    distance_m: float
    fresh: bool


def evaluate_detection(detection: FakeDetection) -> str:
    """Return a simple confidence decision for a fake detection."""
    if not detection.fresh:
        return WAIT_FOR_FRESH_FRAME
    if detection.confidence < 0.65:
        return IGNORE_LOW_CONFIDENCE
    if detection.distance_m < 0.5:
        return DO_NOT_USE_FOR_MOVEMENT
    return USE_FOR_FEEDBACK


def best_feedback_detection(detections: list[FakeDetection]) -> FakeDetection | None:
    """Select the highest-confidence detection that is usable for feedback."""
    usable = [item for item in detections if evaluate_detection(item) == USE_FOR_FEEDBACK]
    if not usable:
        return None
    return max(usable, key=lambda item: item.confidence)


def demo() -> list[tuple[FakeDetection, str]]:
    """Run a few fixed fake detections."""
    detections = [
        FakeDetection("person", 0.82, 1.8, True),
        FakeDetection("chair", 0.42, 1.2, True),
        FakeDetection("person", 0.91, 0.3, True),
        FakeDetection("person", 0.88, 2.0, False),
    ]
    return [(item, evaluate_detection(item)) for item in detections]


if __name__ == "__main__":
    for detection, decision in demo():
        print(f"{detection.label} {detection.confidence:.2f} at {detection.distance_m}m -> {decision}")
