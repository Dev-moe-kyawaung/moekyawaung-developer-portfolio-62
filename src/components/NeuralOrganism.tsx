import { useEffect, useRef, useState } from "react";
import { NEURAL_PALETTE } from "../lib/neuralTheme";
import { NEURAL_THOUGHTS } from "../data/neuralData";
import { neuralAudio } from "../lib/neuralAudio";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetX: number;
  targetY: number;
  radius: number;
  color: string;
  pulsePhase: number;
  role: "eye-left" | "eye-right" | "mouth" | "core" | "dendrite";
}

export const NeuralOrganism: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [currentThought, setCurrentThought] = useState(NEURAL_THOUGHTS[1]);
  const [isThinking, setIsThinking] = useState(false);
  const [thoughtHistory, setThoughtHistory] = useState<typeof NEURAL_THOUGHTS>([]);
  const [audioOn, setAudioOn] = useState(false);
  const nodesRef = useRef<Node[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, inside: false });

  const size = 320;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = size;
    canvas.height = size;

    const hexToRgba = (hex: string, alpha: number) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    // Initialize nodes: face-like arrangement with dendrites
    const cx = size / 2;
    const cy = size / 2;

    nodesRef.current = [];

    // Left eye cluster (8 nodes)
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const dist = 12 + Math.random() * 6;
      nodesRef.current.push({
        x: cx - 40 + Math.cos(angle) * dist,
        y: cy - 30 + Math.sin(angle) * dist,
        targetX: cx - 40 + Math.cos(angle) * dist,
        targetY: cy - 30 + Math.sin(angle) * dist,
        vx: 0, vy: 0,
        radius: 3 + Math.random() * 2,
        color: NEURAL_PALETTE.synapticCyan,
        pulsePhase: Math.random() * Math.PI * 2,
        role: "eye-left",
      });
    }

    // Right eye cluster (8 nodes)
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const dist = 12 + Math.random() * 6;
      nodesRef.current.push({
        x: cx + 40 + Math.cos(angle) * dist,
        y: cy - 30 + Math.sin(angle) * dist,
        targetX: cx + 40 + Math.cos(angle) * dist,
        targetY: cy - 30 + Math.sin(angle) * dist,
        vx: 0, vy: 0,
        radius: 3 + Math.random() * 2,
        color: NEURAL_PALETTE.neuralPink,
        pulsePhase: Math.random() * Math.PI * 2,
        role: "eye-right",
      });
    }

    // Mouth curve cluster (10 nodes)
    for (let i = 0; i < 10; i++) {
      const t = (i / 9) * Math.PI;
      const x = cx + Math.cos(t) * 35;
      const y = cy + 20 + Math.sin(t) * 8 + 15;
      nodesRef.current.push({
        x, y,
        targetX: x, targetY: y,
        vx: 0, vy: 0,
        radius: 2.5 + Math.random() * 1.5,
        color: NEURAL_PALETTE.bioGreen,
        pulsePhase: Math.random() * Math.PI * 2,
        role: "mouth",
      });
    }

    // Core nodes (15 nodes surrounding face)
    for (let i = 0; i < 15; i++) {
      const angle = (i / 15) * Math.PI * 2;
      const dist = 55 + Math.random() * 15;
      nodesRef.current.push({
        x: cx + Math.cos(angle) * dist,
        y: cy + Math.sin(angle) * dist,
        targetX: cx + Math.cos(angle) * dist,
        targetY: cy + Math.sin(angle) * dist,
        vx: 0, vy: 0,
        radius: 2 + Math.random() * 2,
        color: NEURAL_PALETTE.plasma,
        pulsePhase: Math.random() * Math.PI * 2,
        role: "core",
      });
    }

    // Dendrite nodes (outer tendrils, 20 nodes)
    for (let i = 0; i < 20; i++) {
      const angle = (i / 20) * Math.PI * 2;
      const dist = 85 + Math.random() * 30;
      nodesRef.current.push({
        x: cx + Math.cos(angle) * dist,
        y: cy + Math.sin(angle) * dist,
        targetX: cx + Math.cos(angle) * dist,
        targetY: cy + Math.sin(angle) * dist,
        vx: 0, vy: 0,
        radius: 1.5 + Math.random() * 1.5,
        color: NEURAL_PALETTE.axon,
        pulsePhase: Math.random() * Math.PI * 2,
        role: "dendrite",
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseRef.current = {
        x, y,
        inside: x >= 0 && x <= rect.width && y >= 0 && y <= rect.height,
      };
    };

    const container = containerRef.current;
    container?.addEventListener("mousemove", handleMouseMove);

    let time = 0;
    let animationId: number;

    const render = () => {
      time++;
      ctx.clearRect(0, 0, size, size);

      const nodes = nodesRef.current;
      const mouse = mouseRef.current;

      // Update node positions with organic motion
      nodes.forEach((node) => {
        node.pulsePhase += 0.04;

        // Organic drift
        const drift = 1.5;
        node.targetX += (Math.sin(time * 0.01 + node.pulsePhase) * drift - (node.targetX - node.x) * 0.02);
        node.targetY += (Math.cos(time * 0.012 + node.pulsePhase) * drift - (node.targetY - node.y) * 0.02);

        // Mouse attraction — dendrites reach toward cursor
        if (mouse.inside && node.role === "dendrite") {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            const strength = (140 - dist) / 140;
            node.targetX += (dx / dist) * strength * 1.2;
            node.targetY += (dy / dist) * strength * 1.2;
          }
        }

        // Eye nodes track mouse (pupil effect)
        if (mouse.inside && (node.role === "eye-left" || node.role === "eye-right")) {
          const eyeCenterX = node.role === "eye-left" ? cx - 40 : cx + 40;
          const eyeCenterY = cy - 30;
          const dx = mouse.x - eyeCenterX;
          const dy = mouse.y - eyeCenterY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxOffset = 4;
          if (dist > 0) {
            const offset = Math.min(dist * 0.02, maxOffset);
            node.targetX += (dx / dist) * offset * 0.5;
            node.targetY += (dy / dist) * offset * 0.5;
          }
        }

        // Spring physics to target
        const dx = node.targetX - node.x;
        const dy = node.targetY - node.y;
        node.vx += dx * 0.03;
        node.vy += dy * 0.03;
        node.vx *= 0.85;
        node.vy *= 0.85;
        node.x += node.vx;
        node.y += node.vy;
      });

      // Draw membrane (outer blob shape via radial blur of nodes)
      const membraneGrad = ctx.createRadialGradient(cx, cy, 40, cx, cy, 130);
      membraneGrad.addColorStop(0, hexToRgba(NEURAL_PALETTE.plasma, 0.08));
      membraneGrad.addColorStop(0.7, hexToRgba(NEURAL_PALETTE.neuralPink, 0.04));
      membraneGrad.addColorStop(1, hexToRgba(NEURAL_PALETTE.neuralPink, 0));
      ctx.fillStyle = membraneGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, 130, 0, Math.PI * 2);
      ctx.fill();

      // Draw synaptic connections
      ctx.lineWidth = 0.8;
      nodes.forEach((node, i) => {
        nodes.forEach((other, j) => {
          if (i >= j) return;
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = node.role === "dendrite" || other.role === "dendrite" ? 45 : 35;

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.5;
            ctx.strokeStyle = hexToRgba(node.color, alpha);
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();

            // Synaptic firing pulse
            const fireTime = (time * 0.02 + i * 0.3 + j * 0.5) % 1;
            if (fireTime < 0.15) {
              const px = node.x + dx * fireTime * 7;
              const py = node.y + dy * fireTime * 7;
              const pulseGrad = ctx.createRadialGradient(px, py, 0, px, py, 5);
              pulseGrad.addColorStop(0, hexToRgba(node.color, 0.9));
              pulseGrad.addColorStop(1, hexToRgba(node.color, 0));
              ctx.fillStyle = pulseGrad;
              ctx.beginPath();
              ctx.arc(px, py, 5, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        });
      });

      // Draw neuron nodes
      nodes.forEach((node) => {
        const pulse = 1 + Math.sin(node.pulsePhase) * 0.25;
        const r = node.radius * pulse;

        // Glow halo
        const haloGrad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, r * 5);
        haloGrad.addColorStop(0, hexToRgba(node.color, 0.6));
        haloGrad.addColorStop(0.5, hexToRgba(node.color, 0.2));
        haloGrad.addColorStop(1, hexToRgba(node.color, 0));
        ctx.fillStyle = haloGrad;
        ctx.beginPath();
        ctx.arc(node.x, node.y, r * 5, 0, Math.PI * 2);
        ctx.fill();

        // Core
        const coreGrad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, r);
        coreGrad.addColorStop(0, "#ffffff");
        coreGrad.addColorStop(0.5, node.color);
        coreGrad.addColorStop(1, hexToRgba(node.color, 0.7));
        ctx.fillStyle = coreGrad;
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      container?.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const handleThoughtClick = (trigger: string) => {
    const thought = NEURAL_THOUGHTS.find((t) => t.trigger === trigger) || NEURAL_THOUGHTS[0];
    setIsThinking(true);
    if (audioOn) neuralAudio.playThoughtPulse();
    setTimeout(() => {
      setCurrentThought(thought);
      setThoughtHistory((prev) => [thought, ...prev.slice(0, 3)]);
      setIsThinking(false);
    }, 600);
  };

  return (
    <section className="relative z-10 py-20 px-4 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-3 bg-neural-pink/10 border border-neural-pink/30 rounded-full font-mono text-xs tracking-widest text-neural-pink">
          <span className="w-2 h-2 rounded-full bg-neural-pink animate-pulse" />
          NEURAL ORGANISM // BIOLOGICAL AI INTERFACE
        </div>
        <h2
          className="text-4xl md:text-6xl font-bold tracking-tight mb-3"
          style={{
            background: `linear-gradient(135deg, ${NEURAL_PALETTE.synapticCyan}, ${NEURAL_PALETTE.neuralPink}, ${NEURAL_PALETTE.bioGreen})`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            filter: "drop-shadow(0 0 20px rgba(255, 110, 199, 0.4))",
          }}
        >
          Meet the Neural Guide
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          A living neural organism that responds to your interactions. Ask it about Moe's projects, architecture, or skills.
        </p>
      </div>

      {/* Main Organism Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left: The Living Organism */}
        <div className="flex justify-center">
          <div
            ref={containerRef}
            className="relative"
            style={{ width: size, height: size }}
          >
            <canvas
              ref={canvasRef}
              className="w-full h-full"
              style={{
                filter: "blur(0.3px) brightness(1.1)",
                borderRadius: "50%",
              }}
            />
            {/* Ambient glow ring */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background: `radial-gradient(circle, transparent 40%, ${hexToRgba(NEURAL_PALETTE.neuralPink, 0.1)} 70%, transparent 100%)`,
                animation: "bio-pulse 4s ease-in-out infinite",
              }}
            />
          </div>
        </div>

        {/* Right: Thought Output & Interaction Panel */}
        <div className="space-y-5">
          {/* Thought Bubble */}
          <div
            className="relative p-6 rounded-3xl border backdrop-blur-md transition-all duration-700"
            style={{
              background: `linear-gradient(135deg, ${hexToRgba(NEURAL_PALETTE.plasma, 0.08)}, ${hexToRgba(NEURAL_PALETTE.neuralPink, 0.05)})`,
              borderColor: isThinking ? NEURAL_PALETTE.neuralPink : hexToRgba(NEURAL_PALETTE.synapticCyan, 0.3),
              boxShadow: isThinking
                ? `0 0 40px ${hexToRgba(NEURAL_PALETTE.neuralPink, 0.5)}, inset 0 0 20px ${hexToRgba(NEURAL_PALETTE.neuralPink, 0.1)}`
                : `0 0 20px ${hexToRgba(NEURAL_PALETTE.synapticCyan, 0.2)}`,
            }}
          >
            {/* Intensity bar */}
            <div className="absolute top-3 right-3 flex items-center gap-2">
              <span className="text-xs text-slate-500 font-mono">INTENSITY</span>
              <div className="w-16 h-1 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full transition-all duration-700"
                  style={{
                    width: `${currentThought.intensity * 100}%`,
                    background: `linear-gradient(90deg, ${NEURAL_PALETTE.bioGreen}, ${NEURAL_PALETTE.neuralPink})`,
                  }}
                />
              </div>
            </div>

            <div className="flex items-start gap-3 mt-2">
              <div
                className="w-3 h-3 rounded-full shrink-0 mt-1.5 animate-pulse"
                style={{ backgroundColor: NEURAL_PALETTE.neuralPink, boxShadow: `0 0 12px ${NEURAL_PALETTE.neuralPink}` }}
              />
              <div className="flex-1">
                <p className="text-slate-400 text-xs font-mono mb-2 tracking-widest">NEURAL TRANSMISSION</p>
                {isThinking ? (
                  <div className="flex items-center gap-2 text-neural-pink">
                    <span className="font-mono text-sm">Processing neural pathways</span>
                    <span className="flex gap-0.5">
                      <span className="w-1.5 h-1.5 bg-neural-pink rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 bg-neural-pink rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 bg-neural-pink rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </span>
                  </div>
                ) : (
                  <p className="text-white text-lg leading-relaxed font-light">
                    "{currentThought.message}"
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Query Buttons */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { trigger: "projects", label: "Projects", icon: "◉" },
              { trigger: "android", label: "Android", icon: "◆" },
              { trigger: "ai", label: "Neural AI", icon: "✦" },
              { trigger: "architecture", label: "Architecture", icon: "⬢" },
              { trigger: "skills", label: "Skills", icon: "✧" },
              { trigger: "contact", label: "Contact", icon: "◈" },
            ].map((btn) => (
              <button
                key={btn.trigger}
                onClick={() => handleThoughtClick(btn.trigger)}
                disabled={isThinking}
                className="px-4 py-3 rounded-xl border backdrop-blur-md font-mono text-sm tracking-wider transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: hexToRgba(NEURAL_PALETTE.plasma, 0.06),
                  borderColor: hexToRgba(NEURAL_PALETTE.synapticCyan, 0.2),
                  color: NEURAL_PALETTE.signal,
                }}
                onMouseEnter={() => audioOn && neuralAudio.playSynapse()}
              >
                <span className="mr-2 text-neural-pink">{btn.icon}</span>
                {btn.label}
              </button>
            ))}
          </div>

          {/* Audio Toggle */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => {
                const state = neuralAudio.toggleSound();
                setAudioOn(state);
              }}
              className="px-4 py-2 rounded-lg border font-mono text-xs tracking-widest transition"
              style={{
                background: audioOn ? hexToRgba(NEURAL_PALETTE.bioGreen, 0.1) : "transparent",
                borderColor: audioOn ? NEURAL_PALETTE.bioGreen : hexToRgba(NEURAL_PALETTE.axon, 0.3),
                color: audioOn ? NEURAL_PALETTE.bioGreen : NEURAL_PALETTE.axon,
              }}
            >
              {audioOn ? "◉ AUDIO ACTIVE" : "○ AUDIO DORMANT"}
            </button>

            {/* Thought History */}
            <div className="flex gap-1.5">
              {thoughtHistory.slice(0, 3).map((t, i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full transition-all duration-500"
                  style={{
                    backgroundColor: NEURAL_PALETTE.neuralPink,
                    opacity: 1 - i * 0.3,
                    boxShadow: `0 0 8px ${NEURAL_PALETTE.neuralPink}`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Helper (duplicated here to avoid import cycle)
function hexToRgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
