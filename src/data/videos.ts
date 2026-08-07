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

export const watchCategories = ["For You", "Live", "Gaming", "Music", "Sports"];

export const videos: Video[] = [
  {
    id: "v1",
    channel: "Tech Nepal",
    time: "2 hours ago",
    title: "How to build your first React app — Full tutorial",
    thumb: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800",
    duration: "12:45",
    views: "48K views",
    likes: 1340,
    comments: 210,
    category: "For You",
  },
  {
    id: "v2",
    channel: "Himalaya Travels",
    time: "5 hours ago",
    title: "Sunrise over Annapurna — 4K drone footage",
    thumb: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800",
    duration: "6:20",
    views: "112K views",
    likes: 5820,
    comments: 431,
    category: "For You",
  },
  {
    id: "v3",
    channel: "Kathmandu Esports",
    time: "Live now",
    title: "Live: National Gaming Championship — Grand Finals",
    thumb: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800",
    duration: "LIVE",
    views: "3.2K watching",
    likes: 890,
    comments: 1204,
    category: "Live",
  },
  {
    id: "v4",
    channel: "Nepal Beats",
    time: "1 day ago",
    title: "Acoustic session in the hills",
    thumb: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800",
    duration: "4:03",
    views: "27K views",
    likes: 2110,
    comments: 96,
    category: "Music",
  },
  {
    id: "v5",
    channel: "Sports Daily",
    time: "1 day ago",
    title: "Top 10 catches of the season",
    thumb: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800",
    duration: "8:57",
    views: "204K views",
    likes: 9320,
    comments: 780,
    category: "Sports",
  },
  {
    id: "v6",
    channel: "Pixel Playground",
    time: "2 days ago",
    title: "Building a game in 48 hours — devlog #3",
    thumb: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800",
    duration: "18:12",
    views: "61K views",
    likes: 3400,
    comments: 288,
    category: "Gaming",
  },
  {
    id: "v7",
    channel: "Street Food Nepal",
    time: "3 days ago",
    title: "Momo tour of Kathmandu",
    thumb: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
    duration: "10:31",
    views: "89K views",
    likes: 4120,
    comments: 512,
    category: "For You",
  },
];
