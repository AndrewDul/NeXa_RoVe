# Local AI and model flow

This diagram shows the broad local AI direction.

```mermaid
flowchart TD
    input[Typed or transcribed input] --> classify[Classify request]
    classify --> quick{Simple command?}
    quick -->|yes| deterministic[Deterministic command path]
    quick -->|no| task{Task type}
    task --> assistant[Assistant answer]
    task --> learn[Learning help]
    task --> repair[Clarification / repair]
    assistant --> local[Local model / helper path]
    learn --> tutor[Learning support path]
    local --> select[Response selection]
    tutor --> select
    deterministic --> select
    repair --> select
    select --> output[Text, speech or UI response]
```

## Explanation

Local AI is useful when it gives enough quality at a usable speed. Not every request needs the same path: some commands are better handled directly, while open questions may need model-backed help.

## Design notes

- Fast commands should stay fast.
- Local models are useful for suitable tasks.
- Clarification is better than guessing when the input is weak.
- The interface should show progress during slower work.

## Why this matters

Local AI on small hardware is a tradeoff between speed, quality and reliability. Designing the flow carefully helps the assistant stay usable.
