# Examples

Examples in this folder are simplified public examples only.

They are small standard-library examples using fake data and simple tests.

## Public demo examples

The [public_demo](public_demo) folder contains small standard-library Python examples that show public concepts only:

- [voice_activity_demo.py](public_demo/voice_activity_demo.py) shows a simple fake audio energy check.
- [speech_pipeline_demo.py](public_demo/speech_pipeline_demo.py) shows a fake speech command flow from activity check to safe response.
- [sensor_snapshot_demo.py](public_demo/sensor_snapshot_demo.py) shows a mocked sensor state using dataclasses.
- [detection_demo.py](public_demo/detection_demo.py) shows how a fake person detection could be selected from safe sample data.
- [follow_me_safety_demo.py](public_demo/follow_me_safety_demo.py) shows a conservative movement decision concept using fake target state.
- [time_intent_demo.py](public_demo/time_intent_demo.py) shows a simple local time intent response.
- [system_flow_example.py](public_demo/system_flow_example.py) shows a shared command pipeline and movement check.
- [demo_app.py](public_demo/demo_app.py) runs the public examples together.
- [test_public_demo.py](public_demo/test_public_demo.py) and [test_system_flow_example.py](public_demo/test_system_flow_example.py) test the examples using `unittest`.

These examples use fake data and standard-library Python so they can be read and run easily.
