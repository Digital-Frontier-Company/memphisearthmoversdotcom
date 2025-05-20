
import { ReactNode } from "react";

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  readTime: number;
  excerpt: string;
  image: string;
  imageAlt?: string; // Optional image alt text
  content: ReactNode;
}
