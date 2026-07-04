const face = document.getElementById("nexaFace");
const orbitalMenu = document.getElementById("orbitalMenu");
const toast = document.getElementById("toast");
const smilePath = face.querySelector(".smile path");
const panels = {
  left: document.getElementById("panel-left"),
  right: document.getElementById("panel-right"),
  top: document.getElementById("panel-top"),
  bottom: document.getElementById("panel-bottom"),
};

const SCROLL_THRESHOLD = 80;
const FACE_EXPRESSIONS = {
  neutral: "M34 24 C48 50, 102 50, 116 24",
  smile: "M30 22 C48 56, 102 56, 120 22",
  focused: "M38 34 C54 42, 96 42, 112 34",
  happy: "M27 20 C46 61, 104 61, 123 20",
  surprised: "M62 34 C62 24, 88 24, 88 34 C88 48, 62 48, 62 34",
  laugh: "M24 18 C44 66, 106 66, 126 18",
  squint: "M36 28 C52 45, 98 45, 114 28",
  "look-left": "M34 24 C48 50, 102 50, 116 24",
  "look-right": "M34 24 C48 50, 102 50, 116 24",
  sleepy: "M38 34 C54 42, 96 42, 112 34",
};
const FACE_EXPRESSION_CLASSES = Object.keys(FACE_EXPRESSIONS).map((name) => `expression-${name}`);
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let activePanel = null;
let isScrolledTour = false;
let lightboxIndex = 0;
let calendarDate = new Date();
let gameBoard = Array(9).fill("");
let gameOver = false;
let faceReactionTimer = 0;
let faceGlowTimer = 0;
let blinkTimer = 0;
let randomFaceTimer = 0;
let hoverReactionTimer = 0;

const galleryItems = [
  ["media/images/Presentation/nexa-rove-main-photo.jpg", "Current NeXa RoVe setup."],
  ["media/images/Presentation/front.jpeg", "Front view of the current build."],
  ["media/images/Presentation/front_menu.jpeg", "Front display with menu controls."],
  ["media/images/Presentation/top.jpeg", "Top view showing mounting work."],
  ["media/images/Presentation/inside.jpeg", "Inside view of the hardware layout."],
  ["media/images/Presentation/rear.jpeg", "Rear view of the current setup."],
  ["media/images/Presentation/nexa-ui-preview.png", "Visual Shell running on the front display."],
  ["media/images/Hardware/Raspberry_Pi_5.jpeg", "Raspberry Pi 5."],
  ["media/images/Hardware/AI_HAT_plus_2.jpeg", "AI HAT+."],
  ["media/images/Hardware/8_HD_DSI.jpeg", "8 inch DSI display."],
  ["media/images/Hardware/ReSpeaker_XMOSXVF800.jpeg", "ReSpeaker microphone."],
  ["media/images/Hardware/Camera_Module_3_Wide.jpeg", "Camera Module 3 Wide."],
  ["media/images/Hardware/OAK_D_LITE.jpeg", "OAK-D Lite."],
  ["media/images/Hardware/6x4_Off_Road_UGV_ESP32_Driver.jpeg", "6x4 mobile base."],
  ["media/images/Hardware/pan_tilt.jpeg", "Pan-tilt hardware."],
  ["media/images/Hardware/BME688_Quality.jpeg", "BME688 sensor."],
  ["media/images/Hardware/ToF_8x8.jpeg", "ToF distance sensor."],
  ["media/images/Hardware/orientation_DoF.jpeg", "Orientation sensor."],
  ["media/images/Hardware/SupTronics_X1206_4Cell.jpeg", "Power and UPS hardware."],
  ["media/images/Hardware/ssd.jpeg", "SSD storage."],
  ["media/images/Hardware/USB_3_HUB.jpeg", "USB hub."],
  ["media/images/Hardware/speaker.jpeg", "Speaker."],
  ["media/images/Hardware/PCAS_9548.jpeg", "I2C expansion board."],
  ["media/images/Hardware/TallentCell.jpeg", "Battery hardware."],
];

