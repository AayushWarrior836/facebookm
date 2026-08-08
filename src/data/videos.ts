export interface Video {
  id: string;
  channel: string;
  time: string;
  title: string;
  thumb: string;
  duration: string;
  views: string;
  likes: number;
  comments: number;
  category: string;
}

export const watchCategories = ["Short clips", "Ramayana", "Mahabharat"];

export const videos: Video[] = [

  {
    id: "v1",
    channel: "Bibek Sapkota",
    time: "2 hours ago",
    title: "How to build your first React app — Full tutorial",
    thumb: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800",
    duration: "12:45",
    views: "48K views",
    likes: 1340,
    comments: 210,
    category: "Short clips",
  },
  {
    id: "v2",
    channel: "Alisha Lamsal",
    time: "5 hours ago",
    title: "Sunrise over Annapurna — 4K drone footage from Pokhara",
    thumb: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800",
    duration: "6:20",
    views: "112K views",
    likes: 5820,
    comments: 431,
    category: "Short clips",
  },
  {
    id: "v3",
    channel: "Anish Sigdel",
    time: "Live now",
    title: "Live: Kathmandu Gaming Championship — Grand Finals",
    thumb: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800",
    duration: "LIVE",
    views: "3.2K watching",
    likes: 890,
    comments: 1204,
    category: "Short clips",
  },
  {
    id: "v4",
    channel: "Prerana Poudel",
    time: "1 day ago",
    title: "Acoustic session in the hills of Nawalpur",
    thumb: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800",
    duration: "4:03",
    views: "27K views",
    likes: 2110,
    comments: 96,
    category: "Short clips",
  },
  {
    id: "v5",
    channel: "Suraj Sapkota",
    time: "1 day ago",
    title: "Top 10 catches of the Nepal Premier League",
    thumb: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800",
    duration: "8:57",
    views: "204K views",
    likes: 9320,
    comments: 780,
    category: "Short clips",
  },
  {
    id: "v6",
    channel: "Sujan Devkota",
    time: "2 days ago",
    title: "Building a game in 48 hours — devlog #3",
    thumb: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800",
    duration: "18:12",
    views: "61K views",
    likes: 3400,
    comments: 288,
    category: "Short clips",
  },
  {
    id: "v7",
    channel: "Ritu Lamsal",
    time: "3 days ago",
    title: "Momo tour of Kathmandu — street food guide",
    thumb: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
    duration: "10:31",
    views: "89K views",
    likes: 4120,
    comments: 512,
    category: "Short clips",
  },
  {
    id: "v8",
    channel: "Kamal Poudel",
    time: "4 days ago",
    title: "Learning TypeScript in Nepali — episode 1",
    thumb: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
    duration: "22:08",
    views: "34K views",
    likes: 1780,
    comments: 143,
    category: "Short clips",
  },
];
