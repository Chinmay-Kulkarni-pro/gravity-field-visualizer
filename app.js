const orb = document.getElementById("orb");
const scene = document.getElementById("scene");

const gSlider = document.getElementById("gravity");
const modeSelect = document.getElementById("mode");

const gval = document.getElementById("gval");
const rEl = document.getElementById("r");
const wEl = document.getElementById("w");
const vEl = document.getElementById("v");
const acEl = document.getElementById("ac");
const KEl = document.getElementById("K");
const UEl = document.getElementById("U");
const EEl = document.getElementById("E");

const vVec = document.getElementById("vVec");
const aVec = document.getElementById("aVec");

let angle = 0;

function loop() {
  const g = parseFloat(gSlider.value);
  const mode = modeSelect.value;

  gval.textContent = g.toFixed(1);

  // Base analytic orbit
  let r = 150 - g * 4;
  let omega = 0.01 + g * 0.002;

  angle += omega;

  let x = Math.cos(angle) * r;
  let y = Math.sin(angle) * r;

  // Mode-dependent physics-backed deformations
  if (mode === "elliptical") {
    y *= 0.55;
  }

  if (mode === "precess") {
    angle += 0.002 * Math.sin(angle);
    y *= 0.6;
  }

  // Render orb
  orb.style.left = 210 + x + "px";
  orb.style.top  = 210 + y + "px";

  // Derived physics
  const v = omega * r;
  const ac = (v * v) / r;
  const K = 0.5 * v * v;
  const U = -g * r;
  const E = K + U;

  // Vectors
  vVec.style.left = 210 + x + "px";
  vVec.style.top  = 210 + y + "px";
  vVec.style.width = v * 8 + "px";
  vVec.style.transform = `rotate(${angle + Math.PI/2}rad)`;

  aVec.style.left = 210 + x + "px";
  aVec.style.top  = 210 + y + "px";
  aVec.style.width = ac * 3 + "px";
  aVec.style.transform = `rotate(${angle + Math.PI}rad)`;

  // HUD
  rEl.textContent = r.toFixed(1);
  wEl.textContent = omega.toFixed(3);
  vEl.textContent = v.toFixed(2);
  acEl.textContent = ac.toFixed(2);

  KEl.textContent = K.toFixed(1);
  UEl.textContent = U.toFixed(1);
  EEl.textContent = E.toFixed(1);

  requestAnimationFrame(loop);
}

loop();
