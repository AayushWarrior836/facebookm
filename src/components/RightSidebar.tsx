import { onlineContacts, trendingTopics, suggestedFriends } from "@/data/posts";
import { MoreHorizontal, Video, UserPlus } from "lucide-react";

const RightSidebar = () => (
  <aside className="hidden xl:flex flex-col w-[280px] p-2 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto scrollbar-hide">
    {/* Sponsored */}
    <div className="mb-4">
      <h3 className="font-semibold text-[17px] text-muted-foreground px-2 mb-2">Sponsored</h3>
      <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary transition-colors cursor-pointer">
        <img
          src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=130&h=130&fit=crop"
          alt="Ad"
          className="w-[130px] h-[130px] rounded-lg object-cover"
        />
        <div>
          <p className="text-[15px] font-medium">Learn React in 2026</p>
          <p className="text-xs text-muted-foreground">reactcourse.com</p>
        </div>
      </div>
    </div>

    <div className="border-t my-1" />

    {/* Friend Requests */}
    <div className="my-3">
      <div className="flex items-center justify-between px-2 mb-2">
        <h3 className="font-semibold text-[17px] text-muted-foreground">Friend requests</h3>
        <button className="text-primary text-sm hover:underline">See all</button>
      </div>
      {suggestedFriends.slice(0, 2).map((f) => (
        <div key={f.name} className="flex items-start gap-3 p-2 rounded-lg hover:bg-secondary transition-colors">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-primary/60 flex items-center justify-center text-sm font-semibold text-primary-foreground shrink-0">
            {f.name.split(" ").map((w) => w[0]).join("")}
          </div>
          <div className="flex-1">
            <p className="text-[15px] font-medium">{f.name}</p>
            <p className="text-xs text-muted-foreground mb-2">{f.mutualFriends} mutual friends</p>
            <div className="flex gap-2">
              <button className="flex-1 py-1.5 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-fb-hover transition-colors">
                Confirm
              </button>
              <button className="flex-1 py-1.5 rounded-md bg-secondary text-foreground text-sm font-medium hover:bg-muted transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>

    <div className="border-t my-1" />

    {/* Contacts */}
    <div className="mt-3">
      <div className="flex items-center justify-between px-2 mb-2">
        <h3 className="font-semibold text-[17px] text-muted-foreground">Contacts</h3>
        <div className="flex gap-1">
          <button className="p-1.5 rounded-full hover:bg-secondary transition-colors">
            <Video className="w-4 h-4 text-muted-foreground" />
          </button>
          <button className="p-1.5 rounded-full hover:bg-secondary transition-colors">
            <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>
      {onlineContacts.map((c) => (
        <div key={c.name} className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary transition-colors cursor-pointer">
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/30 to-primary/60 flex items-center justify-center text-xs font-semibold text-primary-foreground">
              {c.name.split(" ").map((w) => w[0]).join("")}
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-fb-green rounded-full border-2 border-card" />
          </div>
          <span className="text-[15px]">{c.name}</span>
        </div>
      ))}
    </div>
  </aside>
);

export default RightSidebar;
