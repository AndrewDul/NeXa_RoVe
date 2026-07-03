# Code examples

The code examples in this repository exist to make the public project easier to understand without exposing the private NeXa implementation.

They are simplified public examples only. They show concepts related to the current NeXa RoVe work, but they are not copied from the private runtime and they are not production code.

## What they show

- voice activity concept using fake audio samples
- speech pipeline concept using a mock transcript and simple intent handling
- sensor state concept using fake values and dataclasses
- detection concept using fake object/person detections
- follow-me safety concept using a conservative decision rule
- time intent concept using the Python standard library

## What they do not show

The examples do not include:

- private NeXa source code
- real voice pipeline code
- real wake word code
- real STT or TTS code
- real sensor drivers
- real camera or depth code
- real follow-me control logic
- real motor control
- private prompts
- memory logic
- diagnostics
- logs
- `.env` files
- tokens, secrets, or private configuration

## How they relate to NeXa RoVe

NeXa RoVe is currently exploring local voice interaction, assistant feedback through a visual interface, Raspberry Pi hardware, sensors, robotics safety, local-first AI, testing, and reliability.

The examples mirror those broad areas at a safe public level. They are intended to help someone understand the direction of the project without showing the private working system.

## Running the examples

```bash
python3 examples/public_demo/demo_app.py
python3 examples/public_demo/test_public_demo.py
```
