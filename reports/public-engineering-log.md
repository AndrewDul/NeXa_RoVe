# Public engineering log

This log records engineering progress for NeXa RoVe.

## Stage: Project foundation

**Area:** Assistant concept and local runtime direction.

**What changed:** The project moved from a simple assistant idea towards a local-first assistant that can run with real hardware.

**Problem / decision:** A physical assistant needs more structure than a normal chatbot.

**How I approached it:** I treated the project as a system with input, understanding, response, UI feedback and hardware boundaries.

**What I learned:** The architecture has to support future hardware and safety work from the start.

**Note:** The public repo focuses on project explanation and selected demonstrations.

## Stage: Voice interaction direction

**Area:** Voice input and response loop.

**What changed:** Voice interaction became one of the main development areas.

**Problem / decision:** Voice needs to feel responsive and should not leave the user guessing.

**How I approached it:** I separated the public concept into simple examples and kept real voice pipeline work private.

**What I learned:** Voice systems need timing, fallback behaviour and clear UI feedback.

**Public-safe note:** Public examples use fake audio samples only.

## Stage: Visual Shell and UI direction

**Area:** Godot Visual Shell.

**What changed:** The project gained a visual interface direction for feedback, panels and status.

**Problem / decision:** A physical assistant should show what it is doing, not only speak.

**How I approached it:** I focused on calm UI feedback, visible state and clear screenshots.

**What I learned:** Honest UI status is part of reliability.

**Note:** The public material shows the interface direction rather than the full UI source.

## Stage: Hardware build

**Area:** Raspberry Pi, display, microphone, camera, storage and power.

**What changed:** The assistant moved onto real hardware with connected components.

**Problem / decision:** Hardware can fail or behave differently from software mocks.

**How I approached it:** I tested components separately and documented the hardware at a high level.

**What I learned:** Hardware readiness needs explicit checks and clear assumptions.

**Public-safe note:** The public repo shows photos and broad descriptions only.

## Stage: Sensors and robotics

**Area:** Sensors, cameras, mobile base and pan-tilt hardware.

**What changed:** The project started exploring environment awareness and controlled movement.

**Problem / decision:** Movement requires stronger safety thinking than normal assistant responses.

**How I approached it:** I treated stop, wait and blocked states as important outcomes, not failures.

**What I learned:** Safe defaults matter when software can affect physical hardware.

**Public-safe note:** The public follow-me example is simplified concept code, not real control logic.

## Stage: Learning support direction

**Area:** Study support and personal assistance ideas.

**What changed:** The project began exploring how a local assistant could support learning, routines and reflection.

**Problem / decision:** Learning support should help without overclaiming or replacing proper teaching.

**How I approached it:** I kept the public explanation careful and focused on possible support.

**What I learned:** Personal assistance features need strong boundaries around data and control.

**Public-safe note:** Prompts, private data and learning internals are not published.

## Stage: Public repo and media

**Area:** GitHub and LinkedIn presentation.

**What changed:** The public repository was prepared with README, photos, gallery pages and a short demo video.

**Problem / decision:** The project needed to be easy to understand without exposing the private system.

**How I approached it:** I separated public images and videos from private development material and added clear sharing boundaries.

**What I learned:** Public presentation should be honest, simple and well organised.

**Public-safe note:** Media is selected and reviewed before sharing.

## Stage: Safe code examples

**Area:** Public example code.

**What changed:** Simplified Python examples were added for voice activity, speech flow, sensor snapshots, fake detection, follow-me safety and time intent handling.

**Problem / decision:** The public repo needed code examples, but not the real runtime.

**How I approached it:** I wrote small standard-library examples with fake data and `unittest` tests.

**What I learned:** Concept examples can show engineering direction without needing the full working system.

**Public-safe note:** The examples do not use microphones, cameras, motors, real models or private logic.

## Stage: Demo video

**Area:** Public demo material.

**What changed:** A short public demo video was added and linked from the README.

**Problem / decision:** A short video helps people understand the project quickly.

**How I approached it:** I kept the video short and linked it as demo material.

**What I learned:** Demo material should be short, clear and reviewed before sharing.

**Note:** Demo clips should be reviewed before sharing.
