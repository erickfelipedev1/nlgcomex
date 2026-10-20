import { useEffect, useRef } from "react";
import { LAND_B64, LAND_H, LAND_W } from "@/lib/land-mask";

const RAD = Math.PI / 180;
const STEP = 3; // graus entre pontos da malha
const TILT = 18 * RAD;

const land = (() => {
  const bin = atob(LAND_B64);
  return (lat: number, lon: number) => {
    if (lat < -58) return false; // sem Antártida
    const x = Math.min(LAND_W - 1, Math.floor(((lon + 180) / 360) * LAND_W));
    const y = Math.min(LAND_H - 1, Math.floor(((90 - lat) / 180) * LAND_H));
    const i = y * LAND_W + x;
    return ((bin.charCodeAt(i >> 3) >> (7 - (i & 7))) & 1) === 1;
  };
})();

type Pt = { lat: number; lon: number };
const SANTOS: Pt = { lat: -23.9, lon: -46.3 };
const SHANGHAI: Pt = { lat: 31.2, lon: 121.5 };

/** Direção unitária de (lat, lon). */
const vec = (lat: number, lon: number) => {
  const la = lat * RAD;
  const lo = lon * RAD;
  return [Math.cos(la) * Math.sin(lo), Math.sin(la), Math.cos(la) * Math.cos(lo)] as const;
};

/** Globo de pontos girando, com rota Santos → Shanghai. */
export function RotatingGlobe({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const dots: { x: number; y: number; z: number }[] = [];
    for (let lat = -58; lat <= 90; lat += STEP) {
      const stepLon = STEP / Math.max(0.25, Math.cos(lat * RAD));
      for (let lon = -180; lon < 180; lon += stepLon) {
        if (land(lat, lon)) {
          const [x, y, z] = vec(lat, lon);
          dots.push({ x, y, z });
        }
      }
    }

    let size = 0;
    let raf = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      size = canvas.clientWidth;
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // Gira o ponto em torno de Y (rotação) e depois inclina em X.
    const rotate = (x: number, y: number, z: number, rot: number) => {
      const x1 = x * Math.cos(rot) + z * Math.sin(rot);
      const z1 = -x * Math.sin(rot) + z * Math.cos(rot);
      const y2 = y * Math.cos(TILT) - z1 * Math.sin(TILT);
      const z2 = y * Math.sin(TILT) + z1 * Math.cos(TILT);
      return { x: x1, y: y2, z: z2 };
    };

    const arc = (a: Pt, b: Pt, rot: number, r: number, c: number, progress: number) => {
      const [ax, ay, az] = vec(a.lat, a.lon);
      const [bx, by, bz] = vec(b.lat, b.lon);
      const omega = Math.acos(ax * bx + ay * by + az * bz);
      const steps = 60;
      let prev: { sx: number; sy: number; vis: boolean } | null = null;
      for (let i = 0; i <= steps * progress; i++) {
        const t = i / steps;
        const k1 = Math.sin((1 - t) * omega) / Math.sin(omega);
        const k2 = Math.sin(t * omega) / Math.sin(omega);
        const lift = 1 + 0.18 * Math.sin(Math.PI * t);
        const p = rotate((ax * k1 + bx * k2) * lift, (ay * k1 + by * k2) * lift, (az * k1 + bz * k2) * lift, rot);
        const cur = { sx: c + p.x * r, sy: c - p.y * r, vis: p.z > -0.05 };
        if (prev && prev.vis && cur.vis) {
          ctx.strokeStyle = "rgba(245, 180, 40, 0.9)";
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.moveTo(prev.sx, prev.sy);
          ctx.lineTo(cur.sx, cur.sy);
          ctx.stroke();
        }
        prev = cur;
      }
    };

    const marker = (p: Pt, rot: number, r: number, c: number) => {
      const [x, y, z] = vec(p.lat, p.lon);
      const q = rotate(x, y, z, rot);
      if (q.z <= 0) return;
      ctx.fillStyle = "rgba(245, 180, 40, 1)";
      ctx.beginPath();
      ctx.arc(c + q.x * r, c - q.y * r, 3.2, 0, Math.PI * 2);
      ctx.fill();
    };

    const start = performance.now();
    const draw = (now: number) => {
      const t = (now - start) / 1000;
      const rot = t * 0.22;
      const c = size / 2;
      const r = size * 0.46;
      ctx.clearRect(0, 0, size, size);

      const halo = ctx.createRadialGradient(c, c, r * 0.9, c, c, r * 1.08);
      halo.addColorStop(0, "rgba(120, 160, 255, 0.16)");
      halo.addColorStop(1, "rgba(120, 160, 255, 0)");
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(c, c, r * 1.08, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(245, 180, 40, 0.25)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(c, c, r, 0, Math.PI * 2);
      ctx.stroke();

      for (const d of dots) {
        const p = rotate(d.x, d.y, d.z, rot);
        if (p.z <= 0) continue;
        ctx.fillStyle = `rgba(190, 210, 245, ${0.1 + p.z * 0.42})`;
        ctx.beginPath();
        ctx.arc(c + p.x * r, c - p.y * r, 1 + p.z * 0.9, 0, Math.PI * 2);
        ctx.fill();
      }

      const cycle = (t % 6) / 6;
      arc(SANTOS, SHANGHAI, rot, r, c, Math.min(1, cycle * 1.6));
      marker(SANTOS, rot, r, c);
      marker(SHANGHAI, rot, r, c);
      raf = requestAnimationFrame(draw);
    };

    resize();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={className} />;
}
