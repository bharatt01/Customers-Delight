import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, UploadCloud } from "lucide-react";
import { createBlog, updateBlog, getBlog, uploadBlogCover, slugifyTitle } from "@/services/blogService";
import { Blog } from "@/types/blog";

const emptyForm = {
  title: "", slug: "", excerpt: "", content: "",
  coverImage: "", category: "", published: false,
};

export default function BlogForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState<typeof emptyForm>(emptyForm);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(isEdit);

  useEffect(() => {
    if (!isEdit || !id) return;
    getBlog(id).then((blog) => {
      if (blog) setForm({ ...emptyForm, ...blog });
      setLoading(false);
    });
  }, [id, isEdit]);

  function update<K extends keyof typeof emptyForm>(key: K, value: (typeof emptyForm)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleTitleChange(value: string) {
    update("title", value);
    if (!isEdit) update("slug", slugifyTitle(value));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      let blogId = id;
      if (isEdit && id) {
        await updateBlog(id, form as Partial<Blog>);
      } else {
        blogId = await createBlog(form as Partial<Blog>);
      }
      if (blogId && coverFile) {
        const url = await uploadBlogCover(blogId, coverFile);
        await updateBlog(blogId, { coverImage: url });
      }
      navigate("/superadmin");
    } finally {
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
        <button onClick={() => navigate("/superadmin")} className="p-2 rounded-xl hover:bg-white/10 transition">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-3xl font-black">{isEdit ? "Edit Blog" : "New Blog"}</h1>
      </div>

      <div className="max-w-3xl mx-auto px-8 py-10">
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-black/10 p-8 space-y-6">
          <div>
            <label className="block font-bold text-sm mb-2">Title</label>
            <input
              required
              value={form.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block font-bold text-sm mb-2">Slug</label>
            <input
              required
              value={form.slug}
              onChange={(e) => update("slug", e.target.value)}
              className="w-full border border-black/10 rounded-xl px-4 py-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block font-bold text-sm mb-2">Category</label>
            <input
              value={form.category}
              onChange={(e) => update("category", e.target.value)}
              className="w-full border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block font-bold text-sm mb-2">Excerpt</label>
            <input
              value={form.excerpt}
              onChange={(e) => update("excerpt", e.target.value)}
              maxLength={200}
              className="w-full border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block font-bold text-sm mb-2">Content</label>
            <textarea
              rows={12}
              value={form.content}
              onChange={(e) => update("content", e.target.value)}
              className="w-full border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block font-bold text-sm mb-2">Cover image</label>
            {form.coverImage && <img src={form.coverImage} alt="" className="w-full h-40 object-cover rounded-xl mb-2" />}
            <label className="flex items-center gap-2 justify-center border border-dashed border-black/20 rounded-xl px-4 py-3 cursor-pointer hover:bg-gray-50 transition text-sm font-bold">
              <UploadCloud size={16} />
              {coverFile ? coverFile.name : "Upload cover"}
              <input type="file" accept="image/*" className="hidden" onChange={(e) => setCoverFile(e.target.files?.[0] || null)} />
            </label>
          </div>

          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={form.published} onChange={(e) => update("published", e.target.checked)} className="w-5 h-5" />
            <span className="font-bold text-sm">Published (visible on the site)</span>
          </label>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => navigate("/superadmin")} className="px-6 py-3 rounded-xl font-bold border border-black/10 hover:bg-gray-50 transition">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="px-6 py-3 rounded-xl font-bold bg-black text-white hover:bg-gray-800 transition disabled:opacity-50">
              {saving ? "Saving..." : isEdit ? "Save changes" : "Create blog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
