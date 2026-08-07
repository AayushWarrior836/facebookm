import { Plus } from "lucide-react";
import profileImg from "@/assets/profile-shiva.jpg";

/** Stories are created only by community users — never by Shiva's six friends. */
const stories = [
  { name: "Laxmi Poudel", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=200&h=300&fit=crop" },
  { name: "Dip", image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=200&h=300&fit=crop" },
  { name: "Ramesh Sigdel", image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=200&h=300&fit=crop" },
  { name: "Sabina Poudel", image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=200&h=300&fit=crop" },
  { name: "Kiran Lamsal", image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=200&h=300&fit=crop" },
  { name: "Aarati Sapkota", image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=200&h=300&fit=crop" },
  { name: "Roshan Sigdel", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&h=300&fit=crop" },
];

const Stories = () => (
  <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 px-2 sm:px-0">
    {/* Create Story */}
    <div className="relative flex-shrink-0 w-24 sm:w-28 h-40 sm:h-48 rounded-xl overflow-hidden bg-card border shadow-sm cursor-pointer group">
      <img src={profileImg} alt="Your story" className="w-full h-24 sm:h-32 object-cover" />
      <div className="absolute top-[5.2rem] sm:top-[7.2rem] left-1/2 -translate-x-1/2 w-8 sm:w-9 h-8 sm:h-9 rounded-full bg-primary border-4 border-card flex items-center justify-center">
        <Plus className="w-4 sm:w-5 h-4 sm:h-5 text-primary-foreground" />
      </div>
      <div className="absolute bottom-0 inset-x-0 h-14 sm:h-16 flex items-end justify-center pb-1.5 sm:pb-2">
        <span className="text-[10px] sm:text-xs font-semibold">Create story</span>
      </div>
    </div>

    {/* Community Stories */}
    {stories.map((s) => (
      <div key={s.name} className="relative flex-shrink-0 w-24 sm:w-28 h-40 sm:h-48 rounded-xl overflow-hidden cursor-pointer group">
        <img
          src={s.image}
          alt={s.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 w-8 sm:w-10 h-8 sm:h-10 rounded-full border-[3px] border-primary bg-muted flex items-center justify-center text-[10px] sm:text-xs font-bold text-muted-foreground">
          {s.name.split(" ").map((w) => w[0]).join("")}
        </div>
        <span className="absolute bottom-1.5 sm:bottom-2 left-1.5 sm:left-2 right-1.5 sm:right-2 text-[10px] sm:text-xs font-semibold text-white leading-tight">
          {s.name}
        </span>
      </div>
    ))}
  </div>
);

export default Stories;
