import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, UploadCloud, X, KeyRound, Mail, CheckCircle2 } from "lucide-react";
import {
  createShop, updateShop, getShop, uploadShopPhotos, slugifyName,
} from "./../../services/shopService";
import { createOwnerAccount, sendOwnerPasswordReset } from "./../../services/ownerAuthService";
import { Shop } from "@/types/shop";

const emptyForm = {
  name: "", slug: "", category: "", description: "", shortDescription: "",
  phone: "", address: "", lat: undefined as number | undefined, lng: undefined as number | undefined,
  photos: [] as string[], published: false,
  ownerEmail: "",
};

export default function ShopForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState<typeof emptyForm>(emptyForm);
  const [newPhotos, setNewPhotos] = useState<File[]>([]);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(isEdit);

  // Owner login setup — separate from `form` since the password never gets
  // written to Firestore.
  const [originalOwnerEmail, setOriginalOwnerEmail] = useState("");
  const [ownerPassword, setOwnerPassword] = useState("");
  const [ownerAccountStatus, setOwnerAccountStatus] = useState<
    "idle" | "creating" | "created" | "error" | "reset-sent" | "reset-error"
  >("idle");
  const [ownerAccountError, setOwnerAccountError] = useState<string | null>(null);

  useEffect(() => {
    if (!isEdit || !id) return;
    getShop(id).then((shop) => {
      if (shop) {
        setForm({ ...emptyForm, ...shop });
        setOriginalOwnerEmail((shop as any).ownerEmail ?? "");
      }
      setLoading(false);
    });
  }, [id, isEdit]);

  function update<K extends keyof typeof emptyForm>(key: K, value: (typeof emptyForm)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleNameChange(value: string) {
    update("name", value);
    if (!isEdit) update("slug", slugifyName(value));
  }

  function removeExistingPhoto(url: string) {
    update("photos", form.photos.filter((p) => p !== url));
  }

  function removeNewPhoto(idx: number) {
    setNewPhotos((prev) => prev.filter((_, i) => i !== idx));
  }

  // The account-creation fields only make sense when there's no account yet.
  const showAccountCreationFields = originalOwnerEmail.trim() === "";

  async function handleSendResetEmail() {
    setOwnerAccountStatus("idle");
    setOwnerAccountError(null);
    try {
      await sendOwnerPasswordReset(originalOwnerEmail);
      setOwnerAccountStatus("reset-sent");
    } catch {
      setOwnerAccountStatus("reset-error");
      setOwnerAccountError("Couldn't send the reset email — check the address and try again.");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setOwnerAccountError(null);

    const trimmedOwnerEmail = form.ownerEmail.trim().toLowerCase();

    // If they're setting up a new owner login, validate before touching Firestore.
    if (showAccountCreationFields && trimmedOwnerEmail) {
      if (ownerPassword.length < 6) {
        setOwnerAccountStatus("error");
        setOwnerAccountError("Owner password needs to be at least 6 characters.");
        setSaving(false);
        return;
      }
    }

    try {
      let shopId = id;
      const payload: Partial<Shop> = {
        ...form,
        ownerEmail: trimmedOwnerEmail,
        coverImage: form.photos[0],
      } as Partial<Shop>;

      if (isEdit && id) {
        await updateShop(id, payload);
      } else {
        shopId = await createShop(payload);
      }

      if (shopId && newPhotos.length > 0) {
        const urls = await uploadShopPhotos(shopId, newPhotos);
        const allPhotos = [...form.photos, ...urls];
        await updateShop(shopId, { photos: allPhotos, coverImage: allPhotos[0] });
      }

      // Shop is saved — now create the owner's login, if requested. Doing
      // this last means a failure here never loses the shop data itself.
      if (showAccountCreationFields && trimmedOwnerEmail) {
        setOwnerAccountStatus("creating");
        try {
          await createOwnerAccount(trimmedOwnerEmail, ownerPassword);
          setOwnerAccountStatus("created");
        } catch (err: any) {
          console.error("createOwnerAccount failed:", err?.code, err?.message);
          setOwnerAccountStatus("error");
          setOwnerAccountError(
            err?.code === "auth/email-already-in-use"
              ? "An account with this email already exists — the shop is saved, but you'll need to reuse that existing login rather than create a new one."
              : err?.code === "auth/operation-not-allowed"
              ? "Email/Password sign-in isn't enabled for this Firebase project yet (Console → Authentication → Sign-in method → Email/Password). Enable it, then try again from this page."
              : err?.code === "auth/weak-password"
              ? "That password is too weak — use at least 6 characters."
              : err?.code === "auth/invalid-email"
              ? "That doesn't look like a valid email address."
              : `The shop saved, but creating the owner login failed (${err?.code ?? "unknown error"}). You can try again from this page.`
          );
          setSaving(false);
          return; // stay on the page so they can see the error and retry
        }
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
        <h1 className="text-3xl font-black">{isEdit ? "Edit Shop" : "New Shop"}</h1>
      </div>

      <div className="max-w-3xl mx-auto px-8 py-10">
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-black/10 p-8 space-y-6">
          <div>
            <label className="block font-bold text-sm mb-2">Shop name</label>
            <input
              required
              value={form.name}
              onChange={(e) => handleNameChange(e.target.value)}
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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-sm mb-2">Category</label>
              <input
                value={form.category}
                onChange={(e) => update("category", e.target.value)}
                className="w-full border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div>
              <label className="block font-bold text-sm mb-2">WhatsApp phone</label>
              <input
                required
                placeholder="919876543210"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                className="w-full border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
              />
              <p className="text-xs text-gray-400 mt-1">Country code + number, digits only. Used for the QR code.</p>
            </div>
          </div>

          <div>
            <label className="block font-bold text-sm mb-2">Short description</label>
            <input
              value={form.shortDescription}
              onChange={(e) => update("shortDescription", e.target.value)}
              maxLength={140}
              className="w-full border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block font-bold text-sm mb-2">Full description</label>
            <textarea
              rows={5}
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              className="w-full border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block font-bold text-sm mb-2">Address</label>
            <input
              required
              value={form.address}
              onChange={(e) => update("address", e.target.value)}
              placeholder="Full address, used for the embedded map"
              className="w-full border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-sm mb-2">Latitude (optional)</label>
              <input
                type="number"
                step="any"
                value={form.lat ?? ""}
                onChange={(e) => update("lat", e.target.value ? parseFloat(e.target.value) : undefined)}
                className="w-full border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div>
              <label className="block font-bold text-sm mb-2">Longitude (optional)</label>
              <input
                type="number"
                step="any"
                value={form.lng ?? ""}
                onChange={(e) => update("lng", e.target.value ? parseFloat(e.target.value) : undefined)}
                className="w-full border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>
          <p className="text-xs text-gray-400 -mt-4">
            Leave blank and the map will just search by address text — lat/lng gives a more precise pin.
          </p>

          <div>
            <label className="block font-bold text-sm mb-2">Photos</label>
            {form.photos.length > 0 && (
              <div className="grid grid-cols-4 gap-3 mb-3">
                {form.photos.map((url) => (
                  <div key={url} className="relative">
                    <img src={url} alt="" className="w-full h-20 object-cover rounded-xl" />
                    <button
                      type="button"
                      onClick={() => removeExistingPhoto(url)}
                      className="absolute -top-2 -right-2 bg-black text-white rounded-full p-1"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            {newPhotos.length > 0 && (
              <div className="grid grid-cols-4 gap-3 mb-3">
                {newPhotos.map((file, idx) => (
                  <div key={idx} className="relative">
                    <img src={URL.createObjectURL(file)} alt="" className="w-full h-20 object-cover rounded-xl" />
                    <button
                      type="button"
                      onClick={() => removeNewPhoto(idx)}
                      className="absolute -top-2 -right-2 bg-black text-white rounded-full p-1"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <label className="flex items-center gap-2 justify-center border border-dashed border-black/20 rounded-xl px-4 py-3 cursor-pointer hover:bg-gray-50 transition text-sm font-bold">
              <UploadCloud size={16} />
              Add photos
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => setNewPhotos((prev) => [...prev, ...Array.from(e.target.files || [])])}
              />
            </label>
            <p className="text-xs text-gray-400 mt-1">First photo becomes the cover image shown in listings.</p>
          </div>

          {/* Owner login */}
          <div className="rounded-2xl border border-black/10 bg-gray-50/60 p-6">
            <div className="flex items-center gap-2 mb-1">
              <KeyRound size={16} />
              <h2 className="font-black text-sm uppercase tracking-wide">Owner login</h2>
            </div>
            <p className="text-xs text-gray-500 mb-5">
              Lets this shop's owner sign in to their own dashboard and see page views + WhatsApp clicks.
            </p>

            {showAccountCreationFields ? (
              <div className="space-y-4">
                <div>
                  <label className="block font-bold text-sm mb-2">Owner email</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      value={form.ownerEmail}
                      onChange={(e) => update("ownerEmail", e.target.value)}
                      placeholder="owner@example.com"
                      className="w-full border border-black/10 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-black bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-sm mb-2">Owner password</label>
                  <input
                    type="text"
                    value={ownerPassword}
                    onChange={(e) => setOwnerPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    minLength={6}
                    className="w-full border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black bg-white font-mono text-sm"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Share this with the owner directly — there's no confirmation email for this step. Leave both fields blank to skip setting up a login for now.
                  </p>
                </div>

                {ownerAccountStatus === "created" && (
                  <p className="flex items-center gap-1.5 text-sm text-green-600 font-bold">
                    <CheckCircle2 size={15} /> Owner login created.
                  </p>
                )}
                {ownerAccountStatus === "error" && ownerAccountError && (
                  <p className="text-sm text-red-600 font-medium">{ownerAccountError}</p>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <p className="text-sm font-bold">{originalOwnerEmail}</p>
                  <p className="text-xs text-gray-400">This owner already has a login.</p>
                </div>
                <button
                  type="button"
                  onClick={handleSendResetEmail}
                  className="text-sm font-bold px-4 py-2 rounded-xl border border-black/10 hover:bg-white transition"
                >
                  Send password reset email
                </button>
              </div>
            )}

            {ownerAccountStatus === "reset-sent" && (
              <p className="flex items-center gap-1.5 text-sm text-green-600 font-bold mt-3">
                <CheckCircle2 size={15} /> Reset email sent to {originalOwnerEmail}.
              </p>
            )}
            {ownerAccountStatus === "reset-error" && ownerAccountError && (
              <p className="text-sm text-red-600 font-medium mt-3">{ownerAccountError}</p>
            )}
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
              {saving ? "Saving..." : isEdit ? "Save changes" : "Create shop"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}