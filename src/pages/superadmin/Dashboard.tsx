import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { getBlogs, deleteBlog } from "./../../services/blogService";
import { getShops, deleteShop, togglePublish } from "./../../services/shopService";
import { Blog } from "@/types/blog";
import { Shop } from "@/types/shop";
import {
  Plus, Pencil, Trash2, LogOut, Eye, EyeOff, Store, Newspaper,
  ExternalLink, Search, MousePointerClick, BarChart3,
} from "lucide-react";

type Tab = "blogs" | "shops";

export default function Dashboard() {
  const [tab, setTab] = useState<Tab>("shops");
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  async function loadAll() {
    setLoading(true);
    const [blogData, shopData] = await Promise.all([getBlogs(), getShops()]);
    setBlogs(blogData);
    setShops(shopData);
    setLoading(false);
  }

  useEffect(() => {
    loadAll();
  }, []);

  useEffect(() => {
    setSearch(""); // don't carry a shop search term into the blog tab or vice versa
  }, [tab]);

  async function handleDeleteBlog(id: string) {
    if (!confirm("Delete this blog post?")) return;
    await deleteBlog(id);
    loadAll();
  }

  async function handleDeleteShop(id: string) {
    if (!confirm("Delete this shop?")) return;
    await deleteShop(id);
    loadAll();
  }

  async function handleTogglePublish(shop: Shop) {
    await togglePublish(shop.id, !shop.published);
    loadAll();
  }

  async function handleLogout() {
    await signOut(auth);
    navigate("/superadmin/login");
  }

  const stats = useMemo(() => {
    const publishedShops = shops.filter((s) => s.published).length;
    const publishedBlogs = blogs.filter((b) => b.published).length;
    const totalViews = shops.reduce((sum, s) => sum + (s.viewCount ?? 0), 0);
    const totalClicks = shops.reduce((sum, s) => sum + (s.whatsappClicks ?? 0), 0);
    return { publishedShops, publishedBlogs, totalViews, totalClicks };
  }, [shops, blogs]);

  const filteredShops = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return shops;
    return shops.filter(
      (s) => s.name.toLowerCase().includes(q) || s.category?.toLowerCase().includes(q)
    );
  }, [shops, search]);

  const filteredBlogs = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return blogs;
    return blogs.filter(
      (b) => b.title.toLowerCase().includes(q) || b.category?.toLowerCase().includes(q)
    );
  }, [blogs, search]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-black">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-black text-white px-8 py-6 flex items-center justify-between">
        <h1 className="text-3xl font-black">Super Admin</h1>
        <div className="flex items-center gap-4">
          <Link
            to={tab === "blogs" ? "/superadmin/blogs/create" : "/superadmin/shops/create"}
            className="flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-xl font-bold hover:bg-gray-100 transition"
          >
            <Plus size={18} />
            {tab === "blogs" ? "New Blog" : "New Shop"}
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 border border-white/30 px-5 py-2.5 rounded-xl font-bold hover:bg-white/10 transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="max-w-7xl mx-auto px-8 pt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            icon={<Store size={18} />}
            label="Shops"
            value={shops.length}
            sublabel={`${stats.publishedShops} published`}
          />
          <StatCard
            icon={<Newspaper size={18} />}
            label="Blog posts"
            value={blogs.length}
            sublabel={`${stats.publishedBlogs} published`}
          />
          <StatCard
            icon={<BarChart3 size={18} />}
            label="Shop page views"
            value={stats.totalViews}
            sublabel="across all shops"
          />
          <StatCard
            icon={<MousePointerClick size={18} />}
            label="WhatsApp clicks"
            value={stats.totalClicks}
            sublabel="across all shops"
          />
        </div>
      </div>

      {/* Tabs + search */}
      <div className="max-w-7xl mx-auto px-8 pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="inline-flex bg-white border border-black/10 rounded-2xl p-1.5">
          <button
            onClick={() => setTab("shops")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition ${
              tab === "shops" ? "bg-black text-white" : "text-gray-500 hover:text-black"
            }`}
          >
            <Store size={16} />
            Shops
            <span className={`text-xs px-2 py-0.5 rounded-full ${tab === "shops" ? "bg-white/20" : "bg-gray-100"}`}>
              {shops.length}
            </span>
          </button>
          <button
            onClick={() => setTab("blogs")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition ${
              tab === "blogs" ? "bg-black text-white" : "text-gray-500 hover:text-black"
            }`}
          >
            <Newspaper size={16} />
            Blogs
            <span className={`text-xs px-2 py-0.5 rounded-full ${tab === "blogs" ? "bg-white/20" : "bg-gray-100"}`}>
              {blogs.length}
            </span>
          </button>
        </div>

        <div className="relative w-full sm:w-72">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search ${tab}...`}
            className="w-full border border-black/10 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black bg-white"
          />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        {tab === "shops" ? (
          <div className="bg-white rounded-3xl border border-black/10 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-6 py-4 font-black text-sm uppercase tracking-wide">Shop</th>
                  <th className="text-left px-6 py-4 font-black text-sm uppercase tracking-wide">Category</th>
                  <th className="text-left px-6 py-4 font-black text-sm uppercase tracking-wide">Status</th>
                  <th className="text-left px-6 py-4 font-black text-sm uppercase tracking-wide">Views</th>
                  <th className="text-left px-6 py-4 font-black text-sm uppercase tracking-wide">WhatsApp</th>
                  <th className="text-right px-6 py-4 font-black text-sm uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredShops.map((shop) => (
                  <tr key={shop.id} className="border-t border-black/5 hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={shop.coverImage || shop.photos?.[0]}
                          alt=""
                          className="w-14 h-14 rounded-xl object-cover bg-gray-100"
                        />
                        <div>
                          <p className="font-bold text-lg">{shop.name}</p>
                          <p className="text-sm text-gray-500">/{shop.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-black text-white text-xs font-bold px-3 py-1 rounded-full">
                        {shop.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button onClick={() => handleTogglePublish(shop)} className="font-bold text-sm">
                        {shop.published ? (
                          <span className="flex items-center gap-1.5 text-green-600">
                            <Eye size={14} /> Published
                          </span>
                        ) : (
                          <span className="flex items-center gap-1.5 text-gray-400">
                            <EyeOff size={14} /> Draft
                          </span>
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4 font-bold tabular-nums">{shop.viewCount ?? 0}</td>
                    <td className="px-6 py-4 font-bold tabular-nums">{shop.whatsappClicks ?? 0}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {shop.published && (
                          
                          <a
                            href={`/shops/${shop.slug}`}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2.5 rounded-xl border border-black/10 hover:bg-gray-50 transition"
                          >
                            <ExternalLink size={16} />
                          </a>
                        )}
                        <Link
                          to={`/superadmin/shops/edit/${shop.id}`}
                          className="p-2.5 rounded-xl bg-black text-white hover:bg-gray-800 transition"
                        >
                          <Pencil size={16} />
                        </Link>
                        <button
                          onClick={() => handleDeleteShop(shop.id)}
                          className="p-2.5 rounded-xl bg-red-500 text-white hover:bg-red-600 transition"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredShops.length === 0 && shops.length > 0 && (
              <div className="text-center py-16">
                <p className="text-gray-400 text-lg">No shops match "{search}".</p>
              </div>
            )}
            {shops.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-400 text-lg">No shops yet.</p>
                <Link to="/superadmin/shops/create" className="inline-block mt-4 text-black font-bold underline">
                  Create your first shop
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-black/10 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-6 py-4 font-black text-sm uppercase tracking-wide">Blog</th>
                  <th className="text-left px-6 py-4 font-black text-sm uppercase tracking-wide">Category</th>
                  <th className="text-left px-6 py-4 font-black text-sm uppercase tracking-wide">Status</th>
                  <th className="text-right px-6 py-4 font-black text-sm uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBlogs.map((blog) => (
                  <tr key={blog.id} className="border-t border-black/5 hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img src={blog.coverImage} alt="" className="w-14 h-14 rounded-xl object-cover" />
                        <div>
                          <p className="font-bold text-lg">{blog.title}</p>
                          <p className="text-sm text-gray-500">/{blog.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-black text-white text-xs font-bold px-3 py-1 rounded-full">
                        {blog.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {blog.published ? (
                        <span className="flex items-center gap-1.5 text-green-600 font-bold text-sm">
                          <Eye size={14} /> Published
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-gray-400 font-bold text-sm">
                          <EyeOff size={14} /> Draft
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/superadmin/blogs/edit/${blog.id}`}
                          className="p-2.5 rounded-xl bg-black text-white hover:bg-gray-800 transition"
                        >
                          <Pencil size={16} />
                        </Link>
                        <button
                          onClick={() => handleDeleteBlog(blog.id)}
                          className="p-2.5 rounded-xl bg-red-500 text-white hover:bg-red-600 transition"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredBlogs.length === 0 && blogs.length > 0 && (
              <div className="text-center py-16">
                <p className="text-gray-400 text-lg">No posts match "{search}".</p>
              </div>
            )}
            {blogs.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-400 text-lg">No blogs yet.</p>
                <Link to="/superadmin/blogs/create" className="inline-block mt-4 text-black font-bold underline">
                  Create your first blog
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  sublabel,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  sublabel: string;
}) {
  return (
    <div className="bg-white border border-black/10 rounded-2xl p-5">
      <div className="flex items-center gap-2 text-gray-400 mb-3">
        {icon}
        <span className="text-xs font-black uppercase tracking-wide">{label}</span>
      </div>
      <p className="text-3xl font-black tabular-nums">{value.toLocaleString()}</p>
      <p className="text-sm text-gray-400 mt-1">{sublabel}</p>
    </div>
  );
}