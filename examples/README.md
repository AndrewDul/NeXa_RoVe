# Examples

The examples are the easiest way to explore the engineering ideas in NeXa RoVe.

They use fake inputs, fake state and standard-library Python so they can run on a normal computer. No Raspberry Pi, microphone, camera, model server or robot base is needed.

## Guided example area

Open [public_demo](public_demo) for the main runnable examples.

| Area | Files | What to look for |
|---|---|---|
| Shared system flow | [system_flow_example.py](public_demo/system_flow_example.py), [runtime_pipeline_example.py](public_demo/runtime_pipeline_example.py) | How voice/text input can move through preparation, intent, response and UI planning. |
| Command understanding | [command_understanding_example.py](public_demo/command_understanding_example.py), [time_intent_demo.py](public_demo/time_intent_demo.py) | How simple commands can be routed without needing a model. |
| Voice concepts | [voice_activity_demo.py](public_demo/voice_activity_demo.py), [speech_pipeline_demo.py](public_demo/speech_pipeline_demo.py) | How a speech-style pipeline can be broken into small testable steps. |
| Sensors and vision | [sensor_snapshot_demo.py](public_demo/sensor_snapshot_demo.py), [detection_demo.py](public_demo/detection_demo.py), [vision_confidence_example.py](public_demo/vision_confidence_example.py) | How fake sensor and detection data can be checked before use. |
| Hardware safety | [follow_me_safety_demo.py](public_demo/follow_me_safety_demo.py), [hardware_safety_gate_example.py](public_demo/hardware_safety_gate_example.py) | Why movement needs conservative decisions such as wait, stop or blocked. |
| Interface feedback | [ui_state_example.py](public_demo/ui_state_example.py) | How assistant state can become visible in the interface. |
| Local AI direction | [local_model_route_example.py](public_demo/local_model_route_example.py) | How a request can be routed to a deterministic command, local response, helper flow or fallback. |
| Learning support | [learning_flow_example.py](public_demo/learning_flow_example.py) | How study phrases can become lesson, quiz, plan and retry modes. |

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

There is also a small top-level example:

```bash
python3 examples/safe_command_router_example.py
```
