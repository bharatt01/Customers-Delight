import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { daysAgoKey } from "../utils/datekey";

export interface ShopAnalytics {
  totalViews: number;
  totalWhatsappClicks: number;
  thisWeek: { views: number; whatsappClicks: number };
  lastWeek: { views: number; whatsappClicks: number };
}

export async function getShopAnalytics(shopId: string, totalViews: number, totalWhatsappClicks: number): Promise<ShopAnalytics> {
  const q = query(
    collection(db, "shops", shopId, "dailyStats"),
    orderBy("__name__", "desc"),
    limit(14) // last 14 daily buckets covers this week + last week
  );
  const snap = await getDocs(q);

  const todayCutoff = daysAgoKey(7);   // 7 days ago and later = "this week"
  const weekAgoCutoff = daysAgoKey(14); // 8–14 days ago = "last week"

  let thisWeek = { views: 0, whatsappClicks: 0 };
  let lastWeek = { views: 0, whatsappClicks: 0 };

  snap.docs.forEach((d) => {
    const data = d.data();
    const views = data.views ?? 0;
    const clicks = data.whatsappClicks ?? 0;

    if (d.id >= todayCutoff) {
      thisWeek.views += views;
      thisWeek.whatsappClicks += clicks;
    } else if (d.id >= weekAgoCutoff) {
      lastWeek.views += views;
      lastWeek.whatsappClicks += clicks;
    }
  });

  return { totalViews, totalWhatsappClicks, thisWeek, lastWeek };
}