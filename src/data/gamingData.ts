export interface Game {
  id: string;
  title: string;
  genre: 'Open World' | 'Esports FPS' | 'Racing' | 'Fighting' | 'RPG' | 'VR' | 'Sports';
  image: string;
  badge?: string;
  highlight?: boolean;
  fps: string;
  resolution: string;
  rating: number;
  players: string;
  description: string;
}

export interface GamingRig {
  id: string;
  name: string;
  category: 'pc-ultra' | 'console' | 'racing-sim' | 'vr-suite';
  categoryLabel: string;
  status: 'available' | 'occupied' | 'reserved';
  specs: {
    gpu: string;
    cpu: string;
    display: string;
    peripherals: string;
  };
  currentGame?: string;
  timeRemaining?: string;
  pricePerHour: number;
  image: string;
}

export interface Tournament {
  id: string;
  title: string;
  game: string;
  date: string;
  time: string;
  prizePool: string;
  entryFee: string;
  slots: string;
  status: 'Registration Open' | 'Filling Fast' | 'Starting Soon';
  image: string;
}

export interface FuelItem {
  id: string;
  name: string;
  category: 'Drinks' | 'Mains' | 'Snacks';
  price: number;
  image: string;
  tag: string;
  energyBonus: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  duration: string;
  popular?: boolean;
  isGtaSpecial?: boolean;
  description: string;
  features: string[];
}

export const GTA_PROMO_DATA = {
  title: "Grand Theft Auto VI launch night",
  subtitle: "Midnight launch at Nexus 9",
  tagline: "Play it the minute it unlocks, at 4K 144Hz on a liquid-cooled RTX rig, in a room full of people doing the same",
  trailerId: "QdBZY2fkU-0", // Official Rockstar GTA VI Trailer
  releaseYear: "2026",
  countdownTarget: "2026-12-01T00:00:00",
  heroImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=80", // Cyber Vice City neon aesthetic
  viceCityLoungeImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80", // Esports gaming battlestation
  features: [
    { title: "A guaranteed 4K 144Hz rig", desc: "Your RTX 4090 or 5090 station is held for four hours from midnight" },
    { title: "The midnight party", desc: "A live DJ, synthwave all night and themed drinks at the bar" },
    { title: "Lanyard and merch box", desc: "A Nexus 9 launch-night badge, LED wristband and a few extras" },
    { title: "Your first hours, recorded", desc: "Captured in 4K60 on Elgato 4K60 Pro cards and handed over on USB" }
  ]
};

