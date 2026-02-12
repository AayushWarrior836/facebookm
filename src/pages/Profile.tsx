import { useState } from "react";
import { Camera, Pencil, MoreHorizontal, UserPlus, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import PostCard from "@/components/PostCard";
import CreatePost from "@/components/CreatePost";
import { dummyPosts, type Post } from "@/data/posts";
import profileImg from "@/assets/profile-shiva.jpg";

const friends = [
  "Ramesh Tamang", "Anita Sharma", "Priya Adhikari", "Sabin Karki",
  "Manisha Poudel", "Bikash KC", "Sita Gurung", "Dev Bhandari",
];

const photos = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300",
  "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=300",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300",
  "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=300",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=300",
  "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=300",
];

const Profile = () => {
  const [tab, setTab] = useState<"posts" | "about" | "friends" | "photos">("posts");
  const [posts, setPosts] = useState<Post[]>(
    dummyPosts.filter((p) => p.author === "Shiva Raj Lamsal")
  );

  const handleNewPost = (post: Post) => setPosts((prev) => [post, ...prev]);

  const tabs = ["posts", "about", "friends", "photos"] as const;

  return (
    <div className="min-h-screen bg-background pb-14 md:pb-0">
      <Navbar />
      <div className="max-w-[940px] mx-auto">
        {/* Cover */}
        <div className="relative h-[200px] sm:h-[280px] md:h-[350px] sm:rounded-b-lg overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200"
            alt="cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          <button className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-card/90 text-foreground text-xs sm:text-sm font-medium hover:bg-card transition-colors">
            <Camera className="w-4 h-4" /> <span className="hidden sm:inline">Edit cover photo</span>
          </button>
        </div>

        {/* Profile info */}
        <div className="px-4 sm:px-8 pb-4 border-b bg-card -mt-8 relative z-10 sm:rounded-b-lg">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-2 sm:gap-4 -mt-[50px] sm:-mt-[68px]">
            <div className="relative">
              <img
                src={profileImg}
                alt="Shiva Raj Lamsal"
                className="w-[120px] h-[120px] sm:w-[168px] sm:h-[168px] rounded-full border-4 border-card object-cover"
              />
              <button className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-secondary flex items-center justify-center hover:bg-muted transition-colors border border-border">
                <Camera className="w-4 sm:w-5 h-4 sm:h-5" />
              </button>
            </div>
            <div className="flex-1 pb-2 sm:pb-4 text-center sm:text-left">
              <h1 className="text-2xl sm:text-[32px] font-bold leading-tight">Shiva Raj Lamsal</h1>
              <p className="text-muted-foreground text-[14px] sm:text-[15px]">502 friends</p>
              <div className="hidden sm:flex -space-x-1 mt-1">
                {friends.slice(0, 8).map((f) => (
                  <div key={f} className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-primary/60 border-2 border-card flex items-center justify-center text-[9px] font-bold text-primary-foreground">
                    {f.split(" ").map((w) => w[0]).join("")}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-2 pb-2 sm:pb-4">
              <button className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs sm:text-sm font-medium hover:bg-fb-hover transition-colors">
                <UserPlus className="w-4 h-4" /> <span className="hidden xs:inline">Add to story</span>
              </button>
              <button className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg bg-secondary text-foreground text-xs sm:text-sm font-medium hover:bg-muted transition-colors">
                <Pencil className="w-4 h-4" /> <span className="hidden xs:inline">Edit profile</span>
              </button>
              <button className="px-2.5 sm:px-3 py-2 rounded-lg bg-secondary hover:bg-muted transition-colors">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-0.5 sm:gap-1 mt-3 sm:mt-4 border-t pt-1 overflow-x-auto scrollbar-hide">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-3 sm:px-4 py-2.5 sm:py-3 text-[13px] sm:text-[15px] font-medium capitalize rounded-lg transition-colors whitespace-nowrap ${
                  tab === t
                    ? "text-primary border-b-[3px] border-primary rounded-b-none"
                    : "text-muted-foreground hover:bg-secondary"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <div className="p-0 sm:p-4">
          {tab === "posts" && (
            <div className="flex flex-col md:flex-row gap-4">
              {/* Left column - Intro (hidden on mobile, shows above posts on tablet) */}
              <div className="md:w-[360px] space-y-2 sm:space-y-4 p-2 sm:p-0">
                <div className="bg-card sm:rounded-lg shadow-sm sm:border p-4">
                  <h2 className="font-bold text-xl mb-3">Intro</h2>
                  <p className="text-[15px] text-center text-muted-foreground mb-3">Tech enthusiast | Learning and building every day</p>
                  <button className="w-full py-2 rounded-lg bg-secondary text-sm font-medium hover:bg-muted transition-colors">Edit bio</button>
                  <div className="space-y-3 mt-4">
                    <p className="text-[15px] flex items-center gap-2">🎓 Self-taught developer from Nepal</p>
                    <p className="text-[15px] flex items-center gap-2">💻 Passionate about React, AI, and open source</p>
                    <p className="text-[15px] flex items-center gap-2">📍 Lives in Kawasoti, Nawalparasi</p>
                    <p className="text-[15px] flex items-center gap-2">🌐 Building Facebook</p>
                  </div>
                  <button className="w-full py-2 mt-3 rounded-lg bg-secondary text-sm font-medium hover:bg-muted transition-colors">Edit details</button>
                </div>

                {/* Photos - compact on mobile */}
                <div className="bg-card sm:rounded-lg shadow-sm sm:border p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="font-bold text-xl">Photos</h2>
                    <button className="text-primary text-sm hover:underline">See all photos</button>
                  </div>
                  <div className="grid grid-cols-3 gap-1 rounded-lg overflow-hidden">
                    {photos.slice(0, 9).map((src, i) => (
                      <img key={i} src={src} alt={`photo-${i}`} className="w-full aspect-square object-cover cursor-pointer hover:brightness-90 transition-all" />
                    ))}
                  </div>
                </div>

                {/* Friends */}
                <div className="bg-card sm:rounded-lg shadow-sm sm:border p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h2 className="font-bold text-xl">Friends</h2>
                      <p className="text-sm text-muted-foreground">502 friends</p>
                    </div>
                    <button className="text-primary text-sm hover:underline">See all friends</button>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {friends.slice(0, 6).map((f) => (
                      <div key={f} className="text-center cursor-pointer">
                        <div className="w-full aspect-square rounded-lg bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center text-lg font-semibold text-primary">
                          {f.split(" ").map((w) => w[0]).join("")}
                        </div>
                        <p className="text-[11px] sm:text-[13px] font-medium mt-1 truncate">{f}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right column - Posts */}
              <div className="flex-1 space-y-2 sm:space-y-4">
                <CreatePost onPost={handleNewPost} />
                {posts.map((p) => (
                  <PostCard key={p.id} post={p} />
                ))}
                {posts.length === 0 && (
                  <div className="bg-card sm:rounded-lg shadow-sm sm:border p-8 text-center text-muted-foreground">
                    No posts yet.
                  </div>
                )}
              </div>
            </div>
          )}
          {tab === "about" && (
            <div className="max-w-2xl mx-auto bg-card sm:rounded-lg shadow-sm sm:border p-4 sm:p-6 space-y-4">
              <h2 className="font-bold text-xl">About</h2>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary transition-colors">
                  <span className="text-2xl">🎓</span>
                  <div>
                    <p className="text-[15px] font-medium">Self-taught developer from Nepal</p>
                    <p className="text-sm text-muted-foreground">Education</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary transition-colors">
                  <span className="text-2xl">💻</span>
                  <div>
                    <p className="text-[15px] font-medium">Passionate about React, AI, and open source</p>
                    <p className="text-sm text-muted-foreground">Work</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary transition-colors">
                  <span className="text-2xl">📍</span>
                  <div>
                    <p className="text-[15px] font-medium">Lives in Kawasoti, Nawalparasi</p>
                    <p className="text-sm text-muted-foreground">Location</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary transition-colors">
                  <span className="text-2xl">🌐</span>
                  <div>
                    <p className="text-[15px] font-medium">Building Facebook</p>
                    <p className="text-sm text-muted-foreground">Website</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {tab === "friends" && (
            <div className="bg-card sm:rounded-lg shadow-sm sm:border p-3 sm:p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-xl">Friends</h2>
                <input placeholder="Search" className="bg-secondary rounded-full px-3 sm:px-4 py-1.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 w-32 sm:w-auto" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {friends.map((f) => (
                  <div key={f} className="flex items-center gap-3 p-2 sm:p-3 rounded-lg border hover:bg-secondary transition-colors">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center text-lg sm:text-xl font-semibold text-primary shrink-0">
                      {f.split(" ").map((w) => w[0]).join("")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-[14px] sm:text-[15px] truncate">{f}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">3 mutual friends</p>
                    </div>
                    <button className="p-2 rounded-full hover:bg-muted transition-colors shrink-0">
                      <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          {tab === "photos" && (
            <div className="bg-card sm:rounded-lg shadow-sm sm:border p-3 sm:p-4">
              <h2 className="font-bold text-xl mb-4">Photos</h2>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-1 sm:gap-2">
                {photos.map((src, i) => (
                  <img key={i} src={src} alt={`photo-${i}`} className="w-full aspect-square object-cover sm:rounded-lg cursor-pointer hover:brightness-90 transition-all" />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
