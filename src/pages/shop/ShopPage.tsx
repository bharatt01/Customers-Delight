import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { Phone, MapPin, Navigation, ArrowLeft, MessageCircle } from "lucide-react";
import { getShopBySlug, incrementShopViews, normalizePhone } from "./../../services/shopService";
import { Shop } from "@/types/shop";

export default function ShopPage() {
  const { slug } = useParams();
  const [shop, setShop] = useState<Shop | null | undefined>(undefined);

  useEffect(() => {
    if (shop) {
      incrementShopViews(shop.id).catch(() => {});
    }
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

  const phone = normalizePhone(shop.phone);
  const waRedirectLink = `${window.location.origin}/r/${shop.slug}/whatsapp`;
  const mapQuery = shop.lat && shop.lng ? `${shop.lat},${shop.lng}` : encodeURIComponent(shop.address);
  const mapEmbedSrc = `https://www.google.com/maps?q=${mapQuery}&z=15&output=embed`;
  const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`;
  const heroPhoto = shop.coverImage || shop.photos?.[0];

  return (
    <div className="min-h-screen bg-[#f7f7f5]">
      {/* Hero */}
      <div className="relative h-[46vh] min-h-[320px] bg-black overflow-hidden">
        {heroPhoto && (
          <img src={heroPhoto} alt={shop.name} className="absolute inset-0 w-full h-full object-cover opacity-80" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/10" />
        <Link
          to="/"
          className="absolute top-6 left-6 flex items-center gap-2 bg-white/90 backdrop-blur px-4 py-2 rounded-full text-sm font-bold hover:bg-white transition z-10"
        >
          <ArrowLeft size={16} /> Back
        </Link>
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 pb-14">
          <div className="max-w-5xl mx-auto">
            {shop.category && (
              <span className="inline-block bg-white text-black text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full mb-3">
                {shop.category}
              </span>
            )}
            <h1 className="text-4xl md:text-6xl font-black text-white leading-none tracking-tight">
              {shop.name}
            </h1>
            {shop.shortDescription && (
              <p className="text-white/80 text-lg mt-3 max-w-xl">{shop.shortDescription}</p>
            )}
          </div>
        </div>
      </div>

      {/* Boarding-pass QR band — the page's signature element, front and center */}
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="relative -mt-10 md:-mt-12 z-10 bg-white rounded-[28px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.35)] border border-black/5 overflow-hidden">
          <div className="flex flex-col sm:flex-row items-stretch">
            {/* QR stub */}
            <div className="flex flex-col items-center justify-center gap-3 px-8 py-8 sm:w-64 shrink-0 bg-black text-white relative">
              <div className="bg-white p-2.5 rounded-2xl">
                <QRCodeSVG value={waRedirectLink} size={116} fgColor="#0a0a0a" bgColor="#ffffff" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-wider text-white/70 text-center">
                Scan to chat on WhatsApp
              </span>
              {/* perforation notches, horizontal ticket tear */}
              <div className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#f7f7f5]" />
            </div>

            {/* dashed tear line */}
            <div className="hidden sm:block w-0 border-l-2 border-dashed border-black/10 my-6" />
            <div className="sm:hidden h-0 border-t-2 border-dashed border-black/10 mx-6" />

            {/* Info + actions */}
            <div className="flex-1 flex flex-col sm:flex-row items-center justify-between gap-6 px-8 py-8">
              <div className="text-center sm:text-left">
                <span className="flex items-center justify-center sm:justify-start gap-2 text-xs font-black uppercase tracking-wider text-gray-400 mb-2">
                  <MessageCircle size={14} className="text-[#25D366]" /> Fastest way to reach us
                </span>
                <p className="text-2xl font-black tracking-tight">{shop.name}</p>
                <p className="text-sm text-gray-500 mt-1">{shop.phone}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <a
                  href={waRedirectLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold text-sm py-3 px-6 rounded-xl hover:brightness-95 transition whitespace-nowrap"
                >
                  <MessageCircle size={16} /> Open WhatsApp
                </a>
                <a
                  href={`tel:${phone}`}
                  className="flex items-center justify-center gap-2 bg-black text-white font-bold text-sm py-3 px-6 rounded-xl hover:bg-gray-800 transition whitespace-nowrap"
                >
                  <Phone size={16} /> Call
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-14 grid grid-cols-1 md:grid-cols-[1fr_320px] gap-12">
        {/* Left: description + gallery */}
        <div>
          {shop.description && (
            <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line mb-10">
              {shop.description}
            </p>
          )}

          {shop.photos && shop.photos.length > 0 && (
            <div>
              <h2 className="text-xs font-black uppercase tracking-wider text-gray-400 mb-4">Photos</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {shop.photos.map((url, i) => (
                  <img
                    key={url}
                    src={url}
                    alt={`${shop.name} photo ${i + 1}`}
                    className="w-full aspect-square object-cover rounded-2xl"
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: location rail */}
        <div className="space-y-6">
          <div className="bg-white border border-black/10 rounded-3xl p-6 space-y-4">
            <div className="flex items-start gap-3">
              <span className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                <MapPin size={16} />
              </span>
              <p className="text-sm text-gray-700 pt-2 leading-snug">{shop.address}</p>
            </div>
            <a
              href={directionsHref}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-black text-white font-bold text-sm py-3 rounded-xl hover:bg-gray-800 transition"
            >
              <Navigation size={14} /> Get directions
            </a>
          </div>

          <div className="bg-white rounded-3xl overflow-hidden border border-black/10 h-52">
            <iframe
              title="Shop location"
              src={mapEmbedSrc}
              className="w-full h-full border-0"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
}