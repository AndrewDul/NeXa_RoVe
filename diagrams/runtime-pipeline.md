# Runtime pipeline

This diagram shows the main runtime flow behind NeXa RoVe.

```mermaid
flowchart TD
    input[Voice or text input] --> process[Input processing]
    process --> understand[Command understanding]
    understand --> decide{Assistant decision}
    decide --> simple[Simple command]
    decide --> answer[Assistant answer]
    decide --> learn[Learning support]
    decide --> hardware[Hardware request]
    simple --> plan[Response planning]
    answer --> model[Local AI / helper path]
    learn --> study[Study flow]
    model --> plan
    study --> plan
    hardware --> safety[Readiness and safety checks]
    safety --> allowed{Allowed?}
    allowed -->|yes| action[Careful hardware action]
    allowed -->|no| hold[Stop, wait or explain]
    action --> feedback[UI / voice / text feedback]
    hold --> feedback
    plan --> feedback
    feedback --> test[Testing and review]
    test --> improve[Small improvement loop]
    improve --> process
```

The runtime is built around a clear sequence: take input, prepare it, understand it, choose a response path, update the interface and only trigger hardware when the request has passed checks.

## Design notes

- Voice and text should share the same broad understanding path.
- Simple commands should not always need a model.
- UI feedback is part of the runtime, not an afterthought.
- Hardware actions are treated separately from normal answers.

## Why this matters

This structure makes the project easier to test and reason about. It also makes failures easier to isolate because each part has a clear responsibility.
