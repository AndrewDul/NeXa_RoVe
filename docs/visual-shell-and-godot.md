# Visual Shell and Godot

The Visual Shell is the NeXa RoVe visual interface direction.

## Why a visual interface matters

Voice alone is not enough for a physical assistant. A user should be able to see what the assistant is doing, whether it is idle, listening, responding, blocked or waiting for something.

The visual interface helps make the system more understandable and less mysterious.

## What the Visual Shell is meant to show

The Visual Shell is meant to show:

- assistant presence
- current state
- response feedback
- hardware status
- sensor or system panels where safe
- learning or study support views
- clear unavailable states when something is not connected

The goal is not to make a decorative screen. The goal is to make the assistant easier to understand and safer to use.

## How Godot fits into the project

Godot is used as the visual interface layer. It is useful for building a responsive, animated interface that can run on a display connected to the hardware setup.

In the project direction, the UI presents state and accepts user interaction while the assistant runtime handles decisions and hardware actions.

## Panels and feedback

The interface can provide high-level panels for areas such as:

- assistant status
- settings-style controls
- sensors
- learning support
- system feedback
- camera or hardware availability

The screenshots show the current interface direction.

## Why UI feedback matters for trust

If the system is listening, the user should know. If it cannot access a device, it should say so. If a feature is still being tested, the UI should not pretend it is complete.

This kind of honest feedback is important for trust, especially when hardware and robotics are involved.

## Design direction

The Visual Shell should feel calm, readable and useful. It should make NeXa feel present without hiding important state behind decoration.
