import { useState } from "react";
import profileImg from "@/assets/profile-shiva.jpg";
import { stories } from "@/data/stories";
import StoryViewer from "./StoryViewer";

const Stories = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 px-2 sm:px-0">
        {/* Create Story */}
        <div className="relative flex-shrink-0 w-24 sm:w-28 h-40 sm:h-48 rounded-xl overflow-hidden bg-card border shadow-sm cursor-pointer group">
          <img src={profileImg} alt="Your story" className="w-full h-24 sm:h-32 object-cover" />
          <div className="absolute top-[5.2rem] sm:top-[7.2rem] left-1/2 -translate-x-1/2 w-8 sm:w-9 h-8 sm:h-9 rounded-full bg-primary border-4 border-card flex items-center justify-center">
            <i className="bi bi-plus text-[16px] text-primary-foreground" />
          </div>
          <div className="absolute bottom-0 inset-x-0 h-14 sm:h-16 flex items-end justify-center pb-1.5 sm:pb-2">
            <span className="text-[10px] sm:text-xs font-semibold">Create story</span>
          </div>
        </div>

        {/* Community Stories */}
        {stories.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setOpenIndex(i)}
            aria-label={`View ${s.name}'s story`}
            className="relative flex-shrink-0 w-24 sm:w-28 h-40 sm:h-48 rounded-xl overflow-hidden cursor-pointer group text-left focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <img
              src={s.items[0].image}
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
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <StoryViewer stories={stories} startIndex={openIndex} onClose={() => setOpenIndex(null)} />
      )}
    </>
  );
};

export default Stories;
