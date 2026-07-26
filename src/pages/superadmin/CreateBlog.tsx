import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createBlog, uploadBlogImage, generateSlug } from "@/services/blogService";
import { ArrowLeft, Upload, X } from "lucide-react";

export default function CreateBlog() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "Technology",
    author: "Abhasys Team",
    readTime: 5,
    tags: "",
    featured: false,
    published: true,
    coverImage: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "title" && !form.slug) {
      setForm((prev) => ({ ...prev, slug: generateSlug(value) }));
    }
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError("");
    try {
      const url = await uploadBlogImage(file);
      setForm((prev) => ({ ...prev, coverImage: url }));
      setPreviewImage(url);
    } catch (err: any) {
      setError("Image upload failed: " + err.message);
    }
    setLoading(false);
  }

  function removeImage() {
    setForm((prev) => ({ ...prev, coverImage: "" }));
    setPreviewImage("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    console.log("1. Form submitted");
    console.log("2. Form data:", form);

    try {
      console.log("3. Calling createBlog...");

      const blogData = {
        title: form.title,
        slug: form.slug || generateSlug(form.title),
        excerpt: form.excerpt,
        content: form.content,
        coverImage: form.coverImage,
        category: form.category,
        author: form.author,
        readTime: Number(form.readTime),
        featured: form.featured,
        published: form.published,
        tags: form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      };

      console.log("4. Blog data prepared:", blogData);

      const result = await createBlog(blogData);
      console.log("5. Blog created! Result:", result);

      navigate("/superadmin/dashboard");
    } catch (err: any) {
      console.error("6. ERROR:", err);
      console.error("6b. Error code:", err.code);
      console.error("6c. Error message:", err.message);
      setError(err.message || "Failed to create blog");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-black text-white px-8 py-6 flex items-center gap-4">
        <Link
          to="/superadmin/dashboard"
          className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition"
        >
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-3xl font-black">Create New Blog</h1>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-8 py-10">
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-black/10 p-8 space-y-6">
          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm font-bold">
              {error}
            </div>
          )}

          {/* Image Upload */}
          <div>
            <label className="block font-bold mb-3">Cover Image</label>
            <div
              onClick={() => !form.coverImage && fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl h-64 flex items-center justify-center overflow-hidden relative transition ${
                form.coverImage
                  ? "border-black/20 cursor-default"
                  : "border-black/20 cursor-pointer hover:border-black"
              }`}
            >
              {form.coverImage ? (
                <>
                  <img
                    src={form.coverImage}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-4 right-4 p-2 bg-black text-white rounded-full hover:bg-gray-800 transition"
                  >
                    <X size={16} />
                  </button>
                </>
              ) : (
                <div className="text-center">
                  <Upload size={40} className="mx-auto mb-2 text-gray-400" />
                  <p className="text-gray-500 font-medium">Click to upload cover image</p>
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

          {/* Title & Slug */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-bold mb-2">Title *</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                className="w-full border border-black/20 rounded-xl p-4 font-medium focus:border-black focus:outline-none transition"
                placeholder="Blog title"
              />
            </div>
            <div>
              <label className="block font-bold mb-2">Slug *</label>
              <input
                name="slug"
                value={form.slug}
                onChange={handleChange}
                required
                className="w-full border border-black/20 rounded-xl p-4 font-medium focus:border-black focus:outline-none transition"
                placeholder="url-slug"
              />
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <label className="block font-bold mb-2">Excerpt *</label>
            <textarea
              name="excerpt"
              value={form.excerpt}
              onChange={handleChange}
              required
              rows={3}
              className="w-full border border-black/20 rounded-xl p-4 font-medium focus:border-black focus:outline-none transition resize-none"
              placeholder="Short description for cards..."
            />
          </div>

          {/* Content */}
          <div>
            <label className="block font-bold mb-2">Content *</label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              required
              rows={12}
              className="w-full border border-black/20 rounded-xl p-4 font-medium focus:border-black focus:outline-none transition font-mono text-sm"
              placeholder="Write your full blog content here..."
            />
          </div>

          {/* Category, Author, Read Time */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              <label className="block font-bold mb-2">Read Time (min)</label>
              <input
                name="readTime"
                type="number"
                value={form.readTime}
                onChange={handleChange}
                className="w-full border border-black/20 rounded-xl p-4 font-medium focus:border-black focus:outline-none transition"
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block font-bold mb-2">Tags (comma separated)</label>
            <input
              name="tags"
              value={form.tags}
              onChange={handleChange}
              className="w-full border border-black/20 rounded-xl p-4 font-medium focus:border-black focus:outline-none transition"
              placeholder="react, firebase, tutorial"
            />
          </div>

          {/* Toggles */}
          <div className="flex items-center gap-8">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="featured"
                checked={form.featured}
                onChange={handleChange}
                className="w-5 h-5 rounded border-black"
              />
              <span className="font-bold">Featured Blog</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="published"
                checked={form.published}
                onChange={handleChange}
                className="w-5 h-5 rounded border-black"
              />
              <span className="font-bold">Publish Immediately</span>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-4 rounded-xl font-black text-lg hover:bg-gray-800 transition disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Blog"}
          </button>
        </form>
      </div>
    </div>
  );
}