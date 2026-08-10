import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { notifications } from "@/data/posts";
import profileImg from "@/assets/profile-shiva.jpg";

const Navbar = () => {
  const [dark, setDark] = useState(() => localStorage.getItem("theme") === "dark");
  const [showNotifs, setShowNotifs] = useState(false);
  
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
    { icon: "bi-house", path: "/", label: "Home" },
    { icon: "bi-people", path: "/friends", label: "Friends" },
    { icon: "bi-play-btn", path: "/watch", label: "Watch" },
    { icon: "bi-bell", path: "#notif", label: "Notifications" },
    { icon: "bi-list", path: "#menu", label: "Menu" },
  ];

  const desktopNavItems = [
    { icon: "bi-house", path: "/", label: "Home" },
    { icon: "bi-people", path: "/friends", label: "Friends" },
    { icon: "bi-play-btn", path: "/watch", label: "Watch" },
    { icon: "bi-bell", path: "/notifications", label: "Notifications" },
  ];

  return (
    <>
      {/* Mobile top bar - Facebook style */}
      <nav className="md:hidden sticky top-0 z-40 flex items-center justify-between h-12 px-3 bg-card shadow-sm">
        <Link to="/" className="flex items-center shrink-0">
          <span className="text-primary font-bold text-[26px] leading-none" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>facebook</span>
        </Link>
        <div className="flex items-center gap-1.5">
          <button className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
            <i className="bi bi-chat text-[20px] w-[18px] h-[18px] text-foreground" />
          </button>
        </div>
      </nav>

      {/* Desktop top bar */}
      <nav className="hidden md:flex sticky top-0 z-40 items-center justify-between h-14 px-4 bg-card shadow-sm">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center shrink-0">
            <img src="/facebook-logo.png" alt="Facebook" className="h-10 object-contain" />
          </Link>
        </div>

        <div className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
          {desktopNavItems.map((item) => {
            const isActive = item.path !== "#" && location.pathname === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`relative flex items-center justify-center w-24 h-12 rounded-lg transition-colors group ${
                  isActive ? "text-primary" : "text-muted-foreground hover:bg-secondary"
                }`}
                title={item.label}
              >
                <i className={`bi ${item.icon} text-[24px]`} />
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary rounded-t-full" />
                )}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-1">
          <button className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-muted transition-colors">
            <i className="bi bi-chat text-[20px] text-foreground" />
          </button>
          <div className="relative">
            <button
              onClick={() => setShowNotifs(!showNotifs)}
              className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-muted transition-colors relative"
            >
              <i className="bi bi-bell text-[20px] text-foreground" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-destructive rounded-full text-[10px] text-destructive-foreground flex items-center justify-center font-bold">3</span>
            </button>
            {showNotifs && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowNotifs(false)} />
                <div className="absolute right-0 top-12 w-80 z-50 bg-card rounded-lg shadow-xl border p-4 animate-scale-in">
                  <h3 className="font-bold text-xl mb-3">Notifications</h3>
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`flex items-start gap-3 p-2 rounded-lg text-sm mb-1 cursor-pointer hover:bg-secondary transition-colors ${
                        n.read ? "text-muted-foreground" : "bg-accent/50"
                      }`}
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <i className="bi bi-bell text-[16px] text-primary" />
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
            className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-muted transition-colors"
          >
            {dark ? <i className="bi bi-sun text-[20px] text-yellow-400" /> : <i className="bi bi-moon text-[20px] text-foreground" />}
          </button>
          <Link to="/profile" className="ml-1 shrink-0">
            <img src={profileImg} alt="Profile" className="w-10 h-10 rounded-full object-cover border-2 border-transparent hover:border-primary transition-colors" />
          </Link>
        </div>
      </nav>


      {/* Mobile bottom navigation - Facebook app style tabs */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-card border-t flex items-center justify-around h-12">
        {navItems.map((item) => {
          const isActive = item.path !== "#" && item.path !== "#notif" && item.path !== "#menu" && location.pathname === item.path;
          const isNotif = item.path === "#notif";
          const isMenu = item.path === "#menu";

          const handleClick = () => {
            if (isNotif) {
              setShowNotifs(!showNotifs);
              setShowMobileMenu(false);
            } else if (isMenu) {
              setShowMobileMenu(!showMobileMenu);
              setShowNotifs(false);
            }
          };

          if (isNotif || isMenu) {
            return (
              <button
                key={item.label}
                onClick={handleClick}
                className={`relative flex items-center justify-center w-full h-full transition-colors ${
                  (isNotif && showNotifs) || (isMenu && showMobileMenu) ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <i className={`bi ${item.icon} text-[24px]`} />
                {isNotif && (
                  <span className="absolute top-1 right-1/2 translate-x-3 w-4 h-4 bg-destructive rounded-full text-[10px] text-destructive-foreground flex items-center justify-center font-bold">3</span>
                )}
              </button>
            );
          }

          return (
            <Link
              key={item.label}
              to={item.path}
              className={`relative flex items-center justify-center w-full h-full transition-colors ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <i className={`bi ${item.icon} text-[24px]`} />
              {isActive && (
                <div className="absolute top-0 left-2 right-2 h-[3px] bg-primary rounded-b-full" />
              )}
            </Link>
          );
        })}
      </div>

      {/* Mobile notifications panel */}
      {showNotifs && (
        <>
          <div className="fixed inset-0 z-40 md:hidden" onClick={() => setShowNotifs(false)} />
          <div className="fixed inset-x-2 bottom-14 z-50 md:hidden bg-card rounded-lg shadow-xl border p-4 animate-scale-in max-h-[60vh] overflow-y-auto">
            <h3 className="font-bold text-xl mb-3">Notifications</h3>
            {notifications.map((n) => (
              <div
                key={n.id}
                className={`flex items-start gap-3 p-2 rounded-lg text-sm mb-1 cursor-pointer hover:bg-secondary transition-colors ${
                  n.read ? "text-muted-foreground" : "bg-accent/50"
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <i className="bi bi-bell text-[16px] text-primary" />
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

      {/* Mobile menu drawer */}
      {showMobileMenu && (
        <>
          <div className="fixed inset-0 z-40 bg-black/50 md:hidden animate-fade-in" onClick={() => setShowMobileMenu(false)} />
          <div className="fixed top-0 right-0 bottom-0 w-[280px] z-50 bg-card shadow-xl md:hidden animate-slide-in-right overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="font-bold text-lg">Menu</h2>
              <button onClick={() => setShowMobileMenu(false)} className="p-2 rounded-full hover:bg-secondary">
                <i className="bi bi-x text-[20px]" />
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
                { icon: "bi-people", label: "Friends" },
                { icon: "bi-chat", label: "Messenger" },
                { icon: "bi-play-btn", label: "Watch" },
              ].map((item) => (
                <a key={item.label} href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors text-[15px]">
                  <i className={`bi ${item.icon} text-[24px] text-primary`} />
                  {item.label}
                </a>
              ))}
              <div className="border-t my-2" />
              <button
                onClick={() => { setDark(!dark); setShowMobileMenu(false); }}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors text-[15px] w-full"
              >
                {dark ? <i className="bi bi-sun text-[24px] text-yellow-400" /> : <i className="bi bi-moon text-[24px] text-muted-foreground" />}
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