const hardwareItems = [
  ["media/images/Hardware/Raspberry_Pi_5.jpeg", "Raspberry Pi 5", "Main local computer used for development, integration and running the project on real hardware."],
  ["media/images/Hardware/AI_HAT_plus_2.jpeg", "AI HAT+", "Used while exploring local AI and vision acceleration ideas."],
  ["media/images/Hardware/8_HD_DSI.jpeg", "8 inch DSI display", "Shows assistant feedback, status panels and interface screens."],
  ["media/images/Hardware/ReSpeaker_XMOSXVF800.jpeg", "ReSpeaker microphone", "Used for voice input experiments and local interaction work."],
  ["media/images/Hardware/Camera_Module_3_Wide.jpeg", "Camera Module 3 Wide", "Used for camera feedback and vision experiments."],
  ["media/images/Hardware/OAK_D_LITE.jpeg", "OAK-D Lite", "Used while exploring depth and vision hardware options."],
  ["media/images/Hardware/6x4_Off_Road_UGV_ESP32_Driver.jpeg", "6x4 mobile base", "Physical base for movement experiments and safety thinking."],
  ["media/images/Hardware/pan_tilt.jpeg", "Pan-tilt hardware", "Used for camera positioning and movement experiments."],
  ["media/images/Hardware/BME688_Quality.jpeg", "BME688 sensor", "Used for environment and status sensing experiments."],
  ["media/images/Hardware/ToF_8x8.jpeg", "ToF sensor", "Used for distance and nearby-object sensing experiments."],
  ["media/images/Hardware/orientation_DoF.jpeg", "Orientation sensor", "Used while exploring motion and orientation awareness."],
  ["media/images/Hardware/SupTronics_X1206_4Cell.jpeg", "Power / UPS hardware", "Supports power work for the physical build."],
  ["media/images/Hardware/ssd.jpeg", "SSD", "Local storage used during development and testing."],
  ["media/images/Hardware/USB_3_HUB.jpeg", "USB hub", "Helps connect and test multiple devices during development."],
  ["media/images/Hardware/speaker.jpeg", "Speaker", "Used for local audio output experiments."],
  ["media/images/Hardware/PCAS_9548.jpeg", "I2C expansion board", "Used while exploring connected sensor layouts."],
  ["media/images/Hardware/TallentCell.jpeg", "Battery hardware", "Used while testing portable power options."],
];

const systemItems = [
  ["Voice/Text Input", "Spoken or typed input starts the same broad flow once text is prepared.", "diagrams/runtime-pipeline.md"],
  ["Command Understanding", "The request is classified before the assistant chooses a route.", "diagrams/command-understanding.md"],
  ["Assistant Decision", "Some tasks are deterministic, some need a local response, and some need a follow-up.", "docs/system-design-overview.md"],
  ["Visual Feedback", "The Visual Shell can show listening, thinking, responding and blocked states.", "diagrams/visual-shell-flow.md"],
  ["Vision Flow", "Camera and detection ideas are treated as evidence that needs confidence checks.", "diagrams/vision-flow.md"],
  ["Local Model Flow", "A request can be routed by task type and confidence.", "diagrams/local-ai-model-flow.md"],
  ["Hardware Safety", "Movement-style actions need conservative checks before anything physical happens.", "diagrams/hardware-safety-loop.md"],
  ["Testing Loop", "Reports, demos and tests help keep each iteration understandable.", "docs/testing-and-debugging-journey.md"],
];

