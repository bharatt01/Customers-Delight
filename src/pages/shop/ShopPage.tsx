import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import {
  Phone, MapPin, Navigation, ArrowLeft, MessageCircle,
  Percent, Wallet, Sparkles, Gift, Bell, Star,
} from "lucide-react";
import { getShopBySlug, incrementShopViews, normalizePhone } from "./../../services/shopService";
import { Shop } from "@/types/shop";
import { getTheme, PerkIcon, ShopTheme } from "./ShopTheme";

const ICONS: Record<PerkIcon, typeof Percent> = {
  percent: Percent,
  wallet: Wallet,
  sparkles: Sparkles,
  gift: Gift,
  bell: Bell,
};

// Scrolling offer strip + WhatsApp button pulse. Both switch off for people who
// have "reduce motion" enabled.
const ANIMATIONS = `
@keyframes shop-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
@keyframes shop-pulse { 0% { box-shadow: 0 0 0 0 rgba(37,211,102,.6); } 70% { box-shadow: 0 0 0 14px rgba(37,211,102,0); } 100% { box-shadow: 0 0 0 0 rgba(37,211,102,0); } }
.shop-marquee { animation: shop-marquee 26s linear infinite; }
.shop-pulse { animation: shop-pulse 2.2s ease-out infinite; }
@media (prefers-reduced-motion: reduce) { .shop-marquee, .shop-pulse { animation: none; } }
`;

