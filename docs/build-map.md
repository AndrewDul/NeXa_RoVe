# Build map

This is a map of how NeXa RoVe has grown over time.

## Stage 1: Early assistant idea

**What was being built:** A personal assistant concept that could respond to user requests.

**Why it mattered:** This gave the project a simple starting point: input, understanding and response.

**Main challenge:** Avoiding a toy demo and thinking about how the assistant could later connect to real hardware.

**Public-safe outcome:** A direction was set: build an assistant that could become physical, local and interactive.

**What it taught me:** A useful assistant needs structure, not only a chat interface.

## Stage 2: Local runtime foundation

**What was being built:** A local runtime approach where different parts of the assistant could run together.

**Why it mattered:** A real assistant needs coordination between input, processing, UI, output and hardware.

**Main challenge:** Keeping the system understandable as more services and behaviours were added.

**Public-safe outcome:** The project moved towards a local-first runtime model.

**What it taught me:** Runtime reliability matters as much as individual features.

## Stage 3: Voice interaction and speech loop

**What was being built:** Voice input, speech response ideas and command handling.

**Why it mattered:** Voice is one of the most natural ways to interact with a physical assistant.

**Main challenge:** Voice systems have timing problems, recognition errors and awkward silence if the response path is not designed well.

**Public-safe outcome:** Voice became a major project direction, with public examples showing only simplified concepts.

**What it taught me:** A voice loop needs clear feedback, fallback behaviour and careful testing.

## Stage 4: Visual Shell and Godot interface

**What was being built:** A Godot-based Visual Shell for assistant feedback, panels and status display.

**Why it mattered:** A physical assistant should show state clearly. The user should not have to guess whether it is listening, thinking, idle or blocked.

**Main challenge:** Keeping the interface calm and useful while the backend state changes.

**Public-safe outcome:** The public repo shows selected UI images and explains the Visual Shell at a high level.

**What it taught me:** UI is part of reliability. Honest status can prevent confusion.

## Stage 5: Hardware integration on Raspberry Pi

**What was being built:** A Raspberry Pi based setup with display, microphone, camera, sensors, storage and power hardware.

**Why it mattered:** Running on real hardware exposes practical issues that desktop-only software does not show.

**Main challenge:** Devices can be missing, busy, slow, underpowered or unreliable.

**Public-safe outcome:** The public hardware gallery shows selected components without exposing private wiring or configuration.

**What it taught me:** Hardware work needs staged testing and clear readiness checks.

## Stage 6: Sensors, cameras and environment awareness

**What was being built:** Experiments with sensors, camera hardware and environment state.

**Why it mattered:** A physical assistant needs some awareness of its hardware state and surroundings.

**Main challenge:** Sensor and camera data can be noisy, delayed or unavailable.

**Public-safe outcome:** Public docs describe sensing at a broad level and include safe mocked examples.

**What it taught me:** The system should be honest when data is missing or uncertain.

## Stage 7: Robotics movement and safety thinking

**What was being built:** Movement experiments with a mobile base and pan-tilt hardware.

**Why it mattered:** Movement changes the risk level. A wrong response is one thing; a wrong physical action is different.

**Main challenge:** Hardware actions need explicit safety rules, blocking states and conservative decisions.

**Public-safe outcome:** The public repo includes a simplified follow-me safety example, not real control code.

**What it taught me:** Robotics work should default to stop, wait or hold when confidence is low.

## Stage 8: Learning support and personal assistance direction

**What was being built:** Concepts around study support, tutoring-style help, routines and personal assistance.

**Why it mattered:** A local assistant could help with learning and organisation in a more personal way.

**Main challenge:** Keeping learning support useful without over-routing normal questions or storing sensitive data carelessly.

**Public-safe outcome:** The public docs explain the learning direction without exposing private prompts, data stores or routing logic.

**What it taught me:** Personal assistance needs strong boundaries and clear user control.

## Stage 9: Public presentation, demo material and safe examples

**What was being built:** Public documentation, images, video, simplified code examples and sharing boundaries.

**Why it mattered:** The project needs to be understandable to recruiters, university contacts and technical readers without exposing the private system.

**Main challenge:** Showing the engineering depth without turning the repo into a long internal development dump.

**Public outcome:** This repository now acts as a project page and engineering record.

**What it taught me:** Good documentation is part of engineering, especially when privacy and safety matter.
