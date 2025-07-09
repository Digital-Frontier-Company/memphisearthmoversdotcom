import { useEffect } from 'react';

// Critical images that should be preloaded for SEO
const criticalImages = [
  '/lovable-uploads/edb19aa6-8735-48cb-8854-e51964558b65.png', // Hero image
  '/lovable-uploads/5b59b1da-db52-4b8c-812b-e272aeac8493.png', // Service trucks
  '/lovable-uploads/202e6254-cec8-4b88-92cb-512591a16ed5.png', // Gravel delivery
  '/lovable-uploads/2b84ef25-7937-40d5-9463-edeace1c28a6.png', // Aggregate delivery
  '/lovable-uploads/84d27088-1fa3-4738-8bef-587ce32ecb13.jpg', // Site clearing
];

const SEOImagePreloader = () => {
  useEffect(() => {
    // Preload critical images for better SEO crawling
    criticalImages.forEach((src) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });

    // Add structured data for images if not already present
    const existingImageSchema = document.querySelector('script[data-image-schema]');
    if (!existingImageSchema) {
      const imageSchema = {
        "@context": "https://schema.org",
        "@type": "ImageGallery",
        "name": "Memphis Earth Movers Service Images",
        "description": "Professional dump truck services and construction equipment in Memphis",
        "image": criticalImages.map(src => ({
          "@type": "ImageObject",
          "url": `https://www.memphisearthmovers.com${src}`,
          "description": "Memphis Earth Movers professional dump truck services"
        }))
      };

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-image-schema', 'true');
      script.textContent = JSON.stringify(imageSchema);
      document.head.appendChild(script);
    }
  }, []);

  return null; // This component doesn't render anything
};

export default SEOImagePreloader;