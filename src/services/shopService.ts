import {
  collection, doc, addDoc, updateDoc, deleteDoc,
  getDocs, getDoc, query, orderBy, where, serverTimestamp,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { Shop } from "@/types/shop";
import { uploadMultipleToCloudinary } from "@/services/cloudinaryService";
import { increment } from "firebase/firestore";
import { doc as fsDoc,  setDoc } from "firebase/firestore";
import { todayKey } from "../utils/datekey";

const shopsCol = collection(db, "shops");

export async function getShops(): Promise<Shop[]> {
  const q = query(shopsCol, orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Shop));
}

export async function getShop(id: string): Promise<Shop | null> {
  const snap = await getDoc(doc(db, "shops", id));
  return snap.exists() ? ({ id: snap.id, ...snap.data() } as Shop) : null;
}

export async function getShopBySlug(slug: string): Promise<Shop | null> {
  const q = query(shopsCol, where("slug", "==", slug), where("published", "==", true));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const d = snap.docs[0];
  return { id: d.id, ...d.data() } as Shop;
}

export async function createShop(data: Partial<Shop>): Promise<string> {
  const clean = Object.fromEntries(
    Object.entries({ photos: [], ...data }).filter(([, v]) => v !== undefined)
  );
  const docRef = await addDoc(shopsCol, { ...clean, createdAt: serverTimestamp() });
  return docRef.id;
}
export async function updateShop(id: string, data: Partial<Shop>): Promise<void> {
  const clean = Object.fromEntries(
    Object.entries(data).filter(([, v]) => v !== undefined)
  );
  await updateDoc(doc(db, "shops", id), clean);
}
export async function deleteShop(id: string): Promise<void> {
  await deleteDoc(doc(db, "shops", id));
}

export async function togglePublish(id: string, published: boolean): Promise<void> {
  await updateDoc(doc(db, "shops", id), { published });
}

// Uploads multiple gallery photos to Cloudinary and returns their URLs.
export async function uploadShopPhotos(shopId: string, files: File[]): Promise<string[]> {
  return uploadMultipleToCloudinary(files, `shops/${shopId}`);
}

export function slugifyName(input: string): string {
  return input.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function normalizePhone(input: string): string {
  return input.replace(/[^\d]/g, "");
}


export async function incrementShopViews(id: string): Promise<void> {
  const dailyRef = fsDoc(db, "shops", id, "dailyStats", todayKey());
  await Promise.all([
    updateDoc(doc(db, "shops", id), { viewCount: increment(1) }),
    setDoc(dailyRef, { views: increment(1), updatedAt: serverTimestamp() }, { merge: true }),
  ]);
}

export async function incrementWhatsappClicks(id: string): Promise<void> {
  const dailyRef = fsDoc(db, "shops", id, "dailyStats", todayKey());
  await Promise.all([
    updateDoc(doc(db, "shops", id), { whatsappClicks: increment(1) }),
    setDoc(dailyRef, { whatsappClicks: increment(1), updatedAt: serverTimestamp() }, { merge: true }),
  ]);
}