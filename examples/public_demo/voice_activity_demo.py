"""Simplified public voice activity concept.

This example uses fake audio sample lists only. It does not access a
microphone, read audio files, use a wake word model, or run a real VAD model.
"""

from __future__ import annotations


def calculate_audio_energy(samples: list[float]) -> float:
    """Return a simple average absolute energy for fake audio samples."""
    if not samples:
        return 0.0
    return sum(abs(sample) for sample in samples) / len(samples)


def detect_voice_activity(samples: list[float], threshold: float = 0.05) -> dict[str, float | bool]:
    """Decide whether voice may be active using a simple threshold."""
    energy = calculate_audio_energy(samples)
    return {
        "voice_detected": energy >= threshold,
        "energy": round(energy, 4),
        "threshold": threshold,
    }


def demo_voice_activity() -> dict[str, float | bool]:
    """Run the concept demo with fake samples."""
    fake_samples = [0.0, 0.02, -0.08, 0.12, -0.1, 0.04]
    return detect_voice_activity(fake_samples)


if __name__ == "__main__":
    print(demo_voice_activity())
