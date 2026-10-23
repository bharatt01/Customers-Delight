import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { QRCodeCanvas, QRCodeSVG } from "qrcode.react";
import { auth } from "@/firebase/firebase";
import { getBlogs, deleteBlog } from "./../../services/blogService";
import { getShops, deleteShop, togglePublish } from "./../../services/shopService";
import { Blog } from "@/types/blog";
import { Shop } from "@/types/shop";
import {
  Plus, Pencil, Trash2, LogOut, Eye, EyeOff, Store, Newspaper,
  ExternalLink, Search, MousePointerClick, BarChart3,
  QrCode, Download, Copy, Check, X,
} from "lucide-react";

type Tab = "blogs" | "shops";

// The public link of a shop page. This is what the QR code points to.
const shopLink = (slug: string) => `${window.location.origin}/shops/${slug}`;

export default function Dashboard() {
  const [tab, setTab] = useState<Tab>("shops");
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [qrShop, setQrShop] = useState<Shop | null>(null);
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
                        <button
                          onClick={() => setQrShop(shop)}
                          title="QR code"
                          aria-label={`QR code for ${shop.name}`}
                          className="p-2.5 rounded-xl border border-black/10 hover:bg-gray-50 transition"
                        >
                          <QrCode size={16} />
                        </button>
                        {shop.published && (
                          <a
                            href={`/shops/${shop.slug}`}
                            target="_blank"
                            rel="noreferrer"
                            title="Open shop page"
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

      {qrShop && <QrModal shop={qrShop} onClose={() => setQrShop(null)} />}
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

/* ------------------------------------------------------------------ */
/* QR code popup: preview + download (PNG for sharing, SVG for printing) */

function QrModal({ shop, onClose }: { shop: Shop; onClose: () => void }) {
  const link = shopLink(shop.slug);
  const canvasWrap = useRef<HTMLDivElement>(null); // holds the hidden hi-res canvas for PNG
  const svgWrap = useRef<HTMLDivElement>(null); // holds the visible SVG preview
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  function saveBlob(url: string, filename: string) {
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  function downloadPng() {
    const canvas = canvasWrap.current?.querySelector("canvas");
    if (!canvas) return;
    saveBlob(canvas.toDataURL("image/png"), `${shop.slug}-qr.png`);
  }

  function downloadSvg() {
    const svg = svgWrap.current?.querySelector("svg");
    if (!svg) return;
    const source = new XMLSerializer().serializeToString(svg);
    const url = URL.createObjectURL(new Blob([source], { type: "image/svg+xml" }));
    saveBlob(url, `${shop.slug}-qr.svg`);
    URL.revokeObjectURL(url);
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked: the link is still shown on screen to copy by hand */
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`QR code for ${shop.name}`}
    >
      <div
        className="relative w-full max-w-sm bg-white rounded-3xl p-7 text-center shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition"
        >
          <X size={18} />
        </button>

        <p className="text-xs font-black uppercase tracking-wide text-gray-400">Shop QR code</p>
        <h2 className="text-2xl font-black mt-1 break-words">{shop.name}</h2>

        {/* visible preview (crisp SVG) */}
        <div ref={svgWrap} className="inline-block mt-5 p-4 bg-white rounded-2xl border border-black/10">
          <QRCodeSVG value={link} size={220} fgColor="#0a0a0a" bgColor="#ffffff" level="M" includeMargin />
        </div>

        {/* hidden hi-res canvas used for the PNG download */}
        <div ref={canvasWrap} className="hidden" aria-hidden>
          <QRCodeCanvas value={link} size={1024} fgColor="#0a0a0a" bgColor="#ffffff" level="M" includeMargin />
        </div>

        <p className="mt-4 text-xs text-gray-500 break-all">{link}</p>

        {!shop.published && (
          <p className="mt-3 text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
            This shop is a draft. The link won't open until you publish it.
          </p>
        )}

        <div className="mt-5 grid grid-cols-2 gap-3">
          <button
            onClick={downloadPng}
            className="flex items-center justify-center gap-2 bg-black text-white font-bold text-sm py-3 rounded-xl hover:bg-gray-800 transition"
          >
            <Download size={16} /> PNG
          </button>
          <button
            onClick={downloadSvg}
            className="flex items-center justify-center gap-2 border border-black/15 font-bold text-sm py-3 rounded-xl hover:bg-gray-50 transition"
          >
            <Download size={16} /> SVG
          </button>
        </div>
        <button
          onClick={copyLink}
          className="mt-3 w-full flex items-center justify-center gap-2 text-sm font-bold text-gray-600 hover:text-black py-2 transition"
        >
          {copied ? <Check size={15} /> : <Copy size={15} />} {copied ? "Link copied" : "Copy link"}
        </button>
      </div>
    </div>
  );
}