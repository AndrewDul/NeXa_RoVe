import{r as f}from"./index.DBy5LfQW.js";var E={exports:{}},b={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var A;function $(){if(A)return b;A=1;var r=Symbol.for("react.transitional.element"),e=Symbol.for("react.fragment");function n(i,t,o){var u=null;if(o!==void 0&&(u=""+o),t.key!==void 0&&(u=""+t.key),"key"in t){o={};for(var d in t)d!=="key"&&(o[d]=t[d])}else o=t;return t=o.ref,{$$typeof:r,type:i,key:u,ref:t!==void 0?t:null,props:o}}return b.Fragment=e,b.jsx=n,b.jsxs=n,b}var O;function q(){return O||(O=1,E.exports=$()),E.exports}var a=q();const F="modulepreload",P=function(r){return"/NeXa_RoVe/"+r},C={},T=function(e,n,i){let t=Promise.resolve();if(n&&n.length>0){let u=function(h){return Promise.all(h.map(p=>Promise.resolve(p).then(m=>({status:"fulfilled",value:m}),m=>({status:"rejected",reason:m}))))};document.getElementsByTagName("link");const d=document.querySelector("meta[property=csp-nonce]"),g=d?.nonce||d?.getAttribute("nonce");t=u(n.map(h=>{if(h=P(h),h in C)return;C[h]=!0;const p=h.endsWith(".css"),m=p?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${h}"]${m}`))return;const x=document.createElement("link");if(x.rel=p?"stylesheet":F,p||(x.as="script"),x.crossOrigin="",x.href=h,g&&x.setAttribute("nonce",g),document.head.appendChild(x),p)return new Promise((j,M)=>{x.addEventListener("load",j),x.addEventListener("error",()=>M(new Error(`Unable to preload CSS for ${h}`)))})}))}function o(u){const d=new Event("vite:preloadError",{cancelable:!0});if(d.payload=u,window.dispatchEvent(d),!d.defaultPrevented)throw u}return t.then(u=>{for(const d of u||[])d.status==="rejected"&&o(d.reason);return e().catch(o)})};let L;function N(){return L??=T(()=>import("./index.Bvu9zNsI.js"),[]).then(r=>r.gsap),L}function _(r,e){if(e)return;const n=r.querySelector(".face-inner"),i=r.querySelector(".face-core");N().then(t=>{t.timeline().fromTo(n,{scaleY:.9,y:9,transformOrigin:"180px 180px"},{scaleY:1,y:0,duration:.58,ease:"elastic.out(1, 0.38)"}).fromTo(i,{scale:.985,transformOrigin:"180px 180px"},{scale:1,duration:.52,ease:"elastic.out(1, 0.5)"},0)})}function Y(r,e){r.length!==0&&N().then(n=>{n.fromTo(r,{scaleY:1,transformOrigin:"50% 50%"},{scaleY:.08,duration:.08,yoyo:!0,repeat:1,ease:"power1.inOut"})})}function k(r,e,n){if(r.length===0)return;const i=e==="left"?-7:e==="right"?7:0;if(n){r.forEach(t=>{(t instanceof HTMLElement||t instanceof SVGElement)&&(t.style.transform=`translateX(${i}px)`)});return}N().then(t=>{t.to(r,{x:i,duration:.48,ease:"power3.out"})})}let R;function z(){return R??=T(()=>import("./index.Bvu9zNsI.js"),[]).then(r=>r.gsap),R}function B(r,e){const n=Array.from(r.querySelectorAll("[data-launcher-tile]"));if(e)return r.style.opacity="1",n.forEach(o=>{o instanceof HTMLElement&&(o.style.opacity="1",o.style.filter="none")}),()=>{};let i=!1,t;return z().then(o=>{i||(t=o.timeline(),t.fromTo(r,{opacity:0},{opacity:1,duration:.18,ease:"power1.out"}),t.fromTo(n,{opacity:0,filter:"blur(8px)"},{opacity:1,filter:"blur(0px)",duration:.46,stagger:.045,ease:"power3.out"},.04))}),()=>{i=!0,t?.kill()}}function D(r){const e=Array.from(document.querySelectorAll("[data-scroll-section]")),n=()=>{document.body.classList.toggle("face-docked",window.scrollY>Math.max(260,window.innerHeight*.55))};if(n(),window.addEventListener("scroll",n,{passive:!0}),r||!("IntersectionObserver"in window))return e.forEach(t=>t.classList.add("section-visible")),()=>window.removeEventListener("scroll",n);const i=new IntersectionObserver(t=>{for(const o of t)o.isIntersecting&&(o.target.classList.add("section-visible"),i.unobserve(o.target))},{threshold:.14});return e.forEach(t=>i.observe(t)),()=>{i.disconnect(),window.removeEventListener("scroll",n)}}const V={"face-click":"pressed",blink:"sleepy","look-left":"look-left","look-right":"look-right",smile:"smile",focus:"focused",surprise:"surprised",laugh:"laugh",squint:"squint",sleepy:"sleepy","press-release":"neutral"},H={state:"neutral",launcherOpen:!1,reducedMotion:!1};function v(r,e,n={}){const i=n.reducedMotion??r.reducedMotion,t={...r,reducedMotion:i,lastEvent:e};return e==="reduced-motion-on"?{...t,state:"neutral",reducedMotion:!0}:e==="reduced-motion-off"?{...t,reducedMotion:!1}:e==="launcher-open"?{...t,state:"smile",launcherOpen:!0}:e==="launcher-close"?{...t,state:"neutral",launcherOpen:!1}:i&&["blink","look-left","look-right"].includes(e)?{...t,state:"neutral"}:{...t,state:V[e]??r.state}}function J({open:r,tiles:e,onTileHover:n,onTileSelect:i}){return a.jsx("nav",{className:"system-launcher","data-open":r?"true":"false","aria-label":"NeXa system launcher","aria-hidden":!r,children:a.jsx("div",{className:"launcher-grid",children:e.map(t=>t.active?a.jsx("a",{className:"launcher-tile launcher-tile-active","data-launcher-tile":!0,"data-launcher-active":"true",href:t.href,"aria-label":`${t.label}: ${t.summary}`,"data-category":t.category,onClick:o=>i(t,o),onFocus:()=>n(t.reaction),onMouseEnter:()=>n(t.reaction),tabIndex:r?0:-1,children:a.jsx(S,{tile:t})},t.id):a.jsx("button",{className:"launcher-tile launcher-tile-placeholder","data-launcher-tile":!0,"data-launcher-active":"false",type:"button","aria-label":`${t.label}: Coming soon`,"aria-disabled":"true","data-category":t.category,onClick:o=>i(t,o),onMouseEnter:()=>n(t.reaction),tabIndex:-1,children:a.jsx(S,{tile:t})},t.id))})})}function S({tile:r}){return a.jsxs(a.Fragment,{children:[a.jsx("span",{className:"launcher-icon","aria-hidden":"true",children:a.jsx(U,{iconKey:r.iconKey})}),a.jsxs("span",{className:"launcher-copy",children:[a.jsx("strong",{children:r.label}),a.jsx("small",{children:r.summary})]}),a.jsx("span",{className:"launcher-category",children:r.category})]})}function U({iconKey:r}){return r==="prototype"?a.jsxs("svg",{viewBox:"0 0 24 24",focusable:"false",children:[a.jsx("rect",{x:"6",y:"7",width:"12",height:"9",rx:"3"}),a.jsx("path",{d:"M9 17h6M8 7V4m8 3V4"}),a.jsx("circle",{cx:"10",cy:"11.5",r:"1.2"}),a.jsx("circle",{cx:"14",cy:"11.5",r:"1.2"})]}):r==="hardware"?a.jsxs("svg",{viewBox:"0 0 24 24",focusable:"false",children:[a.jsx("rect",{x:"7",y:"7",width:"10",height:"10",rx:"2"}),a.jsx("path",{d:"M4 9h3m-3 6h3m10-6h3m-3 6h3M9 4v3m6-3v3M9 17v3m6-3v3"})]}):r==="story"?a.jsxs("svg",{viewBox:"0 0 24 24",focusable:"false",children:[a.jsx("path",{d:"M6 6h12M6 12h10M6 18h7"}),a.jsx("circle",{cx:"5",cy:"6",r:"1"}),a.jsx("circle",{cx:"5",cy:"12",r:"1"}),a.jsx("circle",{cx:"5",cy:"18",r:"1"})]}):r==="code"?a.jsx("svg",{viewBox:"0 0 24 24",focusable:"false",children:a.jsx("path",{d:"m9 8-4 4 4 4m6-8 4 4-4 4M13 6l-2 12"})}):r==="demo"?a.jsxs("svg",{viewBox:"0 0 24 24",focusable:"false",children:[a.jsx("circle",{cx:"12",cy:"12",r:"8"}),a.jsx("path",{d:"m10.5 8.5 5 3.5-5 3.5z"})]}):r==="roadmap"?a.jsxs("svg",{viewBox:"0 0 24 24",focusable:"false",children:[a.jsx("path",{d:"M5 18c3-8 8 1 11-7l2-5M15 6h3v3"}),a.jsx("circle",{cx:"5",cy:"18",r:"1.5"}),a.jsx("circle",{cx:"12",cy:"14",r:"1.5"})]}):r==="boundary"?a.jsxs("svg",{viewBox:"0 0 24 24",focusable:"false",children:[a.jsx("path",{d:"M12 4 5 7v5c0 4 2.8 6.7 7 8 4.2-1.3 7-4 7-8V7z"}),a.jsx("path",{d:"M9 12h6"})]}):a.jsxs("svg",{viewBox:"0 0 24 24",focusable:"false",children:[a.jsx("circle",{cx:"12",cy:"12",r:"7"}),a.jsx("path",{d:"M12 5v14M5 12h14"})]})}const G=2,W=1,Q=!1,Z=!1,K=242,ee="The canonical NeXa face is the NeXa logo identity: two white vertical bean-shaped eyes and one medium-thick curved smile line drawn directly on the dark background.";function te(){return typeof window<"u"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches}function oe({tiles:r}){const[e,n]=f.useState(H),[i,t]=f.useState(!1),o=f.useRef(null),u=f.useRef(null),d=f.useRef(null),g=f.useRef(void 0),h=f.useMemo(()=>`face-svg face-${e.state} ${e.launcherOpen?"face-launcher-open":""}`,[e.state,e.launcherOpen]);f.useEffect(()=>{const s=te();n(y=>({...y,reducedMotion:s}));const c=D(s);window.location.hash&&window.location.hash!=="#top"&&(document.body.classList.add("content-active","face-docked"),t(!0));const l=window.matchMedia("(prefers-reduced-motion: reduce)"),w=()=>{n(y=>v(y,l.matches?"reduced-motion-on":"reduced-motion-off",{reducedMotion:l.matches}))};return l.addEventListener("change",w),()=>{c(),l.removeEventListener("change",w)}},[]),f.useEffect(()=>{if(!e.launcherOpen)return;const s=c=>{c.key==="Escape"&&(c.preventDefault(),m(!0))};return window.addEventListener("keydown",s),()=>window.removeEventListener("keydown",s)},[e.launcherOpen]),f.useEffect(()=>{if(!(!e.launcherOpen||!u.current))return B(u.current,e.reducedMotion)},[e.launcherOpen,e.reducedMotion]),f.useEffect(()=>{if(e.reducedMotion)return;const s=Array.from(o.current?.querySelectorAll("[data-eye]")??[]),c=Array.from(o.current?.querySelectorAll("[data-face-logo-part]")??[]);let l,w;const y=window.setTimeout(()=>{l=window.setInterval(()=>Y(s),9800),w=window.setInterval(()=>{const X=Math.random()>.5?"left":"right";k(c,X,!1),window.setTimeout(()=>k(c,"center",!1),1200)},24e3)},3200);return()=>{window.clearTimeout(y),l&&window.clearInterval(l),w&&window.clearInterval(w)}},[e.reducedMotion]),f.useEffect(()=>{const s=Array.from(o.current?.querySelectorAll("[data-face-logo-part]")??[]);e.state==="look-left"&&k(s,"left",e.reducedMotion),e.state==="look-right"&&k(s,"right",e.reducedMotion),(e.state==="neutral"||e.state==="smile")&&k(s,"center",e.reducedMotion)},[e.state,e.reducedMotion]);function p(s,c=!0){n(l=>v(l,s,{reducedMotion:l.reducedMotion})),c&&(window.clearTimeout(g.current),g.current=window.setTimeout(()=>{n(l=>v(l,l.launcherOpen?"launcher-open":"press-release"))},900))}function m(s=!1){window.clearTimeout(g.current),n(c=>v(c,"launcher-close")),s&&window.setTimeout(()=>d.current?.focus(),0)}function x(){window.clearTimeout(g.current),m(!1),document.body.classList.remove("content-active","face-docked"),t(!1),window.history.replaceState(null,"",`${window.location.pathname}${window.location.search}`),window.scrollTo({top:0,behavior:e.reducedMotion?"auto":"smooth"}),n(s=>v({...s,launcherOpen:!1},"press-release"))}function j(){if(i||document.body.classList.contains("content-active")){o.current&&_(o.current,e.reducedMotion),x();return}if(!!e.launcherOpen){m();return}o.current&&_(o.current,e.reducedMotion),n(c=>v(c,"face-click")),window.setTimeout(()=>{n(c=>v(c,"launcher-open"))},e.reducedMotion?0:160)}function M(s){p(s)}function I(s,c){if(c.preventDefault(),!s.active){p(s.reaction);return}p("smile",!1),m(!1),document.body.classList.add("content-active","face-docked"),t(!0),window.setTimeout(()=>{const l=document.getElementById(s.targetId);l&&(window.history.replaceState(null,"",`#${s.targetId}`),l.scrollIntoView({behavior:e.reducedMotion?"auto":"smooth",block:"start"}))},e.reducedMotion?0:120)}return a.jsxs("div",{className:"nexa-system","data-launcher-open":e.launcherOpen?"true":"false",ref:o,children:[a.jsx("button",{ref:d,className:`face-control ${e.launcherOpen?"face-control-open":""} ${i?"face-control-docked":""}`,type:"button","aria-expanded":e.launcherOpen,"aria-controls":"nexa-launcher","aria-label":i?"Return to NeXa home":e.launcherOpen?"Close NeXa system launcher":"Open NeXa system launcher",title:i?"Return home":void 0,"data-testid":"nexa-face-control",onClick:j,children:a.jsxs("svg",{className:h,viewBox:"0 0 360 360",role:"img","aria-labelledby":"nexa-face-title","data-testid":"nexa-face-logo",children:[a.jsx("title",{id:"nexa-face-title",children:"Animated NeXa face"}),a.jsx("desc",{children:ee}),a.jsxs("g",{className:"face-inner face-core","data-testid":"nexa-face-core","data-face-role":"canonical","data-canonical-eye-count":G,"data-canonical-smile-count":W,"data-canonical-has-frame":Q,"data-canonical-has-border":Z,"data-canonical-min-smile-y":K,children:[a.jsx("rect",{"data-eye":!0,"data-testid":"nexa-face-eye","data-face-logo-part":!0,className:"eye eye-left",x:"108",y:"70",width:"46",height:"128",rx:"23"}),a.jsx("rect",{"data-eye":!0,"data-testid":"nexa-face-eye","data-face-logo-part":!0,className:"eye eye-right",x:"206",y:"70",width:"46",height:"128",rx:"23"}),a.jsx("path",{"data-testid":"nexa-face-smile","data-face-logo-part":!0,className:"smile-mark",d:re(e.state)})]})]})}),a.jsx("div",{id:"nexa-launcher",ref:u,children:a.jsx(J,{open:e.launcherOpen,tiles:r,onTileHover:M,onTileSelect:I})}),a.jsx("style",{children:ae})]})}function re(r){return r==="focused"||r==="squint"||r==="sleepy"?"M118 258 C148 282, 212 282, 242 258":r==="laugh"||r==="smile"||r==="surprised"?"M110 248 C142 306, 218 306, 250 248":"M112 256 C144 296, 216 296, 248 256"}const ae=`
  .nexa-system {
    position: relative;
    display: grid;
    width: min(100%, 1120px);
    height: 100%;
    min-height: 0;
    place-items: center;
    isolation: isolate;
    --launcher-radius: clamp(128px, min(31vw, 27svh), 295px);
    --tile-width: clamp(82px, min(18vw, 15svh), 156px);
    --tile-height: clamp(58px, min(11vw, 9.2svh), 98px);
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
    transition:
      width 320ms ease,
      filter 220ms ease;
  }

  #nexa-launcher {
    grid-area: 1 / 1;
    width: 100%;
    height: 100%;
  }

  .face-control.face-control-open {
    z-index: 7;
    width: clamp(104px, min(18vw, 24svh), 158px) !important;
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
    width: var(--tile-width);
    height: var(--tile-height);
    min-height: 0;
    grid-template-columns: auto 1fr;
    grid-template-areas:
      "icon copy"
      "meta meta";
    align-content: center;
    gap: 8px 10px;
    overflow: hidden;
    padding: clamp(8px, 1.4vw, 14px);
    border: 1px solid var(--color-line);
    border-radius: 999px;
    background:
      linear-gradient(145deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.035)),
      rgba(8, 13, 21, 0.82);
    box-shadow: var(--shadow-glass);
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
      background 180ms ease;
  }

  .launcher-tile-placeholder {
    cursor: default;
    opacity: 0.52;
    filter: saturate(0.68);
  }

  .launcher-tile-active {
    border-color: rgba(116, 240, 227, 0.58);
    box-shadow:
      var(--shadow-glass),
      0 0 0 1px rgba(116, 240, 227, 0.18),
      0 0 34px rgba(116, 240, 227, 0.22);
  }

  .launcher-tile::before {
    position: absolute;
    inset: 0;
    pointer-events: none;
    content: "";
    background:
      linear-gradient(120deg, rgba(255, 255, 255, 0.18), transparent 32%),
      radial-gradient(circle at 20% 12%, rgba(116, 240, 227, 0.13), transparent 28%);
    opacity: 0.75;
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
    width: clamp(28px, 4.5vw, 38px);
    height: clamp(28px, 4.5vw, 38px);
    grid-area: icon;
    place-items: center;
    border: 1px solid rgba(216, 231, 247, 0.2);
    border-radius: 999px;
    background:
      linear-gradient(145deg, rgba(116, 240, 227, 0.14), rgba(255, 255, 255, 0.045)),
      rgba(255, 255, 255, 0.04);
  }

  .launcher-icon svg {
    width: 22px;
    height: 22px;
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
    gap: 5px;
    min-width: 0;
  }

  .launcher-copy strong {
    font-size: 0.9rem;
    font-weight: 760;
    line-height: 1.16;
  }

  .launcher-copy small {
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    color: var(--color-muted);
    font-size: clamp(0.58rem, 1.1vw, 0.75rem);
    line-height: 1.35;
  }

  .launcher-category {
    position: relative;
    width: fit-content;
    grid-area: meta;
    padding: 4px 8px;
    border: 1px solid rgba(216, 231, 247, 0.16);
    border-radius: 999px;
    color: var(--color-soft);
    font-size: 0.68rem;
    font-weight: 700;
    line-height: 1;
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
    border-color: var(--color-line);
    box-shadow: var(--shadow-glass);
    translate: 0;
  }

  @media (min-width: 901px) {
    .launcher-grid {}
  }

  @media (max-width: 900px) {
    .nexa-system {
      --launcher-radius: clamp(120px, min(33vw, 25svh), 225px);
      --tile-width: clamp(72px, 17vw, 118px);
      --tile-height: clamp(50px, 9.5svh, 78px);
    }

    .system-launcher {
      inset: 0;
      width: 100%;
    }

    .launcher-grid {
      height: 100svh;
    }

    .launcher-tile {
      grid-template-columns: 1fr;
      grid-template-areas:
        "copy"
        "meta";
      text-align: center;
    }

    .launcher-icon {
      display: none;
    }
  }

  @media (max-width: 520px) {
    .nexa-system {
      width: 100%;
      justify-items: center;
      --launcher-radius: clamp(112px, min(34vw, 24svh), 148px);
      --tile-width: clamp(62px, 18vw, 76px);
      --tile-height: clamp(46px, 9svh, 58px);
    }

    .face-control {
      width: min(78vw, 306px);
    }

    .nexa-system[data-launcher-open="true"] .face-control {
      width: min(28vw, 104px);
    }

    body.face-docked .nexa-system[data-launcher-open="false"] .face-control {
      width: 62px;
    }

    .launcher-tile {
      padding: 6px;
    }

    .launcher-category {
      display: none;
    }

    .launcher-copy strong {
      font-size: clamp(0.58rem, 2.35vw, 0.72rem);
    }

    .launcher-copy small {
      -webkit-line-clamp: 1;
      font-size: clamp(0.48rem, 2vw, 0.6rem);
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
`;export{oe as default};
