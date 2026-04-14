-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" SCHEMA public;

-- Hero Content
CREATE TABLE IF NOT EXISTS hero_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en TEXT NOT NULL DEFAULT 'Reveal Your Radiance',
  title_fr TEXT NOT NULL DEFAULT 'Revelez Votre Eclat',
  subtitle_en TEXT NOT NULL DEFAULT 'Premium aesthetic treatments crafted to enhance your natural beauty with expert care and luxurious results.',
  subtitle_fr TEXT NOT NULL DEFAULT 'Des soins esthetiques haut de gamme concus pour sublimer votre beaute naturelle avec expertise et resultats luxueux.',
  cta_text_en TEXT NOT NULL DEFAULT 'Discover Services',
  cta_text_fr TEXT NOT NULL DEFAULT 'Decouvrir les Services',
  image_url TEXT
);

-- Services
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_en TEXT NOT NULL,
  name_fr TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_fr TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'Sparkles',
  image_url TEXT,
  display_order INTEGER NOT NULL DEFAULT 0
);

-- About Content
CREATE TABLE IF NOT EXISTS about_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en TEXT NOT NULL DEFAULT 'Where Beauty Meets Expertise',
  title_fr TEXT NOT NULL DEFAULT 'La ou la Beaute Rencontre Expertise',
  body_en TEXT NOT NULL,
  body_fr TEXT NOT NULL,
  years_experience INTEGER NOT NULL DEFAULT 10,
  happy_clients INTEGER NOT NULL DEFAULT 5000,
  image_url TEXT
);

-- Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  service_en TEXT NOT NULL,
  service_fr TEXT NOT NULL,
  quote_en TEXT NOT NULL,
  quote_fr TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5)
);

-- Products
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_en TEXT NOT NULL,
  name_fr TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_fr TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL DEFAULT 0,
  category TEXT NOT NULL,
  image_url TEXT,
  in_stock BOOLEAN NOT NULL DEFAULT true,
  featured BOOLEAN NOT NULL DEFAULT false
);

-- Contact Info
CREATE TABLE IF NOT EXISTS contact_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  address TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  hours TEXT NOT NULL,
  booking_url TEXT NOT NULL
);

-- Bookings
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  service TEXT NOT NULL,
  message TEXT,
  preferred_date TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','confirmed','completed','cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =========================================
-- Row Level Security
-- =========================================

ALTER TABLE hero_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Public read access for all content tables
CREATE POLICY "Public read hero_content" ON hero_content FOR SELECT USING (true);
CREATE POLICY "Public read services" ON services FOR SELECT USING (true);
CREATE POLICY "Public read about_content" ON about_content FOR SELECT USING (true);
CREATE POLICY "Public read testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Public read products" ON products FOR SELECT USING (true);
CREATE POLICY "Public read contact_info" ON contact_info FOR SELECT USING (true);

-- Public can insert bookings
CREATE POLICY "Public insert bookings" ON bookings FOR INSERT WITH CHECK (true);

-- Authenticated users (admin) can do everything
CREATE POLICY "Admin all hero_content" ON hero_content FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin all services" ON services FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin all about_content" ON about_content FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin all testimonials" ON testimonials FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin all products" ON products FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin all contact_info" ON contact_info FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin all bookings" ON bookings FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- =========================================
-- Seed Data
-- =========================================

-- Hero
INSERT INTO hero_content (title_en, title_fr, subtitle_en, subtitle_fr, cta_text_en, cta_text_fr)
VALUES (
  'Reveal Your Radiance',
  'Revelez Votre Eclat',
  'Premium aesthetic treatments crafted to enhance your natural beauty with expert care and luxurious results.',
  'Des soins esthetiques haut de gamme concus pour sublimer votre beaute naturelle avec expertise et resultats luxueux.',
  'Discover Services',
  'Decouvrir les Services'
);

-- Services
INSERT INTO services (name_en, name_fr, description_en, description_fr, icon, display_order) VALUES
('Facial Treatments', 'Soins du Visage', 'Rejuvenating facials tailored to your skin''s unique needs, using premium products for lasting radiance.', 'Des soins du visage rajeunissants adaptes aux besoins uniques de votre peau, utilisant des produits haut de gamme.', 'Sparkles', 1),
('Laser Epilation', 'Epilation Laser', 'Advanced laser hair removal with cutting-edge technology for smooth, lasting results.', 'Epilation laser avancee avec une technologie de pointe pour des resultats lisses et durables.', 'Zap', 2),
('Eyelash Extensions', 'Extensions de Cils', 'Custom lash designs from natural to dramatic, applied with precision for effortless beauty.', 'Des designs de cils sur mesure, du naturel au dramatique, appliques avec precision.', 'Eye', 3),
('Skincare Products', 'Produits de Soin', 'Curated luxury skincare collections to continue your beauty ritual at home.', 'Des collections de soins de luxe selectionnees pour poursuivre votre rituel beaute a la maison.', 'Heart', 4);