const codeItems = [
  ["system_flow_example.py", "Shared command classification and movement decision idea.", "python3 examples/public_demo/system_flow_example.py"],
  ["command_understanding_example.py", "Classifies status, hardware, learning, camera and movement commands.", "python3 examples/public_demo/command_understanding_example.py"],
  ["runtime_pipeline_example.py", "Runs voice and text through the same simplified response flow.", "python3 examples/public_demo/runtime_pipeline_example.py"],
  ["hardware_safety_gate_example.py", "Shows ALLOW, WAIT, STOP and BLOCKED decisions from fake state.", "python3 examples/public_demo/hardware_safety_gate_example.py"],
  ["vision_confidence_example.py", "Uses fake detections to show confidence, distance and freshness checks.", "python3 examples/public_demo/vision_confidence_example.py"],
  ["ui_state_example.py", "Maps assistant events to visible interface states.", "python3 examples/public_demo/ui_state_example.py"],
  ["local_model_route_example.py", "Shows a simple route choice between commands, local responses and helpers.", "python3 examples/public_demo/local_model_route_example.py"],
  ["learning_flow_example.py", "Maps learning phrases to lesson, quiz, plan and explanation modes.", "python3 examples/public_demo/learning_flow_example.py"],
];

const timelineItems = [
  ["Idea", "Start with a local assistant direction and a clear focus on learning by building.", "docs/engineering-story.md"],
  ["Physical build", "Move from software-only thinking into Raspberry Pi hardware, display, power and mounting work.", "docs/build-map.md"],
  ["Voice interaction", "Explore wake, listening, speech handling, fallback behavior and command recovery.", "docs/runtime-pipeline-overview.md"],
  ["Visual Shell", "Use a screen to show what the assistant is doing instead of leaving the user guessing.", "docs/visual-shell-and-godot.md"],
  ["Sensors and cameras", "Work through camera, depth, environment and distance sensing ideas.", "docs/hardware-and-sensing-journey.md"],
  ["Safety thinking", "Treat physical action as something that needs checks, confidence and conservative defaults.", "docs/challenges-and-solutions.md"],
  ["Local AI direction", "Explore where deterministic code, helper flows and local model routes fit.", "docs/local-ai-and-models.md"],
  ["Public examples", "Create small Python examples so the main design ideas can be explored without hardware.", "docs/code-examples.md"],
  ["Visual project tour", "Add a static interactive tour for recruiters, engineers and project reviewers.", "docs/recruiter-technical-brief.md"],
];

const docsItems = [
  ["README", "Main guided repository tour.", "README.md"],
  ["Project overview", "Readable project summary.", "docs/project-overview.md"],
  ["System design", "Assistant architecture and runtime direction.", "docs/system-design-overview.md"],
  ["Engineering story", "Build journey and learning process.", "docs/engineering-story.md"],
  ["Build map", "Project stages and roadmap shape.", "docs/build-map.md"],
  ["Challenges", "Problems and solutions worked through.", "docs/challenges-and-solutions.md"],
  ["Code examples", "Guide to public runnable examples.", "docs/code-examples.md"],
  ["Technical brief", "Recruiter-facing technical summary.", "docs/recruiter-technical-brief.md"],
  ["Hardware overview", "Hardware used in the build.", "hardware/hardware-overview.md"],
  ["Diagrams", "System diagrams and flows.", "diagrams/README.md"],
  ["Full gallery", "Image gallery markdown page.", "media/images/gallery.md"],
];

const mapItems = [
  ["Start", "Return to the intro", "#home"],
  ["Gallery", "Open image section", "#gallery"],
  ["System Tour", "Runtime and command flow", "#system"],
  ["Hardware", "Physical components", "#hardware"],
  ["Code Lab", "Runnable examples", "#code"],
  ["Build Story", "Timeline and progress", "#story"],
  ["Docs", "Project documents", "#docs"],
  ["Diagrams", "Open diagrams index", "diagrams/README.md"],
  ["Demo Video", "Watch the short demo", "#video"],
  ["GitHub Repo", "Open remote repository", "https://github.com/AndrewDul/NeXa_RoVe"],
  ["README", "Open repository README", "README.md"],
  ["Public boundaries", "Read the boundary section", "#boundaries"],
];

const quickActions = [
  ["Open README", "README.md"],
  ["Open GitHub repo", "https://github.com/AndrewDul/NeXa_RoVe"],
  ["Open examples", "examples/public_demo/"],
  ["Open diagrams", "diagrams/README.md"],
  ["Open gallery", "#gallery"],
  ["Watch video", "#video"],
];

