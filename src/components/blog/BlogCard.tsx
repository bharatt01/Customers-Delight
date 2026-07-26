import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Blog } from "@/types/blog";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200";

interface BlogCardProps {
  blog: Blog;
}

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <motion.article
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
      className="group h-full"
    >
      <Link to={`/tech-trends/${blog.slug}`}>
        <div className="overflow-hidden rounded-3xl border border-black/10 bg-white h-full transition-all duration-300 hover:shadow-2xl">

          {/* Cover Image */}

          <div className="relative h-56 overflow-hidden">

            <img
              src={blog.coverImage || FALLBACK_IMAGE}
              alt={blog.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            <span className="absolute left-5 top-5 rounded-full bg-white px-3 py-1 text-xs font-bold">
              {blog.category}
            </span>

          </div>

          {/* Content */}

          <div className="p-7">

            <h3 className="text-2xl font-extrabold leading-tight transition-colors duration-300 group-hover:text-indigo-600">
              {blog.title}
            </h3>

            <p className="mt-4 line-clamp-3 text-gray-600 leading-7">
              {blog.excerpt}
            </p>

            <div className="mt-6 flex items-center justify-between">

              <div>

                <p className="font-semibold text-black">
                  {blog.author}
                </p>

                <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">

                  <Clock size={15} />

                  {blog.readTime} min read

                </div>

              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white transition-all duration-300 group-hover:bg-indigo-600">

                <ArrowUpRight size={18} />

              </div>

            </div>

          </div>

        </div>
      </Link>
    </motion.article>
  );
}