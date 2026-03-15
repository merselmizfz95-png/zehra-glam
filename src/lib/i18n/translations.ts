export const translations = {
  en: {
    nav: {
      home: "Home",
      services: "Services",
      about: "About",
      products: "Products",
      testimonials: "Testimonials",
      contact: "Contact",
      booking: "Book Appointment",
    },
    hero: {
      defaultTitle: "Reveal Your Radiance",
      defaultSubtitle:
        "Premium aesthetic treatments crafted to enhance your natural beauty with expert care and luxurious results.",
      cta: "Discover Services",
      ctaBooking: "Book Appointment",
    },
    services: {
      eyebrow: "Our Expertise",
      title: "Services",
      learnMore: "Learn More",
    },
    about: {
      eyebrow: "About Zehra Glam",
      title: "Where Beauty Meets Expertise",
      defaultBody:
        "At Zehra Glam, we believe that true beauty is an art form. Our team of certified aestheticians combines years of expertise with the latest techniques to deliver transformative results in an atmosphere of pure luxury.",
      yearsExp: "Years Experience",
      happyClients: "Happy Clients",
      certified: "Certified Specialists",
    },
    testimonials: {
      eyebrow: "Client Stories",
      title: "Testimonials",
    },
    blog: {
      eyebrow: "Our Journal",
      title: "Blog",
      subtitle: "Beauty tips, skincare advice, and treatment guides from our expert aestheticians.",
      all: "All",
      readMore: "Read More",
      backToBlog: "Back to Blog",
      allArticles: "All Articles",
      bookAppointment: "Book Appointment",
      noArticles: "No articles found in this category.",
    },
    products: {
      eyebrow: "Beauty Collection",
      title: "Our Products",
      allCategories: "All",
      addToCart: "View Details",
      outOfStock: "Out of Stock",
      featured: "Featured",
      price: "Price",
      category: "Category",
    },
    contact: {
      eyebrow: "Get In Touch",
      title: "Book Your Appointment",
      subtitle:
        "Ready to begin your beauty journey? Contact us to schedule a consultation or book your next treatment.",
      bookOnline: "Book & Pay Online",
      name: "Full Name",
      email: "Email",
      phone: "Phone",
      service: "Select Service",
      message: "Message",
      preferredDate: "Preferred Date",
      send: "Send Message",
      success: "Message sent successfully!",
    },
    footer: {
      rights: "All rights reserved.",
      tagline: "Beauty & Aesthetics Studio",
    },
  },
  fr: {
    nav: {
      home: "Accueil",
      services: "Services",
      about: "A propos",
      products: "Produits",
      testimonials: "Temoignages",
      contact: "Contact",
      booking: "Prendre Rendez-vous",
    },
    hero: {
      defaultTitle: "Revelez Votre Eclat",
      defaultSubtitle:
        "Des soins esthetiques haut de gamme concus pour sublimer votre beaute naturelle avec expertise et resultats luxueux.",
      cta: "Decouvrir les Services",
      ctaBooking: "Prendre Rendez-vous",
    },
    services: {
      eyebrow: "Notre Expertise",
      title: "Services",
      learnMore: "En Savoir Plus",
    },
    about: {
      eyebrow: "A propos de Zehra Glam",
      title: "La ou la Beaute Rencontre l'Expertise",
      defaultBody:
        "Chez Zehra Glam, nous croyons que la vraie beaute est un art. Notre equipe d'estheticiennes certifiees combine des annees d'expertise avec les dernieres techniques pour offrir des resultats transformateurs dans une atmosphere de luxe.",
      yearsExp: "Annees d'Experience",
      happyClients: "Clientes Satisfaites",
      certified: "Specialistes Certifiees",
    },
    testimonials: {
      eyebrow: "Histoires de Clientes",
      title: "Temoignages",
    },
    blog: {
      eyebrow: "Notre Journal",
      title: "Blog",
      subtitle: "Conseils beaute, soins de la peau et guides de traitements par nos estheticiennes expertes.",
      all: "Tous",
      readMore: "Lire la Suite",
      backToBlog: "Retour au Blog",
      allArticles: "Tous les Articles",
      bookAppointment: "Prendre Rendez-vous",
      noArticles: "Aucun article trouve dans cette categorie.",
    },
    products: {
      eyebrow: "Collection Beaute",
      title: "Nos Produits",
      allCategories: "Tous",
      addToCart: "Voir Details",
      outOfStock: "Rupture de Stock",
      featured: "En Vedette",
      price: "Prix",
      category: "Categorie",
    },
    contact: {
      eyebrow: "Nous Contacter",
      title: "Prenez Rendez-vous",
      subtitle:
        "Prete a commencer votre parcours beaute ? Contactez-nous pour planifier une consultation ou reservez votre prochain soin.",
      bookOnline: "Reserver & Payer en Ligne",
      name: "Nom Complet",
      email: "E-mail",
      phone: "Telephone",
      service: "Choisir un Service",
      message: "Message",
      preferredDate: "Date Preferee",
      send: "Envoyer",
      success: "Message envoye avec succes !",
    },
    footer: {
      rights: "Tous droits reserves.",
      tagline: "Studio Beaute & Esthetique",
    },
  },
};

export type Locale = keyof typeof translations;
export type TranslationKeys = (typeof translations)["en"];
