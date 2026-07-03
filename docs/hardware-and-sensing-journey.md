# Hardware and sensing journey

NeXa RoVe is not only a software project. It is being built around real hardware, which makes the engineering work more practical and more difficult.

This page explains the hardware journey behind NeXa RoVe.

## Raspberry Pi as the local computer

Raspberry Pi hardware is used as the local computer for the project. It gives the assistant a physical base for running software, connecting devices and testing local-first ideas.

The challenge is that embedded hardware has limits. CPU, memory, heat, storage, power and device connections all matter.

## Display and UI

The display is used for the Visual Shell. It shows assistant feedback, state and interface panels.

This matters because a physical assistant should not hide what it is doing. Clear visual feedback makes the system easier to understand.

## Microphone and voice input

Microphone hardware is used for voice interaction experiments.

Voice input is harder than typed input because it depends on audio quality, timing, background noise and speech recognition reliability.

## Camera and vision experiments

Camera hardware is being explored for sensing and vision experiments.

Vision work is difficult because frames can be missing, delayed or uncertain. Public docs do not include real camera code, private image data or recognition logic.

## Sensors

Sensors are used to explore environment, distance, orientation and status information.

Sensor integration is harder than reading one value. The system needs to know whether a reading is available, fresh and useful before it is trusted.

## Mobile base and movement experiments

The mobile base and pan-tilt hardware are used to explore robotics behaviour.

Movement is the area that needs the most care. A software bug that affects text is different from a software bug that affects a physical device. The system should stop, wait or refuse movement when safety conditions are not clear.

## Power and storage

Power and storage are practical parts of the build. A local assistant needs enough power stability and local storage for development and testing.

These details are not glamorous, but they matter for a reliable physical project.

## Why hardware integration is harder than pure software

Real hardware introduces failure cases such as:

- device not connected
- device busy
- power issue
- driver issue
- stale data
- calibration problem
- physical movement risk

That is why components need to be tested separately before being trusted together.
