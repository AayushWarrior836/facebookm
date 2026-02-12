import { useState } from "react";
import Navbar from "@/components/Navbar";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import CreatePost from "@/components/CreatePost";
import Stories from "@/components/Stories";
import PostCard from "@/components/PostCard";
import { dummyPosts, type Post } from "@/data/posts";

const Home = () => {
  const [posts, setPosts] = useState<Post[]>(dummyPosts);

  const handleNewPost = (post: Post) => {
    setPosts((prev) => [post, ...prev]);
  };

  return (
    <div className="min-h-screen bg-background pb-14 md:pb-0">
      <Navbar />
      <div className="flex justify-center">
        <LeftSidebar />
        <main className="flex-1 max-w-[590px] min-w-0 py-2 sm:py-4 px-0 sm:px-4 space-y-2 sm:space-y-4">
          <Stories />
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
