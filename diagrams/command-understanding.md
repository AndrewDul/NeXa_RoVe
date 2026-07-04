# Command understanding

Command understanding is the part that decides what kind of request the user has made.

```mermaid
flowchart TD
    raw[Raw request] --> normalise[Normalisation]
    normalise --> language[Language and wording cues]
    language --> classify{Intent classification}
    classify --> command[Fast command]
    classify --> chat[Assistant conversation]
    classify --> learn[Learning request]
    classify --> movement[Movement-related request]
    classify --> unclear[Unclear request]
    command --> command_result[Run direct action]
    chat --> answer[Build assistant answer]
    learn --> learning_flow[Route to learning flow]
    movement --> safety[Check hardware safety]
    unclear --> clarify[Ask a clearer question]
    command_result --> feedback[Return feedback]
    answer --> feedback
    learning_flow --> feedback
    safety --> feedback
    clarify --> feedback
```

## Explanation

The assistant should not treat every sentence the same way. A request for the time, a learning question, a UI command and a movement request all need different handling.

## Design notes

- Keep simple commands fast.
- Ask for clarification when the request is unclear.
- Route learning requests into a structured learning flow.
- Send movement-related requests through an extra check before action.

## Why this matters

Good command understanding makes the assistant feel more reliable. It also prevents a normal conversation request from accidentally being treated like a hardware instruction.
