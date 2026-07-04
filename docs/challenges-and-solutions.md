# Challenges and solutions

## Voice responsiveness

**Challenge:** Voice interaction needs to feel responsive and not leave the user waiting in silence.

**Why it was hard:** The pipeline includes capture, speech recognition, text preparation, command understanding, response generation, speech output and UI feedback.

**Approach:** Treat voice as a full loop. Improve timing, show visual feedback and handle unclear input with useful prompts.

**Result:** The design became more focused on acknowledgement, feedback and recovery.

**What I learned:** Voice UX is not only accuracy. It is also timing and communication.

## Local AI on Raspberry Pi

**Challenge:** Local AI is useful, but Raspberry Pi hardware has practical limits.

**Why it was hard:** Larger models can be slower or harder to run. Smaller models can be faster but less capable.

**Approach:** Keep deterministic command paths separate from model-backed responses and treat model use as a tradeoff.

**Result:** The public design separates fast commands, assistant answers and learning support.

**What I learned:** Local AI design is about matching the task to the hardware.

## Runtime reliability

**Challenge:** The assistant has several moving parts that need to work together.

**Why it was hard:** A problem in one area can appear somewhere else. For example, voice may work but UI feedback may lag, or hardware may be present but not ready.

**Approach:** Split the runtime into understandable stages and document what each stage is responsible for.

**Result:** The diagrams now show runtime flow, command understanding, UI feedback and hardware checks separately.

**What I learned:** Clear boundaries make debugging easier.

## Command understanding

**Challenge:** The assistant needs to distinguish simple commands, questions, learning requests and movement-related requests.

**Why it was hard:** Speech recognition can produce partial or strange text, and a short phrase can mean different things depending on context.

**Approach:** Use a classification mindset: normalise, classify, route, then respond or ask for clarification.

**Result:** The public examples now include a small system-flow demo that classifies sample commands.

**What I learned:** Asking for clarification is often better than guessing.

## Godot Visual Shell

**Challenge:** The UI needs to show assistant state without becoming cluttered.

**Why it was hard:** The screen needs to support face/home view, panels, status, commands and learning flows.

**Approach:** Build the Visual Shell around calm feedback, panels and clear status changes.

**Result:** The public gallery and diagrams show how the Visual Shell fits into the system.

**What I learned:** UI is part of the assistant's behaviour, not just presentation.

## Camera and vision flow

**Challenge:** Vision can help the assistant understand the environment, but camera data can be uncertain.

**Why it was hard:** Frames, detections and distance estimates are not always available or reliable.

**Approach:** Think in terms of capture, preparation, confidence and decision-making.

**Result:** The vision diagram explains how camera input becomes state or feedback.

**What I learned:** Vision should support decisions only when confidence is good enough.

## Sensor and hardware state

**Challenge:** Hardware and sensors can be unavailable, stale or noisy.

**Why it was hard:** Real devices do not always behave like simple software mocks.

**Approach:** Treat availability and freshness as part of the design.

**Result:** The hardware and sensing docs explain why component testing matters.

**What I learned:** Hardware integration needs patient debugging and small checks.

## Robotics movement safety

**Challenge:** Movement requests need more care than normal assistant responses.

**Why it was hard:** A wrong physical action can create a real-world issue.

**Approach:** Use conservative outcomes: stop, wait, hold distance or move slowly.

**Result:** The hardware safety loop diagram and example code show this decision style.

**What I learned:** Stop and wait are good engineering outcomes when information is unclear.

## Learning support design

**Challenge:** Learning support should help without turning every question into a study workflow.

**Why it was hard:** The assistant needs to handle ordinary questions, explicit study requests, quizzes and follow-up learning tasks differently.

**Approach:** Think of learning as a structured mode with its own request types and feedback.

**Result:** The build map and diagrams show learning support as a separate part of the system.

**What I learned:** Learning tools need clear intent and good boundaries.

## Testing and reporting discipline

**Challenge:** The project changed quickly across voice, UI, hardware and runtime behaviour.

**Why it was hard:** Without notes, it becomes difficult to remember why something changed.

**Approach:** Write reports, run tests, do small checks and keep public examples testable.

**Result:** The public repo includes tests, reports and engineering notes.

**What I learned:** Documentation is not separate from engineering. It helps keep the project understandable.

## Public presentation

**Challenge:** The project needed to make sense to recruiters and technical readers.

**Why it was hard:** The work spans many areas, so a simple feature list does not explain the effort.

**Approach:** Build a portfolio structure: README, diagrams, engineering story, build map, examples, media and recruiter brief.

**Result:** The public repo now tells the project story more clearly.

**What I learned:** A strong project page should explain decisions, not only show screenshots.
