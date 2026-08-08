import { useState } from "react";
import { Bell, Check, Trash2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import { notifications as initial } from "@/data/posts";

const SECTIONS = ["Today", "Yesterday", "Earlier"];

const Notifications = () => {
  const [items, setItems] = useState(initial);

  const markRead = (id: string) =>
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  const markAllRead = () => setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  const remove = (id: string) => setItems((prev) => prev.filter((n) => n.id !== id));

  return (
    <div className="min-h-screen bg-background pb-14 md:pb-0">
      <Navbar />
      <div className="max-w-[680px] mx-auto p-3 sm:p-4">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Bell className="w-6 h-6 text-primary" /> Notifications
          </h1>
          <button onClick={markAllRead} className="text-sm text-primary font-medium hover:underline">
            Mark all as read
          </button>
        </div>

        {SECTIONS.map((section) => {
          const list = items.filter((n) => n.section === section);
          if (!list.length) return null;
          return (
            <section key={section} className="mb-5">
              <h2 className="font-semibold text-lg mb-2">{section}</h2>
              <div className="bg-card rounded-xl border divide-y overflow-hidden">
                {list.map((n) => (
                  <div
                    key={n.id}
                    className={`flex items-start gap-3 p-3 transition-colors hover:bg-secondary ${
                      n.read ? "" : "bg-accent/40"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Bell className="w-4 h-4 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className={`text-[15px] break-words ${n.read ? "text-muted-foreground" : "font-medium"}`}>
                        {n.text}
                      </p>
                      <span className="text-xs text-primary">{n.time}</span>
                    </div>
                    {!n.read && <span className="w-2.5 h-2.5 rounded-full bg-primary shrink-0 mt-2" />}
                    <div className="flex gap-1 shrink-0">
                      {!n.read && (
                        <button
                          onClick={() => markRead(n.id)}
                          aria-label="Mark as read"
                          className="p-1.5 rounded-full hover:bg-muted"
                        >
                          <Check className="w-4 h-4 text-muted-foreground" />
                        </button>
                      )}
                      <button
                        onClick={() => remove(n.id)}
                        aria-label="Delete notification"
                        className="p-1.5 rounded-full hover:bg-muted"
                      >
                        <Trash2 className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}

        {items.length === 0 && (
          <p className="text-center text-muted-foreground py-10">No notifications.</p>
        )}
      </div>
    </div>
  );
};

export default Notifications;
