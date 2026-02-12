import { Plus } from "lucide-react";
import profileImg from "@/assets/profile-shiva.jpg";

const stories = [
  { name: "Ramesh Tamang", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=200&h=300&fit=crop" },
  { name: "Anita Sharma", image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=200&h=300&fit=crop" },
  { name: "Priya Adhikari", image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=200&h=300&fit=crop" },
  { name: "Sabin Karki", image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=200&h=300&fit=crop" },
];

const Stories = () => (
  <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
    {/* Create Story */}
    <div className="relative flex-shrink-0 w-28 h-48 rounded-xl overflow-hidden bg-card border shadow-sm cursor-pointer group">
      <img src={profileImg} alt="Your story" className="w-full h-32 object-cover" />
      <div className="absolute top-[7.2rem] left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-primary border-4 border-card flex items-center justify-center">
        <Plus className="w-5 h-5 text-primary-foreground" />
      </div>
      <div className="absolute bottom-0 inset-x-0 h-16 flex items-end justify-center pb-2">
        <span className="text-xs font-semibold">Create story</span>
      </div>
    </div>

    {/* Friend Stories */}
    {stories.map((s) => (
      <div key={s.name} className="relative flex-shrink-0 w-28 h-48 rounded-xl overflow-hidden cursor-pointer group">
        <img
          src={s.image}
          alt={s.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-3 left-3 w-10 h-10 rounded-full border-[3px] border-primary bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">
          {s.name.split(" ").map((w) => w[0]).join("")}
        </div>
        <span className="absolute bottom-2 left-2 right-2 text-xs font-semibold text-white leading-tight">
          {s.name}
        </span>
      </div>
    ))}
  </div>
);

export default Stories;
