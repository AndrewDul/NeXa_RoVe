# Engineering story

This page explains the engineering work behind NeXa RoVe.

## What NeXa RoVe is

NeXa RoVe is my personal local-first AI and robotics project. It explores how an assistant could run on real hardware, listen through voice interaction, show feedback on a visual interface, use Raspberry Pi hardware, read sensors and interact with robotics components in a careful way.

This repository explains the work, shows selected media, shares simplified examples and records the engineering journey.

## Why I started building it

I started building NeXa RoVe because I wanted to understand what it takes to move an AI assistant from a screen-only idea into a physical system.

That means dealing with problems that do not appear in a simple chatbot:

- audio input can be noisy
- local models can be slow or limited
- hardware can fail or disconnect
- UI state needs to stay understandable
- movement must be treated as a safety problem
- testing has to cover both software behaviour and real devices

I also wanted to explore a more local-first direction. Cloud AI tools are useful, but a local assistant can give more control over privacy, reliability and cost when the task is suitable for local hardware.

## What makes it difficult

NeXa RoVe is difficult because it combines several different engineering areas:

- voice interaction
- local AI experimentation
- runtime orchestration
- UI feedback
- Raspberry Pi hardware
- sensors and camera experiments
- robotics movement
- safety gates and failure handling
- testing and documentation

Each area affects the others. A voice command is not just text. It can affect the interface, local model choice, speech output, hardware state and possible movement. That means the system needs clear boundaries and careful behaviour when something is unavailable or uncertain.

## What has been built so far

At a high level, the private development work has explored:

- a local-first assistant runtime
- voice input and speech response ideas
- command and intent handling
- a Godot-based Visual Shell
- UI panels for feedback and status
- Raspberry Pi hardware integration
- microphone, display, camera and sensor hardware
- mobile base and pan-tilt movement experiments
- learning support concepts
- testing, smoke checks and debugging reports
- documentation and demo material

The public repository focuses on the project story, design thinking and selected demonstrations.

## How the project grew over time

The project grew in broad stages.

First, it started as an assistant idea: a system that could take input, understand simple requests and respond.

Then it moved towards a local runtime: a set of processes and services that could run together on local hardware, rather than only as a single script.

Voice interaction came next. That introduced timing, wake/listen behaviour, speech recognition quality, speech output and the need to avoid long silences.

The Visual Shell then became important. A physical assistant should show what it is doing, not only speak. The UI work focused on calm feedback, visible status and panels that make the system easier to understand.

The hardware work added another layer. Raspberry Pi hardware, displays, microphones, cameras, sensors, power and storage all need practical testing. Real devices do not behave like ideal software mocks.

Robotics experiments added the hardest safety questions. Movement needs explicit limits, safe decisions, checks before action and ways to stop or wait when information is weak.

Finally, the project has moved towards stronger documentation and public presentation. The repo now records the build process in a way that is easy to follow.

## What problems I had to solve

Some of the main problems have been:

- keeping voice interaction responsive enough to feel usable
- balancing local AI quality with Raspberry Pi hardware limits
- making the UI show honest states rather than pretending everything is ready
- keeping hardware actions separate from normal assistant responses
- handling missing or unreliable devices
- checking sensor and camera data before trusting it
- treating movement as a safety issue, not just a command
- keeping private development data out of the public repository
- documenting the system clearly enough that the work is understandable later

The private development reports show repeated cycles of testing, finding weak points, improving behaviour, then documenting what changed. The public version keeps that story without exposing the internal code.

## What I learned from building it

The main lesson is that physical AI systems are integration-heavy. The hard part is not only writing a model call or drawing a UI. The hard part is making many pieces behave together:

- input must be interpreted correctly
- the runtime must know what is available
- the UI must show useful feedback
- hardware must fail safely
- testing needs to catch regressions
- documentation needs to explain decisions

I also learned that honest fallback behaviour matters. If a camera preview is not available, the UI should say that. If hardware is not ready, the system should not pretend it can move. If local AI is too slow for a task, the design needs to account for that.

## What is still being improved

NeXa RoVe is still active development. Current improvement areas include:

- local voice interaction
- visual feedback through the UI
- Raspberry Pi hardware integration
- sensors and camera experiments
- robotics movement safety
- local AI reliability
- learning support and personal assistance ideas
- testing and debugging on real hardware
- documentation

The project is not finished. The goal is to keep improving it in practical steps.

## Why the main development work is separate

The main development work is separate from this portfolio repository because NeXa RoVe combines software, hardware, voice and movement. The public repo is designed to show the engineering story without turning the working system into a copy-and-paste project.

This keeps the public material focused: what was built, what problems came up, what decisions were made and what I learned.
