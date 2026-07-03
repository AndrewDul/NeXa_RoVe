# Hardware overview

NeXa RoVe is being developed around Raspberry Pi hardware and connected components. The hardware work is used to explore how a local-first assistant can connect to voice, display, sensing and movement in a controlled way.

These notes explain the main hardware groups and how they fit into the project.

## Compute

The Raspberry Pi is the main local computer for development, testing and hardware integration. It is used to explore what can run close to the user rather than depending on cloud services for every interaction.

Additional local hardware is being explored for AI and vision-related work, but the public repository only describes this at a broad level.

## Voice input

Microphone hardware is used for voice interaction experiments.

## Display and UI

The display is used to show assistant feedback, status and interface screens. This helps make the assistant easier to understand because the user can see what state the system is in.

## Camera and vision experiments

Camera hardware is used for safe sensing and vision experiments. Public notes do not include private camera code, raw camera captures, face recognition logic or private datasets.

## Sensors

Sensor hardware is being used for environment, distance, orientation and status experiments. These are useful for understanding how an assistant could respond to its surroundings in a careful way.

## Movement and robotics

The mobile base and pan-tilt hardware are used while exploring controlled movement. Safety is the main constraint, so public material stays at the concept and progress level rather than exposing private control logic.

## Power and storage

Power, UPS and storage hardware support the physical build and local development work. Public notes only describe these parts broadly and do not include private configuration or sensitive device details.
