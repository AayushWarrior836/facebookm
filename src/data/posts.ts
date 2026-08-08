import { friends, communityUsers } from "./people";

export interface Comment {
  id: string;
  author: string;
  avatar: string;
  text: string;
  time: string;
}

export interface PollOption {
  label: string;
  votes: number;
}

export interface Post {
  id: string;
  type: "text" | "image" | "images" | "video" | "poll" | "life-update" | "link" | "activity" | "checkin" | "memory";
  author: string;
  avatar: string;
  time: string;
  text?: string;
  image?: string;
  images?: string[];
  videoThumb?: string;
  pollQuestion?: string;
  pollOptions?: PollOption[];
  linkPreview?: { image: string; title: string; description: string; site: string; url: string };
  activityText?: string;
  location?: string;
  memoryDate?: string;
  memoryImage?: string;
  likes: number;
  comments: Comment[];
}

export const dummyPosts: Post[] = [
  {
    id: "1",
    type: "text",
    author: "Nisha Lamsal",
    avatar: "",
    time: "2 hours ago",
    text: "\"The only way to do great work is to love what you do.\" — Steve Jobs 💡",
    likes: 24,
    comments: [
      { id: "c1", author: "Anusha Lamsal", avatar: "", text: "So true! 🙌", time: "1h ago" },
    ],
  },
  {
    id: "2",
    type: "image",
    author: "Ramesh Sigdel",
    avatar: "",
    time: "3 hours ago",
    text: "Beautiful sunset from Pokhara lakeside 🌅",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600",
    location: "Pokhara",
    likes: 58,
    comments: [
      { id: "c2", author: "Govinda Lamsal", avatar: "", text: "Stunning view!", time: "2h ago" },
    ],
  },
  {
    id: "3",
    type: "images",
    author: "Sabina Poudel",
    avatar: "",
    time: "5 hours ago",
    text: "Weekend trip around Chitwan! 🏞️",
    images: [
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400",
      "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=400",
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=400",
    ],
    location: "Chitwan",
    likes: 92,
    comments: [
      { id: "c3", author: "Aayush Lamsal", avatar: "", text: "Take me next time!", time: "4h ago" },
    ],
  },
  {
    id: "4",
    type: "video",
    author: "Bibek Sapkota",
    avatar: "",
    time: "6 hours ago",
    text: "How to build your first React app — Full tutorial 🎬",
    videoThumb: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600",
    likes: 134,
    comments: [
      { id: "c4", author: "Being Santosh", avatar: "", text: "Great content!", time: "5h ago" },
    ],
  },
  {
    id: "5",
    type: "poll",
    author: "Kiran Lamsal",
    avatar: "",
    time: "8 hours ago",
    text: "What should I learn next? 🤔",
    pollQuestion: "What should I learn next?",
    pollOptions: [
      { label: "React", votes: 45 },
      { label: "AI / Machine Learning", votes: 32 },
      { label: "Game Development", votes: 18 },
    ],
    likes: 67,
    comments: [
      { id: "c5", author: "Amrita Lamsal", avatar: "", text: "React is king!", time: "7h ago" },
    ],
  },
  {
    id: "6",
    type: "life-update",
    author: "Aarati Sapkota",
    avatar: "",
    time: "1 day ago",
    text: "🎉 Started my new job in Bharatpur today! Excited for what's coming.",
    likes: 112,
    comments: [
      { id: "c6", author: "Asmita Lamsal", avatar: "", text: "Congratulations! 🚀", time: "23h ago" },
      { id: "c6b", author: "Shiva Raj Lamsal", avatar: "", text: "Well deserved!", time: "22h ago" },
    ],
  },
  {
    id: "7",
    type: "link",
    author: "Prakash Devkota",
    avatar: "",
    time: "1 day ago",
    text: "Check out this amazing article on web development trends 🔗",
    linkPreview: {
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600",
      title: "Top 10 Web Development Trends in 2026",
      description: "Discover the latest trends shaping the future of web development, from AI-powered tools to edge computing.",
      site: "techblog.com",
      url: "#",
    },
    likes: 41,
    comments: [],
  },
  {
    id: "8",
    type: "activity",
    author: "Roshan Sigdel",
    avatar: "",
    time: "2 days ago",
    activityText: "Roshan Sigdel updated his profile picture.",
    likes: 29,
    comments: [
      { id: "c8", author: "Anusha Lamsal", avatar: "", text: "Looking great! 👍", time: "1d ago" },
    ],
  },
  {
    id: "9",
    type: "checkin",
    author: "Samiksha Poudel",
    avatar: "",
    time: "3 days ago",
    text: "Enjoying the peaceful vibes ☕",
    location: "Kawasoti, Nawalpur",
    likes: 76,
    comments: [
      { id: "c9", author: "Govinda Lamsal", avatar: "", text: "My hometown! ❤️", time: "2d ago" },
    ],
  },
  {
    id: "10",
    type: "memory",
    author: "Sagar Devkota",
    avatar: "",
    time: "On this day",
    memoryDate: "1 year ago today",
    text: "Throwback to the best hike above Lumbini! 🏔️",
    memoryImage: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600",
    likes: 88,
    comments: [
      { id: "c10", author: "Aayush Lamsal", avatar: "", text: "Memories! 🥰", time: "3d ago" },
    ],
  },
];

/** Only Shiva's personal friends appear online. */
export const onlineContacts = friends.map((f) => ({ name: f.name, avatar: f.avatar }));

export const trendingTopics = [
  { topic: "Nepal Tourism 2026", category: "Travel", posts: "12K" },
  { topic: "Kathmandu Tech Meetup", category: "Technology", posts: "8K" },
  { topic: "Chitwan Elephant Festival", category: "Culture", posts: "15K" },
  { topic: "Nepal Premier League", category: "Sports", posts: "25K" },
];

export const suggestedFriends = communityUsers
  .slice(0, 6)
  .map((u) => ({ name: u.name, avatar: u.avatar, mutualFriends: u.mutualFriends ?? 3 }));

export const notifications = [
  { id: "n1", text: "Aayush Lamsal liked your post.", time: "2m ago", read: false, section: "Today" },
  { id: "n2", text: "Govinda Lamsal reacted ❤️ to your photo.", time: "15m ago", read: false, section: "Today" },
  { id: "n3", text: "Being Santosh commented on your post.", time: "1h ago", read: false, section: "Today" },
  { id: "n4", text: "Anusha Lamsal accepted your friend request.", time: "Yesterday", read: true, section: "Yesterday" },
  { id: "n5", text: "Amrita Lamsal mentioned you in a comment.", time: "Yesterday", read: true, section: "Yesterday" },
  { id: "n6", text: "Asmita Lamsal sent you a friend request.", time: "3 days ago", read: true, section: "Earlier" },
];
