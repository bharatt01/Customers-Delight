import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, TrendingUp, ArrowUpRight, Newspaper } from "lucide-react";
import { Link } from "react-router-dom";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlogCard from "@/components/blog/BlogCard";
import { getBlogs } from "@/services/blogService";
import { Blog } from "@/types/blog";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200";

const TICKER_ITEMS = [
  "Festive Sale Playbooks",
  "WhatsApp Marketing Wins",
  "Online Review Tactics",
  "Inventory Hacks",
  "Loyalty Program Ideas",
  "Local Search Visibility",
];

export default function TechTrends() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    async function loadBlogs() {
      setLoading(true);
      try {
        const data = await getBlogs(true);
        setBlogs(data);
      } catch (err) {
        console.error("Failed to load blogs:", err);
      }
      setLoading(false);
    }
    loadBlogs();
  }, []);

  const categories = useMemo(() => {
    return ["All", ...new Set(blogs.map((blog) => blog.category))];
  }, [blogs]);

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesCategory =
        activeCategory === "All" || blog.category === activeCategory;

      const matchesSearch =
        blog.title.toLowerCase().includes(search.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(search.toLowerCase()) ||
        blog.tags?.some((tag) =>
          tag.toLowerCase().includes(search.toLowerCase())
        );

      return matchesCategory && matchesSearch;
    });
  }, [blogs, activeCategory, search]);

  const featuredBlog = filteredBlogs.find((blog) => blog.featured);
  const remainingBlogs = filteredBlogs.filter((blog) => !blog.featured);

  return (
    <div className="overflow-hidden bg-[#FDF6E9]">
      <Navbar />

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .anim-marquee { animation: marquee 22s linear infinite; }
      `}</style>

      {/* ---------------- HERO ---------------- */}
      <section className="relative overflow-hidden pt-36 pb-16">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 right-[-120px] h-[420px] w-[420px] rounded-full bg-orange-500/10 blur-[110px]" />
          <div className="absolute -bottom-44 left-[-100px] h-[380px] w-[380px] rounded-full bg-yellow-400/10 blur-[110px]" />
          <div
            className="absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage: "radial-gradient(#2B1B0E 0.6px, transparent 0.6px)",
              backgroundSize: "24px 24px",
              maskImage: "radial-gradient(ellipse 70% 55% at 50% 10%, black 30%, transparent 85%)",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 border-2 border-dashed border-[#2B1B0E]/25 rounded-full"
          >
            <TrendingUp size={14} className="text-[#ee9725]" />
            <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#2B1B0E]/70">
              Customers Delight — Market Watch
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-7 max-w-4xl font-[900] uppercase leading-[0.95] text-[#2B1B0E] text-5xl md:text-6xl lg:text-7xl tracking-tight"
          >
            What's Moving
            <br />
            <span className="bg-gradient-to-r from-orange-500 to-yellow-600 bg-clip-text text-transparent">
              The Local Market
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-6 max-w-2xl text-lg leading-8 text-[#2B1B0E]/65"
          >
            Real tactics for shopkeepers running offline stores, online
            stores, or both — footfall, reviews, WhatsApp marketing,
            inventory, and everything else that moves the needle.
          </motion.p>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="relative mt-10 max-w-xl"
          >
            <Search
              className="absolute left-5 top-1/2 -translate-y-1/2 text-[#2B1B0E]/40"
              size={18}
            />
            <input
              type="text"
              placeholder="Search articles — try 'WhatsApp' or 'reviews'..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-sm border-2 border-[#2B1B0E]/15 bg-white py-3.5 pl-13 pr-5 text-[#2B1B0E] placeholder:text-[#2B1B0E]/35 outline-none transition-colors focus:border-[#ee9725]"
            />
          </motion.div>

          {/* Categories */}
          <div className="mt-6 flex flex-wrap gap-2.5">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-sm px-4 py-2 text-xs font-bold uppercase tracking-wide transition-all duration-200 border-2 ${
                  activeCategory === category
                    ? "bg-gradient-to-r from-orange-500 to-yellow-600 border-transparent text-[#2B1B0E]"
                    : "bg-white border-[#2B1B0E]/15 text-[#2B1B0E]/60 hover:border-[#ee9725]/50 hover:text-[#2B1B0E]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Trending ticker — continuous motion, teases content categories */}
        <div className="relative mt-14 w-full overflow-hidden bg-[#2B1B0E] py-2.5">
          <div className="anim-marquee flex whitespace-nowrap text-xs md:text-sm font-bold uppercase tracking-widest text-white/80">
            {Array(2).fill(0).map((_, i) => (
              <div key={i} className="flex shrink-0">
                {TICKER_ITEMS.map((t, j) => (
                  <span key={j} className="flex items-center gap-3 mx-5">
                    <span className="text-[#ee9725]">●</span> {t}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- CONTENT ---------------- */}
      <section className="pb-32 pt-16">
        <div className="mx-auto max-w-7xl px-6">
          {/* Loading State */}
          {loading && (
            <div className="py-24 text-center">
              <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-[#ee9725] border-t-transparent" />
              <p className="mt-4 text-[#2B1B0E]/50 font-medium">
                Fetching today's market news...
              </p>
            </div>
          )}

          {/* Featured Blog */}
          {!loading && featuredBlog && (
            <Link to={`/tech-trends/${featuredBlog.slug}`}>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -3 }}
                className="group mb-20 overflow-hidden rounded-md border-2 border-[#2B1B0E] shadow-[8px_8px_0px_0px_rgba(43,27,14,0.1)] transition-shadow"
              >
                <div className="grid md:grid-cols-2">
                  <div className="overflow-hidden">
                    <img
                      src={featuredBlog.coverImage || FALLBACK_IMAGE}
                      alt={featuredBlog.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col justify-center bg-[#2B1B0E] p-10 md:p-14 text-white">
                    <div className="flex items-center gap-2 w-fit">
                      <span className="rounded-sm bg-gradient-to-r from-orange-500 to-yellow-600 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[#2B1B0E]">
                        Featured
                      </span>
                      <span className="rounded-sm border border-white/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white/70">
                        {featuredBlog.category}
                      </span>
                    </div>
                    <h2 className="mt-6 text-3xl md:text-4xl font-[900] leading-tight tracking-tight">
                      {featuredBlog.title}
                    </h2>
                    <p className="mt-5 leading-7 text-white/60">
                      {featuredBlog.excerpt}
                    </p>
                    <div className="mt-8 flex items-center gap-2 font-bold text-[#ee9725] text-sm uppercase tracking-wide">
                      Read Full Story
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          )}

          {/* Section Heading */}
          {!loading && (
            <div className="mb-10 flex items-center justify-between border-b-2 border-[#2B1B0E]/10 pb-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-[900] uppercase tracking-tight text-[#2B1B0E]">
                  Latest From The Market
                </h2>
                <p className="mt-2 text-[#2B1B0E]/55">
                  Fresh reads for shopkeepers, updated regularly.
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-2 rounded-sm border-2 border-[#2B1B0E] px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest text-[#2B1B0E]">
                <Newspaper className="w-3.5 h-3.5 text-[#ee9725]" />
                {filteredBlogs.length} Articles
              </div>
            </div>
          )}

          {/* Grid */}
          {!loading && remainingBlogs.length === 0 ? (
            <div className="py-20 text-center border-2 border-dashed border-[#2B1B0E]/15 rounded-md">
              <h3 className="text-2xl font-[900] uppercase tracking-tight text-[#2B1B0E]">
                No Notices Found
              </h3>
              <p className="mt-3 text-[#2B1B0E]/50">
                Try a different category, or search another term.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {remainingBlogs.map((blog, index) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: (index % 6) * 0.06 }}
                >
                  <BlogCard blog={blog} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}