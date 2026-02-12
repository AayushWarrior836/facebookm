import { useState } from "react";
import { Image, Send } from "lucide-react";
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
    <div className="bg-card rounded-xl shadow-sm border p-4">
      <div className="flex items-center gap-3">
        <img src={profileImg} alt="You" className="w-10 h-10 rounded-full object-cover" />
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handlePost()}
          placeholder="What's on your mind, Shiva?"
          className="flex-1 bg-secondary rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>
      <div className="flex items-center justify-between mt-3 pt-2 border-t">
        <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
          <Image className="w-4 h-4" /> Photo
        </button>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">{text.length}/500</span>
          <button
            onClick={handlePost}
            disabled={!text.trim()}
            className="flex items-center gap-1 px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-medium disabled:opacity-50 hover:bg-fb-hover transition-colors"
          >
            <Send className="w-3.5 h-3.5" /> Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
