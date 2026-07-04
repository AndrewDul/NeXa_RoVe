# Public engineering log

This log summarises the main stages of the NeXa RoVe build. It is written as a readable engineering record rather than a sprint dump.

## Stage: Project foundation

**Area:** Assistant concept and product direction.

**What I worked on:** I started with the idea of an assistant that would not only answer questions, but also run on real hardware and show its state through an interface.

**Problem I faced:** A physical assistant needs more structure than a chat-style program. It has to handle input, state, feedback and possible hardware actions in a predictable way.

**How I approached it:** I broke the project into separate areas: runtime flow, command understanding, voice, UI, hardware, sensors and testing.

**What changed:** NeXa RoVe became a systems project rather than a single feature idea.

**What I learned:** A useful assistant needs clear state and careful boundaries between thinking, responding and acting.

## Stage: Voice interaction

**Area:** Spoken input and response flow.

**What I worked on:** I explored how voice input could fit into the assistant pipeline and how the system should behave while listening, processing and responding.

**Problem I faced:** Voice interaction is sensitive to timing. If the system feels slow or unclear, the user does not know whether it heard them or became stuck.

**How I approached it:** I treated voice as part of the wider runtime flow, with visible feedback through the UI and fallback behaviour when a request cannot be understood.

**What changed:** Voice became a core interaction direction rather than an isolated audio feature.

**What I learned:** Voice systems need strong feedback. A short spoken answer is useful, but the screen also needs to show what is happening.

## Stage: Command understanding

**Area:** Turning user requests into useful actions.

**What I worked on:** I explored how requests can be separated into different kinds of work, such as status checks, assistant replies, learning support and movement-related requests.

**Problem I faced:** Not every sentence should become an action. Some requests should be answered, some should be refused, and some should wait for more context.

**How I approached it:** I designed the public examples and diagrams around a shared command pipeline: prepare the input, classify the request, choose the response path and check before hardware action.

**What changed:** The project gained a clearer distinction between normal assistant responses and requests that could affect physical hardware.

**What I learned:** Command handling is as much about saying “wait” or “I cannot do that” as it is about doing the requested action.

## Stage: Visual Shell and UI

**Area:** Godot interface and assistant feedback.

**What I worked on:** I developed the Visual Shell direction so the assistant can show state, panels, feedback and responses on the front display.

**Problem I faced:** A physical assistant can feel unclear if it only speaks. The user needs to see whether it is idle, listening, responding or blocked.

**How I approached it:** I focused on readable panels, visible state and a calm interface that supports the assistant instead of distracting from it.

**What changed:** The UI became part of the system design, not only a presentation layer.

**What I learned:** Good UI feedback improves trust because it makes the system’s behaviour easier to understand.

## Stage: Local AI and model experiments

**Area:** Running suitable assistant work close to the user.

**What I worked on:** I explored local AI direction, smaller model use, speech-related tools and the tradeoff between speed, quality and hardware limits.

**Problem I faced:** Local hardware has real constraints. A model or tool that works well on a desktop may be too slow, too heavy or too unreliable on a small device.

**How I approached it:** I treated model use as an engineering tradeoff. Fast paths are useful for simple commands, while more complex requests need different handling.

**What changed:** The design direction became more practical: local where it makes sense, careful fallback where needed.

**What I learned:** Local-first systems are not only about privacy. They are also about latency, reliability, cost and user control.

## Stage: Hardware build

**Area:** Raspberry Pi, display, microphone, camera, storage and power.

**What I worked on:** I moved the project from a software idea into a physical setup with connected components.

**Problem I faced:** Hardware introduces failure cases that do not exist in a purely software project: disconnected devices, stale readings, power limits, heat and driver behaviour.

**How I approached it:** I tested components separately, documented the hardware role and avoided assuming that a device is ready just because the software expects it.

**What changed:** NeXa RoVe became easier to explain visually because the build could be shown through photos, hardware notes and a short demo video.

**What I learned:** Real hardware makes the project more difficult, but it also makes the engineering more concrete.

## Stage: Vision and sensing

**Area:** Cameras, distance, orientation and environment signals.

**What I worked on:** I explored how cameras and sensors could provide information to the assistant and how that information might be used by UI or movement decisions.

**Problem I faced:** Sensor and vision data can be uncertain. A reading can be missing, old, noisy or not confident enough to trust.

**How I approached it:** I documented the flow around capture, preparation, confidence, distance and decision points rather than treating sensor data as automatically correct.

**What changed:** The project gained a stronger safety mindset around interpreting the environment.

**What I learned:** A good robotics system needs to know when it does not know enough.

## Stage: Robotics movement safety

**Area:** Mobile base, pan-tilt hardware and movement decisions.

**What I worked on:** I explored movement as a separate kind of action that needs checks before it is allowed.

**Problem I faced:** Movement is different from text output. A mistake can affect the physical environment, so the default behaviour has to be cautious.

**How I approached it:** I used simple decision ideas such as stop, wait, hold distance and move slowly. The public example code mirrors this style with fake target and obstacle states.

**What changed:** Hardware actions became part of a safety loop instead of a direct response to a command.

**What I learned:** Safe movement depends on refusing or delaying action when conditions are unclear.

## Stage: Learning support direction

**Area:** Study, explanation and personal assistance ideas.

**What I worked on:** I explored how the assistant could support learning by helping with explanation, organisation and review.

**Problem I faced:** Learning support must be useful without pretending to replace teachers, mentors or proper advice.

**How I approached it:** I treated learning support as a careful assistant feature: explain, organise, ask useful questions and help the user reflect.

**What changed:** The project gained a stronger purpose beyond hardware demonstration.

**What I learned:** Personal assistance features need thoughtful design because they affect how people learn, plan and make decisions.

## Stage: Testing and reporting

**Area:** Debugging, checks and development records.

**What I worked on:** I used tests, manual checks and written reports to keep track of problems and decisions as the project grew.

**Problem I faced:** When a project combines voice, UI, hardware and AI, failures can come from many places.

**How I approached it:** I separated problems, checked one area at a time and wrote down decisions so I could return to them later.

**What changed:** The project became easier to maintain because progress was written down instead of kept only in my head.

**What I learned:** Documentation is part of engineering. It helps explain the work and makes debugging less chaotic.

## Stage: Public portfolio

**Area:** GitHub, media, diagrams and examples.

**What I worked on:** I prepared the public repository with a clearer README, project photos, hardware thumbnails, demo video, diagrams, engineering notes and simplified example code.

**Problem I faced:** The repo needed to show real effort without becoming noisy or overclaiming.

**How I approached it:** I focused on clear explanations, diagrams, stage-based docs and small runnable examples with tests.

**What changed:** The public repo now tells a fuller engineering story for recruiters, university contacts and technical readers.

**What I learned:** A portfolio project is stronger when it explains the decisions behind the build, not only the final-looking media.
