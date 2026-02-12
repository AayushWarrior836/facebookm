import { useState } from "react";
import { ArrowLeft } from "lucide-react";
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
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-4xl mx-auto">
        {/* Cover */}
        <div className="relative h-48 md:h-64 rounded-b-xl overflow-hidden bg-gradient-to-r from-primary/60 to-primary/30">
          <img
            src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200"
            alt="cover"
            className="w-full h-full object-cover opacity-70"
          />
        </div>
        {/* Profile info */}
        <div className="px-4 -mt-16 relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
            <img
              src={profileImg}
              alt="Shiva Raj Lamsal"
              className="w-32 h-32 rounded-full border-4 border-card object-cover shadow-lg"
            />
            <div className="flex-1 pb-2">
              <h1 className="text-2xl font-bold">Shiva Raj Lamsal</h1>
              <p className="text-sm text-muted-foreground">Tech enthusiast | Learning and building every day</p>
            </div>
            <button className="px-4 py-2 rounded-lg bg-secondary text-sm font-medium hover:bg-muted transition-colors">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 px-4 mt-4 border-b">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 text-sm font-medium capitalize transition-colors border-b-2 ${
                tab === t ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="p-4">
          {tab === "posts" && (
            <div className="max-w-xl mx-auto space-y-4">
              <CreatePost onPost={handleNewPost} />
              {posts.map((p) => (
                <PostCard key={p.id} post={p} />
              ))}
            </div>
          )}
          {tab === "about" && (
            <div className="max-w-xl mx-auto bg-card rounded-xl p-6 shadow-sm border space-y-3">
              <h2 className="font-semibold">About</h2>
              <p className="text-sm text-muted-foreground">🎓 Self-taught developer from Nepal</p>
              <p className="text-sm text-muted-foreground">💻 Passionate about React, AI, and open source</p>
              <p className="text-sm text-muted-foreground">📍 Kawasoti, Nawalparasi</p>
              <p className="text-sm text-muted-foreground">🌐 Building ConnectBook</p>
            </div>
          )}
          {tab === "friends" && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {friends.map((f) => (
                <div key={f} className="bg-card rounded-xl p-4 text-center shadow-sm border hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 rounded-full bg-muted mx-auto flex items-center justify-center text-lg font-semibold mb-2">
                    {f.split(" ").map((w) => w[0]).join("")}
                  </div>
                  <p className="text-sm font-medium">{f}</p>
                </div>
              ))}
            </div>
          )}
          {tab === "photos" && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {photos.map((src, i) => (
                <img key={i} src={src} alt={`photo-${i}`} className="w-full h-40 object-cover rounded-lg hover:opacity-90 transition-opacity" />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
