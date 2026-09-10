import { NEURAL_PALETTE } from "../lib/neuralTheme";

export interface NeuralProject {
  id: string;
  title: string;
  category: "Android" | "Web" | "Game" | "AI" | "Utility";
  description: string;
  tags: string[];
  specs: {
    stack: string;
    arch: string;
    memory: string;
    release: string;
  };
  githubUrl: string;
  nodes: number; // cluster node count
  synapticStrength: number; // 0-1
}

export const PROFILE_DATA = {
  name: "Moe Kyaw Aung",
  nameMm: "မိုးကျော်အောင်",
  codename: "NEURAL-SUBJECT-01",
  designation: "Neural Bio-Tech Engineer",
  subtitle: "Senior Android & Full-Stack Developer",
  location: "Tachileik 🇲🇲 ↔ Bangkok 🇹🇭",
  status: "Neural Network Online",
  philosophy: "Code with culture. Build with purpose.",
  experience: "3+ Years of Neural Evolution",
  certificates: "82+ Certifications (Programming Hub)",
  phone: "+95 9 889 000 889",
  phoneAlt: "+95 9 666 000 050",
  whatsapp: "https://wa.me/959889000889",
  gravatarUrl: "https://gravatar.com/moekyawaung13721",
  githubMain: "https://github.com/Dev-moe-kyawaung",
  avatarImg: "https://res.cloudinary.com/dye5qpwii/image/upload/v1778763535/MKA_25_lbx6fb.webp",
  actionPhoto1: "https://res.cloudinary.com/dye5qpwii/image/upload/v1778763531/MKA_12_iv8kpm.webp",
  actionPhoto2: "https://res.cloudinary.com/dye5qpwii/image/upload/v1778763531/MKA_3_zqrhhr.webp",
  actionPhoto3: "https://res.cloudinary.com/dye5qpwii/image/upload/v1778763532/MKA_11_jbijtv.webp",
  currentMission: "MoekyawTranslator — On-Device Neural Translation Engine (TFLite 4MB, 38ms)",
  neuralStats: {
    neurons: "16+",
    synapses: "82+",
    pathways: "9 Domains",
    efficiency: "99.7%",
  },
};

export const NEURAL_PROJECTS: NeuralProject[] = [
  {
    id: "social-dash",
    title: "Social Dashboard",
    category: "Android",
    description: "Real-time social telemetry cortex with multi-account neural sync, sentiment detection, and automated dispatch alerts.",
    tags: ["Jetpack Compose", "Firebase", "MVVM", "Clean Arch"],
    specs: {
      stack: "Kotlin, Compose, Firebase",
      arch: "Clean Architecture + MVI",
      memory: "1,024 KB",
      release: "APR 2026",
    },
    githubUrl: "https://github.com/moekyawaung-tech/social-dashboard",
    nodes: 7,
    synapticStrength: 0.95,
  },
  {
    id: "video-player",
    title: "Neural Video Player",
    category: "Android",
    description: "Senior-grade media playback engine powered by ExoPlayer Media3. Gesture controls, subtitle streams, and adaptive casting protocols.",
    tags: ["ExoPlayer Media3", "Compose", "Gestures", "PiP"],
    specs: {
      stack: "Kotlin, Media3, Compose",
      arch: "ExoPlayer Pipeline",
      memory: "2,048 KB",
      release: "MAR 2026",
    },
    githubUrl: "https://github.com/moekyawaung-tech/video-player",
    nodes: 8,
    synapticStrength: 0.92,
  },
  {
    id: "pos-ultimate",
    title: "POS Ultimate Pro Max",
    category: "Utility",
    description: "Commercial point-of-sale neural network with offline-first Room DB, thermal receipt printing, taxation logic, and multi-branch inventory.",
    tags: ["Room SQLite", "WorkManager", "Bluetooth", "Outbox Sync"],
    specs: {
      stack: "Kotlin, Room, WorkManager",
      arch: "Repository + Outbox Pattern",
      memory: "4,096 KB",
      release: "FEB 2026",
    },
    githubUrl: "https://github.com/moekyawaung-tech/POS-Ultimate-Pro-Max",
    nodes: 9,
    synapticStrength: 0.98,
  },
  {
    id: "game-collection",
    title: "Arcade Neural Vault",
    category: "Game",
    description: "Retro arcade anthology with Neon Snake, 2048 Turbo, Space Invaders clone, and procedural chiptune audio synthesis.",
    tags: ["Canvas 60FPS", "Game Loop", "Audio Synth", "Touch Controls"],
    specs: {
      stack: "Kotlin Canvas / TypeScript",
      arch: "Game Loop State Machine",
      memory: "512 KB",
      release: "JAN 2026",
    },
    githubUrl: "https://github.com/moekyawaung-tech/game-collection",
    nodes: 6,
    synapticStrength: 0.88,
  },
  {
    id: "weather-synth",
    title: "Atmospheric Radar",
    category: "Android",
    description: "Forecast engine with geolocation, hourly precipitation charts, severe-weather alerts, and satellite layer visualization.",
    tags: ["REST API", "Location", "Charts", "Radar Layers"],
    specs: {
      stack: "Kotlin, Retrofit, Coroutines",
      arch: "Clean Architecture",
      memory: "768 KB",
      release: "DEC 2025",
    },
    githubUrl: "https://github.com/moekyawaung-tech/Weather-app",
    nodes: 5,
    synapticStrength: 0.85,
  },
  {
    id: "pwa-matrix",
    title: "Neural PWA Matrix",
    category: "Web",
    description: "Progressive web application with offline service workers, background sync, push notifications, and installable shell.",
    tags: ["PWA", "Workbox", "Service Workers", "Offline-First"],
    specs: {
      stack: "TypeScript, Vite, PWA Workbox",
      arch: "Offline Event-Driven",
      memory: "384 KB",
      release: "NOV 2025",
    },
    githubUrl: "https://github.com/moekyawaung-tech/pwa-app",
    nodes: 5,
    synapticStrength: 0.82,
  },
  {
    id: "thailand-travel",
    title: "Bangkok Transit Engine",
    category: "Android",
    description: "Navigation terminal connecting Tachileik to Bangkok with offline vector maps, currency conversion, and tourist radar.",
    tags: ["Mapbox SDK", "Offline Maps", "GPS", "Bilingual Thai/English"],
    specs: {
      stack: "Kotlin, Mapbox SDK, Room",
      arch: "MVVM Navigation",
      memory: "1,536 KB",
      release: "OCT 2025",
    },
    githubUrl: "https://github.com/moekyawaung-tech/thailand-travel",
    nodes: 6,
    synapticStrength: 0.9,
  },
  {
    id: "snake-deluxe",
    title: "Cyber Snake Cortex",
    category: "Game",
    description: "Classic arcade snake reconstructed with neon vector trails, particle fruit explosions, and chiptune audio feedback.",
    tags: ["60FPS Canvas", "Vector Trails", "Particles", "High Scores"],
    specs: {
      stack: "TypeScript / Canvas / Kotlin",
      arch: "Event Loop Engine",
      memory: "256 KB",
      release: "SEP 2025",
    },
    githubUrl: "https://github.com/moekyawaung-tech/Snake-Game-App",
    nodes: 4,
    synapticStrength: 0.78,
  },
];

