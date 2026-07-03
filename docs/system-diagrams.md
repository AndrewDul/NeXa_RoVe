# System diagrams

These diagrams explain the main design ideas behind NeXa RoVe using GitHub Mermaid diagrams.

## Runtime overview

```mermaid
flowchart TD
    user[User] --> input[Voice or text input]
    input --> prepare[Input processing]
    prepare --> understand[Command understanding]
    understand --> decision{Request type}
    decision --> simple[Simple command]
    decision --> assistant[Assistant response]
    decision --> learn[Learning support]
    decision --> hardware[Hardware-related request]
    simple --> response[Response builder]
    assistant --> model[Local AI direction]
    learn --> study[Learning workflow]
    model --> response
    study --> response
    hardware --> check[Safety and readiness checks]
    check --> action{Safe to act?}
    action -->|yes| physical[Limited hardware action]
    action -->|no| blocked[Stop, wait or explain]
    physical --> feedback[UI and voice feedback]
    blocked --> feedback
    response --> feedback
```

The runtime is designed around a simple idea: prepare the input, understand the request, choose the right path, and give clear feedback. Hardware actions are treated separately because physical movement needs checks before action.

## Voice and command flow

```mermaid
flowchart TD
    speech[Spoken request] --> activity[Speech activity]
    activity --> transcript[Speech-to-text direction]
    transcript --> clean[Text cleanup and language handling]
    clean --> route{What is it?}
    route --> fast[Fast command]
    route --> question[General question]
    route --> learn[Learning request]
    route --> unclear[Unclear input]
    fast --> direct[Direct response or UI action]
    question --> answer[Assistant answer]
    learn --> study[Study support flow]
    unclear --> repair[Ask for clarification]
    direct --> output[Speech and Visual Shell feedback]
    answer --> output
    study --> output
    repair --> output
```

Voice work is not just speech recognition. It involves timing, command understanding, language handling, short confirmations, fallback behaviour and UI feedback.

## Command understanding

```mermaid
flowchart LR
    request[User request] --> normalise[Normalise text]
    normalise --> classify[Classify intent]
    classify --> command[Command]
    classify --> chat[Assistant conversation]
    classify --> learning[Learning support]
    classify --> movement[Movement-related]
    classify --> unclear[Needs clarification]
    command --> result[Run simple action]
    chat --> response[Build response]
    learning --> learnflow[Start or continue study flow]
    movement --> gate[Check readiness and safety]
    unclear --> ask[Ask a clearer question]
```

The project separates simple commands, assistant conversation, learning support and movement-related requests. That separation keeps the system easier to reason about.

## Visual Shell and UI feedback

```mermaid
flowchart TD
    runtime[Assistant runtime] --> state[State update]
    runtime --> message[Response text]
    runtime --> hardware[Hardware status]
    state --> shell[Visual Shell]
    message --> shell
    hardware --> shell
    shell --> face[Assistant face]
    shell --> panels[Panels and menus]
    shell --> status[Status feedback]
    shell --> user[User sees what is happening]
```

The Visual Shell makes the assistant visible. It can show whether NeXa is listening, responding, waiting, showing a panel or reporting hardware state.

## Local AI and model flow

```mermaid
flowchart TD
    request[Prepared request] --> canlocal{Can this run locally?}
    canlocal -->|simple| deterministic[Deterministic command path]
    canlocal -->|assistant answer| localmodel[Local model direction]
    canlocal -->|learning| tutor[Learning support path]
    deterministic --> reply[Fast reply]
    localmodel --> quality{Good enough?}
    tutor --> quality
    quality -->|yes| response[Return response]
    quality -->|no| fallback[Use fallback or ask clarification]
    fallback --> response
```

Local-first work is a balancing problem. The project explores where local processing is useful, where it is too slow, and where a simpler deterministic path is better.

## Vision and sensing flow

```mermaid
flowchart TD
    camera[Camera or sensor input] --> capture[Capture reading]
    capture --> available{Data available?}
    available -->|no| unavailable[Show unavailable state]
    available -->|yes| interpret[Interpret reading]
    interpret --> confidence{Confidence good?}
    confidence -->|no| cautious[Do not rely on it]
    confidence -->|yes| state[Update assistant state]
    state --> ui[Show feedback in UI]
    cautious --> ui
    unavailable --> ui
```

Camera and sensor data are treated as signals that need checking. The system should show when information is missing or uncertain.

## Robotics movement decision

```mermaid
flowchart TD
    intent[Movement-related request] --> readiness[Check hardware readiness]
    readiness --> estop{Emergency stop?}
    estop -->|yes| stop[STOP]
    estop -->|no| obstacle{Obstacle detected?}
    obstacle -->|yes| stop
    obstacle -->|no| target{Target visible?}
    target -->|no| wait[WAIT]
    target -->|yes| distance{Close enough?}
    distance -->|yes| hold[HOLD DISTANCE]
    distance -->|no| slow[MOVE SLOWLY]
    stop --> feedback[Explain state]
    wait --> feedback
    hold --> feedback
    slow --> feedback
```

Movement is handled differently from normal assistant responses. A text answer can be corrected after the fact; a physical action needs careful checks before it happens.

## Learning support flow

```mermaid
flowchart TD
    input[Voice, text or touch] --> decide{Learning request?}
    decide -->|no| assistant[General assistant path]
    decide -->|yes| topic[Resolve topic]
    topic --> clear{Topic clear?}
    clear -->|no| ask[Ask a clarifying question]
    clear -->|yes| mode{Study mode}
    mode --> teach[Explain]
    mode --> quiz[Quiz]
    mode --> plan[Plan study]
    mode --> practice[Practice]
    teach --> feedback[Visual and voice feedback]
    quiz --> feedback
    plan --> feedback
    practice --> feedback
    ask --> feedback
```

The learning direction is about structured support: understanding the request, choosing the right study mode, and giving useful feedback without turning every ordinary question into a study session.
