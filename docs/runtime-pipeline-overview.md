# Runtime pipeline overview

This page explains the main runtime flow behind NeXa RoVe.

## Simple mental model

```text
User input
-> input processing
-> command understanding
-> local assistant logic
-> UI / voice response
-> optional safe hardware action
```

## What happens at a high level

The user can interact with NeXa RoVe through voice or text-style input.

The system processes the input and tries to understand whether it is a simple command, a general assistant request, a learning support request or something that should not trigger an action.

Where possible, work is intended to happen locally. This is part of the local-first direction: keep suitable processing close to the user and reduce unnecessary dependency on cloud services.

The assistant then prepares a response. That response may be shown in the Visual Shell, spoken aloud or both.

If a request could affect hardware, it should pass through a safety-minded decision path before anything physical happens.

## Public-safe runtime stages

1. **User input**  
   A user speaks or enters a request.

2. **Input processing**  
   The system prepares the input for understanding. For voice, this can include broad concepts such as activity detection and speech recognition.

3. **Command understanding**  
   The request is classified into a safe public category, such as simple command, assistant response, learning support or no action.

4. **Local assistant logic**  
   The assistant decides what can be handled locally and what response is appropriate.

5. **UI and voice response**  
   The Visual Shell can show status, feedback or a response. Speech output can provide a spoken reply.

6. **Optional hardware action**  
   Hardware action should only happen when the request is safe, the hardware is ready and the required checks pass.

## Testing and checks

Testing checks whether each stage behaves sensibly: input, understanding, response, UI feedback and hardware readiness. The public examples show the same mindset with small, readable tests.
