import { useState, useEffect } from "react";
import { Search, Home, Tv, Store, Users, Gamepad2, Bell, MessageCircle, Menu, Moon, Sun, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { notifications } from "@/data/posts";
import profileImg from "@/assets/profile-shiva.jpg";

const Navbar = () => {
  const [dark, setDark] = useState(() => localStorage.getItem("theme") === "dark");
  const [showNotifs, setShowNotifs] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    setShowMobileMenu(false);
    setShowNotifs(false);
  }, [location.pathname]);

  const navItems = [
    { icon: Home, path: "/", label: "Home" },
    { icon: Tv, path: "#", label: "Watch" },
    { icon: Store, path: "#", label: "Marketplace" },
    { icon: Users, path: "#", label: "Groups" },
    { icon: Gamepad2, path: "#", label: "Gaming" },
  ];

  return (
    <>
      <nav className="sticky top-0 z-40 flex items-center justify-between h-14 px-2 sm:px-4 bg-card shadow-sm">
        {/* Left: Logo + Search */}
        <div className="flex items-center gap-1 sm:gap-2">
          <Link to="/" className="flex items-center shrink-0">
            <img src="/facebook-logo.png" alt="Facebook" className="h-10 object-contain" />
          </Link>
          {/* Mobile search icon */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="md:hidden w-9 h-9 rounded-full bg-secondary flex items-center justify-center"
          >
            <Search className="w-4 h-4 text-muted-foreground" />
          </button>
          {/* Desktop search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              placeholder="Search Facebook"
              className="w-60 pl-10 pr-4 py-2 rounded-full bg-secondary text-foreground text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:w-72 transition-all"
            />
          </div>
        </div>

        {/* Center: Navigation Icons (desktop only) */}
        <div className="hidden md:flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
          {navItems.map((item) => {
            const isActive = item.path !== "#" && location.pathname === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`relative flex items-center justify-center w-24 h-12 rounded-lg transition-colors group ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:bg-secondary"
                }`}
                title={item.label}
              >
                <item.icon className="w-6 h-6" />
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary rounded-t-full" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right: Action Icons */}
        <div className="flex items-center gap-1">
          {/* Mobile hamburger */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden w-9 h-9 rounded-full bg-secondary flex items-center justify-center hover:bg-muted transition-colors"
          >
            <Menu className="w-5 h-5 text-foreground" />
          </button>
          <button className="hidden sm:flex w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-secondary items-center justify-center hover:bg-muted transition-colors">
            <MessageCircle className="w-5 h-5 text-foreground" />
          </button>
          <div className="relative">
            <button
              onClick={() => setShowNotifs(!showNotifs)}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-muted transition-colors relative"
            >
              <Bell className="w-5 h-5 text-foreground" />
              <span className="absolute top-0 right-0 sm:top-1 sm:right-1 w-4 h-4 bg-destructive rounded-full text-[10px] text-destructive-foreground flex items-center justify-center font-bold">3</span>
            </button>
            {showNotifs && (
              <>
                <div className="fixed inset-0 z-40 md:hidden" onClick={() => setShowNotifs(false)} />
                <div className="fixed inset-x-2 top-16 z-50 md:absolute md:inset-x-auto md:right-0 md:top-12 md:w-80 bg-card rounded-lg shadow-xl border p-4 animate-scale-in">
                  <h3 className="font-bold text-xl mb-3">Notifications</h3>
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`flex items-start gap-3 p-2 rounded-lg text-sm mb-1 cursor-pointer hover:bg-secondary transition-colors ${
                        n.read ? "text-muted-foreground" : "bg-accent/50"
                      }`}
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Bell className="w-4 h-4 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className={`${n.read ? "" : "font-medium"} break-words`}>{n.text}</p>
                        <span className="text-xs text-primary">{n.time}</span>
                      </div>
                      {!n.read && <span className="w-3 h-3 rounded-full bg-primary shrink-0 mt-1" />}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
          <button
            onClick={() => setDark(!dark)}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-muted transition-colors"
          >
            {dark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-foreground" />}
          </button>
          <Link to="/profile" className="ml-0.5 sm:ml-1 shrink-0">
            <img src={profileImg} alt="Profile" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-transparent hover:border-primary transition-colors" />
          </Link>
        </div>
      </nav>

      {/* Mobile search overlay */}
      {showSearch && (
        <div className="fixed inset-0 z-50 bg-card md:hidden animate-fade-in">
          <div className="flex items-center gap-2 p-3">
            <button onClick={() => setShowSearch(false)} className="p-2">
              <X className="w-5 h-5" />
            </button>
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                autoFocus
                placeholder="Search Facebook"
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-secondary text-foreground text-sm outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>
        </div>
      )}

      {/* Mobile bottom navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-card border-t flex items-center justify-around h-12">
        {navItems.slice(0, 5).map((item) => {
          const isActive = item.path !== "#" && location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              className={`relative flex items-center justify-center w-full h-full transition-colors ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <item.icon className="w-6 h-6" />
              {isActive && (
                <div className="absolute top-0 left-2 right-2 h-[3px] bg-primary rounded-b-full" />
              )}
            </Link>
          );
        })}
      </div>

      {/* Mobile sidebar drawer */}
      {showMobileMenu && (
        <>
          <div className="fixed inset-0 z-40 bg-black/50 md:hidden animate-fade-in" onClick={() => setShowMobileMenu(false)} />
          <div className="fixed top-0 right-0 bottom-0 w-[280px] z-50 bg-card shadow-xl md:hidden animate-slide-in-right overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="font-bold text-lg">Menu</h2>
              <button onClick={() => setShowMobileMenu(false)} className="p-2 rounded-full hover:bg-secondary">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-2">
              <Link to="/profile" className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors" onClick={() => setShowMobileMenu(false)}>
                <img src={profileImg} alt="Profile" className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="font-semibold text-[15px]">Shiva Raj Lamsal</p>
                  <p className="text-xs text-muted-foreground">See your profile</p>
                </div>
              </Link>
              <div className="border-t my-2" />
              {[
                { icon: Users, label: "Friends" },
                { icon: MessageCircle, label: "Messenger" },
                { icon: Store, label: "Marketplace" },
                { icon: Tv, label: "Watch" },
                { icon: Gamepad2, label: "Gaming" },
              ].map((item) => (
                <a key={item.label} href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors text-[15px]">
                  <item.icon className="w-6 h-6 text-primary" />
                  {item.label}
                </a>
              ))}
              <div className="border-t my-2" />
              <button
                onClick={() => { setDark(!dark); setShowMobileMenu(false); }}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors text-[15px] w-full"
              >
                {dark ? <Sun className="w-6 h-6 text-yellow-400" /> : <Moon className="w-6 h-6 text-muted-foreground" />}
                {dark ? "Light mode" : "Dark mode"}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
