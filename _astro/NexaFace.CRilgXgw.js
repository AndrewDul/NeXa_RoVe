import{r as p}from"./index.DBy5LfQW.js";var j={exports:{}},b={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var A;function q(){if(A)return b;A=1;var r=Symbol.for("react.transitional.element"),e=Symbol.for("react.fragment");function n(s,t,o){var u=null;if(o!==void 0&&(u=""+o),t.key!==void 0&&(u=""+t.key),"key"in t){o={};for(var d in t)d!=="key"&&(o[d]=t[d])}else o=t;return t=o.ref,{$$typeof:r,type:s,key:u,ref:t!==void 0?t:null,props:o}}return b.Fragment=e,b.jsx=n,b.jsxs=n,b}var C;function P(){return C||(C=1,j.exports=q()),j.exports}var a=P();const $="modulepreload",F=function(r){return"/NeXa_RoVe/"+r},N={},S=function(e,n,s){let t=Promise.resolve();if(n&&n.length>0){let u=function(h){return Promise.all(h.map(x=>Promise.resolve(x).then(f=>({status:"fulfilled",value:f}),f=>({status:"rejected",reason:f}))))};document.getElementsByTagName("link");const d=document.querySelector("meta[property=csp-nonce]"),v=d?.nonce||d?.getAttribute("nonce");t=u(n.map(h=>{if(h=F(h),h in N)return;N[h]=!0;const x=h.endsWith(".css"),f=x?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${h}"]${f}`))return;const m=document.createElement("link");if(m.rel=x?"stylesheet":$,x||(m.as="script"),m.crossOrigin="",m.href=h,v&&m.setAttribute("nonce",v),document.head.appendChild(m),x)return new Promise((M,E)=>{m.addEventListener("load",M),m.addEventListener("error",()=>E(new Error(`Unable to preload CSS for ${h}`)))})}))}function o(u){const d=new Event("vite:preloadError",{cancelable:!0});if(d.payload=u,window.dispatchEvent(d),!d.defaultPrevented)throw u}return t.then(u=>{for(const d of u||[])d.status==="rejected"&&o(d.reason);return e().catch(o)})};let O;function L(){return O??=S(()=>import("./index.Bvu9zNsI.js"),[]).then(r=>r.gsap),O}function _(r,e){if(e)return;const n=r.querySelector(".face-inner"),s=r.querySelector(".face-core");L().then(t=>{t.timeline().fromTo(n,{scaleY:.9,y:9,transformOrigin:"180px 180px"},{scaleY:1,y:0,duration:.58,ease:"elastic.out(1, 0.38)"}).fromTo(s,{scale:.985,transformOrigin:"180px 180px"},{scale:1,duration:.52,ease:"elastic.out(1, 0.5)"},0)})}function Y(r,e){r.length!==0&&L().then(n=>{n.fromTo(r,{scaleY:1,transformOrigin:"50% 50%"},{scaleY:.08,duration:.08,yoyo:!0,repeat:1,ease:"power1.inOut"})})}function k(r,e,n){if(r.length===0)return;const s=e==="left"?-7:e==="right"?7:0;if(n){r.forEach(t=>{(t instanceof HTMLElement||t instanceof SVGElement)&&(t.style.transform=`translateX(${s}px)`)});return}L().then(t=>{t.to(r,{x:s,duration:.48,ease:"power3.out"})})}let R;function z(){return R??=S(()=>import("./index.Bvu9zNsI.js"),[]).then(r=>r.gsap),R}function B(r,e){const n=Array.from(r.querySelectorAll("[data-launcher-tile]"));if(e)return r.style.opacity="1",n.forEach(o=>{o instanceof HTMLElement&&(o.style.opacity="1",o.style.filter="none")}),()=>{};let s=!1,t;return z().then(o=>{s||(t=o.timeline(),t.fromTo(r,{opacity:0},{opacity:1,duration:.18,ease:"power1.out"}),t.fromTo(n,{opacity:0,filter:"blur(8px)"},{opacity:1,filter:"blur(0px)",duration:.46,stagger:.045,ease:"power3.out"},.04))}),()=>{s=!0,t?.kill()}}function X(r){const e=Array.from(document.querySelectorAll("[data-scroll-section]")),n=()=>{document.body.classList.toggle("face-docked",window.scrollY>Math.max(260,window.innerHeight*.55))};if(n(),window.addEventListener("scroll",n,{passive:!0}),r||!("IntersectionObserver"in window))return e.forEach(t=>t.classList.add("section-visible")),()=>window.removeEventListener("scroll",n);const s=new IntersectionObserver(t=>{for(const o of t)o.isIntersecting&&(o.target.classList.add("section-visible"),s.unobserve(o.target))},{threshold:.14});return e.forEach(t=>s.observe(t)),()=>{s.disconnect(),window.removeEventListener("scroll",n)}}const D={"face-click":"pressed",blink:"sleepy","look-left":"look-left","look-right":"look-right",smile:"smile",focus:"focused",surprise:"surprised",laugh:"laugh",squint:"squint",sleepy:"sleepy","press-release":"neutral"},V={state:"neutral",launcherOpen:!1,reducedMotion:!1};function w(r,e,n={}){const s=n.reducedMotion??r.reducedMotion,t={...r,reducedMotion:s,lastEvent:e};return e==="reduced-motion-on"?{...t,state:"neutral",reducedMotion:!0}:e==="reduced-motion-off"?{...t,reducedMotion:!1}:e==="launcher-open"?{...t,state:"smile",launcherOpen:!0}:e==="launcher-close"?{...t,state:"neutral",launcherOpen:!1}:s&&["blink","look-left","look-right"].includes(e)?{...t,state:"neutral"}:{...t,state:D[e]??r.state}}function H({open:r,tiles:e,onTileHover:n,onTileSelect:s}){return a.jsx("nav",{className:"system-launcher","data-open":r?"true":"false","aria-label":"NeXa system launcher","aria-hidden":!r,children:a.jsx("div",{className:"launcher-grid",children:e.map(t=>a.jsxs("a",{className:"launcher-tile","data-launcher-tile":!0,href:t.href,"aria-label":`${t.label}: ${t.summary}`,"data-category":t.category,onClick:o=>s(t,o),onFocus:()=>n(t.reaction),onMouseEnter:()=>n(t.reaction),tabIndex:r?0:-1,children:[a.jsx("span",{className:"launcher-icon","aria-hidden":"true",children:a.jsx(J,{iconKey:t.iconKey})}),a.jsxs("span",{className:"launcher-copy",children:[a.jsx("strong",{children:t.label}),a.jsx("small",{children:t.summary})]}),a.jsx("span",{className:"launcher-category",children:t.category})]},t.id))})})}function J({iconKey:r}){return r==="prototype"?a.jsxs("svg",{viewBox:"0 0 24 24",focusable:"false",children:[a.jsx("rect",{x:"6",y:"7",width:"12",height:"9",rx:"3"}),a.jsx("path",{d:"M9 17h6M8 7V4m8 3V4"}),a.jsx("circle",{cx:"10",cy:"11.5",r:"1.2"}),a.jsx("circle",{cx:"14",cy:"11.5",r:"1.2"})]}):r==="hardware"?a.jsxs("svg",{viewBox:"0 0 24 24",focusable:"false",children:[a.jsx("rect",{x:"7",y:"7",width:"10",height:"10",rx:"2"}),a.jsx("path",{d:"M4 9h3m-3 6h3m10-6h3m-3 6h3M9 4v3m6-3v3M9 17v3m6-3v3"})]}):r==="story"?a.jsxs("svg",{viewBox:"0 0 24 24",focusable:"false",children:[a.jsx("path",{d:"M6 6h12M6 12h10M6 18h7"}),a.jsx("circle",{cx:"5",cy:"6",r:"1"}),a.jsx("circle",{cx:"5",cy:"12",r:"1"}),a.jsx("circle",{cx:"5",cy:"18",r:"1"})]}):r==="code"?a.jsx("svg",{viewBox:"0 0 24 24",focusable:"false",children:a.jsx("path",{d:"m9 8-4 4 4 4m6-8 4 4-4 4M13 6l-2 12"})}):r==="demo"?a.jsxs("svg",{viewBox:"0 0 24 24",focusable:"false",children:[a.jsx("circle",{cx:"12",cy:"12",r:"8"}),a.jsx("path",{d:"m10.5 8.5 5 3.5-5 3.5z"})]}):r==="roadmap"?a.jsxs("svg",{viewBox:"0 0 24 24",focusable:"false",children:[a.jsx("path",{d:"M5 18c3-8 8 1 11-7l2-5M15 6h3v3"}),a.jsx("circle",{cx:"5",cy:"18",r:"1.5"}),a.jsx("circle",{cx:"12",cy:"14",r:"1.5"})]}):r==="boundary"?a.jsxs("svg",{viewBox:"0 0 24 24",focusable:"false",children:[a.jsx("path",{d:"M12 4 5 7v5c0 4 2.8 6.7 7 8 4.2-1.3 7-4 7-8V7z"}),a.jsx("path",{d:"M9 12h6"})]}):a.jsxs("svg",{viewBox:"0 0 24 24",focusable:"false",children:[a.jsx("circle",{cx:"12",cy:"12",r:"7"}),a.jsx("path",{d:"M12 5v14M5 12h14"})]})}const U=2,G=1,Z=!1,W=!1,Q=242,K="The canonical NeXa face is the NeXa logo identity: two white vertical bean-shaped eyes and one medium-thick curved smile line drawn directly on the dark background.";function ee(){return typeof window<"u"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches}function ne({tiles:r}){const[e,n]=p.useState(V),[s,t]=p.useState(!1),o=p.useRef(null),u=p.useRef(null),d=p.useRef(null),v=p.useRef(void 0),h=p.useMemo(()=>`face-svg face-${e.state} ${e.launcherOpen?"face-launcher-open":""}`,[e.state,e.launcherOpen]);p.useEffect(()=>{const i=ee();n(y=>({...y,reducedMotion:i}));const l=X(i);window.location.hash&&window.location.hash!=="#top"&&(document.body.classList.add("content-active","face-docked"),t(!0));const c=window.matchMedia("(prefers-reduced-motion: reduce)"),g=()=>{n(y=>w(y,c.matches?"reduced-motion-on":"reduced-motion-off",{reducedMotion:c.matches}))};return c.addEventListener("change",g),()=>{l(),c.removeEventListener("change",g)}},[]),p.useEffect(()=>{if(!e.launcherOpen)return;const i=l=>{l.key==="Escape"&&(l.preventDefault(),f(!0))};return window.addEventListener("keydown",i),()=>window.removeEventListener("keydown",i)},[e.launcherOpen]),p.useEffect(()=>{if(!(!e.launcherOpen||!u.current))return B(u.current,e.reducedMotion)},[e.launcherOpen,e.reducedMotion]),p.useEffect(()=>{if(e.reducedMotion)return;const i=Array.from(o.current?.querySelectorAll("[data-eye]")??[]),l=Array.from(o.current?.querySelectorAll("[data-face-logo-part]")??[]);let c,g;const y=window.setTimeout(()=>{c=window.setInterval(()=>Y(i),9800),g=window.setInterval(()=>{const I=Math.random()>.5?"left":"right";k(l,I,!1),window.setTimeout(()=>k(l,"center",!1),1200)},24e3)},3200);return()=>{window.clearTimeout(y),c&&window.clearInterval(c),g&&window.clearInterval(g)}},[e.reducedMotion]),p.useEffect(()=>{const i=Array.from(o.current?.querySelectorAll("[data-face-logo-part]")??[]);e.state==="look-left"&&k(i,"left",e.reducedMotion),e.state==="look-right"&&k(i,"right",e.reducedMotion),(e.state==="neutral"||e.state==="smile")&&k(i,"center",e.reducedMotion)},[e.state,e.reducedMotion]);function x(i,l=!0){n(c=>w(c,i,{reducedMotion:c.reducedMotion})),l&&(window.clearTimeout(v.current),v.current=window.setTimeout(()=>{n(c=>w(c,c.launcherOpen?"launcher-open":"press-release"))},900))}function f(i=!1){window.clearTimeout(v.current),n(l=>w(l,"launcher-close")),i&&window.setTimeout(()=>d.current?.focus(),0)}function m(){window.clearTimeout(v.current),f(!1),document.body.classList.remove("content-active","face-docked"),t(!1),window.history.replaceState(null,"",`${window.location.pathname}${window.location.search}`),window.scrollTo({top:0,behavior:e.reducedMotion?"auto":"smooth"}),n(i=>w({...i,launcherOpen:!1},"press-release"))}function M(){if(s||document.body.classList.contains("content-active")){o.current&&_(o.current,e.reducedMotion),m();return}if(!!e.launcherOpen){f();return}o.current&&_(o.current,e.reducedMotion),n(l=>w(l,"face-click")),window.setTimeout(()=>{n(l=>w(l,"launcher-open"))},e.reducedMotion?0:160)}function E(i){x(i)}function T(i,l){l.preventDefault(),x("smile",!1),f(!1),document.body.classList.add("content-active","face-docked"),t(!0),window.setTimeout(()=>{const c=document.getElementById(i.targetId);c&&(window.history.replaceState(null,"",`#${i.targetId}`),c.scrollIntoView({behavior:e.reducedMotion?"auto":"smooth",block:"start"}))},e.reducedMotion?0:120)}return a.jsxs("div",{className:"nexa-system","data-launcher-open":e.launcherOpen?"true":"false",ref:o,children:[a.jsx("button",{ref:d,className:`face-control ${e.launcherOpen?"face-control-open":""} ${s?"face-control-docked":""}`,type:"button","aria-expanded":e.launcherOpen,"aria-controls":"nexa-launcher","aria-label":s?"Return to NeXa home":e.launcherOpen?"Close NeXa system launcher":"Open NeXa system launcher",title:s?"Return home":void 0,"data-testid":"nexa-face-control",onClick:M,children:a.jsxs("svg",{className:h,viewBox:"0 0 360 360",role:"img","aria-labelledby":"nexa-face-title","data-testid":"nexa-face-logo",children:[a.jsx("title",{id:"nexa-face-title",children:"Animated NeXa face"}),a.jsx("desc",{children:K}),a.jsxs("g",{className:"face-inner face-core","data-testid":"nexa-face-core","data-face-role":"canonical","data-canonical-eye-count":U,"data-canonical-smile-count":G,"data-canonical-has-frame":Z,"data-canonical-has-border":W,"data-canonical-min-smile-y":Q,children:[a.jsx("path",{"data-eye":!0,"data-testid":"nexa-face-eye","data-face-logo-part":!0,className:"eye eye-left",d:"M126 74 C112 75, 106 95, 110 122 L118 166 C123 192, 149 192, 154 166 L160 122 C164 95, 150 73, 126 74Z"}),a.jsx("path",{"data-eye":!0,"data-testid":"nexa-face-eye","data-face-logo-part":!0,className:"eye eye-right",d:"M234 74 C248 75, 254 95, 250 122 L242 166 C237 192, 211 192, 206 166 L200 122 C196 95, 210 73, 234 74Z"}),a.jsx("path",{"data-testid":"nexa-face-smile","data-face-logo-part":!0,className:"smile-mark",d:te(e.state)})]})]})}),a.jsx("div",{id:"nexa-launcher",ref:u,children:a.jsx(H,{open:e.launcherOpen,tiles:r,onTileHover:E,onTileSelect:T})}),a.jsx("style",{children:re})]})}function te(r){return r==="focused"||r==="squint"||r==="sleepy"?"M128 260 C152 278, 208 278, 232 260":r==="laugh"||r==="smile"||r==="surprised"?"M116 250 C144 304, 216 304, 244 250":"M120 258 C148 294, 212 294, 240 258"}const re=`
  .nexa-system {
    position: relative;
    display: grid;
    width: min(100%, 1120px);
    min-height: clamp(450px, 66svh, 690px);
    place-items: center;
    isolation: isolate;
  }

  .nexa-system::before {
    position: absolute;
    z-index: 0;
    width: min(74vw, 680px);
    aspect-ratio: 1;
    border-radius: 999px;
    pointer-events: none;
    content: "";
    background:
      radial-gradient(circle, rgba(116, 240, 227, 0.14), transparent 44%),
      radial-gradient(circle at 50% 64%, rgba(255, 255, 255, 0.08), transparent 48%);
    filter: blur(34px);
    opacity: 0.58;
  }

  .face-control {
    position: relative;
    z-index: 4;
    display: grid;
    grid-area: 1 / 1;
    width: clamp(246px, 35vw, 430px);
    aspect-ratio: 1;
    place-items: center;
    padding: 0;
    border: 0;
    border-radius: 999px;
    background: transparent;
    cursor: pointer;
    outline-offset: 14px;
    touch-action: manipulation;
    transition: width 380ms ease;
  }

  #nexa-launcher {
    grid-area: 1 / 1;
    width: 100%;
    height: 100%;
  }

  .face-control.face-control-open {
    z-index: 7;
    width: clamp(128px, 12vw, 160px) !important;
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
      drop-shadow(0 44px 94px rgba(0, 0, 0, 0.62))
      drop-shadow(0 0 36px rgba(116, 240, 227, 0.1));
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
    filter: drop-shadow(0 0 16px rgba(255, 255, 255, 0.38));
    transition: transform 180ms ease;
    transform-origin: center;
  }

  .smile-mark {
    fill: none;
    stroke: #f8fbff;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 12;
    filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.28));
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
    width: min(100%, 1120px);
    min-height: min(100%, 690px);
    pointer-events: none;
  }

  .launcher-tile {
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 50%;
    display: grid;
    width: clamp(124px, 12vw, 178px);
    height: clamp(86px, 8.8vw, 112px);
    min-height: 0;
    grid-template-columns: auto 1fr;
    grid-template-areas:
      "icon copy"
      "meta meta";
    align-content: center;
    gap: 11px 12px;
    overflow: hidden;
    padding: 15px;
    border: 1px solid var(--color-line);
    border-radius: var(--radius-sm);
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

  .launcher-tile:nth-child(1) { transform: translate(-50%, -50%) translate(0, clamp(-310px, -24vw, -228px)); }
  .launcher-tile:nth-child(2) { transform: translate(-50%, -50%) translate(clamp(177px, 18vw, 254px), clamp(-251px, -19vw, -185px)); }
  .launcher-tile:nth-child(3) { transform: translate(-50%, -50%) translate(clamp(285px, 28.5vw, 409px), clamp(-96px, -7.5vw, -71px)); }
  .launcher-tile:nth-child(4) { transform: translate(-50%, -50%) translate(clamp(285px, 28.5vw, 409px), clamp(71px, 7.5vw, 96px)); }
  .launcher-tile:nth-child(5) { transform: translate(-50%, -50%) translate(clamp(177px, 18vw, 254px), clamp(185px, 19vw, 251px)); }
  .launcher-tile:nth-child(6) { transform: translate(-50%, -50%) translate(0, clamp(228px, 24vw, 310px)); }
  .launcher-tile:nth-child(7) { transform: translate(-50%, -50%) translate(clamp(-254px, -18vw, -177px), clamp(185px, 19vw, 251px)); }
  .launcher-tile:nth-child(8) { transform: translate(-50%, -50%) translate(clamp(-409px, -28.5vw, -285px), clamp(71px, 7.5vw, 96px)); }
  .launcher-tile:nth-child(9) { transform: translate(-50%, -50%) translate(clamp(-409px, -28.5vw, -285px), clamp(-96px, -7.5vw, -71px)); }
  .launcher-tile:nth-child(10) { transform: translate(-50%, -50%) translate(clamp(-254px, -18vw, -177px), clamp(-251px, -19vw, -185px)); }

  .launcher-icon {
    position: relative;
    display: grid;
    width: 38px;
    height: 38px;
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
    font-size: 0.75rem;
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

  @media (min-width: 901px) {
    .launcher-grid {}
  }

  @media (max-width: 900px) {
    .nexa-system {
      min-height: auto;
      gap: 18px;
      padding-bottom: 0;
    }

    .system-launcher {
      inset: 0;
      width: 100%;
    }

    .launcher-grid {
      min-height: clamp(420px, 70svh, 610px);
    }

    .launcher-tile:nth-child(1) { transform: translate(-50%, -50%) translate(0, -230px); }
    .launcher-tile:nth-child(2) { transform: translate(-50%, -50%) translate(177px, -186px); }
    .launcher-tile:nth-child(3) { transform: translate(-50%, -50%) translate(285px, -71px); }
    .launcher-tile:nth-child(4) { transform: translate(-50%, -50%) translate(285px, 71px); }
    .launcher-tile:nth-child(5) { transform: translate(-50%, -50%) translate(177px, 186px); }
    .launcher-tile:nth-child(6) { transform: translate(-50%, -50%) translate(0, 230px); }
    .launcher-tile:nth-child(7) { transform: translate(-50%, -50%) translate(-177px, 186px); }
    .launcher-tile:nth-child(8) { transform: translate(-50%, -50%) translate(-285px, 71px); }
    .launcher-tile:nth-child(9) { transform: translate(-50%, -50%) translate(-285px, -71px); }
    .launcher-tile:nth-child(10) { transform: translate(-50%, -50%) translate(-177px, -186px); }

    .launcher-tile {
      width: clamp(94px, 25vw, 142px);
      height: clamp(70px, 13svh, 94px);
      padding: 10px;
      gap: 7px 8px;
    }

    .launcher-icon {
      width: 34px;
      height: 34px;
    }
  }

  @media (max-width: 520px) {
    .nexa-system {
      width: 100%;
      justify-items: center;
    }

    .face-control {
      width: min(76vw, 292px);
    }

    .nexa-system[data-launcher-open="true"] .face-control {
      width: min(31vw, 112px);
    }

    body.face-docked .nexa-system[data-launcher-open="false"] .face-control {
      width: 62px;
    }

    .launcher-grid {
      min-height: min(78svh, 470px);
    }

    .launcher-tile:nth-child(1) { transform: translate(-50%, -50%) translate(0, -24svh); }
    .launcher-tile:nth-child(2) { transform: translate(-50%, -50%) translate(20.7vw, -19.4svh); }
    .launcher-tile:nth-child(3) { transform: translate(-50%, -50%) translate(33.3vw, -7.4svh); }
    .launcher-tile:nth-child(4) { transform: translate(-50%, -50%) translate(33.3vw, 7.4svh); }
    .launcher-tile:nth-child(5) { transform: translate(-50%, -50%) translate(20.7vw, 19.4svh); }
    .launcher-tile:nth-child(6) { transform: translate(-50%, -50%) translate(0, 24svh); }
    .launcher-tile:nth-child(7) { transform: translate(-50%, -50%) translate(-20.7vw, 19.4svh); }
    .launcher-tile:nth-child(8) { transform: translate(-50%, -50%) translate(-33.3vw, 7.4svh); }
    .launcher-tile:nth-child(9) { transform: translate(-50%, -50%) translate(-33.3vw, -7.4svh); }
    .launcher-tile:nth-child(10) { transform: translate(-50%, -50%) translate(-20.7vw, -19.4svh); }

    .launcher-tile {
      width: clamp(64px, 20vw, 82px);
      height: clamp(48px, 10svh, 64px);
      grid-template-columns: 1fr;
      grid-template-areas: "copy";
      padding: 8px;
      text-align: center;
    }

    .launcher-icon,
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
`;export{ne as default};
