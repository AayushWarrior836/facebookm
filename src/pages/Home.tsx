import { useState } from "react";
import Navbar from "@/components/Navbar";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import CreatePost from "@/components/CreatePost";
import PostCard from "@/components/PostCard";
import { dummyPosts, type Post } from "@/data/posts";

const Home = () => {
  const [posts, setPosts] = useState<Post[]>(dummyPosts);

  const handleNewPost = (post: Post) => {
    setPosts((prev) => [post, ...prev]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex max-w-7xl mx-auto">
        <LeftSidebar />
        <main className="flex-1 min-w-0 p-4 space-y-4">
          <CreatePost onPost={handleNewPost} />
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </main>
        <RightSidebar />
      </div>
    </div>
  );
};

export default Home;
