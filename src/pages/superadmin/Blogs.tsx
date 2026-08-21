import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPublishedBlogs } from "./../../services/blogService";
import { Blog } from "@/types/blog";

export default function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublishedBlogs()
      .then(setBlogs)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-black">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-14">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3">Latest News</h1>
        <p className="text-gray-500 text-lg mb-10">Updates, insights, and stories.</p>

        {blogs.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-gray-400 text-lg">No posts yet — check back soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <Link
                key={blog.id}
                to={`/tech-trends/${blog.slug}`}
                className="group bg-white rounded-3xl border border-black/10 overflow-hidden hover:border-black/30 transition"
              >
                <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                  {blog.coverImage && (
                    <img
                      src={blog.coverImage}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  )}
                </div>
                <div className="p-5">
                  {blog.category && (
                    <span className="inline-block bg-black text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                      {blog.category}
                    </span>
                  )}
                  <h2 className="font-black text-lg leading-snug mb-2">{blog.title}</h2>
                  {blog.excerpt && (
                    <p className="text-sm text-gray-500 line-clamp-2">{blog.excerpt}</p>
                  )}
                  {blog.createdAt && (
                    <p className="text-xs text-gray-400 mt-3">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}