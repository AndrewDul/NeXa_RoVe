# NeXa RoVe

A personal local-first AI and robotics project exploring voice interaction, Raspberry Pi hardware, sensors, UI feedback and safe robotics control.

![Python](https://img.shields.io/badge/Python-public%20examples-3776AB?style=flat-square&logo=python&logoColor=white)
![Raspberry Pi](https://img.shields.io/badge/Raspberry%20Pi-hardware-C51A4A?style=flat-square&logo=raspberrypi&logoColor=white)
![Local-first AI](https://img.shields.io/badge/Local--first%20AI-active%20exploration-555555?style=flat-square)
![Robotics](https://img.shields.io/badge/Robotics-safe%20experiments-555555?style=flat-square)

<p align="center">
  <img src="media/images/Presentation/nexa-rove-main-photo.jpg" alt="NeXa RoVe current setup" width="720">
</p>

<p align="center"><sub>Current public-safe view of the NeXa RoVe setup.</sub></p>

NeXa RoVe is my personal AI and robotics project. I am building it step by step to explore how a local-first assistant could work on real hardware, with voice interaction, a visual interface, sensors and careful physical control.

The project is not presented as a finished product. It is an active build where I am testing practical ideas around local AI, Raspberry Pi hardware, assistant feedback, robotics safety and reliability.

Local-first matters because it can give more control over privacy, cost and reliability. The aim is to understand what can sensibly run close to the user, without exposing private information unnecessarily.

## Project photos

### NeXa RoVe

<table>
  <tr>
    <td width="50%">
      <img src="media/images/Presentation/front.jpeg" alt="Front view of NeXa RoVe" width="320"><br>
      <sub>Front view of the current NeXa RoVe setup.</sub>
    </td>
    <td width="50%">
      <img src="media/images/Presentation/nexa-ui-preview.png" alt="NeXa RoVe visual interface" width="320"><br>
      <sub>Visual interface running on the front display.</sub>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <img src="media/images/Presentation/top.jpeg" alt="Top view of NeXa RoVe" width="320"><br>
      <sub>Build progress photo showing the project being tested and adjusted.</sub>
    </td>
    <td width="50%">
      <img src="media/images/Presentation/inside.jpeg" alt="Side view of NeXa RoVe hardware" width="320"><br>
      <sub>Side view of the current hardware layout.</sub>
    </td>
  </tr>
</table>

More images are available in [media/images/gallery.md](media/images/gallery.md).

## Hardware used

These are the public hardware parts shown in this repository. The notes are high-level and do not describe private wiring, configuration or runtime details.

<table>
  <tr>
    <td width="33%">
      <img src="media/images/Hardware/Raspberry_Pi_5.jpeg" alt="Raspberry Pi 5" width="180"><br>
      <b>Raspberry Pi 5</b><br>
      <sub>Main local computer used for development, testing and hardware integration.</sub>
    </td>
    <td width="33%">
      <img src="media/images/Hardware/AI_HAT_plus_2.jpeg" alt="Raspberry Pi AI HAT+" width="180"><br>
      <b>AI HAT+</b><br>
      <sub>Used while exploring local AI and vision-related hardware work.</sub>
    </td>
    <td width="33%">
      <img src="media/images/Hardware/8_HD_DSI.jpeg" alt="8 inch DSI display" width="180"><br>
      <b>8 inch DSI display</b><br>
      <sub>Used to show assistant feedback, status and interface screens.</sub>
    </td>
  </tr>
  <tr>
    <td width="33%">
      <img src="media/images/Hardware/ReSpeaker_XMOSXVF800.jpeg" alt="ReSpeaker microphone hardware" width="180"><br>
      <b>ReSpeaker microphone</b><br>
      <sub>Used for voice input experiments and local interaction work.</sub>
    </td>
    <td width="33%">
      <img src="media/images/Hardware/Camera_Module_3_Wide.jpeg" alt="Camera Module 3 Wide" width="180"><br>
      <b>Camera Module 3 Wide</b><br>
      <sub>Used for safe camera and vision experiments.</sub>
    </td>
    <td width="33%">
      <img src="media/images/Hardware/OAK_D_LITE.jpeg" alt="OAK-D Lite" width="180"><br>
      <b>OAK-D Lite</b><br>
      <sub>Used while exploring depth and vision hardware options.</sub>
    </td>
  </tr>
  <tr>
    <td width="33%">
      <img src="media/images/Hardware/pan_tilt.jpeg" alt="Pan-tilt hardware" width="180"><br>
      <b>Pan-tilt hardware</b><br>
      <sub>Used while exploring controlled movement and camera positioning.</sub>
    </td>
    <td width="33%">
      <img src="media/images/Hardware/6x4_Off_Road_UGV_ESP32_Driver.jpeg" alt="6x4 off-road UGV mobile base" width="180"><br>
      <b>6x4 mobile base</b><br>
      <sub>Used for robotics movement experiments with safety as the main constraint.</sub>
    </td>
    <td width="33%">
      <img src="media/images/Hardware/ToF_8x8.jpeg" alt="8x8 ToF sensor" width="180"><br>
      <b>8x8 ToF sensor</b><br>
      <sub>Used for sensing and distance experiments.</sub>
    </td>
  </tr>
  <tr>
    <td width="33%">
      <img src="media/images/Hardware/BME688_Quality.jpeg" alt="BME688 air quality sensor" width="180"><br>
      <b>BME688 sensor</b><br>
      <sub>Used for environment and status experiments.</sub>
    </td>
    <td width="33%">
      <img src="media/images/Hardware/orientation_DoF.jpeg" alt="Orientation sensor" width="180"><br>
      <b>Orientation sensor</b><br>
      <sub>Used while exploring orientation and movement awareness.</sub>
    </td>
    <td width="33%">
      <img src="media/images/Hardware/SupTronics_X1206_4Cell.jpeg" alt="Power hardware" width="180"><br>
      <b>Power and UPS hardware</b><br>
      <sub>Used to support the physical build and power-status work.</sub>
    </td>
  </tr>
  <tr>
    <td width="33%">
      <img src="media/images/Hardware/ssd.jpeg" alt="SSD storage" width="180"><br>
      <b>SSD storage</b><br>
      <sub>Used for local project storage and development work.</sub>
    </td>
    <td width="33%">
      <img src="media/images/Hardware/speaker.jpeg" alt="Speaker hardware" width="180"><br>
      <b>Speaker</b><br>
      <sub>Used for local audio output experiments.</sub>
    </td>
    <td width="33%">
      <img src="media/images/Hardware/USB_3_HUB.jpeg" alt="USB 3 hub" width="180"><br>
      <b>USB hub</b><br>
      <sub>Used to connect and test hardware during development.</sub>
    </td>
  </tr>
</table>

## Short demo video

[Watch the 26-second NeXa RoVe demo](media/videos/nexa-rove-26s-demo.mp4)

A short public-safe video showing the current NeXa RoVe setup.

## Current work

I am currently working on:

- local voice interaction
- visual feedback through the UI
- Raspberry Pi hardware integration
- sensors and robotics exploration
- safe physical interaction
- a local-first AI direction
- testing and reliability
- learning support and personal assistance ideas

More detail is available in [docs/current-work.md](docs/current-work.md) and [docs/current-stage.md](docs/current-stage.md).

## Safe example code

Safe simplified code examples are available in [examples/public_demo](examples/public_demo). They show public concepts only and do not include private NeXa runtime code.

The examples cover:

- voice activity concept
- speech pipeline concept
- mocked sensor snapshot
- fake detection concept
- follow-me safety decision concept
- time intent concept
- `unittest` tests

More detail is available in [docs/code-examples.md](docs/code-examples.md).

## What this repository contains

- project overview notes
- current development direction
- selected public photos and video
- hardware summaries
- safe demo plans
- simplified public example code
- public/private sharing boundaries

## Public boundaries

This public repository does not include private source code, prompts, memory files, logs, diagnostics, raw recordings, private configuration or the full internal runtime.

See [docs/public-boundaries.md](docs/public-boundaries.md) and [docs/what-can-be-shown-publicly.md](docs/what-can-be-shown-publicly.md) for the public sharing rules I am using.
