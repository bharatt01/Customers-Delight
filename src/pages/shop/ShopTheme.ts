import type { CSSProperties } from "react";
// src/pages/shop/ShopTheme.ts
// One entry per shop type. To add a new look, add an id to ThemeId and one
// object to SHOP_THEMES — the form picker and ShopPage pick it up automatically.

export type ThemeId = "classic" | "saree" | "shoes" | "jewellery";
export type HeroLayout = "overlay" | "arch" | "slant" | "centered" | "split";
export type PerkIcon = "percent" | "wallet" | "sparkles" | "gift" | "bell";
export type CardStyle = "soft" | "hard";

export interface Perk {
  icon: PerkIcon;
  title: string;
  text: string;
}

export interface PerkTint {
  bg: string; // card background
  ink: string; // card text
  chip: string; // icon circle background
  chipInk: string; // icon colour
}

export interface HeroImage {
  // Maximum height of the shop-front photo. The frame takes the photo's own shape (so the
  // outline hugs it) and never gets taller than this, so the whole photo fits on one screen.
  height: string; // max height on mobile
  heightMd: string; // max height on desktop (md and up)
}

export interface ShopTheme {
  id: ThemeId;
  label: string;
  blurb: string;
  fontsHref: string;
  headingFont: string;
  bodyFont: string;
  headingStyle: CSSProperties;
  hero: HeroLayout;
  heroImage: HeroImage; // size of the banner image inside the hero
  cardStyle: CardStyle;
  perkStyle: "cards" | "lines";
  radius: { card: string; button: string };
  pattern: { image: string; size: string }; // texture laid over the hero
  colors: {
    page: string;
    surface: string;
    ink: string;
    muted: string;
    border: string;
    accent: string;
    accentInk: string;
    heroBg: string; // may be a gradient
    heroInk: string;
    offerBg: string; // may be a gradient
    offerInk: string;
  };
  perkTints: PerkTint[];
  ticker: string[];
  sticker: string;
  offerTitle: string;
  offerText: string;
  cta: string;
  galleryTitle: string;
  perks: Perk[];
}

