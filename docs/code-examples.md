# Code examples

The code examples in this repository exist to make the project easier to understand.

They are simplified examples only. They show concepts related to the current NeXa RoVe work and are not production code.

## What they show

- voice activity concept using fake audio samples
- speech pipeline concept using a mock transcript and simple intent handling
- sensor state concept using fake values and dataclasses
- detection concept using fake object/person detections
- follow-me safety concept using a conservative decision rule
- time intent concept using the Python standard library
- shared system-flow concept using command classification and a movement check

## Design choice

The examples use fake data and small functions because the goal is to show the idea clearly. They are meant to be read quickly and tested without any hardware setup.

## How they relate to NeXa RoVe

NeXa RoVe is currently exploring local voice interaction, assistant feedback through a visual interface, Raspberry Pi hardware, sensors, robotics safety, local-first AI, testing, and reliability.

The examples mirror those broad areas in a small, readable form.

## Running the examples

```bash
python3 examples/public_demo/demo_app.py
python3 examples/public_demo/test_public_demo.py
python3 examples/public_demo/system_flow_example.py
python3 examples/public_demo/test_system_flow_example.py
```
