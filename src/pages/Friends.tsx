import { useState } from "react";
import Navbar from "@/components/Navbar";
import { friends, communityUsers, type Person } from "@/data/people";

const TABS = ["Home", "Friend Requests", "Suggestions", "All Friends", "Birthdays", "Custom Lists"] as const;
type Tab = (typeof TABS)[number];

const initials = (name: string) => name.split(" ").map((w) => w[0]).join("");

const FriendCard = ({ person, action }: { person: Person; action: string }) => (
  <article className="bg-card rounded-xl border shadow-sm overflow-hidden hover:shadow-md transition-shadow">
    <div className="aspect-square bg-gradient-to-br from-primary/25 to-primary/60 flex items-center justify-center text-3xl font-bold text-primary-foreground">
      {initials(person.name)}
    </div>
    <div className="p-3 space-y-2">
      <p className="font-semibold text-[15px] truncate">{person.name}</p>
      <p className="text-xs text-muted-foreground">{person.mutualFriends ?? 0} mutual friends</p>
      <button className="w-full py-1.5 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
        {action === "Add Friend" ? <i className="bi bi-person-plus text-[16px]" /> : <i className="bi bi-chat text-[16px]" />}
        {action}
      </button>
      <button className="w-full py-1.5 rounded-md bg-secondary text-foreground text-sm font-medium hover:bg-muted transition-colors">
        {action === "Add Friend" ? "Remove" : "Message"}
      </button>
    </div>
  </article>
);

const Grid = ({ people, action }: { people: Person[]; action: string }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
    {people.map((p) => (
      <FriendCard key={p.name} person={p} action={action} />
    ))}
  </div>
);

const Friends = () => {
  const [tab, setTab] = useState<Tab>("Home");
  const requests = communityUsers.slice(0, 3);
  const suggestions = communityUsers.slice(3, 11);
  const birthdays = friends.slice(0, 2);

  return (
    <div className="min-h-screen bg-background pb-14 md:pb-0">
      <Navbar />
      <div className="max-w-[1100px] mx-auto p-3 sm:p-4">
        <h1 className="text-2xl font-bold mb-3 flex items-center gap-2">
          <i className="bi bi-people text-[24px] text-primary" /> Friends
        </h1>

        <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                tab === t ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-muted"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "Home" && (
          <div className="space-y-6">
            <section>
              <h2 className="font-semibold text-lg mb-2">Friend requests</h2>
              <i className="bi bi-grid text-[20px]" people={requests} action="Add Friend" />
            </section>
            <section>
              <h2 className="font-semibold text-lg mb-2">People you may know</h2>
              <i className="bi bi-grid text-[20px]" people={suggestions} action="Add Friend" />
            </section>
          </div>
        )}

        {tab === "Friend Requests" && <i className="bi bi-grid text-[20px]" people={requests} action="Add Friend" />}
        {tab === "Suggestions" && <i className="bi bi-grid text-[20px]" people={suggestions} action="Add Friend" />}
        {tab === "All Friends" && <i className="bi bi-grid text-[20px]" people={friends} action="Message" />}

        {tab === "Birthdays" && (
          <div className="bg-card rounded-xl border p-4 space-y-3">
            {birthdays.map((f) => (
              <div key={f.name} className="flex items-center gap-3">
                <i className="bi bi-cake text-[24px] text-primary" />
                <p className="text-[15px]">
                  <span className="font-semibold">{f.name}</span> has a birthday today.
                </p>
              </div>
            ))}
          </div>
        )}

        {tab === "Custom Lists" && (
          <div className="grid sm:grid-cols-3 gap-3">
            {["Close Friends", "Kawasoti", "College"].map((list) => (
              <div key={list} className="bg-card rounded-xl border p-4">
                <p className="font-semibold">{list}</p>
                <p className="text-sm text-muted-foreground">{friends.length} people</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Friends;
