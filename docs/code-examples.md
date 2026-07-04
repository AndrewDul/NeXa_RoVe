# Code examples

The code examples make the project easier to understand from the outside. They turn the main NeXa RoVe ideas into small, runnable Python files.

The goal is not to recreate the full system. The goal is to show the design thinking in a form that can be read, tested and discussed.

## What each example demonstrates

| Example | Demonstrates |
|---|---|
| [system_flow_example.py](../examples/public_demo/system_flow_example.py) | A shared command flow with intent classification and a movement decision. |
| [command_understanding_example.py](../examples/public_demo/command_understanding_example.py) | Deterministic command categories such as status, hardware, learning, camera and movement. |
| [runtime_pipeline_example.py](../examples/public_demo/runtime_pipeline_example.py) | A shared voice/text pipeline that returns a UI and voice response plan. |
| [hardware_safety_gate_example.py](../examples/public_demo/hardware_safety_gate_example.py) | Fake hardware checks that return ALLOW, WAIT, STOP or BLOCKED. |
| [vision_confidence_example.py](../examples/public_demo/vision_confidence_example.py) | Confidence, distance and freshness checks for fake detections. |
| [ui_state_example.py](../examples/public_demo/ui_state_example.py) | Visible states such as idle, listening, thinking, responding, blocked and learning. |
| [local_model_route_example.py](../examples/public_demo/local_model_route_example.py) | A simple routing idea for deterministic commands, local responses, task helpers and fallback. |
| [learning_flow_example.py](../examples/public_demo/learning_flow_example.py) | Study modes for teach, quiz, plan and explain-again requests. |
| [voice_activity_demo.py](../examples/public_demo/voice_activity_demo.py) | A fake voice activity check using sample energy values. |
| [speech_pipeline_demo.py](../examples/public_demo/speech_pipeline_demo.py) | A small speech-style command pipeline. |
| [sensor_snapshot_demo.py](../examples/public_demo/sensor_snapshot_demo.py) | A mocked sensor snapshot using dataclasses. |
| [detection_demo.py](../examples/public_demo/detection_demo.py) | A simple detection selection concept. |
| [follow_me_safety_demo.py](../examples/public_demo/follow_me_safety_demo.py) | A conservative follow-me action decision. |
| [time_intent_demo.py](../examples/public_demo/time_intent_demo.py) | A local time intent response using the standard library. |

## Run the main examples

```bash
python3 examples/public_demo/system_flow_example.py
python3 examples/public_demo/command_understanding_example.py
python3 examples/public_demo/runtime_pipeline_example.py
python3 examples/public_demo/hardware_safety_gate_example.py
python3 examples/public_demo/vision_confidence_example.py
python3 examples/public_demo/ui_state_example.py
python3 examples/public_demo/local_model_route_example.py
python3 examples/public_demo/learning_flow_example.py
```

## Run the tests

```bash
python3 -m unittest discover examples/public_demo -p "test_*.py"
```

## How the examples connect to the project

NeXa RoVe is exploring local voice interaction, assistant feedback through a visual interface, Raspberry Pi hardware, sensors, robotics safety, local-first AI, learning support, testing and reliability.

The examples mirror those areas in small pieces. They are useful for recruiters and technical readers because each file shows one idea without requiring the full physical setup.
