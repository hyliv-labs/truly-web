"use client";

import { useEffect, useRef, useState } from "react";

const REPO_URL = "https://github.com/hyliv-labs/truly-extension";
const DOWNLOAD_URL =
  "https://github.com/hyliv-labs/truly-extension/releases/download/v0.0.2/truly-extension-v0.0.2-chrome.zip";

const C = {
  acc: "#c6ff3d",
  down: "#ff5ca8",
  surf: "#15111f",
  line: "#2e2840",
  text: "#f2f0f7",
  muted: "#a39fb3",
};

/** Every app appears once. The carousel duplicates the strip only to loop it. */
const APPS: { name: string; file: string }[] = [
  { name: "Lighter", file: "lighter" },
  { name: "Uniswap", file: "uniswap" },
  { name: "Hyperliquid", file: "hyperliquid" },
  { name: "Polymarket", file: "polymarket" },
  { name: "trade.xyz", file: "tradexyz" },
  { name: "GMGN", file: "gmgn" },
  { name: "Aave", file: "aave" },
  { name: "Compound", file: "compound" },
  { name: "Ethena", file: "ethena" },
  { name: "Lido", file: "lido" },
  { name: "Morpho", file: "morpho" },
  { name: "Pendle", file: "pendle" },
  { name: "Curve", file: "curve" },
  { name: "GMX", file: "gmx" },
  { name: "dYdX", file: "dydx" },
  { name: "Euler", file: "euler" },
  { name: "Balancer", file: "balancer" },
  { name: "ether.fi", file: "etherfi" },
  { name: "Fluid", file: "fluid" },
  { name: "1inch", file: "1inch" },
  { name: "Spark", file: "spark" },
];
const logo = (file: string) => `/ghosty/logos/logo-${file}.png`;

type Chip = { x: number; y: number; vy: number; app: string; act: string; amt: string; state: 0 | 1 | 2; t: number; a: number };
type Candle = { o: number; c: number; h: number; l: number };

const candle = (o: number, c: number): Candle => ({ o, c, h: Math.max(o, c) + Math.random() * 7, l: Math.min(o, c) - Math.random() * 7 });

function fit(c: HTMLCanvasElement & { _w?: number; _h?: number }) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = c.clientWidth, h = c.clientHeight;
  if (c._w !== w || c._h !== h) {
    c._w = w; c._h = h; c.width = w * dpr; c.height = h * dpr;
    c.getContext("2d")!.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  return { w, h };
}

