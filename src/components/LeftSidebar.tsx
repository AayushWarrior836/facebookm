import { Link } from "react-router-dom";
import { Users, MessageCircle, Bookmark, UsersRound, Clock, Tv, Store, Gamepad2, ChevronDown } from "lucide-react";
import profileImg from "@/assets/profile-shiva.jpg";

const LeftSidebar = () => {
  const links = [
    { icon: Users, label: "Friends", href: "#" },
    { icon: Clock, label: "Memories", href: "#" },
    { icon: Bookmark, label: "Saved", href: "#" },
    { icon: UsersRound, label: "Groups", href: "#" },
    { icon: Tv, label: "Watch", href: "#" },
    { icon: Store, label: "Marketplace", href: "#" },
    { icon: MessageCircle, label: "Messenger", href: "#" },
    { icon: Gamepad2, label: "Gaming", href: "#" },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-[280px] p-2 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto scrollbar-hide">
      <Link to="/profile" className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary transition-colors">
        <img src={profileImg} alt="Shiva Raj Lamsal" className="w-9 h-9 rounded-full object-cover" />
        <span className="font-semibold text-[15px]">Shiva Raj Lamsal</span>
      </Link>
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary transition-colors text-[15px]"
        >
          <l.icon className="w-7 h-7 text-primary p-0.5" />
          {l.label}
        </a>
      ))}
      <button className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary transition-colors text-[15px] text-muted-foreground">
        <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center">
          <ChevronDown className="w-4 h-4" />
        </div>
        See more
      </button>
      <div className="border-t my-2" />
      <p className="px-2 text-xs text-muted-foreground py-2">
        Privacy · Terms · Advertising · Ad Choices · Cookies · More · Meta © 2026
      </p>
    </aside>
  );
};

export default LeftSidebar;
