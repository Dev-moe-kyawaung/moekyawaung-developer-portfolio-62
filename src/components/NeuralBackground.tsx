import { useEffect, useRef } from "react";
import { NEURAL_PALETTE } from "../lib/neuralTheme";

interface Neuron {
  x: number;
  y: number;
  radius: number;
  pulsePhase: number;
  pulseSpeed: number;
  connections: number[]; // indices of connected neurons
  fireDelay: number;
  fireTime: number;
  baseColor: string;
}

interface BioluminescentParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  color: string;
  life: number;
  maxLife: number;
}

interface NeuralBackgroundProps {
  density?: "low" | "medium" | "high";
}

export const NeuralBackground: React.FC<NeuralBackgroundProps> = ({ density = "medium" }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initNeurons();
    };
    window.addEventListener("resize", handleResize);

    // Neuron network
    const neuronCounts = { low: 35, medium: 60, high: 90 };
    let neurons: Neuron[] = [];
    const baseColors = [
      NEURAL_PALETTE.neuralPink,
      NEURAL_PALETTE.synapticCyan,
      NEURAL_PALETTE.bioGreen,
      NEURAL_PALETTE.plasma,
    ];

    const initNeurons = () => {
      const count = neuronCounts[density];
      neurons = Array.from({ length: count }, () => {
        const base = baseColors[Math.floor(Math.random() * baseColors.length)];
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          radius: 1.5 + Math.random() * 2.5,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.008 + Math.random() * 0.015,
          connections: [],
          fireDelay: Math.random() * 400,
          fireTime: 0,
          baseColor: base,
        };
      });

      // Connect neurons within proximity
      for (let i = 0; i < neurons.length; i++) {
        for (let j = i + 1; j < neurons.length; j++) {
          const dx = neurons[i].x - neurons[j].x;
          const dy = neurons[i].y - neurons[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 220 && Math.random() < 0.35) {
            neurons[i].connections.push(j);
          }
        }
      }
    };
    initNeurons();

    // Bioluminescent floating particles
    const particles: BioluminescentParticle[] = Array.from({ length: 80 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -(Math.random() * 0.5 + 0.2),
      radius: Math.random() * 2.5 + 0.8,
      alpha: Math.random() * 0.6 + 0.3,
      color: baseColors[Math.floor(Math.random() * baseColors.length)],
      life: Math.random() * 300,
      maxLife: 300 + Math.random() * 200,
    }));

    // Mouse interaction
    let mouseX = -1000;
    let mouseY = -1000;
    const handleMouse = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouse);

    let time = 0;

    const hexToRgba = (hex: string, alpha: number) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    const render = () => {
      time++;
      ctx.clearRect(0, 0, width, height);

      // Deep abyss gradient
      const grad = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, Math.max(width, height));
      grad.addColorStop(0, "#0a1428");
      grad.addColorStop(0.6, "#081020");
      grad.addColorStop(1, "#040812");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Draw synaptic connections
      neurons.forEach((neuron, i) => {
        neuron.pulsePhase += neuron.pulseSpeed;
        neuron.connections.forEach((j) => {
          const target = neurons[j];
          const dx = target.x - neuron.x;
          const dy = target.y - neuron.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const alpha = Math.max(0, (220 - dist) / 220) * 0.4;

          // Base dendrite line
          ctx.strokeStyle = hexToRgba(neuron.baseColor, alpha * 0.5);
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(neuron.x, neuron.y);
          ctx.lineTo(target.x, target.y);
          ctx.stroke();

          // Synaptic firing — traveling pulse
          if (time % 300 < neuron.fireDelay) return;
          const fireProgress = ((time - neuron.fireDelay) % 200) / 200;
          if (fireProgress < 1) {
            const px = neuron.x + dx * fireProgress;
            const py = neuron.y + dy * fireProgress;

            // Glowing pulse along connection
            const pulseGrad = ctx.createRadialGradient(px, py, 0, px, py, 8);
            pulseGrad.addColorStop(0, hexToRgba(neuron.baseColor, 0.9));
            pulseGrad.addColorStop(1, hexToRgba(neuron.baseColor, 0));
            ctx.fillStyle = pulseGrad;
            ctx.beginPath();
            ctx.arc(px, py, 8, 0, Math.PI * 2);
            ctx.fill();
          }
        });
      });

      // Draw neuron nodes
      neurons.forEach((neuron) => {
        const pulse = 1 + Math.sin(neuron.pulsePhase) * 0.3;
        const r = neuron.radius * pulse;

        // Outer glow halo
        const haloGrad = ctx.createRadialGradient(neuron.x, neuron.y, 0, neuron.x, neuron.y, r * 6);
        haloGrad.addColorStop(0, hexToRgba(neuron.baseColor, 0.35));
        haloGrad.addColorStop(0.5, hexToRgba(neuron.baseColor, 0.1));
        haloGrad.addColorStop(1, hexToRgba(neuron.baseColor, 0));
        ctx.fillStyle = haloGrad;
        ctx.beginPath();
        ctx.arc(neuron.x, neuron.y, r * 6, 0, Math.PI * 2);
        ctx.fill();

        // Core neuron
        const coreGrad = ctx.createRadialGradient(neuron.x, neuron.y, 0, neuron.x, neuron.y, r);
        coreGrad.addColorStop(0, "#ffffff");
        coreGrad.addColorStop(0.5, neuron.baseColor);
        coreGrad.addColorStop(1, hexToRgba(neuron.baseColor, 0.6));
        ctx.fillStyle = coreGrad;
        ctx.beginPath();
        ctx.arc(neuron.x, neuron.y, r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw bioluminescent particles (drifting upward)
      particles.forEach((p) => {
        p.x += p.vx + Math.sin(time * 0.01 + p.life) * 0.3;
        p.y += p.vy;
        p.life++;

        if (p.y < -10 || p.life > p.maxLife) {
          p.x = Math.random() * width;
          p.y = height + 10;
          p.life = 0;
          p.alpha = Math.random() * 0.6 + 0.3;
        }

        // Particle glow
        const pGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 4);
        pGrad.addColorStop(0, hexToRgba(p.color, p.alpha));
        pGrad.addColorStop(0.4, hexToRgba(p.color, p.alpha * 0.4));
        pGrad.addColorStop(1, hexToRgba(p.color, 0));
        ctx.fillStyle = pGrad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 4, 0, Math.PI * 2);
        ctx.fill();

        // Particle core
        ctx.fillStyle = hexToRgba("#ffffff", p.alpha);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 0.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // Mouse attraction — neurons near cursor fire more intensely
      if (mouseX > 0) {
        neurons.forEach((neuron) => {
          const dx = mouseX - neuron.x;
          const dy = mouseY - neuron.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            const strength = (180 - dist) / 180;
            // Subtle pull toward cursor
            neuron.x += dx * 0.002 * strength;
            neuron.y += dy * 0.002 * strength;

            // Extra glow ring
            const ringGrad = ctx.createRadialGradient(neuron.x, neuron.y, 0, neuron.x, neuron.y, neuron.radius * 12 * strength);
            ringGrad.addColorStop(0, hexToRgba(neuron.baseColor, strength * 0.4));
            ringGrad.addColorStop(1, hexToRgba(neuron.baseColor, 0));
            ctx.fillStyle = ringGrad;
            ctx.beginPath();
            ctx.arc(neuron.x, neuron.y, neuron.radius * 12 * strength, 0, Math.PI * 2);
            ctx.fill();
          }
        });
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouse);
      cancelAnimationFrame(animationId);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};
