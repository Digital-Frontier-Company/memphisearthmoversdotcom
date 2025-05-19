
import React from "react";
import { BlogPost } from "@/types/blog";
import gravelDrivewayContent from "./blogContents/gravelDrivewayContent";
import memphisClayContent from "./blogContents/memphisClayContent";

export const blogPosts: BlogPost[] = [
  {
    slug: "memphis-clay-soil-challenges-solutions",
    title: "The Great Memphis Clay Showdown: Builders vs. Gumbo Soil—Who Really Wins?",
    date: "May 19, 2025",
    readTime: 12,
    excerpt: "Why that sticky Delta dirt may be your project's biggest headache or secret weapon. Learn how to turn challenging Memphis clay into an asset on your next construction project.",
    image: "/lovable-uploads/30d40068-7c8a-4348-b19b-c9a4094f24f1.png",
    content: memphisClayContent
  },
  {
    slug: "best-gravel-for-your-memphis-driveway",
    title: "Choosing the Best Gravel Type for Your Memphis Driveway",
    date: "May 7, 2025",
    readTime: 10,
    excerpt: "Discover which gravel types perform best for driveways in Memphis's unique climate, including cost comparisons and maintenance tips.",
    image: "/lovable-uploads/75669d2c-878b-455e-8ca3-1b08055767d9.jpg",
    content: gravelDrivewayContent
  },
];
