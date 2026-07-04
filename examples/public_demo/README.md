# Public demo examples

This folder contains small runnable Python examples for exploring NeXa RoVe ideas without a hardware setup.

The examples use fake data and the Python standard library. They are designed to be read quickly, run from the command line and tested with `unittest`.

## What to run first

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

## Example tour

| Example | What it teaches | Run it |
|---|---|---|
| [system_flow_example.py](system_flow_example.py) | A shared command pipeline with a simple movement decision. | `python3 examples/public_demo/system_flow_example.py` |
| [command_understanding_example.py](command_understanding_example.py) | How a few command phrases can become clear intent categories. | `python3 examples/public_demo/command_understanding_example.py` |
| [runtime_pipeline_example.py](runtime_pipeline_example.py) | How voice and typed input can share a response pipeline. | `python3 examples/public_demo/runtime_pipeline_example.py` |
| [hardware_safety_gate_example.py](hardware_safety_gate_example.py) | Why hardware actions need checks before they are allowed. | `python3 examples/public_demo/hardware_safety_gate_example.py` |
| [vision_confidence_example.py](vision_confidence_example.py) | How fake detections can be filtered by confidence, distance and freshness. | `python3 examples/public_demo/vision_confidence_example.py` |
| [ui_state_example.py](ui_state_example.py) | How assistant events can become visible UI states. | `python3 examples/public_demo/ui_state_example.py` |
| [local_model_route_example.py](local_model_route_example.py) | A simple route choice between deterministic commands, local responses and task helpers. | `python3 examples/public_demo/local_model_route_example.py` |
| [learning_flow_example.py](learning_flow_example.py) | How learning phrases can map to lesson, quiz, plan and explanation modes. | `python3 examples/public_demo/learning_flow_example.py` |
| [voice_activity_demo.py](voice_activity_demo.py) | A tiny fake audio energy check. | `python3 examples/public_demo/voice_activity_demo.py` |
| [speech_pipeline_demo.py](speech_pipeline_demo.py) | A fake speech command flow from activity check to response. | `python3 examples/public_demo/speech_pipeline_demo.py` |
| [sensor_snapshot_demo.py](sensor_snapshot_demo.py) | A mocked sensor snapshot using dataclasses. | `python3 examples/public_demo/sensor_snapshot_demo.py` |
| [detection_demo.py](detection_demo.py) | A simple object/person detection concept using sample data. | `python3 examples/public_demo/detection_demo.py` |
| [follow_me_safety_demo.py](follow_me_safety_demo.py) | A conservative follow-me movement decision concept. | `python3 examples/public_demo/follow_me_safety_demo.py` |
| [time_intent_demo.py](time_intent_demo.py) | A simple local time intent response. | `python3 examples/public_demo/time_intent_demo.py` |

## Run all tests

```bash
python3 -m unittest discover examples/public_demo -p "test_*.py"
```
