import { writeFile } from "node:fs/promises";

const [, , debugPort, appPort, outputDirectory] = process.argv;

async function waitForTargets() {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${debugPort}/json`);
      if (response.ok) return response.json();
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error("Chrome debugging target did not become ready.");
}

const targets = await waitForTargets();
const page = targets.find((target) => target.type === "page");
if (!page) throw new Error("No Chrome page target found.");

const socket = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  socket.addEventListener("open", resolve, { once: true });
  socket.addEventListener("error", reject, { once: true });
});

let nextId = 0;
const pending = new Map();

socket.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);
  if (!message.id || !pending.has(message.id)) return;
  const { resolve, reject } = pending.get(message.id);
  pending.delete(message.id);
  if (message.error) reject(new Error(message.error.message));
  else resolve(message.result);
});

function send(method, params = {}) {
  const id = ++nextId;
  socket.send(JSON.stringify({ id, method, params }));
  return new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
}

await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", {
  width: 390,
  height: 844,
  deviceScaleFactor: 1,
  mobile: true,
  screenWidth: 390,
  screenHeight: 844,
});
await send("Page.navigate", { url: `http://127.0.0.1:${appPort}` });
await new Promise((resolve) => setTimeout(resolve, 3000));

const layout = await send("Runtime.evaluate", {
  expression: `JSON.stringify({
    viewport: [innerWidth, innerHeight],
    title: (() => { const r = document.querySelector('#hero-title').getBoundingClientRect(); return [r.left, r.right, r.width]; })(),
    portrait: (() => { const r = document.querySelector('#hero-title + div').getBoundingClientRect(); return [r.left, r.right, r.width]; })()
  })`,
  returnByValue: true,
});

const normal = await send("Page.captureScreenshot", {
  format: "png",
  captureBeyondViewport: false,
  fromSurface: true,
});
await writeFile(`${outputDirectory}/mobile.png`, Buffer.from(normal.data, "base64"));

await send("Emulation.setDeviceMetricsOverride", {
  width: 1440,
  height: 1000,
  deviceScaleFactor: 1,
  mobile: false,
  screenWidth: 1440,
  screenHeight: 1000,
});
await send("Emulation.setTouchEmulationEnabled", { enabled: false });
await send("Page.reload", { ignoreCache: true });
await new Promise((resolve) => setTimeout(resolve, 2600));
await send("Input.dispatchMouseEvent", {
  type: "mouseMoved",
  x: 720,
  y: 530,
  button: "none",
  pointerType: "mouse",
});
await new Promise((resolve) => setTimeout(resolve, 500));

const hoverState = await send("Runtime.evaluate", {
  expression: `JSON.stringify({
    viewport: [innerWidth, innerHeight],
    hoverNone: matchMedia('(hover: none)').matches,
    hoverCapable: matchMedia('(hover: hover)').matches,
    overlay: (() => { const s = getComputedStyle(document.querySelector('.hover-color-reveal-image__overlay')); return { display: s.display, opacity: s.opacity, mask: s.maskImage }; })()
  })`,
  returnByValue: true,
});

const hover = await send("Page.captureScreenshot", {
  format: "png",
  captureBeyondViewport: false,
  fromSurface: true,
});
await writeFile(`${outputDirectory}/hover.png`, Buffer.from(hover.data, "base64"));

process.stdout.write(JSON.stringify({
  mobile: JSON.parse(layout.result.value),
  hover: JSON.parse(hoverState.result.value),
}));
socket.close();
