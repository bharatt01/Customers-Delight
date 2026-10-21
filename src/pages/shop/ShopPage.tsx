import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import {
  Phone, MapPin, Navigation, ArrowLeft, MessageCircle,
  Percent, Wallet, Sparkles, Gift, Bell, Star,
  ZoomIn, X, ChevronLeft, ChevronRight,
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
// .hero-img takes its height from the theme (--hero-h on mobile, --hero-h-md from md up).
const ANIMATIONS = `
@keyframes shop-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
@keyframes shop-pulse { 0% { box-shadow: 0 0 0 0 rgba(37,211,102,.6); } 70% { box-shadow: 0 0 0 14px rgba(37,211,102,0); } 100% { box-shadow: 0 0 0 0 rgba(37,211,102,0); } }
.shop-marquee { animation: shop-marquee 26s linear infinite; }
.shop-pulse { animation: shop-pulse 2.2s ease-out infinite; }
.hero-img { height: var(--hero-h); }
@media (min-width: 768px) { .hero-img { height: var(--hero-h-md); } }
@media (prefers-reduced-motion: reduce) { .shop-marquee, .shop-pulse { animation: none; } }
`;

export default function ShopPage() {
  const { slug } = useParams();
  const [shop, setShop] = useState<Shop | null | undefined>(undefined);
  const [lightbox, setLightbox] = useState<number | null>(null); // index in allPhotos

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
  // Everything the viewer can step through: shop-front photo first, then the gallery.
  const allPhotos = Array.from(new Set([heroPhoto, ...(shop.photos ?? [])].filter(Boolean) as string[]));
  const openPhoto = (url?: string) => {
    if (!url) return;
    const i = allPhotos.indexOf(url);
    if (i >= 0) setLightbox(i);
  };

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

      <Hero shop={shop} theme={theme} photo={heroPhoto} onOpen={() => openPhoto(heroPhoto)} />
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
                className="p-3 bg-white"
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
                  <button
                    key={url}
                    type="button"
                    onClick={() => openPhoto(url)}
                    aria-label={`View ${shop.name} photo ${i + 1} larger`}
                    className="group relative block w-full aspect-square overflow-hidden cursor-zoom-in focus:outline-none focus-visible:ring-4"
                    style={{ borderRadius: theme.radius.card, ...(hard ? { border: `2px solid ${c.ink}` } : {}) }}
                  >
                    <img
                      src={url}
                      alt={`${shop.name} photo ${i + 1}`}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <span className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
                    <span
                      className="absolute bottom-2 right-2 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 text-black shadow opacity-90 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                      aria-hidden
                    >
                      <ZoomIn size={16} />
                    </span>
                  </button>
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

      {lightbox !== null && (
        <Lightbox
          images={allPhotos}
          index={lightbox}
          name={shop.name}
          onChange={setLightbox}
          onClose={() => setLightbox(null)}
        />
      )}
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

/* Full-screen photo viewer: tap a photo to enlarge. Esc closes, arrow keys / swipe / buttons move. */
function Lightbox({
  images, index, name, onChange, onClose,
}: {
  images: string[];
  index: number;
  name: string;
  onChange: (i: number) => void;
  onClose: () => void;
}) {
  const touchX = useRef<number | null>(null);
  const count = images.length;
  const prev = () => onChange((index - 1 + count) % count);
  const next = () => onChange((index + 1) % count);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onChange((index - 1 + count) % count);
      if (e.key === "ArrowRight") onChange((index + 1) % count);
    };
    window.addEventListener("keydown", onKey);
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden"; // page behind doesn't scroll
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = old;
    };
  }, [index, count, onChange, onClose]);

  const btn =
    "absolute z-10 w-11 h-11 flex items-center justify-center rounded-full bg-white/15 hover:bg-white/30 text-white backdrop-blur transition";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`${name} photos`}
      onClick={onClose}
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touchX.current === null || count < 2) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 50) (dx > 0 ? prev : next)();
      }}
    >
      <button type="button" aria-label="Close" className={`${btn} top-4 right-4`} onClick={(e) => { e.stopPropagation(); onClose(); }}>
        <X size={20} />
      </button>
      {count > 1 && (
        <span className="absolute top-5 left-5 z-10 text-sm font-bold text-white/80">
          {index + 1} / {count}
        </span>
      )}

      {count > 1 && (
        <>
          <button type="button" aria-label="Previous photo" className={`${btn} left-3 md:left-6 top-1/2 -translate-y-1/2`} onClick={(e) => { e.stopPropagation(); prev(); }}>
            <ChevronLeft size={22} />
          </button>
          <button type="button" aria-label="Next photo" className={`${btn} right-3 md:right-6 top-1/2 -translate-y-1/2`} onClick={(e) => { e.stopPropagation(); next(); }}>
            <ChevronRight size={22} />
          </button>
        </>
      )}

      <img
        src={images[index]}
        alt={`${name} photo ${index + 1}`}
        className="max-w-[92vw] max-h-[78vh] md:max-h-[84vh] object-contain rounded-lg shadow-2xl select-none"
        onClick={(e) => e.stopPropagation()}
        draggable={false}
      />

      {count > 1 && (
        <div
          className="absolute bottom-4 inset-x-0 flex justify-center gap-2 px-4 overflow-x-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {images.map((u, i) => (
            <button
              key={u}
              type="button"
              aria-label={`Show photo ${i + 1}`}
              onClick={() => onChange(i)}
              className="shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-md overflow-hidden transition"
              style={{ outline: i === index ? "2px solid #fff" : "2px solid transparent", opacity: i === index ? 1 : 0.55 }}
            >
              <img src={u} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* Photo that fills its frame. With fit="contain" the whole picture is always visible:
   a blurred copy fills any spare space so it never looks like empty bars. */
function HeroPhoto({ photo, alt, fit }: { photo?: string; alt: string; fit: "cover" | "contain" }) {
  if (!photo) return null;
  return (
    <>
      {fit === "contain" && (
        <img
          src={photo}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover scale-125 blur-2xl opacity-70"
        />
      )}
      <img
        src={photo}
        alt={alt}
        className="relative w-full h-full"
        style={{ objectFit: fit, objectPosition: "center" }}
      />
    </>
  );
}

/* Hero: the shop-front photo is the star. One wide framed photo, name written over a soft
   shadow at its bottom edge. The frame shape changes per theme; tapping it opens the viewer. */
function Hero({
  shop, theme, photo, onOpen,
}: {
  shop: Shop;
  theme: ShopTheme;
  photo?: string;
  onOpen: () => void;
}) {
  const c = theme.colors;
  const fit = theme.heroImage.fit;
  const variant = theme.hero;
  const centered = variant === "centered";

  const sizeVars = {
    "--hero-h": theme.heroImage.height,
    "--hero-h-md": theme.heroImage.heightMd,
  } as CSSProperties;

  // Frame look per theme
  let frame: CSSProperties;
  if (variant === "arch") {
    frame = { borderRadius: "240px 240px 28px 28px", boxShadow: "0 30px 60px -25px rgba(0,0,0,0.6)" };
  } else if (variant === "slant") {
    frame = { borderRadius: theme.radius.card, border: `3px solid ${c.ink}`, boxShadow: `10px 10px 0 ${c.ink}` };
  } else if (variant === "centered") {
    frame = {
      borderRadius: "22px",
      border: `2px solid ${c.accent}`,
      boxShadow: "0 0 0 8px rgba(224,184,101,0.18), 0 30px 60px -25px rgba(0,0,0,0.6)",
    };
  } else {
    frame = {
      borderRadius: theme.radius.card,
      border: "1px solid rgba(255,255,255,0.25)",
      boxShadow: "0 30px 60px -25px rgba(0,0,0,0.7)",
    };
  }

  return (
    <div
      className="relative overflow-hidden pt-20 pb-8 md:pt-24 md:pb-10 px-4 md:px-12"
      style={{ background: c.heroBg, color: c.heroInk }}
    >
      <PatternLayer theme={theme} />
      <BackLink />

      <div className="relative max-w-5xl mx-auto">
        {/* decorative layer behind the frame */}
        {variant === "arch" && (
          <div
            className="absolute inset-0 translate-x-3 translate-y-3 border-2"
            style={{ borderColor: c.accent, borderRadius: "240px 240px 28px 28px" }}
          />
        )}
        {variant === "overlay" && (
          <div className="absolute -inset-3 opacity-40 blur-2xl" style={{ background: c.accent, borderRadius: "32px" }} />
        )}

        <div
          role="button"
          tabIndex={0}
          aria-label={`View ${shop.name} photo larger`}
          onClick={onOpen}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpen(); } }}
          className="hero-img group relative w-full overflow-hidden cursor-zoom-in"
          style={{ ...sizeVars, ...frame, background: "rgba(255,255,255,0.1)" }}
        >
          <HeroPhoto photo={photo} alt={shop.name} fit={fit} />

          {/* soft shadow so the name is readable on any photo */}
          <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/75 via-black/30 to-transparent pointer-events-none" />

          {/* "View larger" hint */}
          <span
            className="absolute top-3 right-3 md:top-4 md:right-5 flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold shadow transition group-hover:scale-105"
            style={{ background: "rgba(255,255,255,0.92)", color: "#111", borderRadius: "999px" }}
          >
            <ZoomIn size={14} /> View larger
          </span>

          {/* shop name */}
          <div
            className={`absolute bottom-0 inset-x-0 p-5 md:p-9 pointer-events-none flex flex-col ${
              centered ? "items-center text-center" : "items-start text-left"
            }`}
            style={{ color: "#fff" }}
          >
            {shop.category && (
              <span
                className="inline-block text-xs md:text-sm font-extrabold px-3 py-1 mb-2 md:mb-3"
                style={{ background: c.accent, color: c.accentInk, borderRadius: variant === "slant" ? "6px" : "999px" }}
              >
                {shop.category}
              </span>
            )}
            <h1
              className="text-4xl md:text-6xl break-words"
              style={{
                fontFamily: theme.headingFont,
                lineHeight: 1.02,
                textShadow: "0 2px 18px rgba(0,0,0,0.45)",
                ...theme.headingStyle,
              }}
            >
              {shop.name}
            </h1>
            {shop.shortDescription && (
              <p className="text-sm md:text-lg mt-2 max-w-xl" style={{ opacity: 0.92 }}>
                {shop.shortDescription}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}