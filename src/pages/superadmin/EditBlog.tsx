import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getBlogById, updateBlog, uploadBlogImage, generateSlug } from "@/services/blogService";
import { Blog } from "@/types/blog";
import { ArrowLeft, Upload } from "lucide-react";

export default function EditBlog() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState<Partial<Blog>>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "Technology",
    author: "",
    readTime: 5,
    tags: [],
    featured: false,
    published: true,
    coverImage: "",
  });

  useEffect(() => {
    if (!id) return;
    loadBlog();
  }, [id]);

  async function loadBlog() {
    const blog = await getBlogById(id!);
    if (!blog) {
      navigate("/superadmin/dashboard");
      return;
    }
    setForm({
      ...blog,
      tags: Array.isArray(blog.tags) ? blog.tags : [],
    });
    setLoading(false);
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setSaving(true);
    try {
      const url = await uploadBlogImage(file);
      setForm((prev) => ({ ...prev, coverImage: url }));
    } catch (err) {
      alert("Image upload failed");
    }
    setSaving(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!id) return;
    setSaving(true);

    try {
      await updateBlog(id, {
        ...form,
        tags: Array.isArray(form.tags)
          ? form.tags
          : (form.tags as string).split(",").map((t) => t.trim()).filter(Boolean),
        updatedAt: new Date().toISOString(),
      });
      navigate("/superadmin/dashboard");
    } catch (err) {
      alert("Failed to update blog");
      setSaving(false);
    }
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
      <div className="bg-black text-white px-8 py-6 flex items-center gap-4">
        <Link
          to="/superadmin/dashboard"
          className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition"
        >
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-3xl font-black">Edit Blog</h1>
      </div>

      <div className="max-w-4xl mx-auto px-8 py-10">
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-black/10 p-8 space-y-6">
          {/* Image */}
          <div>
            <label className="block font-bold mb-3">Cover Image</label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-black/20 rounded-2xl h-64 flex items-center justify-center cursor-pointer hover:border-black transition overflow-hidden relative"
            >
              {form.coverImage ? (
                <img
                  src={form.coverImage}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center">
                  <Upload size={40} className="mx-auto mb-2 text-gray-400" />
                  <p className="text-gray-500 font-medium">Click to upload</p>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block font-bold mb-2">Title</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                className="w-full border border-black/20 rounded-xl p-4 font-medium focus:border-black focus:outline-none transition"
              />
            </div>
            <div>
              <label className="block font-bold mb-2">Slug</label>
              <input
                name="slug"
                value={form.slug}
                onChange={handleChange}
                required
                className="w-full border border-black/20 rounded-xl p-4 font-medium focus:border-black focus:outline-none transition"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold mb-2">Excerpt</label>
            <textarea
              name="excerpt"
              value={form.excerpt}
              onChange={handleChange}
              required
              rows={3}
              className="w-full border border-black/20 rounded-xl p-4 font-medium focus:border-black focus:outline-none transition resize-none"
            />
          </div>

          <div>
            <label className="block font-bold mb-2">Content</label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              required
              rows={12}
              className="w-full border border-black/20 rounded-xl p-4 font-medium focus:border-black focus:outline-none transition font-mono text-sm"
            />
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="block font-bold mb-2">Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full border border-black/20 rounded-xl p-4 font-medium focus:border-black focus:outline-none transition bg-white"
              >
                <option>Technology</option>
                <option>AI & Machine Learning</option>
                <option>Web Development</option>
                <option>Cloud</option>
                <option>Security</option>
                <option>Industry News</option>
              </select>
            </div>
            <div>
              <label className="block font-bold mb-2">Author</label>
              <input
                name="author"
                value={form.author}
                onChange={handleChange}
                className="w-full border border-black/20 rounded-xl p-4 font-medium focus:border-black focus:outline-none transition"
              />
            </div>
            <div>
              <label className="block font-bold mb-2">Read Time</label>
              <input
                name="readTime"
                type="number"
                value={form.readTime}
                onChange={handleChange}
                className="w-full border border-black/20 rounded-xl p-4 font-medium focus:border-black focus:outline-none transition"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold mb-2">Tags (comma separated)</label>
            <input
              name="tags"
              value={Array.isArray(form.tags) ? form.tags.join(", ") : form.tags}
              onChange={handleChange}
              className="w-full border border-black/20 rounded-xl p-4 font-medium focus:border-black focus:outline-none transition"
            />
          </div>

          <div className="flex items-center gap-8">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="featured"
                checked={form.featured}
                onChange={handleChange}
                className="w-5 h-5"
              />
              <span className="font-bold">Featured</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="published"
                checked={form.published}
                onChange={handleChange}
                className="w-5 h-5"
              />
              <span className="font-bold">Published</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-black text-white py-4 rounded-xl font-black text-lg hover:bg-gray-800 transition disabled:opacity-50"
          >
            {saving ? "Saving..." : "Update Blog"}
          </button>
        </form>
      </div>
    </div>
  );
}