import { useCallback, useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import CreatePost from "@/components/CreatePost";
import Stories from "@/components/Stories";
import PostCard from "@/components/PostCard";
import { dummyPosts, generatePosts, type Post } from "@/data/posts";

const PostSkeleton = () => (
  <div className="bg-card sm:rounded-lg shadow-sm sm:border p-3 space-y-3 animate-pulse">
    <div className="flex items-center gap-2">
      <div className="w-10 h-10 rounded-full bg-secondary" />
      <div className="space-y-1.5">
        <div className="h-3 w-32 rounded bg-secondary" />
        <div className="h-2.5 w-20 rounded bg-secondary" />
      </div>
    </div>
    <div className="h-3 w-3/4 rounded bg-secondary" />
    <div className="h-48 rounded-lg bg-secondary" />
  </div>
);

const Home = () => {
  const [posts, setPosts] = useState<Post[]>(dummyPosts);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const sentinel = useRef<HTMLDivElement | null>(null);
  const loadingRef = useRef(false);

  const handleNewPost = (post: Post) => {
    setPosts((prev) => [post, ...prev]);
  };

  const loadMore = useCallback(() => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);
    setTimeout(() => {
      setPosts((prev) => [...prev, ...generatePosts(page)]);
      setPage((p) => p + 1);
      setLoading(false);
      loadingRef.current = false;
    }, 700);
  }, [page]);

  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { rootMargin: "400px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [loadMore]);

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
          {loading && (
            <>
              <PostSkeleton />
              <PostSkeleton />
            </>
          )}
          <div ref={sentinel} className="h-8" />
        </main>
        <RightSidebar />
      </div>
    </div>
  );
};

export default Home;
