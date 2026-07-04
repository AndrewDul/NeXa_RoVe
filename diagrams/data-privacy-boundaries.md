# Data and repository boundaries

This is the dedicated boundary diagram for the public repository.

```mermaid
flowchart TD
    public[Public NeXa RoVe repository] --> docs[Project docs and diagrams]
    public --> media[Selected images and video]
    public --> examples[Simplified examples]
    public --> reports[Public engineering notes]
    private[Main working repository] --> runtime[Working runtime]
    private --> source[Source code]
    private --> prompts[Prompts and internal rules]
    private --> data[Runtime data]
    private --> configs[Configuration]
    private --> logs[Development logs]
    docs --> reader[Recruiters and technical readers]
    media --> reader
    examples --> reader
    reports --> reader
```

## Explanation

The public repository is a portfolio and project explanation. The main working repository is where the full development system lives.

## Design notes

- The public repo shows the project, diagrams, selected media and simplified examples.
- The working repo keeps full source code, detailed runtime behaviour and live development data.
- This split lets the project be understandable without publishing everything.

## Why this matters

NeXa RoVe involves voice, hardware, robotics and personal-assistant ideas. A controlled public repository is the right way to share the work while keeping the working system separate.
