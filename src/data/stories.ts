export interface StoryItem {
  image: string;
  caption?: string;
  duration?: number; // ms
}

export interface Story {
  id: string;
  name: string;
  time: string;
  items: StoryItem[];
}

/** Stories are created only by community users — never by Shiva's six friends. */
export const stories: Story[] = [
  {
    id: "nisha",
    name: "Nisha Lamsal",
    time: "2h",
    items: [
      { image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=1400&fit=crop", caption: "Evening walk in Kawasoti 🌄" },
      { image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=1400&fit=crop", caption: "So green after the rain" },
    ],
  },
  {
    id: "bibek",
    name: "Bibek Sapkota",
    time: "3h",
    items: [
      { image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&h=1400&fit=crop", caption: "Pokhara mornings hit different" },
    ],
  },
  {
    id: "ramesh",
    name: "Ramesh Sigdel",
    time: "5h",
    items: [
      { image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=1400&fit=crop", caption: "Chitwan sunset 🧡" },
      { image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=1400&fit=crop" },
    ],
  },
  {
    id: "sabina",
    name: "Sabina Poudel",
    time: "7h",
    items: [
      { image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800&h=1400&fit=crop", caption: "Weekend trek 🥾" },
    ],
  },
  {
    id: "kiran",
    name: "Kiran Lamsal",
    time: "9h",
    items: [
      { image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&h=1400&fit=crop", caption: "Lumbini trip" },
      { image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=1400&fit=crop", caption: "Food was amazing 😋" },
    ],
  },
  {
    id: "aarati",
    name: "Aarati Sapkota",
    time: "11h",
    items: [
      { image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=1400&fit=crop", caption: "Bharatpur nights" },
    ],
  },
  {
    id: "roshan",
    name: "Roshan Sigdel",
    time: "14h",
    items: [
      { image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=1400&fit=crop", caption: "Butwal street food run" },
    ],
  },
];
