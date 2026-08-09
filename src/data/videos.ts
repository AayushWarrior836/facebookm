import ramayana1 from "@/assets/watch-ramayana-1.jpg";
import ramayana2 from "@/assets/watch-ramayana-2.jpg";
import mahabharat1 from "@/assets/watch-mahabharat-1.jpg";
import mahabharat2 from "@/assets/watch-mahabharat-2.jpg";

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

export const watchCategories = ["Ramayana", "Mahabharat"];

/** Short spiritual clips shown in the "All" reels feed. */
export const videos: Video[] = [
  {
    id: "v1",
    channel: "Ramesh Sigdel",
    time: "2 hours ago",
    title: "Shri Ram's arrival in Ayodhya — 60 second edit 🏹",
    thumb: ramayana1,
    duration: "0:58",
    views: "148K views",
    likes: 8340,
    comments: 512,
    category: "Short clips",
  },
  {
    id: "v2",
    channel: "Alisha Lamsal",
    time: "5 hours ago",
    title: "Hanuman Chalisa — morning bhajan short",
    thumb: ramayana2,
    duration: "0:45",
    views: "212K views",
    likes: 15820,
    comments: 931,
    category: "Short clips",
  },
  {
    id: "v3",
    channel: "Anish Sigdel",
    time: "8 hours ago",
    title: "Geeta Updesh — Karm kar, phal ki chinta mat kar 🕉️",
    thumb: mahabharat1,
    duration: "1:12",
    views: "96K watching",
    likes: 7890,
    comments: 604,
    category: "Short clips",
  },
  {
    id: "v4",
    channel: "Prerana Poudel",
    time: "1 day ago",
    title: "Bhishma Pitamah's vow — powerful scene clip",
    thumb: mahabharat2,
    duration: "1:03",
    views: "127K views",
    likes: 9110,
    comments: 396,
    category: "Short clips",
  },
  {
    id: "v5",
    channel: "Suraj Sapkota",
    time: "1 day ago",
    title: "Sita Swayamvar — the breaking of Shiv Dhanush",
    thumb: ramayana1,
    duration: "0:52",
    views: "304K views",
    likes: 19320,
    comments: 1180,
    category: "Short clips",
  },
  {
    id: "v6",
    channel: "Sujan Devkota",
    time: "2 days ago",
    title: "Aarti at Pashupatinath — evening darshan 🪔",
    thumb: mahabharat1,
    duration: "1:20",
    views: "61K views",
    likes: 3400,
    comments: 288,
    category: "Short clips",
  },
  {
    id: "v7",
    channel: "Ritu Lamsal",
    time: "3 days ago",
    title: "Lanka Dahan — Hanuman ji's fiery moment 🔥",
    thumb: ramayana2,
    duration: "0:47",
    views: "189K views",
    likes: 12120,
    comments: 712,
    category: "Short clips",
  },
  {
    id: "v8",
    channel: "Kamal Poudel",
    time: "4 days ago",
    title: "Krishna's Vishwaroop — divine form short",
    thumb: mahabharat2,
    duration: "1:05",
    views: "234K views",
    likes: 17780,
    comments: 1043,
    category: "Short clips",
  },
];
