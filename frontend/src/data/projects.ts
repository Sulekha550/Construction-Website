export type ProjectStat = {
  label: string;
  value: string;
};

export type Project = {
  id: string;
  slug: string;

  title: string;
  name: string;

  location: string;
  category: string;
  status: string;
  year: string;

  description: string;

  image: string;
  gallery: string[];

  amenities: string[];
  stats: ProjectStat[];
  tags: string[];
};

export const projects: Project[] = [
  {
    id: "project-one",
    slug: "project-one",

    title: "Green Residences",
    name: "Green Residences",

    location: "Gorakhpur, Uttar Pradesh",
    category: "Residential",
    status: "Upcoming",
    year: "2026",

    description:
      "A premium residential development designed around contemporary architecture, comfortable living and thoughtfully planned spaces.",

    image: "/images/projects/green.webp",

    gallery: [
      "/images/projects/green.webp",
      "/images/projects/central-tower.webp",
      "/images/projects/palm-paradise.webp",
    ],

    amenities: [
      "Landscape",
      "Parking",
      "24×7 Security",
      "Modern Architecture",
    ],

    stats: [
      {
        label: "Typology",
        value: "Residential",
      },
      {
        label: "Status",
        value: "Upcoming",
      },
      {
        label: "Year",
        value: "2026",
      },
    ],

    tags: [
      "Residential",
      "Premium",
      "Architecture",
    ],
  },

  {
    id: "project-two",
    slug: "project-two",

    title: "Central Tower",
    name: "Central Tower",

    location: "Gorakhpur, Uttar Pradesh",
    category: "Commercial",
    status: "Ongoing",
    year: "2026",

    description:
      "A contemporary commercial development combining strong architectural presence, functional spaces and a refined urban identity.",

    image: "/images/projects/central-tower.webp",

    gallery: [
      "/images/projects/central-tower.webp",
      "/images/projects/green.webp",
      "/images/projects/palm-paradise.webp",
    ],

    amenities: [
      "Parking",
      "24×7 Access",
      "Security",
      "Contemporary Design",
    ],

    stats: [
      {
        label: "Typology",
        value: "Commercial",
      },
      {
        label: "Status",
        value: "Ongoing",
      },
      {
        label: "Year",
        value: "2026",
      },
    ],

    tags: [
      "Commercial",
      "Business",
      "Modern",
    ],
  },

  {
    id: "project-three",
    slug: "project-three",

    title: "Palm Paradise",
    name: "Palm Paradise",

    location: "Uttar Pradesh",
    category: "Villa",
    status: "Ongoing",
    year: "2026",

    description:
      "An elegant villa development focused on spacious living, landscaped surroundings and a premium contemporary lifestyle.",

    image: "/images/projects/palm-paradise.webp",

    gallery: [
      "/images/projects/palm-paradise.webp",
      "/images/projects/green.webp",
      "/images/projects/central-tower.webp",
    ],

    amenities: [
      "Landscape",
      "Private Parking",
      "24×7 Security",
      "Premium Interiors",
    ],

    stats: [
      {
        label: "Typology",
        value: "Villa",
      },
      {
        label: "Status",
        value: "Ongoing",
      },
      {
        label: "Year",
        value: "2026",
      },
    ],

    tags: [
      "Villa",
      "Luxury",
      "Residential",
    ],
  },
];

export default projects;