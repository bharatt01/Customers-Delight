import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Sparkles,
} from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import { getBlogBySlug } from "@/services/blogService";
import { Blog } from "@/types/blog";

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    loadBlog();
  }, [slug]);

  async function loadBlog() {
    setLoading(true);
    const data = await getBlogBySlug(slug!);
    setBlog(data);
    setLoading(false);
  }

  if (loading) {
    return (
      <>
        <Navbar />

        <section className="min-h-screen bg-[#FCFAF8] flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute w-96 h-96 bg-orange-200/40 blur-[130px] rounded-full -top-20 -left-20" />
            <div className="absolute w-96 h-96 bg-red-200/40 blur-[140px] rounded-full bottom-0 right-0" />
          </div>

          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 1.4,
              ease: "linear",
            }}
            className="w-14 h-14 rounded-full border-[5px] border-orange-500 border-t-transparent"
          />
        </section>
      </>
    );
  }

  if (!blog) {
    return (
      <>
        <Navbar />

        <section className="min-h-screen bg-[#FCFAF8] flex items-center justify-center px-6">
          <div className="text-center">

            <div className="w-28 h-28 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-8">
              <Sparkles size={38} className="text-red-500" />
            </div>

            <h1 className="text-5xl font-black">
              Blog not found
            </h1>

            <p className="text-gray-500 mt-5">
              The article you're looking for doesn't exist anymore.
            </p>

            <Link
              to="/tech-trends"
              className="inline-flex items-center gap-2 mt-10 bg-black text-white px-7 py-4 rounded-full font-bold hover:scale-105 transition"
            >
              <ArrowLeft size={18} />
              Back to Blogs
            </Link>
          </div>
        </section>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <article className="relative overflow-hidden bg-[#FCFAF8]">

        {/* Background */}

        <div className="absolute inset-0 pointer-events-none">

          <div className="absolute -top-40 left-[-150px] w-[520px] h-[520px] rounded-full bg-orange-200/30 blur-[140px]" />

          <div className="absolute top-[35%] right-[-160px] w-[450px] h-[450px] rounded-full bg-red-200/30 blur-[140px]" />

          <div className="absolute bottom-[-150px] left-[25%] w-[400px] h-[400px] rounded-full bg-yellow-100/40 blur-[130px]" />

        </div>

        {/* HERO */}

        <section className="relative pt-32 pb-20 px-6">

          <div className="max-w-7xl mx-auto">

            <Link
              to="/tech-trends"
              className="inline-flex items-center gap-2 rounded-full bg-white shadow-lg border border-gray-200 px-5 py-3 font-semibold hover:-translate-x-1 transition-all"
            >
              <ArrowLeft size={18} />
              Back to Blogs
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 45 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .6 }}
              className="mt-10 grid lg:grid-cols-2 gap-16 items-center"
            >

              {/* LEFT */}

              <div>

                <div className="inline-flex items-center gap-2 rounded-full bg-orange-100 text-orange-700 px-5 py-2 font-bold text-sm">

                  <Sparkles size={16} />

                  {blog.category}

                </div>

                <h1 className="mt-7 text-5xl md:text-6xl leading-tight font-black tracking-tight text-neutral-900">
                  {blog.title}
                </h1>

                <p className="mt-8 text-xl leading-9 text-gray-600">
                  {blog.excerpt}
                </p>

                {/* AUTHOR CARD */}

                <div className="mt-10 rounded-3xl bg-white/90 backdrop-blur-xl border border-gray-200 shadow-xl p-6">

                  <div className="grid md:grid-cols-3 gap-6">

                    <div className="flex items-center gap-4">

                      <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center">

                        <User className="text-orange-600" size={22} />

                      </div>

                      <div>

                        <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold">
                          Author
                        </p>

                        <p className="font-bold text-lg">
                          {blog.author}
                        </p>

                      </div>

                    </div>

                    <div className="flex items-center gap-4">

                      <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center">

                        <Calendar
                          size={20}
                          className="text-red-500"
                        />

                      </div>

                      <div>

                        <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold">
                          Published
                        </p>

                        <p className="font-semibold">
                          {blog.createdAt
                            ? new Date(
                                blog.createdAt
                              ).toLocaleDateString()
                            : "-"}
                        </p>

                      </div>

                    </div>

                    <div className="flex items-center gap-4">

                      <div className="w-12 h-12 rounded-2xl bg-yellow-100 flex items-center justify-center">

                        <Clock
                          size={20}
                          className="text-yellow-700"
                        />

                      </div>

                      <div>

                        <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold">
                          Reading Time
                        </p>

                        <p className="font-semibold">
                          {blog.readTime} min read
                        </p>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

              {/* RIGHT IMAGE */}

              <motion.div
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: .7 }}
                className="relative"
              >

                <div className="absolute inset-0 rounded-[40px] bg-gradient-to-tr from-orange-400/30 via-red-300/20 to-transparent blur-2xl scale-105" />

                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="relative rounded-[40px] shadow-2xl w-full h-[600px] object-cover border-8 border-white"
                />

              </motion.div>

            </motion.div>

          </div>

        </section>
                {/* ARTICLE */}

        <section className="relative px-6 pb-24">

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .6 }}
            className="max-w-5xl mx-auto"
          >

            <div className="rounded-[40px] bg-white border border-gray-200 shadow-[0_30px_80px_rgba(0,0,0,0.08)] overflow-hidden">

              {/* Top Accent */}

              <div className="h-2 bg-gradient-to-r from-orange-500 via-red-500 to-amber-400" />

              <div className="p-8 md:p-16">

                {/* Tags */}

                {blog.tags && blog.tags.length > 0 && (

                  <div className="flex flex-wrap gap-3 mb-12">

                    {blog.tags.map((tag) => (

                      <span
                        key={tag}
                        className="px-5 py-2 rounded-full bg-orange-50 text-orange-700 border border-orange-200 font-semibold text-sm hover:bg-orange-100 transition"
                      >
                        #{tag}
                      </span>

                    ))}

                  </div>

                )}

                {/* CONTENT */}

                <div className="prose prose-lg lg:prose-xl max-w-none

                  prose-headings:font-black
                  prose-headings:text-neutral-900

                  prose-h1:text-5xl
                  prose-h2:text-4xl
                  prose-h3:text-3xl

                  prose-p:text-gray-700
                  prose-p:leading-9
                  prose-p:mb-7

                  prose-a:text-orange-600
                  prose-a:no-underline
                  hover:prose-a:underline

                  prose-strong:text-black

                  prose-li:text-gray-700

                  prose-blockquote:border-l-4
                  prose-blockquote:border-orange-500
                  prose-blockquote:bg-orange-50
                  prose-blockquote:rounded-r-2xl
                  prose-blockquote:px-6
                  prose-blockquote:py-4
                  prose-blockquote:italic

                  prose-img:rounded-3xl
                  prose-img:shadow-xl
                ">

                  {blog.content
                    .split("\n")
                    .filter((p) => p.trim() !== "")
                    .map((paragraph, index) => (

                      <p key={index}>
                        {paragraph}
                      </p>

                    ))}

                </div>

              </div>

            </div>

          </motion.div>

        </section>

        {/* CTA */}

        <section className="px-6 pb-24">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >

            <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-r from-neutral-900 via-black to-neutral-800 text-white p-12 md:p-16">

              <div className="absolute w-80 h-80 rounded-full bg-orange-500/20 blur-[120px] -right-10 -top-10" />

              <div className="absolute w-72 h-72 rounded-full bg-red-500/20 blur-[120px] left-0 bottom-0" />

              <div className="relative">

                <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
                  Continue Reading
                </span>

                <h2 className="mt-6 text-4xl md:text-5xl font-black leading-tight">
                  Explore More Tech Insights
                </h2>

                <p className="mt-5 text-lg text-gray-300 max-w-2xl leading-8">
                  Stay updated with the latest technology,
                  AI, software development, startups,
                  cybersecurity, cloud computing and digital
                  transformation articles.
                </p>

                <div className="mt-10 flex flex-wrap gap-5">

                  <Link
                    to="/tech-trends"
                    className="rounded-full bg-white text-black px-8 py-4 font-bold hover:scale-105 transition"
                  >
                    ← Back to Blogs
                  </Link>

                  <Link
                    to="/contact"
                    className="rounded-full border border-white/20 px-8 py-4 font-semibold hover:bg-white hover:text-black transition"
                  >
                    Contact Us
                  </Link>

                </div>

              </div>

            </div>

          </motion.div>

        </section>

      </article>

      <Footer />

    </>
  );
}