function init() {
  setTimeout(() => document.body.classList.add("intro-done"), 1400);
  positionOrbitalMenu();
  buildSystemCards();
  buildHardwareCards();
  buildGallery();
  buildCodeCards();
  buildTimeline();
  buildDocs();
  buildMap();
  buildQuickActions();
  bindControls();
  updateClock();
  setInterval(updateClock, 1000);
  renderCalendar();
  initGame();
  initReveal();
  setFaceExpression("neutral");
  scheduleBlink();
  scheduleRandomFaceBehavior();
  bindInteractiveReactions();
  updateScrollState();
  window.addEventListener("scroll", updateScrollState, { passive: true });
  window.addEventListener("resize", positionOrbitalMenu);
}

function buildSystemCards() {
  const root = document.getElementById("systemCards");
  root.innerHTML = systemItems.map(([title, text, href]) => `
    <article class="flow-card">
      <b>${title}</b>
      <span>${text}</span>
      <a href="${href}">Open related note</a>
    </article>
  `).join("");
}

function buildHardwareCards() {
  const root = document.getElementById("hardwareGrid");
  root.innerHTML = hardwareItems.map(([src, title, text], index) => `
    <article class="hardware-card">
      <button type="button" data-gallery-src="${src}" aria-label="Open ${title} image">
        <img src="${src}" alt="${title}" loading="lazy">
      </button>
      <p><b>${title}</b><br>${text}</p>
    </article>
  `).join("");
  root.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => openImageBySrc(button.dataset.gallerySrc));
  });
}

function buildGallery() {
  const root = document.getElementById("galleryGrid");
  root.innerHTML = galleryItems.map(([src, caption], index) => `
    <article class="gallery-card">
      <button type="button" data-gallery-index="${index}" aria-label="Open ${caption}">
        <img src="${src}" alt="${caption}" loading="lazy">
      </button>
      <p>${caption}</p>
    </article>
  `).join("");
  document.querySelectorAll("[data-gallery-index]").forEach((button) => {
    button.addEventListener("click", () => openLightbox(Number(button.dataset.galleryIndex)));
  });
}

function buildCodeCards(targetId = "codeGrid") {
  const html = codeItems.map(([file, description, command]) => {
    const href = `examples/public_demo/${file}`;
    return `
      <article class="code-card">
        <b>${file}</b>
        <span>${description}</span>
        <code>${command}</code>
        <div class="code-actions">
          <a class="glass-button" href="${href}">Open file</a>
          <button class="copy-btn" type="button" data-copy="${command}">Copy command</button>
        </div>
      </article>
    `;
  }).join("");
  document.getElementById("codeGrid").innerHTML = html;
  document.getElementById("panelCodeGrid").innerHTML = html;
  document.querySelectorAll("[data-copy]").forEach((button) => {
    button.addEventListener("click", () => copyText(button.dataset.copy));
  });
}

function buildTimeline() {
  const root = document.getElementById("timeline");
  root.innerHTML = timelineItems.map(([title, text, href]) => `
    <article class="timeline-item reveal">
      <b>${title}</b>
      <p>${text}</p>
      <a href="${href}">Open note</a>
    </article>
  `).join("");
}

function buildDocs() {
  const root = document.getElementById("docsGrid");
  root.innerHTML = docsItems.map(([title, text, href]) => `
    <article class="doc-card">
      <b>${title}</b>
      <span>${text}</span>
      <a href="${href}">Open</a>
    </article>
  `).join("");
}

function buildMap() {
  const root = document.getElementById("projectMap");
  root.innerHTML = mapItems.map(([title, text, href]) => `
    <a href="${href}" data-map-link>
      <b>${title}</b>
      <small>${text}</small>
    </a>
  `).join("");
  root.querySelectorAll("[data-map-link]").forEach((link) => {
    link.addEventListener("click", () => {
      if (link.getAttribute("href").startsWith("#")) closePanel();
    });
  });
}

