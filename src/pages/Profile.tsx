import { useState } from "react";
import { Camera, Pencil, MoreHorizontal, UserPlus, ArrowLeft, EllipsisVertical, MapPin, GraduationCap, Briefcase, Heart, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import PostCard from "@/components/PostCard";
import CreatePost from "@/components/CreatePost";
import { dummyPosts, type Post } from "@/data/posts";
import profileImg from "@/assets/profile-shiva.jpg";

const friends = [
  { name: "Aayush Lamsal", img: "" },
  { name: "Anusha Lamsal", img: "" },
  { name: "Amrita Lamsal", img: "" },
  { name: "Asmita Lamsal", img: "" },
  { name: "Govinda Lamsal", img: "" },
  { name: "Being Santosh", img: "" },
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
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "profile-1",
      type: "image",
      author: "Shiva Raj Lamsal",
      avatar: "",
      time: "Recently",
      text: "Shiva Raj Lamsal has updated his profile picture.",
      image: profileImg,
      likes: 12,
      comments: [],
    },
    {
      id: "profile-2",
      type: "life-update",
      author: "Shiva Raj Lamsal",
      avatar: "",
      time: "Born on 21 September 1972",
      text: "🎂 Born on 21 September 1972",
      likes: 25,
      comments: [],
    },
  ]);

  const handleNewPost = (post: Post) => setPosts((prev) => [post, ...prev]);

  const tabs = ["posts", "about", "friends", "photos"] as const;

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile profile top bar */}
      <div className="md:hidden sticky top-0 z-40 flex items-center justify-between h-11 px-2 bg-card shadow-sm">
        <Link to="/" className="p-2 rounded-full hover:bg-secondary">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </Link>
        <h1 className="font-semibold text-[16px] text-foreground">Shiva Raj Lamsal</h1>
        <span className="w-9" />
      </div>

      {/* Desktop navbar */}
      <div className="hidden md:block">
        <Navbar />
      </div>

      <div className="max-w-[940px] mx-auto">
        {/* Cover Photo */}
        <div className="relative h-[180px] sm:h-[280px] md:h-[350px] md:rounded-b-lg overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200"
            alt="cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          <button className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-card/90 text-foreground text-xs font-medium hover:bg-card transition-colors">
            <Camera className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Edit cover photo</span>
          </button>
        </div>

        {/* Profile Info Section */}
        <div className="bg-card px-4 pb-3 md:px-8 md:pb-4 border-b relative">
          {/* Profile picture - overlapping cover */}
          <div className="flex flex-col items-center md:flex-row md:items-end md:gap-4 -mt-[60px] sm:-mt-[68px]">
            <div className="relative z-10">
              <img
                src={profileImg}
                alt="Shiva Raj Lamsal"
                className="w-[120px] h-[120px] sm:w-[168px] sm:h-[168px] rounded-full border-[4px] border-card object-cover"
              />
              <button className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-secondary flex items-center justify-center border border-border">
                <Camera className="w-4 h-4" />
              </button>
            </div>

            {/* Name & friends count */}
            <div className="text-center md:text-left flex-1 mt-2 md:mt-0 md:pb-3">
              <h1 className="text-[22px] sm:text-[32px] font-bold leading-tight text-foreground">Shiva Raj Lamsal</h1>
              <p className="text-muted-foreground text-[13px] sm:text-[15px]">25 friends</p>
              {/* Friend avatars row */}
              <div className="flex justify-center md:justify-start -space-x-1.5 mt-1.5">
                {friends.slice(0, 6).map((f) => (
                  <div
                    key={f.name}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-card bg-gradient-to-br from-primary/30 to-primary/60 flex items-center justify-center text-[10px] font-semibold text-primary-foreground"
                  >
                    {f.name.split(" ").map((w) => w[0]).join("")}
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop action buttons */}
            <div className="hidden md:flex gap-2 pb-4">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
                <UserPlus className="w-4 h-4" /> Add to story
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-foreground text-sm font-medium hover:bg-muted transition-colors">
                <Pencil className="w-4 h-4" /> Edit profile
              </button>
              <button className="px-3 py-2 rounded-lg bg-secondary hover:bg-muted transition-colors">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Mobile action buttons - Facebook app style */}
          <div className="md:hidden flex gap-2 mt-3">
            <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md bg-primary text-primary-foreground text-[13px] font-semibold">
              <UserPlus className="w-4 h-4" /> Add to story
            </button>
            <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md bg-secondary text-foreground text-[13px] font-semibold">
              <Pencil className="w-4 h-4" /> Edit profile
            </button>
            <button className="px-3 py-2 rounded-md bg-secondary">
              <EllipsisVertical className="w-4 h-4 text-foreground" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-0 mt-3 border-t pt-1 overflow-x-auto scrollbar-hide">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-2.5 text-[13px] sm:text-[15px] font-medium capitalize transition-colors whitespace-nowrap ${
                  tab === t
                    ? "text-primary border-b-[3px] border-primary"
                    : "text-muted-foreground hover:bg-secondary rounded-md"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="pb-4">
          {tab === "posts" && (
            <div className="flex flex-col md:flex-row gap-0 md:gap-4 md:p-4">
              {/* Left column - Details, Photos, Friends */}
              <div className="md:w-[360px] space-y-0 md:space-y-4">
                {/* Details card */}
                <div className="bg-card md:rounded-lg shadow-sm md:border p-4 border-b md:border-b-0">
                  <h2 className="font-bold text-[18px] mb-3 text-foreground">Details</h2>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Briefcase className="w-5 h-5 text-muted-foreground shrink-0" />
                      <p className="text-[14px] text-foreground">Digital creator</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-muted-foreground shrink-0" />
                      <p className="text-[14px] text-foreground">Lives in <span className="font-medium">Kawasoti, Nawalpur</span></p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Heart className="w-5 h-5 text-muted-foreground shrink-0" />
                      <p className="text-[14px] text-foreground">Married</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-muted-foreground shrink-0" />
                      <p className="text-[14px] text-foreground">Joined 1 year ago</p>
                    </div>
                  </div>
                  <button className="w-full py-2 mt-3 rounded-md bg-secondary text-[13px] font-semibold text-foreground hover:bg-muted transition-colors">
                    Edit public details
                  </button>
                </div>

                {/* Friends card */}
                <div className="bg-card md:rounded-lg shadow-sm md:border p-4 border-b md:border-b-0">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h2 className="font-bold text-[18px] text-foreground">Friends</h2>
                      <p className="text-[13px] text-muted-foreground">25 friends</p>
                    </div>
                    <button className="text-primary text-[14px] font-medium">See all</button>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {friends.slice(0, 6).map((f) => (
                      <div key={f.name} className="cursor-pointer">
                        <div className="w-full aspect-square rounded-lg bg-gradient-to-br from-primary/30 to-primary/60 flex items-center justify-center text-2xl font-bold text-primary-foreground">
                          {f.name.split(" ").map((w) => w[0]).join("")}
                        </div>
                        <p className="text-[12px] font-medium mt-1 truncate text-foreground">{f.name}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Photos card - hidden on mobile in posts tab, shown in sidebar on desktop */}
                <div className="hidden md:block bg-card md:rounded-lg shadow-sm md:border p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="font-bold text-[18px] text-foreground">Photos</h2>
                    <button className="text-primary text-[14px] font-medium">See all</button>
                  </div>
                  <div className="grid grid-cols-3 gap-1 rounded-lg overflow-hidden">
                    {photos.slice(0, 9).map((src, i) => (
                      <img key={i} src={src} alt={`photo-${i}`} className="w-full aspect-square object-cover cursor-pointer hover:brightness-90 transition-all" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Right column - Posts */}
              <div className="flex-1 space-y-0 md:space-y-4">
                <CreatePost onPost={handleNewPost} />
                {posts.map((p) => (
                  <PostCard key={p.id} post={p} />
                ))}
                {posts.length === 0 && (
                  <div className="bg-card md:rounded-lg shadow-sm md:border p-8 text-center text-muted-foreground">
                    No posts yet.
                  </div>
                )}
              </div>
            </div>
          )}

          {tab === "about" && (
            <div className="max-w-2xl mx-auto bg-card md:rounded-lg shadow-sm md:border p-4 sm:p-6 space-y-4 md:mt-4">
              <h2 className="font-bold text-xl text-foreground">About</h2>
              <div className="space-y-2">
                {[
                  { icon: Briefcase, title: "Digital creator", sub: "Work" },
                  { icon: MapPin, title: "Lives in Kawasoti, Nawalpur", sub: "Location" },
                  { icon: Heart, title: "Married", sub: "Relationship" },
                  { icon: Clock, title: "Joined 1 year ago", sub: "Joined" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors">
                    <item.icon className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-[15px] font-medium text-foreground">{item.title}</p>
                      <p className="text-[13px] text-muted-foreground">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "friends" && (
            <div className="bg-card md:rounded-lg shadow-sm md:border p-3 sm:p-4 md:mt-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-xl text-foreground">Friends</h2>
                
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {friends.map((f) => (
                  <div key={f.name} className="flex items-center gap-3 p-2.5 rounded-lg border hover:bg-secondary transition-colors">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-gradient-to-br from-primary/30 to-primary/60 flex items-center justify-center text-xl font-bold text-primary-foreground shrink-0">
                      {f.name.split(" ").map((w) => w[0]).join("")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-[14px] truncate text-foreground">{f.name}</p>
                      <p className="text-xs text-muted-foreground">3 mutual friends</p>
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
            <div className="bg-card md:rounded-lg shadow-sm md:border p-3 sm:p-4 md:mt-4">
              <h2 className="font-bold text-xl mb-4 text-foreground">Photos</h2>
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
