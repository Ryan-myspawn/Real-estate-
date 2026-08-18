export const AMENITIES = [
  "Main entrance arch",
  "Modern clubhouse",
  "Swimming pool",
  "Badminton court",
  "Tennis court",
  "Snooker & table tennis",
  "Kids play area",
  "Temple",
  "Labyrinth garden",
  "Flower park",
  "Herbal garden",
  "Pet park",
  "Senior citizen area",
  "Avenue plantation",
  "Open gym",
  "24/7 security",
  "Rainwater harvesting",
  "40 ft main / 30 ft sub roads",
  "2 lakh-litre OHT + borewells",
  "Sanitary connection",
];

export const AMENITY_GROUPS: { title: string; note: string; items: string[] }[] = [
  {
    title: "Leisure",
    note: "The social heart",
    items: [
      "Modern clubhouse",
      "Swimming pool",
      "Tennis court",
      "Badminton court",
      "Snooker & table tennis",
      "Open gym",
      "Kids play area",
    ],
  },
  {
    title: "Nature",
    note: "The quiet half",
    items: [
      "Labyrinth garden",
      "Flower park",
      "Herbal garden",
      "Avenue plantation",
      "Pet park",
      "Senior citizen area",
    ],
  },
  {
    title: "Foundation",
    note: "The invisible work",
    items: [
      "Main entrance arch",
      "Temple",
      "24/7 security",
      "40 ft main / 30 ft sub roads",
      "2 lakh-litre OHT + borewells",
      "Rainwater harvesting",
      "Sanitary connection",
    ],
  },
];

export const STATS: { value: number; suffix: string; label: string; note: string }[] = [
  { value: 20, suffix: "ac", label: "acres, 21 guntas", note: "of planned island, edge to edge" },
  { value: 7, suffix: "", label: "plot configurations", note: "30'×40' to 40'×60', odd & corner sites" },
  { value: 40, suffix: "ft", label: "main avenues", note: "tree-lined, with 30 ft sub roads" },
  { value: 20, suffix: "+", label: "amenities", note: "clubhouse, courts, gardens, temple" },
];

export const PLOTS = [
  "30' × 40'",
  "30' × 50'",
  "40' × 50'",
  "40' × 60'",
  "20' × 40'",
  "Odd sites",
  "Corner sites",
];

export const MODELS = {
  A: {
    name: "Model A+",
    epithet: "The Duplex",
    area: "3000 sq ft",
    config: "4 BHK · G+1",
    plots: "40'×50' & 40'×60' plots",
    signature: "Pergola roof deck & private pool court",
    story:
      "Double-height massing in pearl render. A great room across the full garden face, an island kitchen that hosts, three bedrooms above — and a roof deck above the treeline for Bangalore evenings.",
    still: "/stills/a-hero.jpg",
    interior: "/stills/a-living.jpg",
  },
  B: {
    name: "Model B",
    epithet: "The Pavilion House",
    area: "1600 sq ft",
    config: "3 BHK · Single storey",
    plots: "30'×40' & 30'×50' plots",
    signature: "Timber pergola pavilion off the lawn",
    story:
      "One clean volume, one gold entrance, one glazed garden face. Every square foot furnished and working — and a garden pavilion where the roof deck would be, at ground level under open sky.",
    still: "/stills/b-hero.jpg",
    interior: "/stills/b-pavilion.jpg",
  },
} as const;

export const NEARBY: { name: string; kind: string }[] = [
  { name: "Proposed Peripheral Ring Road", kind: "Connectivity" },
  { name: "Dr. K. Shivaram Karanth Layout", kind: "Neighbourhood" },
  { name: "Mavallipura Lake", kind: "Nature" },
  { name: "Yelahanka", kind: "City hub" },
];

export const RERA = "PRM/KA/RERA/1251/472/PR/160126/008408";
export const CONTACTS = ["96862 82468", "98456 85606", "98450 26906"];
export const WHATSAPP = "919686282468";
export const ADDRESS =
  "#1135, Ramshiv Complex, 1st Main, Yeshwantpur, Bangalore 560 022";