export const GAMES_CATALOG: Game[] = [
  {
    id: "gta-6",
    title: "Grand Theft Auto VI",
    genre: "Open World",
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80",
    badge: "Launch night",
    highlight: true,
    fps: "120+ FPS",
    resolution: "4K ray traced",
    rating: 5.0,
    players: "Solo or online",
    description: "Leonida and Vice City at full ray tracing. Launch-night stations are bookable now."
  },
  {
    id: "cyberpunk",
    title: "Cyberpunk 2077: Phantom Liberty",
    genre: "RPG",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
    badge: "Path tracing on",
    fps: "144 FPS",
    resolution: "4K path traced",
    rating: 4.9,
    players: "Singleplayer",
    description: "Night City in its purest visual glory with DLSS 3.7 Frame Generation and full Path Tracing."
  },
  {
    id: "valorant",
    title: "Valorant",
    genre: "Esports FPS",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80",
    badge: "360Hz displays",
    fps: "500+ FPS",
    resolution: "1440p",
    rating: 4.8,
    players: "5v5 competitive",
    description: "Zero latency, sub-millisecond input lag on our Zowie 360Hz dyAc+ displays for ranked matches."
  },
  {
    id: "forza",
    title: "Forza Horizon 5 & Motorsport",
    genre: "Racing",
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80",
    badge: "Motion cockpit",
    fps: "144 FPS",
    resolution: "Triple 4K",
    rating: 4.9,
    players: "Solo or multiplayer",
    description: "Full force-feedback direct drive wheel with load cell pedals and hydraulic motion telemetry."
  },
  {
    id: "cs2",
    title: "Counter-Strike 2",
    genre: "Esports FPS",
    image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80",
    badge: "Tournament settings",
    fps: "400+ FPS",
    resolution: "1080p or 1440p",
    rating: 4.7,
    players: "5v5 ranked",
    description: "Official server matchmaking with sub-5ms ping via our dedicated dual 10Gbps enterprise fiber optic line."
  },
  {
    id: "tekken-8",
    title: "Tekken 8",
    genre: "Fighting",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
    badge: "Fight sticks available",
    fps: "60 FPS locked",
    resolution: "4K HDR",
    rating: 4.8,
    players: "1v1 local and online",
    description: "Play with Qanba Obsidian & Hori Alpha fight sticks or official PS5 DualSense controllers."
  },
  {
    id: "black-myth",
    title: "Black Myth: Wukong",
    genre: "RPG",
    image: "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&w=800&q=80",
    badge: "Path tracing on",
    fps: "100+ FPS",
    resolution: "4K",
    rating: 4.9,
    players: "Singleplayer",
    description: "Unreal Engine 5 at full settings on RTX 4090s, with surround sound."
  },
  {
    id: "ea-fc-25",
    title: "EA Sports FC 25",
    genre: "Sports",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80",
    badge: "PS5 Pro lounge",
    fps: "120 FPS",
    resolution: "4K 120Hz",
    rating: 4.6,
    players: "1v1 to 4v4 couch co-op",
    description: "Relax in leather recliner gaming sofas with 65-inch LG OLEDs and friends."
  },
  {
    id: "half-life-alyx",
    title: "Half-Life: Alyx VR",
    genre: "VR",
    image: "https://images.unsplash.com/photo-1622979135225-d2ba269bc1df?auto=format&fit=crop&w=800&q=80",
    badge: "Room-scale VR",
    fps: "120 Hz",
    resolution: "4K per eye",
    rating: 5.0,
    players: "Solo VR",
    description: "Step inside the quarantine zone with wireless high-fidelity headsets and free haptic space."
  }
];

