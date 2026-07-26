import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { getBlogs, deleteBlog } from "@/services/blogService";
import { Blog } from "@/types/blog";
import { Plus, Pencil, Trash2, LogOut, Eye, EyeOff } from "lucide-react";


export default function SuperAdminDashboard() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) navigate("/superadmin/login");
    });
    return () => unsub();
  }, [navigate]);

  useEffect(() => {
    loadBlogs();
  }, []);

  async function loadBlogs() {
    setLoading(true);
    const data = await getBlogs();
    setBlogs(data as Blog[]);
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    await deleteBlog(id);
    loadBlogs();
  }

  async function handleLogout() {
    await signOut(auth);
    navigate("/superadmin/login");
  }

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
            to="/superadmin/create"
            className="flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-xl font-bold hover:bg-gray-100 transition"
          >
            <Plus size={18} />
            New Blog
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

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 py-10">
        <div className="bg-white rounded-3xl border border-black/10 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-6 py-4 font-black text-sm uppercase tracking-wide">Blog</th>
                <th className="text-left px-6 py-4 font-black text-sm uppercase tracking-wide">Category</th>
                <th className="text-left px-6 py-4 font-black text-sm uppercase tracking-wide">Status</th>
                <th className="text-left px-6 py-4 font-black text-sm uppercase tracking-wide">Date</th>
                <th className="text-right px-6 py-4 font-black text-sm uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog.id} className="border-t border-black/5 hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={blog.coverImage}
                        alt=""
                        className="w-14 h-14 rounded-xl object-cover"
                      />
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
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {blog.createdAt
                      ? new Date(blog.createdAt).toLocaleDateString()
                      : "—"}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/superadmin/edit/${blog.id}`}
                        className="p-2.5 rounded-xl bg-black text-white hover:bg-gray-800 transition"
                      >
                        <Pencil size={16} />
                      </Link>
                      <button
                        onClick={() => handleDelete(blog.id)}
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

          {blogs.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No blogs yet.</p>
              <Link
                to="/superadmin/create"
                className="inline-block mt-4 text-black font-bold underline"
              >
                Create your first blog
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}