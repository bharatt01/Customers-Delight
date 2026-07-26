import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, Clock } from "lucide-react";
import { Blog } from "@/types/blog";

interface FeaturedBlogProps {
  blog: Blog;
}

export default function FeaturedBlog({ blog }: FeaturedBlogProps) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <Link to={`/tech-trends/${blog.slug}`}>
          <div className="group grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-black/10 bg-white hover:shadow-2xl transition-all duration-500">
            <div className="relative h-80 lg:h-auto overflow-hidden">
              <img
                src={blog.coverImage}
                alt={blog.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute left-6 top-6 bg-white px-4 py-1.5 rounded-full text-xs font-black">
                FEATURED — {blog.category}
              </span>
            </div>
            <div className="p-10 lg:p-14 flex flex-col justify-center">
              <h2 className="text-3xl lg:text-4xl font-black leading-tight group-hover:text-indigo-600 transition-colors">
                {blog.title}
              </h2>
              <p className="mt-4 text-gray-600 text-lg leading-relaxed line-clamp-3">
                {blog.excerpt}
              </p>
              <div className="mt-8 flex items-center justify-between">
                <div>
                  <p className="font-bold text-lg">{blog.author}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                    <Clock size={15} />
                    {blog.readTime} min read
                  </div>
                </div>
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black text-white transition-all group-hover:bg-indigo-600">
                  <ArrowUpRight size={22} />
                </div>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    </section>
  );
}