export const IMAGES = {
  hero: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920&q=80",
  heroMobile: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",

  about: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
  aboutSecondary: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80",

  services: {
    facial: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80",
    laser: "https://images.unsplash.com/photo-1598524374912-6b0b0bda36a1?w=600&q=80",
    lashes: "https://images.unsplash.com/photo-1583001931096-959e9a1a6223?w=600&q=80",
    skincare: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&q=80",
  },

  products: {
    serum: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&q=80",
    lipstick: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500&q=80",
    cream: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=500&q=80",
    hairOil: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=500&q=80",
    bodyButter: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=500&q=80",
    brushSet: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&q=80",
  },

  testimonials: {
    sophie: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    claire: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    isabelle: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
  },

  decorative: {
    pattern: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=40",
    texture: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=40",
  },
};

export const PRODUCT_IMAGE_MAP: Record<string, string> = {
  "Zehra Glam Radiance Serum": IMAGES.products.serum,
  "Zehra Glam Serum Eclat": IMAGES.products.serum,
  "Zehra Glam Velvet Rose Lipstick": IMAGES.products.lipstick,
  "Zehra Glam Rouge a Levres Velours Rose": IMAGES.products.lipstick,
  "Zehra Glam Hydrating Night Cream": IMAGES.products.cream,
  "Zehra Glam Creme de Nuit Hydratante": IMAGES.products.cream,
  "Zehra Glam Silk Hair Oil": IMAGES.products.hairOil,
  "Zehra Glam Huile Capillaire Soie": IMAGES.products.hairOil,
  "Zehra Glam Rose Body Butter": IMAGES.products.bodyButter,
  "Zehra Glam Beurre Corporel Rose": IMAGES.products.bodyButter,
  "Zehra Glam Professional Brush Set": IMAGES.products.brushSet,
  "Zehra Glam Kit Pinceaux Professionnel": IMAGES.products.brushSet,
};

export const SERVICE_IMAGE_MAP: Record<string, string> = {
  Sparkles: IMAGES.services.facial,
  Zap: IMAGES.services.laser,
  Eye: IMAGES.services.lashes,
  Heart: IMAGES.services.skincare,
};

export const TESTIMONIAL_IMAGE_MAP: Record<string, string> = {
  "Sophie Martin": IMAGES.testimonials.sophie,
  "Claire Dubois": IMAGES.testimonials.claire,
  "Isabelle Moreau": IMAGES.testimonials.isabelle,
};
