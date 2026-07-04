# Build map

This page maps the main stages of the NeXa RoVe build.

## Stage 1: Concept and product direction

**What I worked on:** Defining the idea of a local assistant that could live on a desk and connect to hardware.

**Why it mattered:** The project needed a clear direction before adding more features.

**Problem introduced:** A physical assistant is more complex than a chatbot because it needs UI, audio and hardware thinking.

**What I learned:** A good concept should guide engineering decisions, not just describe a feature list.

## Stage 2: Local runtime foundation

**What I worked on:** Thinking about the assistant as a runtime with separate responsibilities.

**Why it mattered:** Voice, UI, model work and hardware state all need coordination.

**Problem introduced:** The more parts a system has, the easier it is to lose track of state.

**What I learned:** Runtime structure matters early. It becomes harder to add later.

## Stage 3: Voice interaction

**What I worked on:** Voice input, speech timing, response flow and feedback.

**Why it mattered:** Voice is one of the main ways a physical assistant should be used.

**Problem introduced:** Voice recognition can be noisy, partial or delayed.

**What I learned:** Voice UX is about the whole loop, not only speech-to-text.

## Stage 4: Command understanding

**What I worked on:** Separating simple commands, general questions, learning requests and movement-related requests.

**Why it mattered:** Different requests need different handling.

**Problem introduced:** Unclear input needs repair rather than guessing.

**What I learned:** Classification and fallback behaviour are core assistant skills.

## Stage 5: Visual Shell / Godot UI

**What I worked on:** Building a screen interface that shows assistant state, panels and feedback.

**Why it mattered:** Users need to see what the assistant is doing.

**Problem introduced:** The UI must stay calm and useful even when backend state changes.

**What I learned:** Interface feedback is part of reliability.

## Stage 6: Local AI and model experiments

**What I worked on:** Exploring where local models and deterministic paths fit into the assistant.

**Why it mattered:** Local-first behaviour can improve control and reduce cloud dependency for suitable tasks.

**Problem introduced:** Local hardware has limits, especially around speed and model size.

**What I learned:** Model selection is an engineering tradeoff, not a one-time choice.

## Stage 7: Hardware integration

**What I worked on:** Raspberry Pi, display, microphone, storage, power and connected components.

**Why it mattered:** The project needed to run as a physical setup, not only a desktop script.

**Problem introduced:** Real hardware can disconnect, fail, slow down or behave differently after restart.

**What I learned:** Hardware work needs small tests and clear assumptions.

## Stage 8: Cameras and vision

**What I worked on:** Camera and vision experiments for sensing and scene understanding.

**Why it mattered:** A physical assistant benefits from being able to observe its environment.

**Problem introduced:** Vision data can be uncertain, delayed or unavailable.

**What I learned:** Confidence and availability matter before a visual signal is used.

## Stage 9: Sensors

**What I worked on:** Distance, orientation, environment and status sensing.

**Why it mattered:** Sensors help the assistant understand hardware state and surroundings.

**Problem introduced:** Sensor readings must be checked before being trusted.

**What I learned:** A stale or missing reading should be handled as a normal state, not a surprise.

## Stage 10: Robotics movement safety

**What I worked on:** Movement concepts, mobile base experiments and pan-tilt control ideas.

**Why it mattered:** Physical movement changes the risk level of the project.

**Problem introduced:** Movement requests need checks before action.

**What I learned:** Stop, wait and hold-distance are important outcomes.

## Stage 11: Learning support

**What I worked on:** Study support, tutoring-style flows, quizzes and personal assistance ideas.

**Why it mattered:** A local assistant could help with learning and daily organisation.

**Problem introduced:** Learning support needs structure so ordinary questions do not turn into heavy workflows.

**What I learned:** A useful learning assistant needs clear modes and good feedback.

## Stage 12: Public demo and documentation

**What I worked on:** Public repo, images, video, diagrams, simplified code examples and engineering notes.

**Why it mattered:** The project needed to be understandable to people who had not followed the whole build.

**Problem introduced:** The public repo had to show effort without becoming an internal dump.

**What I learned:** Good presentation is part of engineering communication.