function buildQuickActions() {
  const root = document.getElementById("quickActions");
  root.innerHTML = quickActions.map(([label, href]) => `<a href="${href}">${label}</a>`).join("");
}

function bindControls() {
  face.addEventListener("click", () => {
    if (isScrolledTour) {
      triggerFaceReaction("return-home");
      scrollToHome();
      return;
    }
    triggerFaceReaction("pressed");
    if (activePanel) {
      closePanel();
      return;
    }
    toggleMenu();
  });

  document.querySelectorAll("[data-panel]").forEach((button) => {
    button.addEventListener("click", () => openPanel(button.dataset.panel));
  });

  document.querySelectorAll(".panel-close").forEach((button) => {
    button.addEventListener("click", closePanel);
  });

  orbitalMenu.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => handleOrbitalAction(button.dataset.action));
  });

  document.getElementById("prevMonth").addEventListener("click", () => changeMonth(-1));
  document.getElementById("nextMonth").addEventListener("click", () => changeMonth(1));

  document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => switchTab(tab.dataset.tab));
  });

  document.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
  document.querySelector(".lightbox-prev").addEventListener("click", previousImage);
  document.querySelector(".lightbox-next").addEventListener("click", nextImage);

  document.addEventListener("keydown", handleKeys);
}

function toggleMenu() {
  if (isScrolledTour) {
    scrollToHome();
    return;
  }
  document.body.classList.toggle("menu-open");
  setFaceExpression(document.body.classList.contains("menu-open") ? "smile" : "neutral");
  positionOrbitalMenu();
}

function closeMenu() {
  document.body.classList.remove("menu-open");
  setFaceExpression(isScrolledTour ? "focused" : "neutral");
}

function updateScrollState() {
  const shouldEnter = window.scrollY > SCROLL_THRESHOLD;
  if (shouldEnter && !isScrolledTour) enterScrolledTour();
  if (!shouldEnter && isScrolledTour) exitScrolledTour();
}

function enterScrolledTour() {
  isScrolledTour = true;
  document.body.classList.add("scrolled-tour");
  face.setAttribute("aria-label", "Return home");
  face.title = "Return home";
  closeMenu();
  closePanel();
  setFaceExpression("focused");
}

function exitScrolledTour() {
  isScrolledTour = false;
  document.body.classList.remove("scrolled-tour");
  face.setAttribute("aria-label", "Open NeXa tour menu");
  face.removeAttribute("title");
  setFaceExpression("neutral");
  positionOrbitalMenu();
}

function scrollToHome() {
  closeMenu();
  closePanel();
  document.getElementById("home").scrollIntoView({ behavior: "smooth", block: "start" });
}

function setFaceExpression(expression) {
  const nextExpression = FACE_EXPRESSIONS[expression] ? expression : "neutral";
  document.body.classList.remove(...FACE_EXPRESSION_CLASSES);
  document.body.classList.add(`expression-${nextExpression}`);
  smilePath.setAttribute("d", FACE_EXPRESSIONS[nextExpression]);
}

function currentBaseExpression() {
  if (isScrolledTour) return "focused";
  if (activePanel) return "focused";
  if (document.body.classList.contains("menu-open")) return "smile";
  return "neutral";
}

function returnFaceToBaseExpression() {
  setFaceExpression(currentBaseExpression());
}

function triggerFaceReaction(type = "smile") {
  window.clearTimeout(faceReactionTimer);
  window.clearTimeout(faceGlowTimer);
  setFaceExpression(reactionExpression(type));
  document.body.classList.remove("face-react", "face-glow", "face-blink");
  if (!prefersReducedMotion) {
    void face.offsetWidth;
    if (["pressed", "happy", "laugh", "return-home"].includes(type)) document.body.classList.add("face-react");
    document.body.classList.add("face-glow");
    if (type === "blink") blinkFace();
  }
  faceReactionTimer = window.setTimeout(() => {
    document.body.classList.remove("face-react");
    returnFaceToBaseExpression();
  }, prefersReducedMotion ? 180 : reactionDuration(type));
  faceGlowTimer = window.setTimeout(() => {
    document.body.classList.remove("face-glow");
  }, prefersReducedMotion ? 220 : 760);
}

