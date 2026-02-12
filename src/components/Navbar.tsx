import { useState, useEffect } from "react";
import { Search, Home, User, Bell, Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import { notifications } from "@/data/posts";

const Navbar = () => {
  const [dark, setDark] = useState(() => localStorage.getItem("theme") === "dark");
  const [showNotifs, setShowNotifs] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <nav className="sticky top-0 z-40 flex items-center justify-between px-4 py-2 bg-card shadow-sm border-b">
      <Link to="/" className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-xl" style={{ fontFamily: "Georgia, serif" }}>f</span>
        </div>
        <span className="hidden md:inline text-xl font-bold text-primary">ConnectBook</span>
      </Link>

      <div className="flex-1 max-w-md mx-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            placeholder="Search ConnectBook"
            className="w-full pl-10 pr-4 py-2 rounded-full bg-secondary text-foreground text-sm outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
      </div>

      <div className="flex items-center gap-1">
        <Link to="/" className="p-2 rounded-full hover:bg-secondary transition-colors">
          <Home className="w-5 h-5 text-primary" />
        </Link>
        <Link to="/profile" className="p-2 rounded-full hover:bg-secondary transition-colors">
          <User className="w-5 h-5 text-muted-foreground hover:text-primary" />
        </Link>
        <div className="relative">
          <button
            onClick={() => setShowNotifs(!showNotifs)}
            className="p-2 rounded-full hover:bg-secondary transition-colors relative"
          >
            <Bell className="w-5 h-5 text-muted-foreground hover:text-primary" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-destructive rounded-full" />
          </button>
          {showNotifs && (
            <div className="absolute right-0 top-12 w-80 bg-card rounded-lg shadow-xl border p-3 z-50">
              <h3 className="font-semibold mb-2">Notifications</h3>
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className={`p-2 rounded-lg text-sm mb-1 ${n.read ? "text-muted-foreground" : "bg-accent font-medium"}`}
                >
                  <p>{n.text}</p>
                  <span className="text-xs text-muted-foreground">{n.time}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <button
          onClick={() => setDark(!dark)}
          className="p-2 rounded-full hover:bg-secondary transition-colors"
        >
          {dark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-muted-foreground" />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
