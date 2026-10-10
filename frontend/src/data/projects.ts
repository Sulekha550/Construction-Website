export type ProjectStat = {
  label: string;
  value: string;
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  name: string;
  badge: string;
  location: string;
  category: "Residential" | "Commercial & Residential" | "Villas" | string;
  type: string;
  area: string;
  status: string;
  year: string;
  configuration: string;
  highlights: string[];
  description: string;
  image: string;
  gallery: string[];
  amenities: string[];
  stats: ProjectStat[];
  tags: string[];
  price?: string;
};

export const projects: Project[] = [
  {
    id: "palm-paradise",
    slug: "palm-paradise",
    title: "Paalm Paradise",
    name: "Paalm Paradise",
    badge: "BY ALS",
    location: "Gorakhpur, Uttar Pradesh",
    category: "Residential",
    type: "Flats",
    area: "1800-3200 sq.ft",
    status: "By ALS",
    year: "2026",
    configuration: "3 & 4 BHK Luxury Flats",
    highlights: [
      "Designed By ALS",
      "1800–3200 sq.ft Spacious Layouts",
      "Prime Gorakhpur Location",
      "Earthquake Resistant RCC Structure",
    ],
    description:
      "A premier luxury residential development featuring contemporary architecture, sprawling high-ceiling layouts, panoramic balconies, and world-class living amenities in Gorakhpur.",
    image: "/images/projects/palm-paradise.webp",
    gallery: [
      "/images/projects/palm-paradise.webp",
      "/images/Home/Home5.webp",
      "/images/Gallery/Gallery1.webp",
      "/images/floorplans/3bhk3dform.webp",
    ],
    amenities: [
      "Landscaped Podium Gardens",
      "Dedicated Covered Parking",
      "Multi-tier 24×7 Security",
      "High-Speed Automatic Elevators",
      "Clubhouse & Fitness Center",
      "100% Power Backup",
    ],
    stats: [
      { label: "Type", value: "Flats" },
      { label: "Area", value: "1800-3200 sq.ft" },
      { label: "Status", value: "By ALS" },
      { label: "Possession", value: "2026" },
    ],
    tags: ["Flats", "Luxury", "Residential", "By ALS"],
    price: "Pricing on Request",
  },
  {
    id: "central-tower",
    slug: "central-tower",
    title: "Central Tower",
    name: "Central Tower",
    badge: "BY ALS",
    location: "Golghar , Gorakhpur",
    category: "Commercial & Residential",
    type: "Flats",
    area: "2400-4000 sq.ft",
    status: "By ALS",
    year: "2026",
    configuration: "Prestigious Flats & Retail Suites",
    highlights: [
      "Heart of Golghar Business District",
      "2400–4000 sq.ft Palatial Residences",
      "High-Street Commercial Visibility",
      "Double-Height Designer Lobby",
    ],
    description:
      "Positioned at the vibrant core of Golghar, Central Tower combines landmark modern architecture, elite residential flats with expansive carpet areas, and premium commercial prestige.",
    image: "/images/projects/central-tower.webp",
    gallery: [
      "/images/projects/central-tower.webp",
      "/images/Home/Home4.webp",
      "/images/Gallery/Gallery6.webp",
      "/images/floorplans/4bhk3dform.webp",
    ],
    amenities: [
      "Prime Golghar Epicenter",
      "Multi-Level Secure Parking",
      "Grand Reception Lobby",
      "24×7 High-Tech Surveillance",
      "Dedicated High-Speed Lifts",
      "Advanced Fire Safety Systems",
    ],
    stats: [
      { label: "Type", value: "Flats" },
      { label: "Area", value: "2400-4000 sq.ft" },
      { label: "Status", value: "By ALS" },
      { label: "Location", value: "Golghar, GKP" },
    ],
    tags: ["Flats", "Commercial", "Prime Golghar", "By ALS"],
    price: "Pricing on Request",
  },
  {
    id: "adhvik-skyline",
    slug: "adhvik-skyline",
    title: "Adhvik Skyline",
    name: "Adhvik Skyline",
    badge: "READY TO MOVE",
    location: "Gorakhpur, Uttar Pradesh",
    category: "Villas",
    type: "Villas",
    area: "1200-1800 sq.ft",
    status: "Ready to Move",
    year: "2026",
    configuration: "Independent Architectural Luxury Villas",
    highlights: [
      "Ready To Move In Today",
      "1200–1800 sq.ft Private Villas",
      "Landscaped Private Terraces",
      "Exclusive Gated Enclave",
    ],
    description:
      "An upscale architectural enclave of private luxury villas offering immediate possession, expansive sunlit living spaces, private terrace gardens, and an elite tranquil community environment.",
    image: "/images/projects/green.webp",
    gallery: [
      "/images/projects/green.webp",
      "/images/Home/Home6.webp",
      "/images/Gallery/Gallery8.webp",
      "/images/floorplans/2bhkk 3d.webp",
    ],
    amenities: [
      "Private Landscaped Terraces",
      "Turnkey Ready Possession",
      "Gated Security Enclave",
      "Individual Dedicated Parking",
      "24×7 Power & Water Supply",
      "Modern Green Architecture",
    ],
    stats: [
      { label: "Type", value: "Villas" },
      { label: "Area", value: "1200-1800 sq.ft" },
      { label: "Status", value: "Ready to Move" },
      { label: "Typology", value: "Private Villas" },
    ],
    tags: ["Villas", "Ready to Move", "Luxury", "Gated Community"],
    price: "Pricing on Request",
  },
];

export default projects;
