# Testing and debugging journey

Testing and debugging are a large part of NeXa RoVe because the project combines software, AI, UI and hardware.

This page explains the testing and debugging mindset behind NeXa RoVe.

## Why testing is difficult

Real hardware creates more failure cases than normal software:

- a device can be unplugged
- a sensor can return stale data
- a camera can fail to provide a frame
- voice input can be noisy
- a UI panel can show old state
- a movement command can be unsafe if assumptions are wrong

Testing has to account for these problems.

## What gets tested at a high level

The private project work includes deeper development testing, but this public repo only describes the broad areas:

- assistant behaviour
- voice flow
- UI feedback
- hardware state
- sensor availability
- camera availability
- robotics safety assumptions
- runtime reliability
- public examples

## Public example tests

The public examples use Python standard library `unittest`.

They test simple concepts such as:

- fake voice activity detection
- safe command handling
- mocked sensor snapshots
- fake detection selection
- follow-me safety decisions
- local time intent handling

These tests are intentionally simple. They show the testing mindset without exposing private code.

## Debugging approach

The debugging approach is to break the system into understandable parts:

1. Check whether the input is valid.
2. Check whether the system understood the request.
3. Check whether the UI state is honest.
4. Check whether hardware is available.
5. Check whether safety assumptions are true.
6. Check whether the response is useful.

This is especially important when working with voice and hardware, where problems can appear as silence, delay, stale state or blocked movement.

## Why this matters

Testing is what turns the project from a set of interesting parts into a system that can be improved without constantly breaking old behaviour.
