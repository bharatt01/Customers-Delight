export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;    // ← Stores Supabase public URL
  category: string;
  author: string;
  readTime: number;
  featured: boolean;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  tags: string[];
}