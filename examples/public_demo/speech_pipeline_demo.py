"""Simplified public speech pipeline concept.

This does not use real STT, real TTS, models, prompts, or full NeXa command
handling. It only shows a small example flow with fake input.
"""

from __future__ import annotations

try:
    from .voice_activity_demo import detect_voice_activity
except ImportError:  # Allows running this file directly.
    from voice_activity_demo import detect_voice_activity


INTENT_RESPONSES = {
    "greeting": "Hello. This is the public demo pipeline.",
    "status": "Public demo status: concept mode only.",
    "time": "I can answer a simple local time question in the time demo.",
    "help": "Public demo commands: hello, status, what time is it, help.",
}


def mock_transcribe(fake_audio_input: list[float], transcript: str) -> str:
    """Return a provided transcript when fake audio looks active."""
    activity = detect_voice_activity(fake_audio_input)
    if not activity["voice_detected"]:
        return ""
    return transcript.strip().lower()


def detect_intent(text: str) -> str:
    """Map a small set of public demo phrases to simple intents."""
    if text == "hello":
        return "greeting"
    if text == "status":
        return "status"
    if text in {"what time is it", "what's the time", "time"}:
        return "time"
    if text == "help":
        return "help"
    return "unknown"


def safe_response(intent: str) -> str:
    """Return a simple response for the detected intent."""
    return INTENT_RESPONSES.get(intent, "Sorry, this public demo only supports a few simple commands.")


def run_speech_pipeline(fake_audio_input: list[float], transcript: str) -> dict[str, str | bool]:
    """Run the fake speech pipeline from audio activity to safe response."""
    text = mock_transcribe(fake_audio_input, transcript)
    if not text:
        return {
            "voice_detected": False,
            "transcript": "",
            "intent": "none",
            "response": "No active voice was detected in the fake samples.",
        }

    intent = detect_intent(text)
    return {
        "voice_detected": True,
        "transcript": text,
        "intent": intent,
        "response": safe_response(intent),
    }


def demo_speech_pipeline() -> dict[str, str | bool]:
    """Run the concept demo with fake audio and a fake transcript."""
    fake_audio_input = [0.0, 0.04, -0.12, 0.1, -0.08]
    return run_speech_pipeline(fake_audio_input, "hello")


if __name__ == "__main__":
    print(demo_speech_pipeline())
