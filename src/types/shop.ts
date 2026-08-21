export interface Shop {
  id: string;
  name: string;
  slug: string;
  category: string;

  description: string;
  shortDescription?: string;

  coverImage: string;
  logo?: string;
  photos?: string[];

  phone?: string;
  email?: string;
  website?: string;

  address?: string;
  lat?: number;
  lng?: number;

  viewCount?: number;
whatsappClicks?: number;
  published: boolean;
  createdAt: number;
}