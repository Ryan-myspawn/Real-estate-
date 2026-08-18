// Procedural canvas textures — no network assets, safe for the single-file build.
import * as THREE from "three";

function canvas(w: number, h: number) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  return c;
}

function finish(c: HTMLCanvasElement, repeat = 1): THREE.CanvasTexture {
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(repeat, repeat);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

let _wood: THREE.CanvasTexture | null = null;
/** Oak floor planks with grain. */
export function woodTexture(): THREE.CanvasTexture {
  if (_wood) return _wood;
  const c = canvas(512, 512);
  const g = c.getContext("2d")!;
  g.fillStyle = "#C29A6C";
  g.fillRect(0, 0, 512, 512);
  const rows = 8;
  for (let r = 0; r < rows; r++) {
    const y = (512 / rows) * r;
    const tone = 195 + Math.floor(Math.random() * 26) - 13;
    g.fillStyle = `rgb(${tone},${Math.floor(tone * 0.78)},${Math.floor(tone * 0.55)})`;
    g.fillRect(0, y, 512, 512 / rows - 1.5);
    // grain streaks
    for (let i = 0; i < 46; i++) {
      g.strokeStyle = `rgba(120,86,52,${0.05 + Math.random() * 0.09})`;
      g.lineWidth = 0.8 + Math.random() * 1.4;
      const gy = y + Math.random() * (512 / rows - 2);
      g.beginPath();
      g.moveTo(0, gy);
      g.bezierCurveTo(150, gy + (Math.random() * 6 - 3), 360, gy + (Math.random() * 6 - 3), 512, gy);
      g.stroke();
    }
    // plank seams
    g.fillStyle = "rgba(90,64,40,0.55)";
    g.fillRect(0, y + 512 / rows - 1.5, 512, 1.5);
    const seams = 2 + Math.floor(Math.random() * 2);
    for (let s = 0; s < seams; s++) {
      g.fillRect(Math.random() * 512, y, 1.4, 512 / rows);
    }
  }
  _wood = finish(c, 3);
  return _wood;
}

let _walnut: THREE.CanvasTexture | null = null;
/** Dark walnut veneer. */
export function walnutTexture(): THREE.CanvasTexture {
  if (_walnut) return _walnut;
  const c = canvas(256, 256);
  const g = c.getContext("2d")!;
  g.fillStyle = "#5A4130";
  g.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 90; i++) {
    g.strokeStyle = `rgba(35,22,13,${0.08 + Math.random() * 0.1})`;
    g.lineWidth = 0.7 + Math.random() * 1.6;
    const y = Math.random() * 256;
    g.beginPath();
    g.moveTo(0, y);
    g.bezierCurveTo(80, y + (Math.random() * 8 - 4), 180, y + (Math.random() * 8 - 4), 256, y);
    g.stroke();
  }
  for (let i = 0; i < 40; i++) {
    g.strokeStyle = `rgba(150,110,75,${0.05 + Math.random() * 0.08})`;
    g.lineWidth = 0.6;
    const y = Math.random() * 256;
    g.beginPath();
    g.moveTo(0, y);
    g.lineTo(256, y + Math.random() * 4 - 2);
    g.stroke();
  }
  _walnut = finish(c, 1.5);
  return _walnut;
}

let _marble: THREE.CanvasTexture | null = null;
/** White marble with soft gray veining. */
export function marbleTexture(): THREE.CanvasTexture {
  if (_marble) return _marble;
  const c = canvas(512, 512);
  const g = c.getContext("2d")!;
  const bg = g.createLinearGradient(0, 0, 512, 512);
  bg.addColorStop(0, "#F4F1EC");
  bg.addColorStop(1, "#ECE8E1");
  g.fillStyle = bg;
  g.fillRect(0, 0, 512, 512);
  for (let v = 0; v < 14; v++) {
    let x = Math.random() * 512;
    let y = -20;
    g.strokeStyle = `rgba(140,138,132,${0.10 + Math.random() * 0.16})`;
    g.lineWidth = 0.8 + Math.random() * 2.2;
    g.beginPath();
    g.moveTo(x, y);
    while (y < 540) {
      x += Math.random() * 46 - 23;
      y += 14 + Math.random() * 26;
      g.lineTo(x, y);
    }
    g.stroke();
  }
  g.filter = "blur(1px)";
  g.drawImage(c, 0, 0);
  g.filter = "none";
  _marble = finish(c, 1);
  return _marble;
}

let _plaster: THREE.CanvasTexture | null = null;
/** Barely-there lime plaster noise. */
export function plasterTexture(): THREE.CanvasTexture {
  if (_plaster) return _plaster;
  const c = canvas(256, 256);
  const g = c.getContext("2d")!;
  g.fillStyle = "#F1ECE3";
  g.fillRect(0, 0, 256, 256);
  const img = g.getImageData(0, 0, 256, 256);
  for (let i = 0; i < img.data.length; i += 4) {
    const n = Math.random() * 10 - 5;
    img.data[i] += n;
    img.data[i + 1] += n;
    img.data[i + 2] += n;
  }
  g.putImageData(img, 0, 0);
  _plaster = finish(c, 2);
  return _plaster;
}

let _fabric: THREE.CanvasTexture | null = null;
/** Fine bouclé weave, tinted per material color. */
export function fabricTexture(): THREE.CanvasTexture {
  if (_fabric) return _fabric;
  const c = canvas(128, 128);
  const g = c.getContext("2d")!;
  g.fillStyle = "#FFFFFF";
  g.fillRect(0, 0, 128, 128);
  for (let y = 0; y < 128; y += 2) {
    for (let x = 0; x < 128; x += 2) {
      const n = 235 + Math.floor(Math.random() * 20);
      g.fillStyle = `rgb(${n},${n},${n})`;
      g.fillRect(x, y, 2, 2);
    }
  }
  _fabric = finish(c, 6);
  return _fabric;
}

let _grass: THREE.CanvasTexture | null = null;
/** Mottled lawn. */
export function grassTexture(): THREE.CanvasTexture {
  if (_grass) return _grass;
  const c = canvas(256, 256);
  const g = c.getContext("2d")!;
  g.fillStyle = "#93A883";
  g.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 2600; i++) {
    const t = Math.random();
    g.fillStyle = t > 0.5 ? `rgba(122,140,104,${0.2 + Math.random() * 0.3})` : `rgba(158,175,138,${0.2 + Math.random() * 0.3})`;
    g.beginPath();
    g.arc(Math.random() * 256, Math.random() * 256, 1 + Math.random() * 2.4, 0, Math.PI * 2);
    g.fill();
  }
  _grass = finish(c, 18);
  return _grass;
}
