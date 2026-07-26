import { useEffect, useState } from "react";
import { getBlogs } from "@/services/blogService";
import { Blog } from "@/types/blog";
import BlogHero from "@/components/blog/BlogHero";
import FeaturedBlog from "@/components/blog/FeaturedBlog";
import CategoryFilter from "@/components/blog/CategoryFilter";
import SearchBar from "@/components/blog/SearchBar";
import BlogGrid from "@/components/blog/BlogGrid";
import Newsletter from "@/components/blog/Newsletter";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filtered, setFiltered] = useState<Blog[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBlogs();
  }, []);

  async function loadBlogs() {
    setLoading(true);
    const data = await getBlogs(true); // published only
    setBlogs(data as Blog[]);
    setFiltered(data as Blog[]);
    setLoading(false);
  }

  // Filter logic
  useEffect(() => {
    let result = blogs;

    if (activeCategory !== "All") {
      result = result.filter((b) => b.category === activeCategory);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.excerpt.toLowerCase().includes(q) ||
          b.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }

    setFiltered(result);
  }, [activeCategory, searchQuery, blogs]);

  const featured = blogs.find((b) => b.featured) || blogs[0];
  const categories = ["All", ...new Set(blogs.map((b) => b.category))];

 return (
  <div className="min-h-screen bg-[#FDF6E9]">
    <BlogHero />

    {featured && <FeaturedBlog blog={featured} />}

    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 border-b-2 border-[#2B1B0E]/10 pb-8">
        <CategoryFilter
          categories={categories}
          active={activeCategory}
          onChange={setActiveCategory}
        />
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>

      {loading ? (
        <div className="text-center py-20">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-[#ee9725] border-t-transparent" />
          <p className="mt-4 text-[#2B1B0E]/50 font-medium">Loading blogs...</p>
        </div>
      ) : (
        <BlogGrid blogs={filtered} />
      )}
    </div>

    <Newsletter />
  </div>
);
}