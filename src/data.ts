export type Property = {
  id: number;
  title: string;
  neighborhood: string;
  price: string;
  beds: number;
  baths: number;
  sqft: string;
  tag?: string;
  // CSS gradient placeholder until real photography is added
  art: string;
};

export const PROPERTIES: Property[] = [
  {
    id: 1,
    title: "The Larchmont",
    neighborhood: "Travis Heights",
    price: "$1,285,000",
    beds: 4,
    baths: 3,
    sqft: "2,940",
    tag: "New listing",
    art: "linear-gradient(135deg,#1E3A2F 0%,#2F5546 55%,#B08D3E 130%)",
  },
  {
    id: 2,
    title: "Mira Vista Loft",
    neighborhood: "East Cesar Chavez",
    price: "$689,000",
    beds: 2,
    baths: 2,
    sqft: "1,410",
    art: "linear-gradient(135deg,#232A35 0%,#41506B 60%,#C9A960 140%)",
  },
  {
    id: 3,
    title: "Casa Sabina",
    neighborhood: "Barton Hills",
    price: "$975,000",
    beds: 3,
    baths: 2,
    sqft: "2,120",
    tag: "Open Sat",
    art: "linear-gradient(135deg,#5B4A32 0%,#8A6D42 55%,#EDE7DB 145%)",
  },
  {
    id: 4,
    title: "The Foundry Row",
    neighborhood: "Mueller",
    price: "$540,000",
    beds: 2,
    baths: 2,
    sqft: "1,180",
    art: "linear-gradient(135deg,#14181F 0%,#3A2F3F 60%,#B08D3E 140%)",
  },
  {
    id: 5,
    title: "Cedar & Vine",
    neighborhood: "Zilker",
    price: "$1,650,000",
    beds: 5,
    baths: 4,
    sqft: "3,610",
    tag: "Price improved",
    art: "linear-gradient(135deg,#1E3A2F 0%,#4E6B54 55%,#EDE7DB 140%)",
  },
  {
    id: 6,
    title: "Lamar Sky Flat",
    neighborhood: "North Loop",
    price: "$425,000",
    beds: 1,
    baths: 1,
    sqft: "820",
    art: "linear-gradient(135deg,#232A35 0%,#2F4A5C 60%,#C9A960 145%)",
  },
];

export const STATS = [
  { value: "214", label: "homes placed" },
  { value: "11", label: "days average on market" },
  { value: "98.4%", label: "of asking achieved" },
  { value: "4.9★", label: "client rating" },
];
