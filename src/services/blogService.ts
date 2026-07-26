import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { uploadImageToSupabase, deleteImageFromSupabase } from "./imageservice";
import type { Blog } from "@/types/blog";

// Log Firebase initialization
console.log("🔥 blogService loaded");
console.log("🔥 db instance:", db);
console.log("🔥 db type:", typeof db);
console.log("🔥 db.app:", (db as any)?.app?.name);

export async function getBlogs(publishedOnly = false) {
  let q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
  if (publishedOnly) {
    q = query(
      collection(db, "blogs"),
      where("published", "==", true),
      orderBy("createdAt", "desc")
    );
  }
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Blog[];
}

export async function getBlogBySlug(slug: string) {
  const q = query(collection(db, "blogs"), where("slug", "==", slug));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  const doc = snapshot.docs[0];
  return { id: doc.id, ...doc.data() } as Blog;
}

export async function getBlogById(id: string) {
  const docRef = doc(db, "blogs", id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) return null;
  return { id: docSnap.id, ...docSnap.data() } as Blog;
}

export async function createBlog(data: Omit<Blog, "id" | "createdAt" | "updatedAt">) {
  console.log("🔥 createBlog START");
  console.log("🔥 data received:", data);
  console.log("🔥 db before addDoc:", db);
  
  try {
    console.log("🔥 Creating collection ref...");
    const blogsCollection = collection(db, "blogs");
    console.log("🔥 Collection ref:", blogsCollection);
    
    console.log("🔥 Calling addDoc...");
    const result = await Promise.race([
      addDoc(blogsCollection, {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Firebase timeout - 10 seconds")), 10000)
      )
    ]);
    
    console.log("🔥 addDoc SUCCESS:", (result as any).id);
    return result;
  } catch (err: any) {
    console.error("🔥 addDoc FAILED:", err);
    console.error("🔥 Error code:", err.code);
    console.error("🔥 Error message:", err.message);
    throw err;
  }
}

export async function deleteBlog(id: string) {
  await deleteDoc(doc(db, "blogs", id));
}

export async function updateBlog(id: string, data: Partial<Blog>) {
  await updateDoc(doc(db, "blogs", id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function uploadBlogImage(file: File): Promise<string> {
  return await uploadImageToSupabase(file, "blog-images");
}

export async function deleteBlogImage(url: string): Promise<void> {
  await deleteImageFromSupabase(url);
}

export function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .substring(0, 100);
}