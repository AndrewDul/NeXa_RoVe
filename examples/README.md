# Examples

Examples in this folder are simplified public examples only.

They are not production NeXa code and do not include private runtime logic, prompts, memory behaviour, model routing, hardware control, diagnostics, or configuration.

## Public demo examples

The [public_demo](public_demo) folder contains small standard-library Python examples that show public concepts only:

- [voice_activity_demo.py](public_demo/voice_activity_demo.py) shows a simple fake audio energy check.
- [speech_pipeline_demo.py](public_demo/speech_pipeline_demo.py) shows a fake speech command flow from activity check to safe response.
- [sensor_snapshot_demo.py](public_demo/sensor_snapshot_demo.py) shows a mocked sensor state using dataclasses.
- [detection_demo.py](public_demo/detection_demo.py) shows how a fake person detection could be selected from safe sample data.
- [follow_me_safety_demo.py](public_demo/follow_me_safety_demo.py) shows a conservative movement decision concept using fake target state.
- [time_intent_demo.py](public_demo/time_intent_demo.py) shows a simple local time intent response.
- [demo_app.py](public_demo/demo_app.py) runs the public examples together.
- [test_public_demo.py](public_demo/test_public_demo.py) tests the examples using `unittest`.

These examples do not use real microphones, cameras, motors, sensors, models, private prompts, private memory, or real NeXa runtime code.