export const SHOP_THEMES: Record<ThemeId, ShopTheme> = {
  /* ---------------- Modern Navy (default, works for any shop) --------------- */
  classic: {
    id: "classic",
    label: "Modern Navy",
    blurb: "Deep navy with royal blue. Clean and professional, good for any shop.",
    fontsHref:
      "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap",
    headingFont: "'Manrope', system-ui, sans-serif",
    bodyFont: "'Manrope', system-ui, sans-serif",
    headingStyle: { fontWeight: 800, letterSpacing: "-0.035em" },
    hero: "overlay",
    heroImage: { height: "clamp(300px, 52svh, 460px)", heightMd: "clamp(380px, calc(100svh - 170px), 680px)" },
    cardStyle: "soft",
    radius: { card: "20px", button: "12px" },
    pattern: {
      image:
        "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
      size: "44px 44px",
    },
    colors: {
      page: "#f4f5f7",
      surface: "#ffffff",
      ink: "#0b1220",
      muted: "#64748b",
      border: "rgba(11,18,32,0.1)",
      accent: "#2563eb",
      accentInk: "#ffffff",
      heroBg:
        "radial-gradient(circle at 88% 0%, rgba(59,130,246,0.38) 0, transparent 46%), linear-gradient(160deg, #0b1220 0%, #111c33 60%, #172554 100%)",
      heroInk: "#ffffff",
      offerBg: "linear-gradient(135deg, #0b1220 0%, #14213d 100%)",
      offerInk: "#ffffff",
    },
    perkTints: [
      { bg: "#ffffff", ink: "#0b1220", chip: "#2563eb", chipInk: "#fff" },
      { bg: "#ffffff", ink: "#0b1220", chip: "#059669", chipInk: "#fff" },
      { bg: "#ffffff", ink: "#0b1220", chip: "#d97706", chipInk: "#fff" },
      { bg: "#ffffff", ink: "#0b1220", chip: "#7c3aed", chipInk: "#fff" },
    ],
    ticker: ["Exclusive WhatsApp deals", "Cashback on your purchase", "New arrivals first", "Member-only offers"],
    sticker: "Cashback inside",
    offerTitle: "Get exclusive deals on WhatsApp",
    offerText:
      "Send us one message and unlock cashback, early access to new stock and offers we don't post anywhere else.",
    cta: "Message us & get offers",
    galleryTitle: "Photos",
    perks: [
      { icon: "percent", title: "Exclusive deals", text: "Prices and offers only for people who message us." },
      { icon: "wallet", title: "Cashback", text: "Earn cashback on your purchase when you chat first." },
      { icon: "sparkles", title: "New arrivals first", text: "See fresh stock before it reaches the shelf." },
      { icon: "gift", title: "And much more", text: "Festive surprises, gifts and member-only offers." },
    ],
  },

  /* ------------------------------- Saree & Ethnic ------------------------------ */
  saree: {
    id: "saree",
    label: "Saree & Ethnic",
    blurb: "Magenta, plum and marigold with a woven-motif pattern.",
    fontsHref:
      "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,700;1,600&family=Mulish:wght@400;600;700&display=swap",
    headingFont: "'Cormorant Garamond', Georgia, serif",
    bodyFont: "'Mulish', system-ui, sans-serif",
    headingStyle: { fontWeight: 700, letterSpacing: "-0.01em", fontStyle: "italic" },
    hero: "arch",
    heroImage: { height: "clamp(300px, 52svh, 460px)", heightMd: "clamp(380px, calc(100svh - 170px), 680px)" },
    cardStyle: "soft",
    radius: { card: "24px", button: "999px" },
    pattern: {
      image:
        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48'%3E%3Cpath d='M24 4l8 20-8 20-8-20z' fill='none' stroke='%23f5c46b' stroke-opacity='.4' stroke-width='1.5'/%3E%3Ccircle cx='24' cy='24' r='2.5' fill='%23f5c46b' fill-opacity='.6'/%3E%3C/svg%3E\")",
      size: "48px 48px",
    },
    colors: {
      page: "#fff3ec",
      surface: "#ffffff",
      ink: "#3a0d1a",
      muted: "#8a5a5a",
      border: "rgba(142,20,80,0.15)",
      accent: "#f5b83d",
      accentInk: "#4a0d1f",
      heroBg:
        "radial-gradient(circle at 82% 12%, #e0368a 0, transparent 46%), radial-gradient(circle at 8% 92%, #f08a24 0, transparent 38%), linear-gradient(135deg, #6b0f2e 0%, #8e1450 50%, #4a0d4f 100%)",
      heroInk: "#fff3e0",
      offerBg: "linear-gradient(135deg, #4a0d4f 0%, #8e1450 60%, #c2410c 100%)",
      offerInk: "#fff3e0",
    },
    perkTints: [
      { bg: "#ffe3ec", ink: "#7a0f35", chip: "#e11d62", chipInk: "#fff" },
      { bg: "#ffefc9", ink: "#6e3d00", chip: "#f59e0b", chipInk: "#3a0d1a" },
      { bg: "#d9f6f0", ink: "#0b5e55", chip: "#0d9488", chipInk: "#fff" },
      { bg: "#f1e1ff", ink: "#58188a", chip: "#9333ea", chipInk: "#fff" },
    ],
    ticker: ["Wedding & festive offers", "Cashback on first order", "New silk weaves in", "Exclusive WhatsApp prices"],
    sticker: "Festive cashback!",
    offerTitle: "Wedding & festive offers, on WhatsApp",
    offerText:
      "Message us to get exclusive saree deals, cashback on your first order and a first look at our newest weaves.",
    cta: "Chat for saree offers",
    galleryTitle: "The collection",
    perks: [
      { icon: "percent", title: "Exclusive saree deals", text: "Special prices on silks, cottons and bridal wear." },
      { icon: "wallet", title: "Cashback on orders", text: "Get cashback when you buy after chatting with us." },
      { icon: "sparkles", title: "New weaves first", text: "Preview fresh arrivals before they go on display." },
      { icon: "gift", title: "Festive surprises", text: "Gifts and offers for Diwali, weddings and more." },
    ],
  },

  /* ------------------------------ Shoes & Sneakers ----------------------------- */
  shoes: {
    id: "shoes",
    label: "Shoes & Sneakers",
    blurb: "Hot orange, lime and sky. Stripes and hard shadows.",
    fontsHref:
      "https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,400;0,600;0,800;1,900&display=swap",
    headingFont: "'Archivo', system-ui, sans-serif",
    bodyFont: "'Archivo', system-ui, sans-serif",
    headingStyle: {
      fontWeight: 900,
      fontStyle: "italic",
      textTransform: "uppercase",
      letterSpacing: "-0.04em",
      lineHeight: 0.9,
    },
    hero: "slant",
    heroImage: { height: "clamp(300px, 52svh, 460px)", heightMd: "clamp(380px, calc(100svh - 170px), 680px)" },
    cardStyle: "hard",
    radius: { card: "14px", button: "10px" },
    pattern: {
      image: "repeating-linear-gradient(115deg, rgba(255,255,255,0.16) 0 18px, transparent 18px 36px)",
      size: "auto",
    },
    colors: {
      page: "#fffbe6",
      surface: "#ffffff",
      ink: "#14110f",
      muted: "#5f5a52",
      border: "#14110f",
      accent: "#c6ff2e",
      accentInk: "#14110f",
      heroBg: "linear-gradient(120deg, #ff3d00 0%, #ff7a00 55%, #ffc400 100%)",
      heroInk: "#14110f",
      offerBg: "#14110f",
      offerInk: "#ffffff",
    },
    perkTints: [
      { bg: "#c6ff2e", ink: "#14110f", chip: "#14110f", chipInk: "#c6ff2e" },
      { bg: "#7de3ff", ink: "#14110f", chip: "#14110f", chipInk: "#7de3ff" },
      { bg: "#ffb3d1", ink: "#14110f", chip: "#14110f", chipInk: "#ffb3d1" },
      { bg: "#ffe14d", ink: "#14110f", chip: "#14110f", chipInk: "#ffe14d" },
    ],
    ticker: ["Exclusive pair deals", "Cashback on every pair", "Fresh drops first", "WhatsApp-only offers"],
    sticker: "Cashback!",
    offerTitle: "Drop us a message. Get the deal.",
    offerText:
      "Chat on WhatsApp for exclusive pair prices, cashback on your purchase and first access to new drops.",
    cta: "Get my offer on WhatsApp",
    galleryTitle: "On the shelf",
    perks: [
      { icon: "percent", title: "Exclusive pair deals", text: "Prices you won't see on the shop floor." },
      { icon: "wallet", title: "Cashback", text: "Message first, buy later, get cashback." },
      { icon: "bell", title: "First on new drops", text: "Know when fresh pairs land in store." },
      { icon: "gift", title: "Plus more", text: "Free socks, laces and member-only offers." },
    ],
  },

  /* --------------------------------- Jewellery --------------------------------- */
  jewellery: {
    id: "jewellery",
    label: "Jewellery",
    blurb: "Emerald, gold and ruby with a sparkle texture.",
    fontsHref:
      "https://fonts.googleapis.com/css2?family=Marcellus&family=Jost:wght@400;500;600&display=swap",
    headingFont: "'Marcellus', Georgia, serif",
    bodyFont: "'Jost', system-ui, sans-serif",
    headingStyle: { fontWeight: 400, letterSpacing: "0.02em" },
    hero: "centered",
    heroImage: { height: "clamp(300px, 52svh, 460px)", heightMd: "clamp(380px, calc(100svh - 170px), 680px)" },
    cardStyle: "soft",
    radius: { card: "18px", button: "12px" },
    pattern: {
      image: "radial-gradient(rgba(240,205,120,0.55) 1.5px, transparent 2px)",
      size: "38px 38px",
    },
    colors: {
      page: "#f3f7f2",
      surface: "#ffffff",
      ink: "#06241d",
      muted: "#5a6f67",
      border: "rgba(6,36,29,0.14)",
      accent: "#e0b865",
      accentInk: "#06241d",
      heroBg:
        "radial-gradient(circle at 18% 8%, #1f7a62 0, transparent 50%), radial-gradient(circle at 92% 92%, #8a6420 0, transparent 40%), linear-gradient(135deg, #04201a 0%, #0f3d31 100%)",
      heroInk: "#f8efd6",
      offerBg: "linear-gradient(135deg, #04201a 0%, #0f3d31 55%, #8a6420 100%)",
      offerInk: "#f8efd6",
    },
    perkTints: [
      { bg: "#fdf0cf", ink: "#6b4b0c", chip: "#c9962b", chipInk: "#fff" },
      { bg: "#dff3ea", ink: "#0b4a3a", chip: "#1f8a6d", chipInk: "#fff" },
      { bg: "#fbe3e8", ink: "#7a1f35", chip: "#c2415f", chipInk: "#fff" },
      { bg: "#e4e9fb", ink: "#1f2f7a", chip: "#4a5fc9", chipInk: "#fff" },
    ],
    ticker: ["Private WhatsApp offers", "Cashback on making charges", "New designs first", "Occasion gifts"],
    sticker: "Cashback inside!",
    offerTitle: "Private offers for WhatsApp guests",
    offerText:
      "Message us for exclusive pricing, cashback on making charges and early viewing of new designs.",
    cta: "Request private offers",
    galleryTitle: "Featured pieces",
    perks: [
      { icon: "percent", title: "Exclusive pricing", text: "Special rates reserved for WhatsApp enquiries." },
      { icon: "wallet", title: "Cashback", text: "Cashback on selected purchases and making charges." },
      { icon: "sparkles", title: "Early viewing", text: "See new designs before they are shown in store." },
      { icon: "gift", title: "Occasion gifts", text: "Birthday and anniversary offers, just for you." },
    ],
  },
};

export const THEME_LIST = Object.values(SHOP_THEMES);

export function getTheme(id?: string | null): ShopTheme {
  return SHOP_THEMES[(id as ThemeId) ?? "classic"] ?? SHOP_THEMES.classic;
}