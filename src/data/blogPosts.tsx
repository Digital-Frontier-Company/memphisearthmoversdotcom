
import React from "react";
import { BlogPost } from "@/types/blog";
import gravelDrivewayContent from "./blogContents/gravelDrivewayContent";
import memphisClayContent from "./blogContents/memphisClayContent";

export const blogPosts: BlogPost[] = [
  {
    slug: "memphis-clay-soil-challenges-solutions",
    title: "Memphis Clay Soil Solutions: Turning Challenging Gumbo Soil Into an Asset",
    date: "May 19, 2025",
    readTime: 12,
    excerpt: "Learn how Memphis contractors transform challenging clay soil into stable foundations. Discover cost-effective soil stabilization techniques for Memphis construction projects.",
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
