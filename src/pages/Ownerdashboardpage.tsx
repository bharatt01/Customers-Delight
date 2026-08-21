import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Eye, MessageCircle, LogOut, Copy, Check, ExternalLink,
  Percent, ImageIcon, FileText, MapPin, Phone,
  TrendingUp, TrendingDown, Minus,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { useOwnerShop } from "../hooks/Useownershop";
import { getShopAnalytics, ShopAnalytics } from "@/services/Analyticsservice";

export default function OwnerDashboardPage() {
  const { status, shop } = useOwnerShop();
  const [copied, setCopied] = useState(false);
  const [analytics, setAnalytics] = useState<ShopAnalytics | null>(null);

  useEffect(() => {
    if (shop) {
      getShopAnalytics(shop.id, shop.viewCount ?? 0, shop.whatsappClicks ?? 0).then(setAnalytics);
    }
  }, [shop]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FBF8F2] text-lg font-black">
        Loading…
      </div>
    );
  }

  if (status === "signed-out") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FBF8F2] gap-3">
        <p className="text-lg font-black">You need to sign in first.</p>
        <Link to="/owner/login" className="text-sm font-bold underline">Go to login</Link>
      </div>
    );
  }

  if (status === "no-shop") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FBF8F2] gap-3 px-6 text-center">
        <p className="text-lg font-black">No shop is linked to this account yet.</p>
        <p className="text-sm text-gray-500 max-w-sm">
          Ask an admin to set your account as the owner of your shop page.
        </p>
      </div>
    );
  }

  if (!shop) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FBF8F2] text-lg font-black">
        Loading your shop…
      </div>
    );
  }

  const shopLink = `${window.location.origin}/shops/${shop.slug}`;
  const waRedirectLink = `${window.location.origin}/r/${shop.slug}/whatsapp`;
  const views = shop.viewCount ?? 0;
  const clicks = shop.whatsappClicks ?? 0;
  const ctr = views > 0 ? Math.round((clicks / views) * 100) : null;

  const checklist = [
    { label: "Shop description", done: Boolean(shop.description?.trim()), icon: <FileText size={14} /> },
    { label: "Short description", done: Boolean(shop.shortDescription?.trim()), icon: <FileText size={14} /> },
    { label: "At least one photo", done: (shop.photos?.length ?? 0) > 0, icon: <ImageIcon size={14} /> },
    { label: "Address", done: Boolean(shop.address?.trim()), icon: <MapPin size={14} /> },
    { label: "Phone number", done: Boolean(shop.phone?.trim()), icon: <Phone size={14} /> },
  ];
  const completedCount = checklist.filter((c) => c.done).length;

  function handleCopy() {
    navigator.clipboard.writeText(shopLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="min-h-screen bg-[#FBF8F2]">
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-xs font-black uppercase tracking-wider text-gray-400 mb-1">Dashboard</p>
            <h1 className="text-3xl font-black tracking-tight">{shop.name}</h1>
          </div>
          <button
            onClick={() => signOut(auth)}
            className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-black transition"
          >
            <LogOut size={14} /> Sign out
          </button>
        </div>

        {/* Publish status */}
        <div className="mb-8">
          {shop.published ? (
            <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-700 text-xs font-black px-3 py-1.5 rounded-full">
              Live — visible to customers
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-700 text-xs font-black px-3 py-1.5 rounded-full">
              Draft — not visible yet. Ask the admin to publish it.
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          <StatCard icon={<Eye size={18} />} label="Page views" value={views} color="#FF6A1A" bg="#FFF1E6" />
          <StatCard icon={<MessageCircle size={18} />} label="WhatsApp clicks" value={clicks} color="#1FAE59" bg="#E7F8EE" />
          <StatCard
            icon={<Percent size={18} />}
            label="Click-through rate"
            value={ctr === null ? "—" : `${ctr}%`}
            color="#3B82F6"
            bg="#EAF2FE"
          />
        </div>

        {/* This week vs last week */}
        {analytics && (
          <div className="mb-8">
            <h2 className="text-xs font-black uppercase tracking-wider text-gray-400 mb-4">This week vs last week</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ComparisonCard
                label="Page views"
                icon={<Eye size={16} />}
                current={analytics.thisWeek.views}
                previous={analytics.lastWeek.views}
              />
              <ComparisonCard
                label="WhatsApp clicks"
                icon={<MessageCircle size={16} />}
                current={analytics.thisWeek.whatsappClicks}
                previous={analytics.lastWeek.whatsappClicks}
              />
            </div>
          </div>
        )}

        {/* Shop link */}
        <div className="bg-white border border-black/5 rounded-3xl p-6 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.1)] mb-6">
          <h2 className="text-xs font-black uppercase tracking-wider text-gray-400 mb-3">Your shop page</h2>
          <div className="flex items-center gap-2">
            <div className="flex-1 truncate bg-gray-50 border border-black/5 rounded-xl px-4 py-2.5 text-sm font-mono text-gray-700">
              {shopLink}
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-sm font-bold px-4 py-2.5 rounded-xl bg-black text-white hover:bg-gray-800 transition shrink-0"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? "Copied" : "Copy"}
            </button>
            <a
              href={shopLink}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl border border-black/10 hover:bg-gray-50 transition shrink-0"
            >
              <ExternalLink size={16} />
            </a>
          </div>
        </div>

        {/* WhatsApp QR */}
        <div className="bg-white border border-black/5 rounded-3xl p-6 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.1)] mb-6 flex flex-col sm:flex-row items-center gap-6">
          <div className="bg-white p-3 rounded-2xl border border-black/10 shrink-0">
            <QRCodeSVG value={waRedirectLink} size={120} fgColor="#0a0a0a" bgColor="#ffffff" />
          </div>
          <div>
            <h2 className="text-xs font-black uppercase tracking-wider text-gray-400 mb-2">WhatsApp QR code</h2>
            <p className="text-sm text-gray-600">
              Print this on flyers, receipts, or your storefront. Every scan counts toward your
              WhatsApp clicks above.
            </p>
          </div>
        </div>

        {/* Profile completeness */}
        <div className="bg-white border border-black/5 rounded-3xl p-6 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.1)] mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-black uppercase tracking-wider text-gray-400">Page completeness</h2>
            <span className="text-xs font-bold text-gray-400">{completedCount}/{checklist.length}</span>
          </div>
          <div className="space-y-2.5">
            {checklist.map((item) => (
              <div key={item.label} className="flex items-center gap-3 text-sm">
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                    item.done ? "bg-emerald-100 text-emerald-600" : "bg-gray-100 text-gray-300"
                  }`}
                >
                  {item.done ? <Check size={13} /> : item.icon}
                </span>
                <span className={item.done ? "text-gray-700" : "text-gray-400"}>{item.label}</span>
              </div>
            ))}
          </div>
          {completedCount < checklist.length && (
            <p className="text-xs text-gray-400 mt-4">
              Ask the admin to fill in the missing details — a complete page tends to get more engagement.
            </p>
          )}
        </div>

        {/* Shop details */}
        <div className="bg-white border border-black/5 rounded-3xl p-6 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.1)]">
          <h2 className="text-xs font-black uppercase tracking-wider text-gray-400 mb-4">Listed details</h2>
          <dl className="space-y-3 text-sm">
            <Row label="Category" value={shop.category || "—"} />
            <Row label="Phone" value={shop.phone || "—"} />
            <Row label="Address" value={shop.address || "—"} />
          </dl>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon, label, value, color, bg,
}: { icon: React.ReactNode; label: string; value: number | string; color: string; bg: string }) {
  return (
    <div className="bg-white border border-black/5 rounded-3xl p-6 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.1)]">
      <span className="w-10 h-10 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: bg, color }}>
        {icon}
      </span>
      <p className="text-3xl font-black tracking-tight">
        {typeof value === "number" ? value.toLocaleString() : value}
      </p>
      <p className="text-sm text-gray-500 mt-1">{label}</p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-gray-400">{label}</dt>
      <dd className="font-bold text-gray-700">{value}</dd>
    </div>
  );
}

function ComparisonCard({
  label, icon, current, previous,
}: { label: string; icon: React.ReactNode; current: number; previous: number }) {
  const diff = current - previous;
  const pct = previous === 0 ? (current > 0 ? 100 : 0) : Math.round((diff / previous) * 100);
  const trend = diff > 0 ? "up" : diff < 0 ? "down" : "flat";

  const trendColor = trend === "up" ? "text-emerald-600" : trend === "down" ? "text-red-500" : "text-gray-400";
  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;

  const maxBar = Math.max(current, previous, 1);

  return (
    <div className="bg-white border border-black/5 rounded-3xl p-6 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.1)]">
      <div className="flex items-center justify-between mb-4">
        <span className="flex items-center gap-2 text-sm font-black text-gray-700">
          {icon} {label}
        </span>
        <span className={`flex items-center gap-1 text-xs font-black ${trendColor}`}>
          <TrendIcon size={13} />
          {previous === 0 && current === 0 ? "—" : `${pct > 0 ? "+" : ""}${pct}%`}
        </span>
      </div>
      <div className="space-y-2.5">
        <BarRow label="This week" value={current} max={maxBar} color="#0A0A0A" />
        <BarRow label="Last week" value={previous} max={maxBar} color="#D8D3C8" />
      </div>
    </div>
  );
}

function BarRow({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const widthPct = Math.max((value / max) * 100, value > 0 ? 4 : 0);
  return (
    <div>
      <div className="flex items-baseline justify-between text-xs text-gray-500 mb-1">
        <span>{label}</span>
        <span className="font-bold text-gray-700">{value.toLocaleString()}</span>
      </div>
      <div className="h-2 rounded-full bg-black/5 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${widthPct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}