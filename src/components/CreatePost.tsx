import { useState } from "react";
import profileImg from "@/assets/profile-shiva.jpg";
import type { Post } from "@/data/posts";

const CreatePost = ({ onPost }: { onPost: (post: Post) => void }) => {
  const [text, setText] = useState("");

  const handlePost = () => {
    if (!text.trim()) return;
    const newPost: Post = {
      id: Date.now().toString(),
      type: "text",
      author: "Shiva Raj Lamsal",
      avatar: "",
      time: "Just now",
      text,
      likes: 0,
      comments: [],
    };
    onPost(newPost);
    setText("");
  };

  return (
    <div className="bg-card rounded-lg shadow-sm border">
      <div className="flex items-center gap-3 p-3">
        <img src={profileImg} alt="You" className="w-10 h-10 rounded-full object-cover" />
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handlePost()}
          placeholder="What's on your mind, Shiva?"
          className="flex-1 bg-secondary rounded-full px-4 py-2.5 text-sm outline-none hover:bg-muted transition-colors cursor-pointer focus:cursor-text focus:ring-2 focus:ring-primary/30"
        />
        {text.trim() && (
          <button
            onClick={handlePost}
            className="p-2 rounded-full bg-primary text-primary-foreground hover:bg-fb-hover transition-colors"
          >
            <i className="bi bi-send text-[16px]" />
          </button>
        )}
      </div>
      <div className="border-t mx-3" />
      <div className="flex items-center justify-around p-1">
        <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm text-muted-foreground hover:bg-secondary transition-colors font-medium">
          <i className="bi bi-camera-video text-[20px] text-destructive" />
          <span className="hidden sm:inline">Live video</span>
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm text-muted-foreground hover:bg-secondary transition-colors font-medium">
          <i className="bi bi-image text-[20px] text-fb-green" />
          <span className="hidden sm:inline">Photo/video</span>
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm text-muted-foreground hover:bg-secondary transition-colors font-medium">
          <i className="bi bi-emoji-smile text-[20px] text-yellow-500" />
          <span className="hidden sm:inline">Feeling/activity</span>
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