export default function ShopPage() {
  const { slug } = useParams();
  const [shop, setShop] = useState<Shop | null | undefined>(undefined);

  const theme = getTheme((shop as any)?.theme);

  useEffect(() => {
    const id = `shop-font-${theme.id}`;
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = theme.fontsHref;
    document.head.appendChild(link);
  }, [theme.id, theme.fontsHref]);

  useEffect(() => {
    if (shop) incrementShopViews(shop.id).catch(() => {});
  }, [shop?.id]);

  useEffect(() => {
    if (!slug) return;
    getShopBySlug(slug).then(setShop);
  }, [slug]);

  if (shop === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-2xl font-black">Loading...</div>
      </div>
    );
  }

  if (shop === null) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white gap-4">
        <p className="text-2xl font-black">Shop not found</p>
        <Link to="/" className="text-sm font-bold underline">Back home</Link>
      </div>
    );
  }

  const c = theme.colors;
  const hard = theme.cardStyle === "hard";
  const phone = normalizePhone(shop.phone);
  const waRedirectLink = `${window.location.origin}/r/${shop.slug}/whatsapp`;
  const mapQuery = shop.lat && shop.lng ? `${shop.lat},${shop.lng}` : encodeURIComponent(shop.address);
  const mapEmbedSrc = `https://www.google.com/maps?q=${mapQuery}&z=15&output=embed`;
  const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`;
  const heroPhoto = shop.coverImage || shop.photos?.[0];

  // Surface cards: soft shadow normally, thick outline + offset shadow on "hard" themes.
  const cardChrome: CSSProperties = hard
    ? { border: `2px solid ${c.ink}`, boxShadow: `5px 5px 0 ${c.ink}` }
    : { border: `1px solid ${c.border}`, boxShadow: "0 10px 30px -18px rgba(0,0,0,0.35)" };

  const waButton = (extra = "") => (
    <a
      href={waRedirectLink}
      target="_blank"
      rel="noreferrer"
      className={`shop-pulse flex items-center justify-center gap-2 font-extrabold text-[15px] py-3.5 px-6 text-white hover:brightness-95 transition whitespace-nowrap ${extra}`}
      style={{ background: "#25D366", borderRadius: theme.radius.button }}
    >
      <MessageCircle size={18} /> {theme.cta}
    </a>
  );

  return (
    <div
      className="min-h-screen pb-24 md:pb-0"
      style={{ background: c.page, color: c.ink, fontFamily: theme.bodyFont }}
    >
      <style>{ANIMATIONS}</style>

      <Hero shop={shop} theme={theme} photo={heroPhoto} />
      <Ticker theme={theme} />

      {/* WhatsApp offer card */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 mt-10">
        <div
          className="relative overflow-hidden"
          style={{
            background: c.offerBg,
            color: c.offerInk,
            borderRadius: theme.radius.card,
            boxShadow: hard ? `6px 6px 0 ${c.accent}` : "0 28px 60px -22px rgba(0,0,0,0.5)",
          }}
        >
          {/* soft glow circles for depth */}
          <span className="absolute -top-16 -right-16 w-56 h-56 rounded-full opacity-25" style={{ background: c.accent }} />
          <span className="absolute -bottom-20 -left-10 w-48 h-48 rounded-full opacity-10" style={{ background: c.offerInk }} />

          <div className="relative grid md:grid-cols-[1fr_auto] gap-8 items-center p-7 md:p-10">
            <div>
              <span
                className="inline-flex items-center gap-1.5 text-xs font-extrabold px-3 py-1.5 mb-4 -rotate-2"
                style={{ background: c.accent, color: c.accentInk, borderRadius: "999px" }}
              >
                <Star size={12} fill="currentColor" /> {theme.sticker}
              </span>
              <h2
                className="text-3xl md:text-5xl"
                style={{ fontFamily: theme.headingFont, ...theme.headingStyle, textTransform: "none", lineHeight: 1.08 }}
              >
                {theme.offerTitle}
              </h2>
              <p className="mt-3 text-base max-w-lg" style={{ opacity: 0.85 }}>
                {theme.offerText}
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                {waButton()}
                <a
                  href={`tel:${phone}`}
                  className="flex items-center justify-center gap-2 font-bold text-sm py-3.5 px-6 border-2 transition hover:bg-white/10 whitespace-nowrap"
                  style={{ borderColor: "rgba(255,255,255,0.4)", borderRadius: theme.radius.button }}
                >
                  <Phone size={16} /> Call {shop.phone}
                </a>
              </div>
            </div>

            <div className="flex md:flex-col items-center gap-4">
              <div
                className="p-3 bg-white rotate-3"
                style={{ borderRadius: "20px", boxShadow: `0 0 0 4px ${c.accent}` }}
              >
                <QRCodeSVG value={waRedirectLink} size={124} fgColor="#0a0a0a" bgColor="#ffffff" />
              </div>
              <p className="text-xs max-w-[9rem] md:text-center font-semibold" style={{ opacity: 0.8 }}>
                Scan to open WhatsApp
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Perks — each card has its own colour */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 mt-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          {theme.perks.map((perk, i) => {
            const Icon = ICONS[perk.icon];
            const tint = theme.perkTints[i % theme.perkTints.length];
            return (
              <div
                key={perk.title}
                className="p-4 md:p-5"
                style={{
                  background: tint.bg,
                  color: tint.ink,
                  borderRadius: theme.radius.card,
                  ...(hard
                    ? { border: `2px solid ${c.ink}`, boxShadow: `5px 5px 0 ${c.ink}` }
                    : { border: `1px solid ${tint.chip}33` }),
                }}
              >
                <span
                  className="w-11 h-11 flex items-center justify-center mb-3"
                  style={{ background: tint.chip, color: tint.chipInk, borderRadius: "999px" }}
                >
                  <Icon size={19} />
                </span>
                <p className="font-extrabold text-[15px] leading-snug">{perk.title}</p>
                <p className="text-[13px] mt-1 leading-snug" style={{ opacity: 0.8 }}>{perk.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Body */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-14 grid grid-cols-1 md:grid-cols-[1fr_320px] gap-12">
        <div>
          {shop.description && (
            <p
              className="text-lg leading-relaxed whitespace-pre-line mb-10 max-w-prose pl-5"
              style={{ borderLeft: `5px solid ${c.accent}`, opacity: 0.9 }}
            >
              {shop.description}
            </p>
          )}

          {shop.photos && shop.photos.length > 0 && (
            <div>
              <h2
                className="text-3xl"
                style={{ fontFamily: theme.headingFont, ...theme.headingStyle, textTransform: "none" }}
              >
                {theme.galleryTitle}
              </h2>
              <span className="block h-1.5 w-16 mt-2 mb-5 rounded-full" style={{ background: c.heroBg }} />
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {shop.photos.map((url, i) => (
                  <img
                    key={url}
                    src={url}
                    alt={`${shop.name} photo ${i + 1}`}
                    className="w-full aspect-square object-cover"
                    style={{ borderRadius: theme.radius.card, ...(hard ? { border: `2px solid ${c.ink}` } : {}) }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <aside className="space-y-5">
          <div className="p-6 space-y-4" style={{ background: c.surface, borderRadius: theme.radius.card, ...cardChrome }}>
            <div className="flex items-start gap-3">
              <span
                className="w-10 h-10 flex items-center justify-center shrink-0"
                style={{ background: c.heroBg, color: c.heroInk, borderRadius: "999px" }}
              >
                <MapPin size={16} />
              </span>
              <p className="text-sm pt-2 leading-snug">{shop.address}</p>
            </div>
            <a
              href={directionsHref}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 w-full font-bold text-sm py-3 hover:opacity-90 transition"
              style={{ background: c.heroBg, color: c.heroInk, borderRadius: theme.radius.button }}
            >
              <Navigation size={14} /> Get directions
            </a>
          </div>

          <div className="overflow-hidden h-52" style={{ borderRadius: theme.radius.card, ...cardChrome }}>
            <iframe title="Shop location" src={mapEmbedSrc} className="w-full h-full border-0" loading="lazy" />
          </div>
        </aside>
      </section>

      {/* Mobile: WhatsApp stays one tap away */}
      <div
        className="md:hidden fixed bottom-0 inset-x-0 z-30 p-3 border-t"
        style={{ background: c.page, borderColor: c.border }}
      >
        {waButton("w-full")}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function Ticker({ theme }: { theme: ShopTheme }) {
  const c = theme.colors;
  // Two identical halves so the -50% scroll loops without a jump.
  const half = [...theme.ticker, ...theme.ticker];
  const items = [...half, ...half];
  return (
    <div
      className="overflow-hidden"
      style={{
        background: c.accent,
        color: c.accentInk,
        ...(theme.cardStyle === "hard" ? { borderTop: `2px solid ${c.ink}`, borderBottom: `2px solid ${c.ink}` } : {}),
      }}
      aria-label={theme.ticker.join(", ")}
    >
      <div className="shop-marquee flex w-max" aria-hidden>
        {items.map((t, i) => (
          <span key={i} className="flex items-center gap-3 px-5 py-2.5 text-sm font-extrabold whitespace-nowrap">
            <Sparkles size={14} /> {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function BackLink() {
  return (
    <Link
      to="/"
      className="absolute top-5 left-5 md:top-6 md:left-8 flex items-center gap-2 px-4 py-2 text-sm font-bold z-20 backdrop-blur hover:brightness-105 transition"
      style={{ background: "rgba(255,255,255,0.92)", color: "#111", borderRadius: "999px" }}
    >
      <ArrowLeft size={16} /> Back
    </Link>
  );
}

function PatternLayer({ theme }: { theme: ShopTheme }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ backgroundImage: theme.pattern.image, backgroundSize: theme.pattern.size }}
    />
  );
}

function Hero({ shop, theme, photo }: { shop: Shop; theme: ShopTheme; photo?: string }) {
  const c = theme.colors;
  const title = (
    <h1
      className="text-5xl md:text-7xl break-words"
      style={{ fontFamily: theme.headingFont, lineHeight: 1.02, ...theme.headingStyle }}
    >
      {shop.name}
    </h1>
  );
  const category = shop.category && (
    <span
      className="inline-block text-sm font-extrabold px-3.5 py-1 mb-4"
      style={{ background: c.accent, color: c.accentInk, borderRadius: "999px" }}
    >
      {shop.category}
    </span>
  );
  const short = shop.shortDescription && (
    <p className="text-lg mt-4 max-w-md" style={{ opacity: 0.9 }}>{shop.shortDescription}</p>
  );

  // Modern Bright: photo under a colour wash, name bottom-left
  if (theme.hero === "overlay") {
    return (
      <div className="relative h-[54vh] min-h-[380px] overflow-hidden" style={{ background: c.heroBg, color: c.heroInk }}>
        {photo && (
          <img src={photo} alt={shop.name} className="absolute inset-0 w-full h-full object-cover mix-blend-soft-light opacity-90" />
        )}
        <PatternLayer theme={theme} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <BackLink />
        <div className="absolute bottom-0 inset-x-0 px-6 md:px-12 pb-12">
          <div className="max-w-5xl mx-auto">
            {category}
            {title}
            {short}
          </div>
        </div>
      </div>
    );
  }

  // Saree: arched photo with a gold offset outline
  if (theme.hero === "arch") {
    return (
      <div className="relative overflow-hidden pt-24 pb-14 px-6 md:px-12" style={{ background: c.heroBg, color: c.heroInk }}>
        <PatternLayer theme={theme} />
        <BackLink />
        <div className="relative max-w-5xl mx-auto grid md:grid-cols-[1.2fr_1fr] gap-10 items-center">
          <div>
            {category}
            {title}
            {short}
          </div>
          <div className="relative mx-auto w-64 md:w-full max-w-xs">
            <div
              className="absolute inset-0 translate-x-3 translate-y-3 border-2"
              style={{ borderColor: c.accent, borderRadius: "999px 999px 24px 24px" }}
            />
            <div
              className="relative aspect-[4/5] overflow-hidden"
              style={{ borderRadius: "999px 999px 24px 24px", background: "rgba(255,255,255,0.12)" }}
            >
              {photo && <img src={photo} alt={shop.name} className="w-full h-full object-cover" />}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Shoes: stripes, giant italic name, slanted photo
  if (theme.hero === "slant") {
    return (
      <div className="relative overflow-hidden pt-24 pb-14 px-6 md:px-12" style={{ background: c.heroBg, color: c.heroInk }}>
        <PatternLayer theme={theme} />
        <BackLink />
        <div className="relative max-w-5xl mx-auto grid md:grid-cols-[1.1fr_1fr] gap-8 items-center">
          <div>
            <span
              className="inline-block text-sm font-extrabold px-3 py-1 mb-4 -rotate-2"
              style={{ background: c.heroInk, color: c.accent, borderRadius: "6px" }}
            >
              {shop.category || "Footwear"}
            </span>
            <h1
              className="text-6xl md:text-8xl break-words"
              style={{ fontFamily: theme.headingFont, ...theme.headingStyle }}
            >
              {shop.name}
            </h1>
            {shop.shortDescription && (
              <p className="text-lg mt-5 max-w-sm font-bold">{shop.shortDescription}</p>
            )}
          </div>
          <div className="relative">
            <div
              className="absolute inset-0 translate-x-3 translate-y-3"
              style={{ background: c.heroInk, clipPath: "polygon(14% 0, 100% 0, 100% 100%, 0 100%)" }}
            />
            <div
              className="relative h-64 md:h-96 bg-white/40"
              style={{ clipPath: "polygon(14% 0, 100% 0, 100% 100%, 0 100%)" }}
            >
              {photo && <img src={photo} alt={shop.name} className="w-full h-full object-cover" />}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Jewellery: sparkle texture, oval photo with gold ring
  return (
    <div className="relative overflow-hidden pt-24 pb-14 px-6 text-center" style={{ background: c.heroBg, color: c.heroInk }}>
      <PatternLayer theme={theme} />
      <BackLink />
      <div className="relative max-w-2xl mx-auto flex flex-col items-center">
        <div
          className="w-44 h-56 md:w-52 md:h-64 mb-8 p-1.5 border-2"
          style={{ borderColor: c.accent, borderRadius: "50%", boxShadow: `0 0 0 8px rgba(224,184,101,0.18)` }}
        >
          <div className="w-full h-full overflow-hidden bg-white/10" style={{ borderRadius: "50%" }}>
            {photo && <img src={photo} alt={shop.name} className="w-full h-full object-cover" />}
          </div>
        </div>
        {category}
        {title}
        {short}
      </div>
    </div>
  );
}