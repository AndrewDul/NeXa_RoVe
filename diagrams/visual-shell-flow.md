# Visual Shell flow

The Visual Shell is the screen-side interface for NeXa RoVe.

```mermaid
flowchart TD
    runtime[Runtime state] --> update[UI update event]
    command[User command] --> update
    hardware[Hardware status] --> update
    response[Assistant response] --> update
    update --> shell[Godot Visual Shell]
    shell --> face[Assistant face / home view]
    shell --> menu[Menu]
    shell --> panels[Panels]
    panels --> chat[Chat / command panel]
    panels --> learn[Learning panel]
    panels --> sensors[Sensors panel]
    panels --> settings[Settings and status]
    shell --> feedback[Visible feedback]
```

## Explanation

The Visual Shell helps NeXa show state, feedback and panels on the screen. It gives the user something visible to rely on while voice, local processing and hardware work are happening.

## Design notes

- The interface should be calm and readable.
- The face/home view keeps the assistant present.
- Panels should explain state and make actions easier to follow.
- Visual feedback helps when voice processing takes time.

## Why this matters

A physical assistant needs to show what it is doing. Clear visual feedback reduces confusion and makes the system feel more trustworthy.
