import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function OwnerSignupPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError("Password needs to be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email.trim(), password);
      // No shop is linked yet — OwnerDashboardPage shows a clear
      // "no shop linked" state until an admin sets ownerId on their shop doc.
      navigate("/owner/dashboard");
    } catch (err: any) {
      setError(
        err?.code === "auth/email-already-in-use"
          ? "An account with this email already exists."
          : "Couldn't create your account — check the details and try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FBF8F2] px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white border border-black/10 rounded-3xl p-8 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12)]">
        <h1 className="text-2xl font-black tracking-tight mb-1">Create your account</h1>
        <p className="text-sm text-gray-500 mb-6">For shop owners on CustomersDelight.</p>

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
          className="w-full mb-4 rounded-xl border border-black/10 px-4 py-2.5 text-sm focus:outline-none focus:border-black"
        />

        <label className="block text-xs font-black uppercase tracking-wider text-gray-400 mb-1.5">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          className="w-full mb-6 rounded-xl border border-black/10 px-4 py-2.5 text-sm focus:outline-none focus:border-black"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#ee9725] text-black font-bold text-sm py-3 rounded-xl hover:bg-[#F5B74C] transition disabled:opacity-50"
        >
          {loading ? "Creating account…" : "Sign up"}
        </button>

        <p className="text-xs text-gray-500 mt-4 text-center">
          Already have an account? <Link to="/owner/login" className="font-bold text-black underline">Log in</Link>
        </p>
      </form>
    </div>
  );
}