import { Link } from "react-router-dom";
import { Users, MessageCircle, Bookmark, UsersRound } from "lucide-react";
import profileImg from "@/assets/profile-shiva.jpg";

const LeftSidebar = () => {
  const links = [
    { icon: Users, label: "Friends", href: "#" },
    { icon: MessageCircle, label: "Messages", href: "#" },
    { icon: Bookmark, label: "Saved", href: "#" },
    { icon: UsersRound, label: "Groups", href: "#" },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 p-4 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto scrollbar-hide">
      <Link to="/profile" className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary transition-colors mb-2">
        <img src={profileImg} alt="Shiva Raj Lamsal" className="w-9 h-9 rounded-full object-cover" />
        <span className="font-semibold text-sm">Shiva Raj Lamsal</span>
      </Link>
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary transition-colors text-sm text-muted-foreground hover:text-foreground"
        >
          <l.icon className="w-5 h-5 text-primary" />
          {l.label}
        </a>
      ))}
    </aside>
  );
};

export default LeftSidebar;