-- About
INSERT INTO about_content (title_en, title_fr, body_en, body_fr, years_experience, happy_clients)
VALUES (
  'Where Beauty Meets Expertise',
  'La ou la Beaute Rencontre l''Expertise',
  'At Zehra Glam, we believe that true beauty is an art form. Our team of certified aestheticians combines years of expertise with the latest techniques to deliver transformative results in an atmosphere of pure luxury. From advanced laser treatments to delicate eyelash artistry, every service is performed with meticulous attention to detail.',
  'Chez Zehra Glam, nous croyons que la vraie beaute est un art. Notre equipe d''estheticiennes certifiees combine des annees d''expertise avec les dernieres techniques pour offrir des resultats transformateurs dans une atmosphere de luxe.',
  10,
  5000
);

-- Testimonials
INSERT INTO testimonials (client_name, service_en, service_fr, quote_en, quote_fr, rating) VALUES
('Sophie Martin', 'Facial Treatment', 'Soin du Visage', 'The facial treatment was absolutely divine. My skin has never looked better. The attention to detail is unmatched.', 'Le soin du visage etait absolument divin. Ma peau n''a jamais ete aussi belle.', 5),
('Claire Dubois', 'Laser Epilation', 'Epilation Laser', 'After years of shaving, the laser epilation has been life-changing. Professional, painless, and incredibly effective.', 'Apres des annees de rasage, l''epilation laser a change ma vie. Professionnel, indolore et efficace.', 5),
('Isabelle Moreau', 'Eyelash Extensions', 'Extensions de Cils', 'My lash extensions look so natural and beautiful. I wake up feeling confident every single day.', 'Mes extensions de cils sont si naturelles et belles. Je me reveille en me sentant confiante chaque jour.', 5);

-- Products
INSERT INTO products (name_en, name_fr, description_en, description_fr, price, category, in_stock, featured) VALUES
('Zehra Glam Radiance Serum', 'Zehra Glam Serum Eclat', 'A luxurious vitamin C serum that brightens and evens skin tone for a luminous complexion.', 'Un serum luxueux a la vitamine C qui illumine et unifie le teint pour un eclat lumineux.', 89.00, 'Skincare', true, true),
('Zehra Glam Velvet Rose Lipstick', 'Zehra Glam Rouge a Levres Velours Rose', 'Long-lasting matte lipstick in a classic rose shade, enriched with hydrating ingredients.', 'Rouge a levres mat longue tenue dans une teinte rose classique, enrichi en ingredients hydratants.', 35.00, 'Makeup', true, true),
('Zehra Glam Hydrating Night Cream', 'Zehra Glam Creme de Nuit Hydratante', 'Rich overnight moisturizer with hyaluronic acid and retinol for rejuvenated morning skin.', 'Creme de nuit riche a l''acide hyaluronique et au retinol pour une peau rejuvenie au reveil.', 65.00, 'Skincare', true, false),
('Zehra Glam Silk Hair Oil', 'Zehra Glam Huile Capillaire Soie', 'Lightweight argan oil blend that tames frizz and adds brilliant shine to all hair types.', 'Melange leger d''huile d''argan qui dompte les frisottis et ajoute une brillance eclatante.', 42.00, 'Haircare', true, true),
('Zehra Glam Rose Body Butter', 'Zehra Glam Beurre Corporel Rose', 'Deeply nourishing body butter infused with damask rose and shea butter for silky smooth skin.', 'Beurre corporel nourrissant infuse a la rose de Damas et au beurre de karite pour une peau soyeuse.', 48.00, 'Body Care', true, false),
('Zehra Glam Professional Brush Set', 'Zehra Glam Kit Pinceaux Professionnel', '12-piece professional makeup brush set with vegan bristles and a luxurious travel case.', 'Kit de 12 pinceaux de maquillage professionnels avec poils vegan et un etui de voyage luxueux.', 79.00, 'Tools', true, true);

-- Contact Info
INSERT INTO contact_info (address, phone, email, hours, booking_url)
VALUES (
  'Rue d''Arlon 25, Ixelles',
  '0469 24 49 55',
  'hello@zehra-glam.com',
  'Mon-Sat: 9:00 - 20:00',
  'https://www.zehra-glam.com/booking'
);
