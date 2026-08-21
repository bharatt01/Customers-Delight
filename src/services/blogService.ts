import {
  collection, doc, addDoc, updateDoc, deleteDoc,
  getDocs, getDoc, query, orderBy, where, serverTimestamp,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { Blog } from "@/types/blog";
import { uploadToCloudinary } from "@/services/cloudinaryService";

const blogsCol = collection(db, "blogs");

export async function getBlogs(): Promise<Blog[]> {
  const q = query(blogsCol, orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Blog));
}

export async function getPublishedBlogs(): Promise<Blog[]> {
  const q = query(blogsCol, where("published", "==", true), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Blog));
}
export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  const q = query(blogsCol, where("slug", "==", slug), where("published", "==", true));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const d = snap.docs[0];
  return { id: d.id, ...d.data() } as Blog;
}
export async function getBlog(id: string): Promise<Blog | null> {
  const snap = await getDoc(doc(db, "blogs", id));
  return snap.exists() ? ({ id: snap.id, ...snap.data() } as Blog) : null;
}

export async function createBlog(data: Partial<Blog>): Promise<string> {
  const docRef = await addDoc(blogsCol, { ...data, createdAt: serverTimestamp() });
  return docRef.id;
}

export async function updateBlog(id: string, data: Partial<Blog>): Promise<void> {
  await updateDoc(doc(db, "blogs", id), { ...data });
}

export async function deleteBlog(id: string): Promise<void> {
  await deleteDoc(doc(db, "blogs", id));
}

export async function uploadBlogCover(blogId: string, file: File): Promise<string> {
  return uploadToCloudinary(file, `blogs/${blogId}`);
}

export function slugifyTitle(input: string): string {
  return input.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}