export function GhostyLanding() {
  const [revealed, setRevealed] = useState(false);
  const [demo, setDemo] = useState(0);

  const bgRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartGhostRef = useRef<HTMLImageElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const faceRef = useRef<HTMLDivElement>(null);
  const eyesRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: -9999, y: -9999, cx: 0, cy: 0 };
    const onMove = (e: PointerEvent) => {
      pointer.cx = e.clientX; pointer.cy = e.clientY;
      const c = bgRef.current;
      if (c) { const b = c.getBoundingClientRect(); pointer.x = e.clientX - b.left; pointer.y = e.clientY - b.top; }
    };
    window.addEventListener("pointermove", onMove);
    const timer = reduced ? undefined : window.setInterval(() => setDemo((d) => (d + 1) % 4), 2600);

    let chips: Chip[] = [];
    let lastSpawn = 0;
    const candles: Candle[] = [];
    let p = 2400;
    for (let i = 0; i < 40; i++) { const o = p; p += (Math.random() - 0.44) * 16; candles.push(candle(o, p)); }
    let scroll = 0, target = p, lo: number | null = null, hi = 0, gy: number | null = null, nextTarget = 0;

    const look = () => {
      const face = faceRef.current, eyes = eyesRef.current;
      if (!face || !eyes || reduced) return;
      const b = face.getBoundingClientRect();
      const dx = pointer.cx - (b.left + b.width / 2), dy = pointer.cy - (b.top + b.height * 0.4);
      const d = Math.hypot(dx, dy) || 1, reach = Math.min(1, d / 420), nx = dx / d, ny = dy / d;
      face.style.transform = `rotateY(${(nx * 20 * reach).toFixed(2)}deg) rotateX(${(-ny * 14 * reach).toFixed(2)}deg)`;
      eyes.style.transform = `translate(${(nx * 8 * reach).toFixed(1)}px,${(ny * 6 * reach).toFixed(1)}px)`;
    };

    const drawChips = (t: number, dt: number) => {
      const c = bgRef.current; if (!c) return;
      const { w, h } = fit(c);
      const ctx = c.getContext("2d")!;
      const cb = c.getBoundingClientRect();
      const s = stageRef.current?.getBoundingClientRect();
      const zone = s ? { l: s.left - cb.left - 40, r: s.right - cb.left + 40, t: s.top - cb.top - 30, b: s.bottom - cb.top + 30 } : null;
      const apps = ["Lighter", "Uniswap", "Hyperliquid", "Aave", "Lido", "GMX", "Pendle", "Curve"];
      const acts = ["long ETH", "USDC to ETH", "short BTC", "supply USDC", "stake ETH", "long SOL", "buy PT", "swap USDC"];
      if (t - lastSpawn > 520 && chips.length < 28) {
        lastSpawn = t;
        const k = (Math.random() * apps.length) | 0;
        const amt = (Math.random() * 25000 + 40).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        chips.push({ x: Math.random() * w, y: h + 20, vy: 0.018 + Math.random() * 0.022, app: apps[k], act: acts[k], amt, state: 0, t: 0, a: 0 });
      }
      const lineY = h * 0.5;
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = C.acc; ctx.globalAlpha = 0.22; ctx.setLineDash([2, 10]); ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(0, lineY); ctx.lineTo(w, lineY); ctx.stroke(); ctx.setLineDash([]);
      ctx.font = '500 13px "JetBrains Mono", ui-monospace, monospace'; ctx.textBaseline = "middle";
      for (const ch of chips) {
        ch.y -= ch.vy * dt;
        if (ch.state === 0 && (ch.y < lineY || Math.hypot(ch.x - pointer.x, ch.y - pointer.y) < 130)) { ch.state = 1; ch.t = t; }
        if (ch.state === 1 && t - ch.t > 450) ch.state = 2;
        let amt = ch.amt;
        if (ch.state === 1) amt = ch.amt.replace(/[0-9]/g, () => "0123456789"[(Math.random() * 10) | 0]);
        if (ch.state === 2) { const pos = Math.floor(t / 110) % (ch.amt.length + 6); amt = ch.amt.replace(/[0-9,.]/g, (_m, i: number) => (i === pos || i === pos - 1 ? "#" : "*")); }
        const label = `${ch.app}  ${ch.act}  `;
        const wl = ctx.measureText(label).width, wa = ctx.measureText(`${amt} USDC`).width;
        const cw = wl + wa + 28, chh = 32, x = ch.x - cw / 2, y = ch.y - chh / 2;
        let want = Math.max(0, Math.min(1, ch.y / 140, (h - ch.y + 20) / 80));
        if (zone && x + cw > zone.l && x < zone.r && y + chh > zone.t && y < zone.b) want = 0;
        ch.a += (want - ch.a) * Math.min(1, dt / 220);
        if (ch.a < 0.01) continue;
        ctx.globalAlpha = 0.9 * ch.a;
        ctx.fillStyle = C.surf; ctx.beginPath(); ctx.roundRect(x, y, cw, chh, 16); ctx.fill();
        ctx.strokeStyle = ch.state === 2 ? C.acc : C.line; ctx.beginPath(); ctx.roundRect(x, y, cw, chh, 16); ctx.stroke();
        ctx.fillStyle = C.muted; ctx.fillText(label, x + 14, ch.y);
        ctx.fillStyle = ch.state === 0 ? C.text : C.acc; ctx.fillText(`${amt} USDC`, x + 14 + wl, ch.y);
      }
      ctx.globalAlpha = 1;
      chips = chips.filter((ch) => ch.y > -40);
    };

    const drawChart = (t: number, dt: number) => {
      const c = chartRef.current; if (!c) return;
      const { w, h } = fit(c);
      const ctx = c.getContext("2d")!;
      const n = 36, cw = w / n;
      if (t > nextTarget) { nextTarget = t + 260; target += (Math.random() - 0.42) * 7; }
      const live = candles[candles.length - 1];
      live.c += (target - live.c) * Math.min(1, dt / 160);
      live.h = Math.max(live.h, live.c); live.l = Math.min(live.l, live.c);
      scroll += dt * 0.022;
      if (scroll >= cw) { scroll -= cw; candles.push(candle(live.c, live.c)); if (candles.length > n + 2) candles.shift(); }
      let l = Infinity, u = -Infinity;
      for (const k of candles) { l = Math.min(l, k.l); u = Math.max(u, k.h); }
      if (lo === null) { lo = l; hi = u; }
      lo += (l - lo) * Math.min(1, dt / 400); hi += (u - hi) * Math.min(1, dt / 400);
      const pad = 30, Y = (v: number) => pad + (hi - v) / (hi - (lo as number) || 1) * (h - pad * 2);
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = "rgba(255,255,255,.05)"; ctx.lineWidth = 1;
      for (let g = 1; g < 4; g++) { ctx.beginPath(); ctx.moveTo(0, (h / 4) * g); ctx.lineTo(w, (h / 4) * g); ctx.stroke(); }
      const off = (candles.length - n) * cw + scroll;
      candles.forEach((k, i) => {
        const x = i * cw - off + cw / 2 - 64;
        if (x < -cw || x > w - 64) return;
        const col = k.c >= k.o ? C.acc : C.down;
        ctx.strokeStyle = col; ctx.beginPath(); ctx.moveTo(x, Y(k.h)); ctx.lineTo(x, Y(k.l)); ctx.stroke();
        const yo = Y(Math.max(k.o, k.c)), yc = Y(Math.min(k.o, k.c));
        ctx.fillStyle = col; ctx.fillRect(x - cw * 0.3, yo, cw * 0.6, Math.max(1.5, yc - yo));
      });
      const py = Y(live.c);
      ctx.setLineDash([4, 4]); ctx.strokeStyle = "rgba(255,255,255,.4)";
      ctx.beginPath(); ctx.moveTo(0, py); ctx.lineTo(w, py); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = C.text; ctx.font = '11px "JetBrains Mono", monospace'; ctx.textAlign = "left";
      ctx.fillText(live.c.toFixed(2), 10, py < 44 ? py + 15 : py - 7);
      if (gy === null) gy = py;
      gy += (py - gy) * Math.min(1, dt / 120);
      if (chartGhostRef.current) chartGhostRef.current.style.transform = `translate3d(${w - 52}px,${(gy - 30).toFixed(1)}px,0)`;
    };

    let raf = 0, last = performance.now(), drawn = false;
    const loop = (t: number) => {
      const dt = Math.min(50, t - last); last = t;
      look();
      if (!reduced || !drawn) { drawn = true; drawChips(t, dt); drawChart(t, dt); }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.clearInterval(timer);
      cancelAnimationFrame(raf);
    };
  }, []);

  const op = (on: boolean) => ({ opacity: on ? 1 : 0 });
  const wallet = [
    { name: "Lighter", file: "lighter", amount: "10.00" },
    { name: "Uniswap", file: "uniswap", amount: "25.00" },
    { name: "Hyperliquid", file: "hyperliquid", amount: "40.00" },
  ];

  return (
    <div className="gx-page">
      <div className="gx-glow-a" aria-hidden="true" />
      <div className="gx-glow-b" aria-hidden="true" />
      <div className="gx-scan" aria-hidden="true" />

      <section className="gx-hero">
        <canvas ref={bgRef} className="gx-hero-canvas" aria-hidden="true" />
        <div className="gx-hero-blur" aria-hidden="true" />
        <header className="gx-header gx-wrap">
          <a href="#top" aria-label="Ghosty home" className="gx-brand">
            <img src="/ghosty/ghost.png" alt="" width={30} height={30} />
            <span className="gx-display" style={{ fontSize: 18 }}>Ghosty</span>
          </a>
          <nav className="gx-nav" aria-label="Primary">
            <a href="#apps">Apps</a>
            <a href="#trust">Why trust it</a>
            <a href={REPO_URL} target="_blank" rel="noopener noreferrer">Source</a>
            <a className="gx-cta" href={DOWNLOAD_URL} style={{ padding: "9px 16px" }}>Add extension</a>
          </nav>
        </header>

        <div className="gx-hero-grid gx-wrap">
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <h1 className="gx-h1 gx-display gx-glitch">Go ghost on any app.</h1>
            <p className="gx-lead">Privacy wherever you are. One widget, any app.</p>
            <a className="gx-cta" href={DOWNLOAD_URL} style={{ alignSelf: "flex-start", fontSize: 16, padding: "14px 26px" }}>Get Ghosty</a>
            <ol className="gx-install">
              <li>Download the zip and unzip it</li>
              <li>Open chrome://extensions</li>
              <li>Turn on Developer mode</li>
              <li>Load unpacked, then choose the folder</li>
            </ol>
          </div>

          <div ref={stageRef} className="gx-stage">
            <div className="gx-ghost gx-bob" aria-hidden="true">
              <div className="gx-ghost-inner gx-phase">
                <div ref={faceRef} className="gx-face" style={{ position: "absolute", inset: 0 }}>
                  <img src="/ghosty/ghost-body.png" alt="" />
                  <img ref={eyesRef} className="gx-eyes" src="/ghosty/ghost-eyes.png" alt="" />
                </div>
              </div>
            </div>
            <div className="gx-widget gx-card" style={{ padding: 16, gap: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <span className="gx-display" style={{ fontSize: 16 }}>Ghosty</span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--gx-acc)" }}>
                  <span className="gx-pulse" style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--gx-acc)", display: "inline-block" }} />Ghost on
                </span>
              </div>
              <div className="gx-widget-card">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 13, color: "var(--gx-muted)" }}>Private balance</span>
                  <button type="button" className="gx-btn" aria-pressed={revealed} onClick={() => setRevealed((r) => !r)}
                    style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "transparent", border: "1px solid transparent", color: "var(--gx-text)", fontSize: 13, padding: "4px 8px", borderRadius: 8 }}>
                    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></svg>
                    {revealed ? "Hide" : "Reveal"}
                  </button>
                </div>
                <div className="gx-stack" style={{ margin: "4px 0 10px" }}>
                  <span className="gx-mono gx-shim" style={{ fontSize: 26, ...op(!revealed) }}>*****.**</span>
                  <span className="gx-mono" style={{ fontSize: 26, ...op(revealed) }}>48.21 <span style={{ fontSize: 14, color: "var(--gx-muted)" }}>USDC</span></span>
                </div>
                {wallet.map((r) => (
                  <div key={r.name} className="gx-row">
                    <span style={{ display: "flex", alignItems: "center", gap: 9 }}>
                      <img src={logo(r.file)} alt="" width={24} height={24} style={{ borderRadius: 7 }} />
                      <span style={{ fontSize: 14, fontWeight: 500 }}>{r.name}</span>
                    </span>
                    <span className="gx-stack" style={{ justifyItems: "end" }}>
                      <span className="gx-mono gx-shim" style={{ fontSize: 13, ...op(!revealed) }}>*****</span>
                      <span className="gx-mono" style={{ fontSize: 13, ...op(revealed) }}>{r.amount}</span>
                    </span>
                  </div>
                ))}
              </div>
              <div className="gx-actions">
                <button type="button" className="gx-action gx-btn"><svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4v15M6 13l6 6 6-6" /></svg>Shield</button>
                <button type="button" className="gx-action primary gx-btn"><svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 20V11a7 7 0 0 1 14 0v9l-2.5-2-2.3 2-2.2-2-2.2 2-2.3-2z" /><path d="M9.5 11h.01M14.5 11h.01" /></svg>Go ghost</button>
                <button type="button" className="gx-action gx-btn"><svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20V5M6 11l6-6 6 6" /></svg>Return</button>
              </div>
            </div>
          </div>
        </div>
        <p className="gx-hint">Every amount that drifts past the line gets shielded. So does anything your cursor touches.</p>

        <div className="gx-partners">
          <img className="gx-partner-ef" src="/logos/ef-foundation-white.png" alt="Ethereum Foundation" />
          <span className="gx-partner-sep" aria-hidden="true" />
          <div className="gx-partner">
            <img className="gx-partner-uni" src="/ghosty/logos/logo-uniswap.png" alt="" />
            <span>Uniswap</span>
          </div>
        </div>
      </section>

      <section id="apps" className="gx-section">
        <div className="gx-wrap" style={{ display: "flex", flexDirection: "column", gap: 36 }}>
          <div className="gx-apps-head">
            <h2 className="gx-section-title" style={{ maxWidth: "13em" }}>Anonymity mode, on the apps you already use.</h2>
            <p style={{ margin: 0, maxWidth: "22em", fontSize: 16, lineHeight: 1.6, color: "var(--gx-body)" }}>Stay on the app. Tap Go ghost. The app meets a private account with a balance and nothing behind it.</p>
          </div>

          <div className="gx-marquee">
            <div className="gx-track">
              {[0, 1].map((copy) => (
                <div key={copy} style={{ display: "flex" }} aria-hidden={copy === 1 ? true : undefined}>
                  {APPS.map((a, i) => (
                    <div key={a.name} className="gx-logo gx-float" title={a.name} style={{ animationDelay: `${-(i * 0.61).toFixed(2)}s` }}>
                      <img src={logo(a.file)} alt={copy === 0 ? a.name : ""} width={50} height={50} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="gx-demos">
            <div className="gx-card">
              <h3>Trade privately</h3>
              <div className="gx-chart">
                <canvas ref={chartRef} aria-hidden="true" />
                <img ref={chartGhostRef} src="/ghosty/ghost.png" alt="" width={40} height={40} style={{ position: "absolute", left: 0, top: 0, willChange: "transform" }} />
                <span className="gx-mono" style={{ position: "absolute", left: 12, top: 10, fontSize: 12, color: "var(--gx-muted)" }}>ETH-PERP</span>
                <span className="gx-stack" style={{ position: "absolute", right: 10, top: 8, justifyItems: "end" }}>
                  <span className="gx-chip warn" style={op(demo === 0)}>yourname.eth</span>
                  <span className="gx-chip acc" style={op(demo !== 0)}>Private account</span>
                </span>
              </div>
              <div className="gx-cells">
                <div className="gx-cell"><span className="gx-label">Side</span><span style={{ fontWeight: 600, color: "var(--gx-acc)" }}>Long 5x</span></div>
                <div className="gx-cell"><span className="gx-label">Margin</span><span className="gx-stack"><span className="gx-mono" style={op(demo < 2)}>250.00</span><span className="gx-mono gx-shim" style={op(demo >= 2)}>******</span></span></div>
                <div className="gx-cell"><span className="gx-label">Paid from</span><span className="gx-stack"><span style={op(demo === 0)}>Your wallet</span><span style={{ color: "var(--gx-acc)", ...op(demo !== 0) }}>Shielded</span></span></div>
              </div>
              <div className="gx-public">
                <span style={{ color: "var(--gx-muted)" }}>What everyone else sees</span>
                <span className="gx-stack" style={{ justifyItems: "end" }}>
                  <span className="gx-mono" style={{ color: "var(--gx-warn-tx)", ...op(demo === 0) }}>yourname.eth, 250.00</span>
                  <span className="gx-mono" style={op(demo !== 0)}>private account, <span className="gx-shim">******</span></span>
                </span>
              </div>
            </div>

            <div className="gx-card">
              <h3>Private swaps</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <div className="gx-swapbox">
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}><span className="gx-label">You pay</span>
                    <span className="gx-stack"><span className="gx-mono" style={{ fontSize: 22, ...op(demo < 2) }}>1,000.00</span><span className="gx-mono gx-shim" style={{ fontSize: 22, ...op(demo >= 2) }}>********</span></span></div>
                  <span className="gx-token"><i style={{ background: "#2775CA" }}>$</i>USDC</span>
                </div>
                <div className="gx-swapbtn" style={{ borderColor: demo >= 1 ? "var(--gx-acc)" : undefined, transform: `rotateY(${demo >= 2 ? 180 : 0}deg) translateY(${demo === 2 ? -3 : 0}px)` }}>
                  <img src="/ghosty/ghost.png" alt="" width={34} height={34} />
                </div>
                <div className="gx-swapbox">
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}><span className="gx-label">You receive</span>
                    <span className="gx-stack"><span className="gx-mono" style={{ fontSize: 22, ...op(demo < 2) }}>0.4213</span><span className="gx-mono gx-shim" style={{ fontSize: 22, ...op(demo >= 2) }}>******</span></span></div>
                  <span className="gx-token"><i style={{ background: "#8A92B2" }}>&#926;</i>ETH</span>
                </div>
              </div>
              <div className="gx-progress" style={{ background: demo === 0 ? "var(--gx-surf2)" : "var(--gx-acc)" }}>
                <div className="gx-progress-fill" style={{ width: demo === 0 ? "0%" : demo === 1 ? "40%" : "100%" }} />
                <span style={{ color: "var(--gx-text)", ...op(demo === 0) }}>Swap</span>
                <span style={{ color: "var(--gx-on-acc)", ...op(demo === 1) }}>Paying from your shielded balance</span>
                <span style={{ color: "var(--gx-on-acc)", ...op(demo === 2) }}>Swapping privately</span>
                <span style={{ color: "var(--gx-on-acc)", ...op(demo === 3) }}>Done. ETH shielded back.</span>
              </div>
              <div className="gx-public">
                <span style={{ color: "var(--gx-muted)" }}>What everyone else sees</span>
                <span className="gx-stack" style={{ justifyItems: "end" }}>
                  <span className="gx-mono" style={{ color: "var(--gx-warn-tx)", ...op(demo === 0) }}>yourname.eth, 1,000.00</span>
                  <span className="gx-mono" style={op(demo !== 0)}>private account, <span className="gx-shim">********</span></span>
                </span>
              </div>
            </div>
          </div>
          <p style={{ margin: 0, textAlign: "center", fontSize: 13, color: "var(--gx-muted)" }}>
            Live on Lighter and Uniswap today, more apps next. Ghosty hides who you are, not what you trade: positions stay public and the app still sees your IP. Details in the{" "}
            <a href={REPO_URL} target="_blank" rel="noopener noreferrer">README</a>.
          </p>
        </div>
      </section>

      <section id="trust" className="gx-section">
        <div className="gx-wrap" style={{ display: "flex", flexDirection: "column", gap: 38 }}>
          <h2 className="gx-section-title">No one to trust. Including us.</h2>
          <div className="gx-trust">
            <div className="gx-trust-item">
              <svg className="gx-i" aria-hidden="true" width="40" height="40" viewBox="0 0 40 40" fill="none" stroke={C.acc} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="8" y="8" width="24" height="10" rx="2.5" /><rect x="8" y="22" width="24" height="10" rx="2.5" /><circle className="gx-led" cx="13" cy="13" r="1.2" fill={C.acc} /><circle className="gx-led l2" cx="13" cy="27" r="1.2" fill={C.acc} /><path className="gx-strike" d="M5 35 35 5" stroke={C.down} strokeWidth="2.5" /></svg>
              <h3>No Ghosty servers</h3>
              <p>Nothing of ours sits between you and the chain.</p>
            </div>
            <div className="gx-trust-item">
              <svg className="gx-i" aria-hidden="true" width="40" height="40" viewBox="0 0 40 40" fill="none" stroke={C.acc} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path className="gx-bl" d="M14 12 6 20l8 8" /><path className="gx-br" d="m26 12 8 8-8 8" /><path className="gx-slash" d="m23 9-6 22" /></svg>
              <h3>Open source</h3>
              <p>MIT licensed. Build it from the repo yourself.</p>
            </div>
            <div className="gx-trust-item">
              <svg className="gx-i" aria-hidden="true" width="40" height="40" viewBox="0 0 40 40" fill="none" stroke={C.acc} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path className="gx-flow" d="M9 20 20 10M9 20l11 10M20 10l11 10M20 30l11-10" /><circle className="gx-node" cx="9" cy="20" r="3.2" fill={C.surf} /><circle className="gx-node n2" cx="20" cy="10" r="3.2" fill={C.surf} /><circle className="gx-node n3" cx="20" cy="30" r="3.2" fill={C.surf} /><circle className="gx-node n2" cx="31" cy="20" r="3.2" fill={C.surf} /></svg>
              <h3>Private reads</h3>
              <p>Lookups go through a mixnet, not straight to a provider.</p>
            </div>
            <div className="gx-trust-item">
              <svg className="gx-i" aria-hidden="true" width="40" height="40" viewBox="0 0 40 40" fill="none" stroke={C.acc} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path className="gx-shackle" d="M13 18v-5a7 7 0 0 1 14 0v5" /><rect x="9" y="18" width="22" height="16" rx="3" /><circle className="gx-keyhole" cx="20" cy="26" r="2" fill={C.acc} /></svg>
              <h3>Keys stay with you</h3>
              <p>Encrypted in your browser. Recover with your phrase.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="gx-band">
        <div style={{ maxWidth: 820, margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
          <img className="gx-bob" src="/ghosty/ghost.png" alt="" width={120} height={120} />
          <h2 className="gx-display gx-glitch" style={{ margin: 0, fontSize: "clamp(40px, 5.6vw, 72px)", lineHeight: 1 }}>Go ghost.</h2>
          <a className="gx-cta" href={DOWNLOAD_URL} style={{ fontSize: 17, padding: "15px 30px" }}>Get Ghosty</a>
        </div>
      </section>

      <footer className="gx-footer">
        <div className="gx-wrap" style={{ display: "flex", justifyContent: "space-between", gap: 20, flexWrap: "wrap", fontSize: 13, color: "var(--gx-muted)" }}>
          <span>Ghosty by Hyliv Labs. Early build, not production ready.</span>
          <a href={REPO_URL} target="_blank" rel="noopener noreferrer" style={{ color: "var(--gx-body)" }}>Source on GitHub</a>
        </div>
      </footer>
    </div>
  );
}
