import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { auth, db } from "@/firebase/firebase";

export default function OwnerLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const normalizedEmail = email.trim().toLowerCase();

    try {
      // Step 1: does any shop have this email on file? If not, don't even
      // try Firebase Auth — tell them straight away.
      const shopQuery = query(
        collection(db, "shops"),
        where("ownerEmail", "==", normalizedEmail),
        limit(1)
      );
      const shopSnap = await getDocs(shopQuery);

      if (shopSnap.empty) {
        setError("We don't have a shop registered with this email. Contact the admin to get set up.");
        setLoading(false);
        return;
      }

      // Step 2: email checks out — now verify the password.
      await signInWithEmailAndPassword(auth, normalizedEmail, password);
      navigate("/owner/dashboard");
    } catch (err: any) {
      console.error("Owner sign-in failed:", err?.code, err?.message);
      if (err?.code === "auth/wrong-password" || err?.code === "auth/invalid-credential") {
        setError("That password isn't right — try again.");
      } else if (err?.code === "auth/user-not-found") {
        setError("Your shop is registered, but no login has been set up yet. Contact the admin.");
      } else if (err?.code === "auth/operation-not-allowed") {
        setError("Email/Password sign-in isn't enabled for this project yet — contact the admin.");
      } else if (err?.code === "auth/too-many-requests") {
        setError("Too many attempts — wait a bit and try again.");
      } else {
        setError(`Couldn't sign you in (${err?.code ?? "unknown error"}). Please try again.`);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FBF8F2] px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white border border-black/10 rounded-3xl p-8 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12)]">
        <h1 className="text-2xl font-black tracking-tight mb-1">Shop owner login</h1>
        <p className="text-sm text-gray-500 mb-6">See how your page is performing.</p>

        {error && (
          <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-2.5 text-sm text-red-700">
            {error}
          </div>
        )}

        <label className="block text-xs font-black uppercase tracking-wider text-gray-400 mb-1.5">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          className="w-full mb-4 rounded-xl border border-black/10 px-4 py-2.5 text-sm focus:outline-none focus:border-black"
        />

        <label className="block text-xs font-black uppercase tracking-wider text-gray-400 mb-1.5">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          className="w-full mb-6 rounded-xl border border-black/10 px-4 py-2.5 text-sm focus:outline-none focus:border-black"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white font-bold text-sm py-3 rounded-xl hover:bg-[#1a1a1a] transition disabled:opacity-50"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}