function reactionExpression(type) {
  const reactions = {
    pressed: "happy",
    happy: "happy",
    smile: "smile",
    focused: "focused",
    surprised: "surprised",
    laugh: "laugh",
    squint: "squint",
    sleepy: "sleepy",
    "look-left": "look-left",
    "look-right": "look-right",
    "return-home": "smile",
    blink: currentBaseExpression(),
  };
  return reactions[type] || "smile";
}

function reactionDuration(type) {
  if (type === "surprised") return 780;
  if (type === "laugh") return 820;
  if (type === "look-left" || type === "look-right") return 620;
  return 560;
}

function blinkFace() {
  if (prefersReducedMotion || document.body.classList.contains("face-react")) return;
  document.body.classList.add("face-blink");
  window.setTimeout(() => document.body.classList.remove("face-blink"), 145);
}

function scheduleBlink() {
  window.clearTimeout(blinkTimer);
  if (prefersReducedMotion) return;
  const delay = 8800 + Math.random() * 2600;
  blinkTimer = window.setTimeout(() => {
    blinkFace();
    scheduleBlink();
  }, delay);
}

function triggerRandomIdleFace() {
  if (prefersReducedMotion || document.body.classList.contains("face-react")) return;
  const options = ["blink", "look-left", "look-right", "smile", "squint", "sleepy", "laugh"];
  const choice = options[Math.floor(Math.random() * options.length)];
  if (choice === "blink") {
    blinkFace();
    return;
  }
  if (choice === "look-left" || choice === "look-right") {
    lookAround(choice);
    return;
  }
  triggerFaceReaction(choice);
}

function scheduleRandomFaceBehavior() {
  window.clearTimeout(randomFaceTimer);
  if (prefersReducedMotion) return;
  const delay = 12000 + Math.random() * 10000;
  randomFaceTimer = window.setTimeout(() => {
    triggerRandomIdleFace();
    scheduleRandomFaceBehavior();
  }, delay);
}

function lookAround(direction = "look-left") {
  triggerFaceReaction(direction === "look-right" ? "look-right" : "look-left");
}

function bindInteractiveReactions() {
  const selector = [
    "a",
    "button",
    ".flow-card",
    ".hardware-card",
    ".gallery-card",
    ".code-card",
    ".doc-card",
    ".timeline-item",
    ".glass-card",
  ].join(",");

  document.addEventListener("click", (event) => {
    const target = event.target.closest(selector);
    if (!target || face.contains(target)) return;
    triggerFaceReaction(reactionForTarget(target));
  });

  document.addEventListener("pointerenter", (event) => {
    const target = event.target.closest(".hardware-card");
    if (!target) return;
    window.clearTimeout(hoverReactionTimer);
    hoverReactionTimer = window.setTimeout(() => {
      triggerFaceReaction(Math.random() > 0.5 ? "look-left" : "look-right");
    }, 80);
  }, true);
}

function reactionForTarget(target) {
  if (target.matches("[data-panel], .edge-control")) return "focused";
  if (target.matches("[data-gallery-index], [data-gallery-src], .image-button") || target.closest(".gallery-card")) return "surprised";
  if (target.matches("[data-copy]") || target.closest(".code-card")) return "happy";
  if (target.matches("[data-action='play'], #resetGame") || target.closest("#tab-play, .game-board")) return "laugh";
  if (target.matches("video") || target.closest(".video-shell")) return "focused";
  if (target.closest(".hardware-card")) return Math.random() > 0.5 ? "look-left" : "look-right";
  if (target.closest(".flow-card, .doc-card, .timeline-item") || target.matches(".flow-card a, .doc-card a, .timeline-item a")) return "focused";
  if (target.closest(".orbital-tile")) {
    const action = target.closest(".orbital-tile").dataset.action;
    return action === "play" ? "laugh" : "smile";
  }
  return "smile";
}