export const GAMING_RIGS: GamingRig[] = [
  {
    id: "RIG-01",
    name: "Apex Predator 01",
    category: "pc-ultra",
    categoryLabel: "RTX 4090 PC",
    status: "available",
    specs: {
      gpu: "NVIDIA GeForce RTX 4090 24GB OC",
      cpu: "Intel Core i9-14900KS 6.2GHz",
      display: "ROG Swift 360Hz QD-OLED 0.03ms",
      peripherals: "Wooting 60HE + Logitech G Pro X Superlight 2"
    },
    pricePerHour: 700,
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "RIG-02",
    name: "Apex Predator 02",
    category: "pc-ultra",
    categoryLabel: "RTX 4090 PC",
    status: "occupied",
    currentGame: "Valorant ranked",
    timeRemaining: "42 mins",
    specs: {
      gpu: "NVIDIA GeForce RTX 4090 24GB OC",
      cpu: "AMD Ryzen 7 7800X3D 3D V-Cache",
      display: "Alienware 360Hz Fast-IPS 1440p",
      peripherals: "Razer Huntsman V3 Pro + DeathAdder V3 Pro"
    },
    pricePerHour: 700,
    image: "https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "RIG-03",
    name: "Vice City 03",
    category: "pc-ultra",
    categoryLabel: "4K rig, held for GTA VI",
    status: "available",
    specs: {
      gpu: "NVIDIA GeForce RTX 4090 Liquid Cooled",
      cpu: "Intel Core i9-14900KS Custom Water Loop",
      display: "Samsung Odyssey Neo G8 32-inch 4K 240Hz Mini-LED",
      peripherals: "Secretlab Titan Evo Vice Edition + SteelSeries Apex Pro"
    },
    pricePerHour: 900,
    image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "RIG-04",
    name: "Apex Predator 04",
    category: "pc-ultra",
    categoryLabel: "RTX 4090 PC",
    status: "occupied",
    currentGame: "Counter-Strike 2 Premier",
    timeRemaining: "15 mins",
    specs: {
      gpu: "NVIDIA GeForce RTX 4090 24GB",
      cpu: "AMD Ryzen 9 7950X3D",
      display: "BenQ Zowie XL2566K 360Hz DyAc+",
      peripherals: "HyperX Alloy Origins + Zowie EC2-CW Wireless"
    },
    pricePerHour: 700,
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "RIG-05",
    name: "Console Lounge Alpha",
    category: "console",
    categoryLabel: "PS5 Pro and Series X",
    status: "available",
    specs: {
      gpu: "PlayStation 5 Pro 2TB SSD",
      cpu: "Custom AMD Zen 2 + Enhanced RDNA 3 ROPs",
      display: "65-inch LG OLED G3 4K 120Hz VRR & Dolby Vision",
      peripherals: "DualSense Edge Wireless Controllers + SteelSeries Nova Pro"
    },
    pricePerHour: 600,
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "RIG-06",
    name: "Console Lounge Bravo",
    category: "console",
    categoryLabel: "PS5 private room",
    status: "occupied",
    currentGame: "Tekken 8 warmup",
    timeRemaining: "1 hr 10 mins",
    specs: {
      gpu: "Xbox Series X + PS5 Pro Dual-Setup",
      cpu: "High-Bandwidth Custom APU",
      display: "65-inch Sony BRAVIA XR OLED 4K 120Hz",
      peripherals: "Xbox Elite Series 2 + Qanba Titan Fightstick"
    },
    pricePerHour: 900,
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "RIG-07",
    name: "F1 Sim Cockpit Velocity",
    category: "racing-sim",
    categoryLabel: "Motion sim cockpit",
    status: "available",
    specs: {
      gpu: "RTX 4090 Triple Display Matrix",
      cpu: "Fanatec Podium DD2 25Nm Direct Drive Base",
      display: "Triple 32-inch 4K Curved 165Hz (11520x2160 Wrap)",
      peripherals: "Heusinkveld Ultimate+ Hydraulic Pedals + D-BOX Motion"
    },
    pricePerHour: 900,
    image: "https://images.unsplash.com/photo-1541348263662-e0c82661210e?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "RIG-08",
    name: "VR Holodeck Cyber 01",
    category: "vr-suite",
    categoryLabel: "Room-scale VR",
    status: "available",
    specs: {
      gpu: "RTX 4090 Dedicated Wireless VR Streamer",
      cpu: "Valve Index + Meta Quest 3 Pro Hybrid",
      display: "High-FOV Micro-OLED 120Hz",
      peripherals: "Kat VR Omni-Directional Treadmill + Haptic Vest"
    },
    pricePerHour: 1000,
    image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=700&q=80"
  }
];

export const TOURNAMENTS: Tournament[] = [
  {
    id: "tourney-gta6",
    title: "GTA VI launch night heist invitational",
    game: "Grand Theft Auto VI",
    date: "Launch weekend",
    time: "8:00 PM PKT",
    prizePool: "Rs 500,000",
    entryFee: "Rs 2,500 per player",
    slots: "16 of 32 squads",
    status: "Registration Open",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "tourney-val",
    title: "Valorant 5v5 Open",
    game: "Valorant",
    date: "This Saturday",
    time: "2:00 PM PKT",
    prizePool: "Rs 150,000 + hours",
    entryFee: "Free for members, Rs 1,000 otherwise",
    slots: "14 of 16 teams",
    status: "Filling Fast",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "tourney-t8",
    title: "Iron Fist Friday, double elimination",
    game: "Tekken 8",
    date: "Every Friday",
    time: "7:30 PM PKT",
    prizePool: "Rs 75,000",
    entryFee: "Rs 1,500",
    slots: "28 of 32 players",
    status: "Filling Fast",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "tourney-sim",
    title: "Monza GT3 time attack",
    game: "Assetto Corsa Competizione",
    date: "Sunday",
    time: "4:00 PM PKT",
    prizePool: "Rs 100,000 Fanatec voucher",
    entryFee: "Rs 2,000",
    slots: "10 of 12 racers",
    status: "Starting Soon",
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=700&q=80"
  }
];

