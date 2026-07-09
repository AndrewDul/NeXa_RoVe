import{j as r}from"./jsx-runtime.D_zvdyIk.js";import{r as d}from"./index.DBy5LfQW.js";const T="modulepreload",R=function(t){return"/NeXa_RoVe/"+t},N={},S=function(e,n,c){let a=Promise.resolve();if(n&&n.length>0){let p=function(h){return Promise.all(h.map(m=>Promise.resolve(m).then(x=>({status:"fulfilled",value:x}),x=>({status:"rejected",reason:x}))))};document.getElementsByTagName("link");const u=document.querySelector("meta[property=csp-nonce]"),g=u?.nonce||u?.getAttribute("nonce");a=p(n.map(h=>{if(h=R(h),h in N)return;N[h]=!0;const m=h.endsWith(".css"),x=m?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${h}"]${x}`))return;const f=document.createElement("link");if(f.rel=m?"stylesheet":T,m||(f.as="script"),f.crossOrigin="",f.href=h,g&&f.setAttribute("nonce",g),document.head.appendChild(f),m)return new Promise((k,M)=>{f.addEventListener("load",k),f.addEventListener("error",()=>M(new Error(`Unable to preload CSS for ${h}`)))})}))}function i(p){const u=new Event("vite:preloadError",{cancelable:!0});if(u.payload=p,window.dispatchEvent(u),!u.defaultPrevented)throw p}return a.then(p=>{for(const u of p||[])u.status==="rejected"&&i(u.reason);return e().catch(i)})};let O;function L(){return O??=S(()=>import("./index.Bvu9zNsI.js"),[]).then(t=>t.gsap),O}function E(t,e){if(e)return;const n=t.querySelector(".face-inner"),c=t.querySelector(".face-core");L().then(a=>{a.timeline().fromTo(n,{scaleY:.9,y:9,transformOrigin:"180px 180px"},{scaleY:1,y:0,duration:.58,ease:"elastic.out(1, 0.38)"}).fromTo(c,{scale:.985,transformOrigin:"180px 180px"},{scale:1,duration:.52,ease:"elastic.out(1, 0.5)"},0)})}function X(t,e){t.length!==0&&L().then(n=>{n.fromTo(t,{scaleY:1,transformOrigin:"50% 50%"},{scaleY:.08,duration:.08,yoyo:!0,repeat:1,ease:"power1.inOut"})})}function y(t,e,n){if(t.length===0)return;const c=e==="left"?-7:e==="right"?7:0;if(n){t.forEach(a=>{(a instanceof HTMLElement||a instanceof SVGElement)&&(a.style.transform=`translateX(${c}px)`)});return}L().then(a=>{a.to(t,{x:c,duration:.48,ease:"power3.out"})})}let A;function z(){return A??=S(()=>import("./index.Bvu9zNsI.js"),[]).then(t=>t.gsap),A}function F(t,e){const n=Array.from(t.querySelectorAll("[data-launcher-tile]"));if(e)return t.style.opacity="1",n.forEach(i=>{i instanceof HTMLElement&&(i.style.opacity="1",i.style.filter="none")}),()=>{};let c=!1,a;return z().then(i=>{c||(a=i.timeline(),a.fromTo(t,{opacity:0},{opacity:1,duration:.18,ease:"power1.out"}),a.fromTo(n,{opacity:0,filter:"blur(8px)"},{opacity:1,filter:"blur(0px)",duration:.46,stagger:.045,ease:"power3.out"},.04))}),()=>{c=!0,a?.kill()}}function $(t){const e=Array.from(document.querySelectorAll("[data-scroll-section]")),n=()=>{document.body.classList.toggle("face-docked",window.scrollY>Math.max(260,window.innerHeight*.55))};if(n(),window.addEventListener("scroll",n,{passive:!0}),t||!("IntersectionObserver"in window))return e.forEach(a=>a.classList.add("section-visible")),()=>window.removeEventListener("scroll",n);const c=new IntersectionObserver(a=>{for(const i of a)i.isIntersecting&&(i.target.classList.add("section-visible"),c.unobserve(i.target))},{threshold:.14});return e.forEach(a=>c.observe(a)),()=>{c.disconnect(),window.removeEventListener("scroll",n)}}const B={"face-click":"pressed",blink:"sleepy","look-left":"look-left","look-right":"look-right",smile:"smile",focus:"focused",surprise:"surprised",laugh:"laugh",squint:"squint",sleepy:"sleepy","press-release":"neutral"},P={state:"neutral",launcherOpen:!1,reducedMotion:!1};function v(t,e,n={}){const c=n.reducedMotion??t.reducedMotion,a={...t,reducedMotion:c,lastEvent:e};return e==="reduced-motion-on"?{...a,state:"neutral",reducedMotion:!0}:e==="reduced-motion-off"?{...a,reducedMotion:!1}:e==="launcher-open"?{...a,state:"smile",launcherOpen:!0}:e==="launcher-close"?{...a,state:"neutral",launcherOpen:!1}:c&&["blink","look-left","look-right"].includes(e)?{...a,state:"neutral"}:{...a,state:B[e]??t.state}}function Y({open:t,tiles:e,onTileHover:n,onTileSelect:c}){return r.jsx("nav",{className:"system-launcher","data-open":t?"true":"false","aria-label":"NeXa system launcher","aria-hidden":!t,children:r.jsx("div",{className:"launcher-grid",children:e.map(a=>a.active?r.jsx("a",{className:"launcher-tile launcher-tile-active","data-launcher-tile":!0,"data-launcher-active":"true",href:a.href,"aria-label":`${a.label}: ${a.summary}`,"data-category":a.category,onClick:i=>c(a,i),onFocus:()=>n(a.reaction),onMouseEnter:()=>n(a.reaction),tabIndex:t?0:-1,children:r.jsx(C,{tile:a})},a.id):r.jsx("button",{className:"launcher-tile launcher-tile-placeholder","data-launcher-tile":!0,"data-launcher-active":"false",type:"button","aria-label":`${a.label}: Coming soon`,"aria-disabled":"true","data-category":a.category,onClick:i=>c(a,i),onMouseEnter:()=>n(a.reaction),tabIndex:-1,children:r.jsx(C,{tile:a})},a.id))})})}function C({tile:t}){return r.jsxs(r.Fragment,{children:[r.jsx("span",{className:"launcher-icon","aria-hidden":"true",children:r.jsx(q,{iconKey:t.iconKey})}),r.jsxs("span",{className:"launcher-copy",children:[r.jsx("strong",{children:t.label}),r.jsx("small",{children:t.summary})]}),r.jsx("span",{className:"launcher-category",children:t.category})]})}function q({iconKey:t}){return t==="prototype"?r.jsxs("svg",{viewBox:"0 0 24 24",focusable:"false",children:[r.jsx("rect",{x:"6",y:"7",width:"12",height:"9",rx:"3"}),r.jsx("path",{d:"M9 17h6M8 7V4m8 3V4"}),r.jsx("circle",{cx:"10",cy:"11.5",r:"1.2"}),r.jsx("circle",{cx:"14",cy:"11.5",r:"1.2"})]}):t==="hardware"?r.jsxs("svg",{viewBox:"0 0 24 24",focusable:"false",children:[r.jsx("rect",{x:"7",y:"7",width:"10",height:"10",rx:"2"}),r.jsx("path",{d:"M4 9h3m-3 6h3m10-6h3m-3 6h3M9 4v3m6-3v3M9 17v3m6-3v3"})]}):t==="story"?r.jsxs("svg",{viewBox:"0 0 24 24",focusable:"false",children:[r.jsx("path",{d:"M6 6h12M6 12h10M6 18h7"}),r.jsx("circle",{cx:"5",cy:"6",r:"1"}),r.jsx("circle",{cx:"5",cy:"12",r:"1"}),r.jsx("circle",{cx:"5",cy:"18",r:"1"})]}):t==="code"?r.jsx("svg",{viewBox:"0 0 24 24",focusable:"false",children:r.jsx("path",{d:"m9 8-4 4 4 4m6-8 4 4-4 4M13 6l-2 12"})}):t==="demo"?r.jsxs("svg",{viewBox:"0 0 24 24",focusable:"false",children:[r.jsx("circle",{cx:"12",cy:"12",r:"8"}),r.jsx("path",{d:"m10.5 8.5 5 3.5-5 3.5z"})]}):t==="roadmap"?r.jsxs("svg",{viewBox:"0 0 24 24",focusable:"false",children:[r.jsx("path",{d:"M5 18c3-8 8 1 11-7l2-5M15 6h3v3"}),r.jsx("circle",{cx:"5",cy:"18",r:"1.5"}),r.jsx("circle",{cx:"12",cy:"14",r:"1.5"})]}):t==="boundary"?r.jsxs("svg",{viewBox:"0 0 24 24",focusable:"false",children:[r.jsx("path",{d:"M12 4 5 7v5c0 4 2.8 6.7 7 8 4.2-1.3 7-4 7-8V7z"}),r.jsx("path",{d:"M9 12h6"})]}):r.jsxs("svg",{viewBox:"0 0 24 24",focusable:"false",children:[r.jsx("circle",{cx:"12",cy:"12",r:"7"}),r.jsx("path",{d:"M12 5v14M5 12h14"})]})}const D=2,V=1,H=!1,U=!1,G=242,W="The canonical NeXa face is the NeXa logo identity: two white vertical bean-shaped eyes and one medium-thick curved smile line drawn directly on the dark background.";function J(){return typeof window<"u"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches}function te({tiles:t}){const[e,n]=d.useState(P),[c,a]=d.useState(!1),i=d.useRef(null),p=d.useRef(null),u=d.useRef(null),g=d.useRef(void 0),h=d.useMemo(()=>`face-svg face-${e.state} ${e.launcherOpen?"face-launcher-open":""}`,[e.state,e.launcherOpen]);d.useEffect(()=>{const o=J();n(b=>({...b,reducedMotion:o}));const s=$(o);window.location.hash&&window.location.hash!=="#top"&&(document.body.classList.add("content-active","face-docked"),a(!0),j());const l=window.matchMedia("(prefers-reduced-motion: reduce)"),w=()=>{n(b=>v(b,l.matches?"reduced-motion-on":"reduced-motion-off",{reducedMotion:l.matches}))};return l.addEventListener("change",w),()=>{s(),l.removeEventListener("change",w)}},[]),d.useEffect(()=>{if(!c){document.body.classList.remove("flow-bar-docked");return}j();const o=()=>j();return window.addEventListener("scroll",o,{passive:!0}),window.addEventListener("resize",o),()=>{window.removeEventListener("scroll",o),window.removeEventListener("resize",o)}},[c]),d.useEffect(()=>{const o=s=>{const l=s.target;!(l instanceof Element)||!l.closest("[data-nexa-return-home]")||(s.preventDefault(),i.current&&E(i.current,e.reducedMotion),f())};return document.addEventListener("click",o),()=>document.removeEventListener("click",o)},[e.reducedMotion]),d.useEffect(()=>{if(!e.launcherOpen)return;const o=s=>{s.key==="Escape"&&(s.preventDefault(),x(!0))};return window.addEventListener("keydown",o),()=>window.removeEventListener("keydown",o)},[e.launcherOpen]),d.useEffect(()=>{if(!(!e.launcherOpen||!p.current))return F(p.current,e.reducedMotion)},[e.launcherOpen,e.reducedMotion]),d.useEffect(()=>{if(e.reducedMotion)return;const o=Array.from(i.current?.querySelectorAll("[data-eye]")??[]),s=Array.from(i.current?.querySelectorAll("[data-face-logo-part]")??[]);let l,w;const b=window.setTimeout(()=>{l=window.setInterval(()=>X(o),9800),w=window.setInterval(()=>{const _=Math.random()>.5?"left":"right";y(s,_,!1),window.setTimeout(()=>y(s,"center",!1),1200)},24e3)},3200);return()=>{window.clearTimeout(b),l&&window.clearInterval(l),w&&window.clearInterval(w)}},[e.reducedMotion]),d.useEffect(()=>{const o=Array.from(i.current?.querySelectorAll("[data-face-logo-part]")??[]);e.state==="look-left"&&y(o,"left",e.reducedMotion),e.state==="look-right"&&y(o,"right",e.reducedMotion),(e.state==="neutral"||e.state==="smile")&&y(o,"center",e.reducedMotion)},[e.state,e.reducedMotion]);function m(o,s=!0){n(l=>v(l,o,{reducedMotion:l.reducedMotion})),s&&(window.clearTimeout(g.current),g.current=window.setTimeout(()=>{n(l=>v(l,l.launcherOpen?"launcher-open":"press-release"))},900))}function x(o=!1){window.clearTimeout(g.current),n(s=>v(s,"launcher-close")),o&&window.setTimeout(()=>u.current?.focus(),0)}function f(){window.clearTimeout(g.current),x(!1),document.body.classList.remove("content-active","face-docked","flow-bar-docked"),a(!1),window.history.replaceState(null,"",`${window.location.pathname}${window.location.search}`),window.scrollTo({top:0,behavior:e.reducedMotion?"auto":"smooth"}),n(o=>v({...o,launcherOpen:!1},"press-release"))}function k(){if(c||document.body.classList.contains("content-active")){i.current&&E(i.current,e.reducedMotion),f();return}if(!!e.launcherOpen){x();return}i.current&&E(i.current,e.reducedMotion),n(s=>v(s,"face-click")),window.setTimeout(()=>{n(s=>v(s,"launcher-open"))},e.reducedMotion?0:160)}function M(o){m(o)}function I(o,s){if(s.preventDefault(),!o.active){m(o.reaction);return}m("smile",!1),x(!1),document.body.classList.add("content-active","face-docked"),document.body.classList.remove("flow-bar-docked"),a(!0),window.setTimeout(()=>{const l=document.getElementById(o.targetId);l&&(window.history.replaceState(null,"",`#${o.targetId}`),l.scrollIntoView({behavior:e.reducedMotion?"auto":"smooth",block:"start"}))},e.reducedMotion?0:120)}return r.jsxs("div",{className:"nexa-system","data-launcher-open":e.launcherOpen?"true":"false",ref:i,children:[r.jsx("button",{ref:u,className:`face-control ${e.launcherOpen?"face-control-open":""} ${c?"face-control-docked":""}`,type:"button","aria-expanded":e.launcherOpen,"aria-controls":"nexa-launcher","aria-label":c?"Return to NeXa home":e.launcherOpen?"Close NeXa system launcher":"Open NeXa system launcher",title:c?"Return home":void 0,"data-testid":"nexa-face-control",onClick:k,children:r.jsxs("svg",{className:h,viewBox:"0 0 360 360",role:"img","aria-labelledby":"nexa-face-title","data-testid":"nexa-face-logo",children:[r.jsx("title",{id:"nexa-face-title",children:"Animated NeXa face"}),r.jsx("desc",{children:W}),r.jsxs("g",{className:"face-inner face-core","data-testid":"nexa-face-core","data-face-role":"canonical","data-canonical-eye-count":D,"data-canonical-smile-count":V,"data-canonical-has-frame":H,"data-canonical-has-border":U,"data-canonical-min-smile-y":G,children:[r.jsx("rect",{"data-eye":!0,"data-testid":"nexa-face-eye","data-face-logo-part":!0,className:"eye eye-left",x:"108",y:"70",width:"46",height:"128",rx:"23"}),r.jsx("rect",{"data-eye":!0,"data-testid":"nexa-face-eye","data-face-logo-part":!0,className:"eye eye-right",x:"206",y:"70",width:"46",height:"128",rx:"23"}),r.jsx("path",{"data-testid":"nexa-face-smile","data-face-logo-part":!0,className:"smile-mark",d:Q(e.state)})]})]})}),r.jsx("div",{id:"nexa-launcher",ref:p,children:r.jsx(Y,{open:e.launcherOpen,tiles:t,onTileHover:M,onTileSelect:I})}),r.jsx("style",{children:Z})]})}function j(){const t=document.getElementById("nexa-rove")?.offsetTop??0,n=Math.max(0,window.scrollY-t)>8;document.body.classList.toggle("flow-bar-docked",n)}function Q(t){return t==="focused"||t==="squint"||t==="sleepy"?"M118 258 C148 282, 212 282, 242 258":t==="laugh"||t==="smile"||t==="surprised"?"M110 248 C142 306, 218 306, 250 248":"M112 256 C144 296, 216 296, 248 256"}const Z=`
  .nexa-system {
    position: relative;
    display: grid;
    width: min(100%, 1120px);
    height: 100%;
    min-height: 0;
    place-items: center;
    isolation: isolate;
    --launcher-radius: clamp(136px, min(32vw, 34svh), 300px);
    --tile-size: clamp(88px, min(13vw, 14svh), 128px);
  }

  .nexa-system::before {
    position: absolute;
    z-index: 0;
    width: min(76vw, 620px);
    aspect-ratio: 1;
    border-radius: 999px;
    pointer-events: none;
    content: "";
    background:
      radial-gradient(circle, rgba(137, 169, 255, 0.18), transparent 42%),
      radial-gradient(circle at 50% 56%, rgba(116, 240, 227, 0.13), transparent 50%);
    filter: blur(30px);
    opacity: 0.72;
  }

  .face-control {
    position: relative;
    z-index: 4;
    display: grid;
    grid-area: 1 / 1;
    width: clamp(238px, min(42vw, 58svh), 470px);
    aspect-ratio: 1;
    place-items: center;
    padding: 0;
    border: 0;
    border-radius: 0;
    background: transparent;
    cursor: pointer;
    outline-offset: 14px;
    touch-action: manipulation;
    transition: filter 220ms ease;
  }

  #nexa-launcher {
    grid-area: 1 / 1;
    width: 100%;
    height: 100%;
  }

  .face-control.face-control-open {
    z-index: 7;
    width: clamp(74px, min(12vw, 17svh), 104px) !important;
  }

  .nexa-system[data-launcher-open="true"] .face-control {
    z-index: 7;
    width: clamp(74px, min(12vw, 17svh), 104px) !important;
  }

  .face-control.face-control-docked {
    position: fixed;
    top: calc(var(--island-top) + 41px);
    left: 50%;
    z-index: var(--z-docked-face);
    width: clamp(58px, 5vw, 70px) !important;
    border: 1px solid rgba(216, 231, 247, 0.18);
    border-radius: 0 0 18px 18px;
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.035)),
      rgba(5, 8, 14, 0.48);
    box-shadow: var(--shadow-glass);
    backdrop-filter: blur(16px);
    transform: translateX(-50%);
    transition: none;
  }

  .face-control.face-control-docked:hover,
  .face-control.face-control-docked:focus-visible {
    box-shadow: var(--shadow-focus);
  }

  body.content-active .face-control.face-control-docked {
    transition:
      opacity 220ms ease,
      transform 220ms ease,
      filter 220ms ease;
  }

  body.content-active.flow-bar-docked .face-control.face-control-docked {
    opacity: 0;
    pointer-events: none;
    filter: blur(4px);
    transform: translate(42vw, -8px) scale(0.88);
  }

  .face-svg {
    width: 100%;
    height: 100%;
    overflow: visible;
    filter:
      drop-shadow(0 40px 90px rgba(0, 0, 0, 0.64))
      drop-shadow(0 0 26px rgba(255, 255, 255, 0.18))
      drop-shadow(0 0 52px rgba(116, 240, 227, 0.2));
  }

  .face-core {
    transform-box: fill-box;
    transform-origin: center;
  }

  .face-inner {
    transition: transform 180ms ease;
  }

  .eye {
    fill: #f5fdff;
    filter: drop-shadow(0 0 18px rgba(255, 255, 255, 0.48));
    transition: transform 180ms ease;
    transform-origin: center;
  }

  .smile-mark {
    fill: none;
    stroke: #f8fbff;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 13;
    filter: drop-shadow(0 0 13px rgba(255, 255, 255, 0.34));
    transition: d 180ms ease, transform 180ms ease, stroke-width 180ms ease, filter 180ms ease;
  }

  .face-pressed .face-inner {
    transform: translateY(8px) scaleY(0.93);
    transform-origin: 180px 180px;
  }

  .face-launcher-open .face-inner {
    transform: translateY(-2px);
  }

  .face-smile .smile-mark,
  .face-launcher-open .smile-mark {
    stroke-width: 13;
    filter: drop-shadow(0 0 13px rgba(255, 255, 255, 0.3));
  }

  .face-squint .eye {
    transform: scaleY(0.72);
  }

  .face-sleepy .eye {
    transform: scaleY(0.42);
  }

  .face-focused .eye {
    transform: scaleY(0.84);
  }

  .system-launcher {
    position: fixed;
    inset: 0;
    z-index: 3;
    display: grid;
    place-items: center;
    pointer-events: none;
    opacity: 0;
  }

  .system-launcher[data-open="true"] {
    pointer-events: none;
    opacity: 1;
  }

  .system-launcher[data-open="false"] .launcher-tile {
    visibility: hidden;
    pointer-events: none;
  }

  .system-launcher[data-open="true"] .launcher-tile {
    visibility: visible;
  }

  .launcher-grid {
    position: relative;
    width: min(100vw, 1120px);
    height: min(100svh, 760px);
    pointer-events: none;
  }

  .launcher-grid::before {
    position: absolute;
    top: 50%;
    left: 50%;
    width: calc(var(--launcher-radius) * 2);
    aspect-ratio: 1;
    border: 1px solid rgba(216, 231, 247, 0.12);
    border-radius: 999px;
    pointer-events: none;
    content: "";
    box-shadow: 0 0 70px rgba(116, 240, 227, 0.08);
    transform: translate(-50%, -50%);
  }

  .launcher-tile {
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 50%;
    display: grid;
    width: var(--tile-size);
    height: var(--tile-size);
    min-height: 0;
    aspect-ratio: 1 / 1;
    grid-template-columns: 1fr;
    grid-template-areas:
      "icon"
      "copy";
    place-items: center;
    align-content: center;
    justify-content: center;
    gap: clamp(5px, 0.9vw, 9px);
    overflow: hidden;
    padding: clamp(11px, 1.5vw, 18px);
    border: 1px solid rgba(216, 231, 247, 0.18);
    border-radius: 999px;
    background:
      radial-gradient(circle at 34% 24%, rgba(255, 255, 255, 0.22), transparent 28%),
      radial-gradient(circle at 62% 74%, rgba(116, 240, 227, 0.13), transparent 46%),
      linear-gradient(145deg, rgba(255, 255, 255, 0.11), rgba(255, 255, 255, 0.026)),
      rgba(7, 12, 21, 0.86);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.18),
      inset 0 -18px 34px rgba(0, 0, 0, 0.24),
      0 18px 44px rgba(0, 0, 0, 0.38),
      0 0 28px rgba(116, 240, 227, 0.08);
    color: var(--color-text);
    text-decoration: none;
    backdrop-filter: blur(20px);
    cursor: pointer;
    pointer-events: auto;
    transform: translate(-50%, -50%);
    transition:
      border-color 180ms ease,
      box-shadow 180ms ease,
      translate 180ms ease,
      background 180ms ease,
      opacity 180ms ease,
      filter 180ms ease;
  }

  .launcher-tile-placeholder {
    cursor: default;
    opacity: 0.7;
    filter: saturate(0.72) brightness(0.82);
  }

  .launcher-tile-active {
    border-color: rgba(116, 240, 227, 0.72);
    background:
      radial-gradient(circle at 34% 24%, rgba(255, 255, 255, 0.31), transparent 30%),
      radial-gradient(circle at 50% 70%, rgba(116, 240, 227, 0.28), transparent 52%),
      linear-gradient(145deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.04)),
      rgba(8, 19, 29, 0.92);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.22),
      inset 0 -18px 36px rgba(0, 0, 0, 0.22),
      0 0 0 1px rgba(116, 240, 227, 0.18),
      0 22px 50px rgba(0, 0, 0, 0.42),
      0 0 38px rgba(116, 240, 227, 0.3);
  }

  .launcher-tile::before {
    position: absolute;
    inset: 0;
    pointer-events: none;
    content: "";
    background:
      radial-gradient(circle at 31% 21%, rgba(255, 255, 255, 0.34), transparent 16%),
      linear-gradient(132deg, rgba(255, 255, 255, 0.14), transparent 42%);
    opacity: 0.62;
  }

  .launcher-tile:nth-child(1) { transform: translate(-50%, -50%) rotate(-90deg) translateX(var(--launcher-radius)) rotate(90deg); }
  .launcher-tile:nth-child(2) { transform: translate(-50%, -50%) rotate(-54deg) translateX(var(--launcher-radius)) rotate(54deg); }
  .launcher-tile:nth-child(3) { transform: translate(-50%, -50%) rotate(-18deg) translateX(var(--launcher-radius)) rotate(18deg); }
  .launcher-tile:nth-child(4) { transform: translate(-50%, -50%) rotate(18deg) translateX(var(--launcher-radius)) rotate(-18deg); }
  .launcher-tile:nth-child(5) { transform: translate(-50%, -50%) rotate(54deg) translateX(var(--launcher-radius)) rotate(-54deg); }
  .launcher-tile:nth-child(6) { transform: translate(-50%, -50%) rotate(90deg) translateX(var(--launcher-radius)) rotate(-90deg); }
  .launcher-tile:nth-child(7) { transform: translate(-50%, -50%) rotate(126deg) translateX(var(--launcher-radius)) rotate(-126deg); }
  .launcher-tile:nth-child(8) { transform: translate(-50%, -50%) rotate(162deg) translateX(var(--launcher-radius)) rotate(-162deg); }
  .launcher-tile:nth-child(9) { transform: translate(-50%, -50%) rotate(198deg) translateX(var(--launcher-radius)) rotate(-198deg); }
  .launcher-tile:nth-child(10) { transform: translate(-50%, -50%) rotate(234deg) translateX(var(--launcher-radius)) rotate(-234deg); }

  .launcher-icon {
    position: relative;
    display: grid;
    width: clamp(27px, 4vw, 40px);
    height: clamp(27px, 4vw, 40px);
    grid-area: icon;
    place-items: center;
    border: 1px solid rgba(216, 231, 247, 0.16);
    border-radius: 999px;
    background:
      radial-gradient(circle at 38% 24%, rgba(255, 255, 255, 0.18), transparent 36%),
      linear-gradient(145deg, rgba(116, 240, 227, 0.16), rgba(255, 255, 255, 0.04)),
      rgba(255, 255, 255, 0.035);
  }

  .launcher-icon svg {
    width: clamp(17px, 2.8vw, 22px);
    height: clamp(17px, 2.8vw, 22px);
    fill: none;
    stroke: var(--color-soft);
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 1.8;
  }

  .launcher-copy {
    position: relative;
    display: grid;
    grid-area: copy;
    justify-items: center;
    gap: 0;
    min-width: 0;
    width: 100%;
    text-align: center;
  }

  .launcher-copy strong {
    max-width: 100%;
    overflow-wrap: anywhere;
    color: rgba(246, 252, 255, 0.94);
    font-size: clamp(0.68rem, 1.25vw, 0.86rem);
    font-weight: 780;
    line-height: 1.04;
    text-wrap: balance;
  }

  .launcher-copy small {
    display: none;
  }

  .launcher-category {
    display: none;
  }

  .launcher-tile:hover,
  .launcher-tile:focus-visible {
    border-color: var(--color-line-strong);
    box-shadow: var(--shadow-focus);
    translate: 0 -3px;
  }

  .launcher-tile:focus-visible {
    outline: 0;
  }

  .launcher-tile-placeholder:hover {
    border-color: rgba(216, 231, 247, 0.18);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.18),
      inset 0 -18px 34px rgba(0, 0, 0, 0.24),
      0 18px 44px rgba(0, 0, 0, 0.38),
      0 0 28px rgba(116, 240, 227, 0.08);
    translate: 0;
  }

  @media (min-width: 901px) {
    .launcher-grid {}
  }

  @media (max-width: 900px) {
    .nexa-system {
      --launcher-radius: clamp(118px, min(33vw, 25svh), 228px);
      --tile-size: clamp(70px, min(18vw, 11svh), 106px);
    }

    .system-launcher {
      inset: 0;
      width: 100%;
    }

    .launcher-grid {
      height: 100svh;
    }

    .launcher-tile {
      text-align: center;
    }
  }

  @media (max-width: 520px) {
    .nexa-system {
      width: 100%;
      justify-items: center;
      --launcher-radius: clamp(118px, min(40vw, 24svh), 172px);
      --tile-size: clamp(54px, 17vw, 74px);
    }

    .face-control {
      width: min(78vw, 306px);
    }

    .nexa-system[data-launcher-open="true"] .face-control {
      width: clamp(62px, 19vw, 76px) !important;
    }

    body.face-docked .nexa-system[data-launcher-open="false"] .face-control {
      width: 62px;
    }

    .launcher-tile {
      gap: 3px;
      padding: clamp(7px, 2vw, 9px);
    }

    .launcher-icon {
      width: clamp(20px, 6vw, 25px);
      height: clamp(20px, 6vw, 25px);
    }

    .launcher-icon svg {
      width: clamp(14px, 4vw, 17px);
      height: clamp(14px, 4vw, 17px);
    }

    .launcher-copy strong {
      font-size: clamp(0.5rem, 2.25vw, 0.62rem);
      line-height: 1;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .eye,
    .smile-mark,
    .launcher-tile,
    .face-inner {
      transition: none;
    }
  }
`;export{te as default};
