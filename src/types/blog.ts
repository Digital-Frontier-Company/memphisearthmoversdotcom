
import { ReactNode } from "react";

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  readTime: number;
  excerpt: string;
  image: string;
  content: ReactNode;
}
