import React from "react";
import { BlogPost } from "@/types/blog";
import gravelDrivewayContent from "./blogContents/gravelDrivewayContent";
import memphisClayContent from "./blogContents/memphisClayContent";
import memphisConstructionBoomContent from "./blogContents/memphisConstructionBoomContent";
import memphisConstructionOpportunitiesContent from "./blogContents/memphisConstructionOpportunitiesContent";

export const blogPosts: BlogPost[] = [
  {
    slug: "navigating-new-construction-memphis-opportunities",
    title: "Navigating New Construction in Memphis, TN: Insights & Opportunities",
    date: "May 25, 2025",
    readTime: 15,
    excerpt: "Discover Memphis's construction boom opportunities for business professionals. Learn about dump truck rentals, strategic resources, and emerging development trends in the Mid-South.",
    image: "/lovable-uploads/44a44049-2d22-45d1-bcae-9a11d428890c.png",
    content: React.createElement(memphisConstructionOpportunitiesContent)
  },
  {
    slug: "memphis-construction-boom-shelby-county",
    title: "For Memphis Dump Truck Businesses - Memphis is on the Move, Shelby County's Construction Boom",
    date: "May 20, 2025",
    readTime: 14,
    excerpt: "Explore Memphis's $16+ billion construction boom creating massive demand for dump trucks and earthmoving services. Learn how Shelby County projects are transforming the local economy.",
    image: "/lovable-uploads/44a44049-2d22-45d1-bcae-9a11d428890c.png",
    content: memphisConstructionBoomContent
  },
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