function positionOrbitalMenu() {
  const tiles = Array.from(orbitalMenu.querySelectorAll(".orbital-tile"));
  if (window.matchMedia("(max-width: 680px)").matches) {
    orbitalMenu.style.removeProperty("left");
    orbitalMenu.style.removeProperty("top");
    tiles.forEach((tile) => {
      tile.style.removeProperty("--orbit-x");
      tile.style.removeProperty("--orbit-y");
    });
    return;
  }

  const faceRect = face.getBoundingClientRect();
  const centerX = faceRect.left + faceRect.width / 2;
  const centerY = faceRect.top + faceRect.height / 2;
  orbitalMenu.style.left = `${centerX}px`;
  orbitalMenu.style.top = `${centerY}px`;

  const smallestSide = Math.min(window.innerWidth, window.innerHeight);
  const radius = Math.max(205, Math.min(360, smallestSide * 0.34));
  const startAngle = -90;
  const step = 360 / tiles.length;

  tiles.forEach((tile, index) => {
    const angle = (startAngle + step * index) * Math.PI / 180;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    tile.style.setProperty("--orbit-x", `${x}px`);
    tile.style.setProperty("--orbit-y", `${y}px`);
  });
}

function openPanel(name) {
  closeMenu();
  if (activePanel && activePanel !== name) {
    panels[activePanel].classList.remove("open");
    panels[activePanel].setAttribute("aria-hidden", "true");
    document.body.classList.remove(`panel-${activePanel}-open`);
  }
  activePanel = name;
  panels[name].classList.add("open");
  panels[name].setAttribute("aria-hidden", "false");
  document.body.classList.add(`panel-${name}-open`);
  setFaceExpression("focused");
}

function closePanel() {
  if (!activePanel) return;
  panels[activePanel].classList.remove("open");
  panels[activePanel].setAttribute("aria-hidden", "true");
  document.body.classList.remove(`panel-${activePanel}-open`);
  activePanel = null;
  setFaceExpression(isScrolledTour ? "focused" : "neutral");
}

function handleOrbitalAction(action) {
  const routes = {
    gallery: "#gallery",
    system: "#system",
    hardware: "#hardware",
    code: "#code",
    story: "#story",
    docs: "#docs",
    video: "#video",
  };
  if (action === "play") {
    openPanel("bottom");
    switchTab("play");
    return;
  }
  closeMenu();
  document.querySelector(routes[action])?.scrollIntoView({ behavior: "smooth" });
}

