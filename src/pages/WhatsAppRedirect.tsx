import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getShopBySlug, incrementWhatsappClicks, normalizePhone } from "@/services/shopService";

export default function WhatsAppRedirect() {
  const { slug } = useParams();
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;

    (async () => {
      const shop = await getShopBySlug(slug);
      if (!shop) {
        setNotFound(true);
        return;
      }
      await incrementWhatsappClicks(shop.id).catch(() => {});
      window.location.replace(`https://wa.me/${normalizePhone(shop.phone)}`);
    })();
  }, [slug]);

  if (notFound) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-bold">Shop not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg font-bold">Redirecting to WhatsApp…</p>
    </div>
  );
}