export const FUEL_MENU: FuelItem[] = [
  {
    id: "fuel-1",
    name: "Vice City Sunset Elixir",
    category: "Drinks",
    price: 550,
    tag: "Launch night drink",
    energyBonus: "Guarana, dragonfruit and sparkling lime",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "fuel-2",
    name: "Cyber Blue Voltage Rush",
    category: "Drinks",
    price: 450,
    tag: "Most ordered",
    energyBonus: "Electrolytes and 160mg green coffee caffeine",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "fuel-3",
    name: "RTX Overclocked Smash Burger",
    category: "Mains",
    price: 1200,
    tag: "Kitchen pick",
    energyBonus: "Double Angus beef, smoked gouda, house sauce, brioche",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "fuel-4",
    name: "Loaded Doritos Nachos Bomb",
    category: "Snacks",
    price: 900,
    tag: "For sharing",
    energyBonus: "Queso, jalapeños, pico de gallo and guacamole",
    image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "fuel-5",
    name: "Crispy Korean Glazed Wings",
    category: "Mains",
    price: 1100,
    tag: "Spicy",
    energyBonus: "Sweet heat gochujang glaze with garlic crunch",
    image: "https://images.unsplash.com/photo-1527477321055-43615b6294e5?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "fuel-6",
    name: "Boba Nitro Cold Brew",
    category: "Drinks",
    price: 500,
    tag: "After midnight",
    energyBonus: "Slow-steeped espresso with honey boba pearls",
    image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=500&q=80"
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "casual",
    name: "Quick match",
    price: 600,
    duration: "1 hour",
    description: "For a drop-in, a warmup or trying a new game",
    features: [
      "Any RTX 4090 PC or PS5 Pro lounge",
      "The full game library",
      "Mechanical keyboards and 360Hz monitors",
      "Headset included",
      "10 Gbps line, under 5ms ping"
    ]
  },
  {
    id: "pro-slayer",
    name: "Grinder",
    price: 1600,
    duration: "3 hours",
    popular: true,
    description: "Enough time for a ranked session or a few team matches",
    features: [
      "Three hours on any PC or console",
      "First pick of stations",
      "One drink from the bar",
      "Cloud save sync",
      "10% off food"
    ]
  },
  {
    id: "night-owl",
    name: "Night owl",
    price: 3000,
    duration: "10 PM to 6 AM",
    description: "Eight hours overnight, with everyone else who stays up",
    features: [
      "Eight uninterrupted hours",
      "An energy drink and a midnight snack",
      "A reserved Secretlab Titan seat",
      "One hour in a sim cockpit",
      "Members channel on Discord"
    ]
  },
  {
    id: "gta6-vip",
    name: "GTA VI launch night",
    price: 4000,
    duration: "4 hours from midnight",
    isGtaSpecial: true,
    description: "A guaranteed 4K 144Hz rig from the moment GTA VI unlocks",
    features: [
      "A 4K 144Hz rig held for four hours",
      "Launch-night lanyard and merch box",
      "Unlimited Vice City Sunset drinks",
      "Skip the door queue",
      "Your session recorded in 4K60 on USB",
      "Entry to the Rs 500,000 heist invitational"
    ]
  }
];

export const TESTIMONIALS = [
  {
    name: "Alex 'Vortex' Chen",
    role: "Valorant player",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    quote: "Nexus 9 has the lowest latency rigs I've ever played on outside of LAN majors. 360Hz OLED monitors and steady 500+ FPS."
  },
  {
    name: "Sarah 'NeonNova' Jenkins",
    role: "Twitch partner",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    quote: "Already booked my GTA VI launch pass here. The lighting and the food bar are why I keep coming back."
  },
  {
    name: "Marcus Miller",
    role: "Sim racer",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    quote: "The direct-drive triple-screen motion rigs are the closest I have come to a GT3 car on track."
  }
];