function updateClock() {
  const now = new Date();
  document.getElementById("clock").textContent = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  document.getElementById("dateLine").textContent = now.toLocaleDateString([], {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function renderCalendar() {
  const label = document.getElementById("monthLabel");
  const daysRoot = document.getElementById("calendarDays");
  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth();
  const today = new Date();
  const first = new Date(year, month, 1);
  const startOffset = (first.getDay() + 6) % 7;
  const total = new Date(year, month + 1, 0).getDate();

  label.textContent = calendarDate.toLocaleDateString([], { month: "long", year: "numeric" });
  let html = "";
  for (let i = 0; i < startOffset; i += 1) html += "<span></span>";
  for (let day = 1; day <= total; day += 1) {
    const isToday = today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;
    html += `<span class="${isToday ? "today" : ""}">${day}</span>`;
  }
  daysRoot.innerHTML = html;
  daysRoot.animate([{ opacity: 0.45, transform: "translateY(6px)" }, { opacity: 1, transform: "translateY(0)" }], {
    duration: 220,
    easing: "ease-out",
  });
}

function changeMonth(direction) {
  calendarDate = new Date(calendarDate.getFullYear(), calendarDate.getMonth() + direction, 1);
  renderCalendar();
}

function openImageBySrc(src) {
  const index = galleryItems.findIndex(([itemSrc]) => itemSrc === src);
  openLightbox(index >= 0 ? index : 0);
}

function openLightbox(index) {
  lightboxIndex = index;
  updateLightbox();
  const lightbox = document.getElementById("lightbox");
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
}

function updateLightbox() {
  const [src, caption] = galleryItems[lightboxIndex];
  const image = document.getElementById("lightboxImage");
  image.src = src;
  image.alt = caption;
  document.getElementById("lightboxCaption").textContent = caption;
}

function previousImage() {
  lightboxIndex = (lightboxIndex - 1 + galleryItems.length) % galleryItems.length;
  updateLightbox();
}

function nextImage() {
  lightboxIndex = (lightboxIndex + 1) % galleryItems.length;
  updateLightbox();
}

function handleKeys(event) {
  const lightboxOpen = document.getElementById("lightbox").classList.contains("open");
  if (event.key === "Escape") {
    if (lightboxOpen) closeLightbox();
    else if (activePanel) closePanel();
    else closeMenu();
  }
  if (!lightboxOpen) return;
  if (event.key === "ArrowLeft") previousImage();
  if (event.key === "ArrowRight") nextImage();
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast("Command copied");
  } catch {
    showToast("Copy failed");
  }
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1600);
}

function switchTab(name) {
  document.querySelectorAll(".tab").forEach((tab) => {
    const active = tab.dataset.tab === name;
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-selected", String(active));
  });
  document.querySelectorAll(".tab-panel").forEach((panel) => {
    panel.classList.toggle("active", panel.id === `tab-${name}`);
  });
}

function initGame() {
  const board = document.getElementById("gameBoard");
  board.innerHTML = Array.from({ length: 9 }, (_, index) => (
    `<button type="button" aria-label="Cell ${index + 1}" data-cell="${index}"></button>`
  )).join("");
  board.querySelectorAll("[data-cell]").forEach((cell) => {
    cell.addEventListener("click", () => playMove(Number(cell.dataset.cell)));
  });
  document.getElementById("resetGame").addEventListener("click", resetGame);
  renderGame();
}

function playMove(index) {
  if (gameOver || gameBoard[index]) return;
  gameBoard[index] = "X";
  const result = checkWinner();
  if (result) {
    finishGame(result);
    return;
  }
  opponentMove();
  const nextResult = checkWinner();
  if (nextResult) finishGame(nextResult);
  else renderGame("Your turn: X");
}

function opponentMove() {
  const win = findBestCell("O");
  const block = findBestCell("X");
  const center = gameBoard[4] ? -1 : 4;
  const empty = gameBoard.map((value, index) => value ? -1 : index).filter((index) => index >= 0);
  const choice = [win, block, center, empty[0]].find((index) => index !== undefined && index >= 0);
  if (choice !== undefined) gameBoard[choice] = "O";
}

function findBestCell(mark) {
  const lines = winningLines();
  for (const line of lines) {
    const values = line.map((index) => gameBoard[index]);
    if (values.filter((value) => value === mark).length === 2 && values.includes("")) {
      return line[values.indexOf("")];
    }
  }
  return -1;
}

function winningLines() {
  return [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
}

function checkWinner() {
  for (const line of winningLines()) {
    const [a, b, c] = line;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) return `${gameBoard[a]} wins`;
  }
  if (gameBoard.every(Boolean)) return "Draw";
  return "";
}

function finishGame(result) {
  gameOver = true;
  renderGame(result);
}

function renderGame(status = "Your turn: X") {
  document.getElementById("gameStatus").textContent = status;
  document.querySelectorAll("[data-cell]").forEach((cell) => {
    cell.textContent = gameBoard[Number(cell.dataset.cell)];
  });
}

function resetGame() {
  gameBoard = Array(9).fill("");
  gameOver = false;
  renderGame();
}

function initReveal() {
  const revealItems = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.14 });
  revealItems.forEach((item) => observer.observe(item));
}

init();
