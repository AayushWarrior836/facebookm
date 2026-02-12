import { onlineContacts, trendingTopics, suggestedFriends } from "@/data/posts";
import { TrendingUp, UserPlus } from "lucide-react";

const RightSidebar = () => (
  <aside className="hidden xl:flex flex-col w-72 p-4 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto scrollbar-hide gap-4">
    {/* Online Contacts */}
    <div>
      <h3 className="font-semibold text-sm text-muted-foreground mb-2">Contacts</h3>
      {onlineContacts.map((c) => (
        <div key={c.name} className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary transition-colors cursor-pointer">
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-semibold">
              {c.name.split(" ").map((w) => w[0]).join("")}
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-fb-green rounded-full border-2 border-card" />
          </div>
          <span className="text-sm">{c.name}</span>
        </div>
      ))}
    </div>

    {/* Trending */}
    <div>
      <h3 className="font-semibold text-sm text-muted-foreground mb-2 flex items-center gap-1">
        <TrendingUp className="w-4 h-4" /> Trending
      </h3>
      {trendingTopics.map((t) => (
        <div key={t.topic} className="p-2 rounded-lg hover:bg-secondary transition-colors cursor-pointer">
          <p className="text-sm font-medium">{t.topic}</p>
          <p className="text-xs text-muted-foreground">{t.category} · {t.posts} posts</p>
        </div>
      ))}
    </div>

    {/* Suggested Friends */}
    <div>
      <h3 className="font-semibold text-sm text-muted-foreground mb-2">Suggested Friends</h3>
      {suggestedFriends.map((f) => (
        <div key={f.name} className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary transition-colors">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-semibold">
              {f.name.split(" ").map((w) => w[0]).join("")}
            </div>
            <div>
              <p className="text-sm font-medium">{f.name}</p>
              <p className="text-xs text-muted-foreground">{f.mutualFriends} mutual friends</p>
            </div>
          </div>
          <button className="p-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
            <UserPlus className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  </aside>
);

export default RightSidebar;
