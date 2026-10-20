import { useEffect, useRef } from "react";
import { RotatingGlobe } from "@/components/RotatingGlobe";

type Node = { x: number; y: number; vx: number; vy: number; r: number; hot: boolean };

const GOLD = "245, 180, 40";
const WHITE = "200, 215, 240";
const LINK_DIST = 150;

/** Fundo animado: rede de nós conectados, esfera pontilhada e órbitas douradas. */
export function NetworkBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let w = 0;
    let h = 0;
    let nodes: Node[] = [];
    let raf = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(24, Math.min(70, Math.round((w * h) / 14000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 1,
        hot: Math.random() < 0.15,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]!;
          const b = nodes[j]!;
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK_DIST) {
            ctx.strokeStyle = `rgba(${WHITE}, ${(1 - d / LINK_DIST) * 0.22})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      for (const n of nodes) {
        ctx.fillStyle = `rgba(${n.hot ? GOLD : WHITE}, ${n.hot ? 0.95 : 0.7})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="links-glow absolute left-1/2 top-[38%] h-[120vmin] w-[120vmin] -translate-x-1/2 -translate-y-1/2 rounded-full" />
      <RotatingGlobe className="absolute left-1/2 top-[36%] h-[min(80vmin,640px)] w-[min(80vmin,640px)] -translate-x-1/2 -translate-y-1/2" />
      <svg
        viewBox="0 0 200 200"
        className="links-orbit absolute left-1/2 top-[38%] h-[110vmin] w-[110vmin] -translate-x-1/2 -translate-y-1/2"
      >
        <ellipse cx="100" cy="100" rx="96" ry="40" fill="none" stroke="rgb(245 180 40 / 0.55)" strokeWidth="0.5" strokeDasharray="60 240" strokeLinecap="round" transform="rotate(-25 100 100)" />
        <ellipse cx="100" cy="100" rx="96" ry="64" fill="none" stroke="rgb(245 180 40 / 0.35)" strokeWidth="0.4" strokeDasharray="30 270" strokeLinecap="round" transform="rotate(40 100 100)" />
      </svg>
      <canvas ref={ref} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