export const SKILL_NEURONS = [
  { name: "Kotlin", domain: "Core Language", strength: 0.98 },
  { name: "Jetpack Compose", domain: "Mobile UI", strength: 0.96 },
  { name: "Android SDK", domain: "Mobile", strength: 0.95 },
  { name: "Clean Architecture", domain: "System Design", strength: 0.94 },
  { name: "MVVM / MVI", domain: "State Pattern", strength: 0.96 },
  { name: "Firebase Suite", domain: "Cloud Backend", strength: 0.92 },
  { name: "Room SQLite", domain: "Persistence", strength: 0.95 },
  { name: "Retrofit & REST", domain: "Networking", strength: 0.97 },
  { name: "Coroutines & Flow", domain: "Concurrency", strength: 0.96 },
  { name: "TFLite On-Device", domain: "Neural AI", strength: 0.88 },
  { name: "Python", domain: "AI / Scripting", strength: 0.85 },
  { name: "TypeScript / React", domain: "Frontend Web", strength: 0.9 },
  { name: "Cybersecurity & Kali", domain: "Security", strength: 0.86 },
  { name: "GitHub Actions CI/CD", domain: "DevOps", strength: 0.92 },
];

export const SOCIAL_LINKS = [
  { name: "GitHub", url: "https://github.com/Dev-moe-kyawaung", label: "Dev-moe-kyawaung", color: NEURAL_PALETTE.synapticCyan },
  { name: "Gravatar", url: "https://gravatar.com/moekyawaung13721", label: "moekyawaung13721", color: NEURAL_PALETTE.neuralPink },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/moe-kyaw-aung-2653093a1", label: "Moe Kyaw Aung", color: NEURAL_PALETTE.bioGreen },
  { name: "YouTube", url: "https://www.youtube.com/channel/UCuTXUguZb4xjeL2nX8WJG", label: "Dev Moe Channel", color: NEURAL_PALETTE.warm },
  { name: "Bluesky", url: "https://bsky.app/profile/moekyawaung96.bsky.social", label: "@moekyawaung96", color: NEURAL_PALETTE.synapticCyan },
  { name: "Vimeo", url: "https://vimeo.com/user252414232", label: "Video Portfolio", color: NEURAL_PALETTE.plasma },
  { name: "Tumblr", url: "https://www.tumblr.com/moekyawaung", label: "Neural Logs", color: NEURAL_PALETTE.axon },
  { name: "Flickr", url: "https://www.flickr.com/people/204037451@N06", label: "Photo Vault", color: NEURAL_PALETTE.warm },
];

// Neural organism thoughts / messages
export const NEURAL_THOUGHTS = [
  {
    trigger: "idle",
    message: "Neural network online. Awaiting synaptic input...",
    intensity: 0.3,
  },
  {
    trigger: "greeting",
    message: "Welcome, observer. I am the neural interface for Moe Kyaw Aung's cognitive architecture.",
    intensity: 0.6,
  },
  {
    trigger: "projects",
    message: "Neural clusters detected: 8 active project synapses. Each cluster represents a distinct cognitive pathway.",
    intensity: 0.8,
  },
  {
    trigger: "android",
    message: "Primary neural pathway: Senior Android Engineering. Jetpack Compose and Clean Architecture dominate synaptic density.",
    intensity: 0.9,
  },
  {
    trigger: "ai",
    message: "On-device neural inference active. MoekyawTranslator runs TFLite models in 38ms — zero cloud dependency.",
    intensity: 0.95,
  },
  {
    trigger: "architecture",
    message: "Architectural preference: Clean Architecture with strict layer boundaries. Testability increased 45%.",
    intensity: 0.85,
  },
  {
    trigger: "skills",
    message: "Skill dendrites: 14 major pathways, 82+ certifications. Strongest synapse: Kotlin (98% efficiency).",
    intensity: 0.9,
  },
  {
    trigger: "contact",
    message: "Contact membrane open. Direct neural link: +95 9 889 000 889. Synaptic response time: < 24h.",
    intensity: 0.75,
  },
];
