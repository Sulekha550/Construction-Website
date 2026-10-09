export const unsplashImages = {
  hero: "/images/ai/ai-residence-signature.jpg",
  exterior: [
    "/images/ai/ai-residence-wide.jpg",
    "/images/ai/ai-interior-living.jpg",
    "/images/ai/ai-residence-family.jpg",
    "/images/ai/ai-residence-family.jpg",
  ],
  interiors: [
    "/images/ai/ai-residence-family.jpg",
    "/images/ai/ai-interior-hero.jpg",
    "/images/ai/ai-residence-signature.jpg",
  ],
  construction: [
    "/images/ai/ai-residence-signature.jpg",
    "/images/ai/ai-interior-kitchen.jpg",
  ],
  landscape: [
    "/images/ai/ai-residence-signature.jpg",
    "/images/ai/ai-residence-family.jpg",
  ],
};

export const galleryImages = [
  ...unsplashImages.exterior,
  ...unsplashImages.interiors,
  ...unsplashImages.construction,
  ...unsplashImages.landscape,
];
