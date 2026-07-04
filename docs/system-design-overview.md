# System design overview

## System summary

NeXa RoVe is built around the idea that an assistant should be understandable as a system, not just as a model response. The project connects input, command understanding, local processing, UI feedback, hardware state and testing.

The main design question is: how can a local assistant listen, understand, respond and interact with hardware without becoming unpredictable?

## Runtime pipeline

The runtime starts with user input. That input may come from voice, text or an interface action.

The system prepares the input, works out what kind of request it is and then chooses a path. A simple command can be handled directly. A broader question may use local AI experiments. A learning request can enter a study flow. A hardware request goes through readiness and safety checks before any action.

This pipeline makes the assistant easier to reason about because each stage has a job.

## Command understanding

Command understanding separates different kinds of requests:

- simple commands
- assistant questions
- learning support requests
- UI actions
- movement-related requests
- unclear input that needs clarification

This matters because not every request should be handled by the same path. A time question, a study request and a movement request need different behaviour.

## Visual Shell

The Visual Shell is the screen-side part of the project. It shows assistant state, feedback, panels and interface responses.

It helps make the assistant feel less like a black box. If NeXa is listening, responding, waiting or showing a panel, the user should be able to see that.

## Vision and sensing

Vision and sensing are treated as input signals. Camera and sensor readings can help the assistant understand state, distance, environment or hardware conditions.

The important design idea is confidence. A reading should influence behaviour only when it is useful for the task. When information is missing or uncertain, the interface should make that clear.

## Local AI and model direction

The project explores local AI because local processing can improve control, cost and privacy for suitable tasks.

The challenge is that local hardware has limits. The design therefore keeps fast command paths separate from slower reasoning paths, and it uses fallback or clarification when a request is not clear enough.

## Hardware safety

Hardware actions are treated differently from normal text or voice responses. A text response can be corrected after the fact; physical movement needs checks before it happens.

The broad safety loop is:

1. Check whether the hardware is ready.
2. Check sensor state.
3. Check whether the goal is clear.
4. Stop, wait, hold distance or move slowly.
5. Show feedback about the decision.

## Testing loop

Testing is part of the design. The project uses small examples, smoke checks, manual verification and reports to keep track of what changed.

The public examples show this approach in a small form: simple inputs, clear classification, safe fallback behaviour and `unittest` tests.

## Build stages

The project grew through stages:

1. assistant concept
2. local runtime direction
3. voice interaction
4. command understanding
5. Visual Shell
6. Raspberry Pi hardware
7. sensors and cameras
8. robotics movement
9. learning support
10. public demo and documentation

Each stage added new problems and forced the design to become more structured.

## Why this design makes sense

The design keeps different concerns separate:

- input handling
- command understanding
- assistant response
- UI feedback
- hardware checks
- testing and reporting

That separation makes the project easier to debug and easier to explain.

## What I am still improving

Current improvement areas include:

- voice responsiveness
- local AI reliability
- Visual Shell feedback
- hardware readiness checks
- sensor and camera behaviour
- movement safety decisions
- learning support workflows
- testing and documentation
