-- Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en TEXT NOT NULL,
  title_fr TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt_en TEXT NOT NULL,
  excerpt_fr TEXT NOT NULL,
  body_en TEXT NOT NULL,
  body_fr TEXT NOT NULL,
  image_url TEXT,
  category TEXT NOT NULL DEFAULT 'Beauty Tips',
  published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read published blog_posts" ON blog_posts FOR SELECT USING (published = true);
CREATE POLICY "Admin all blog_posts" ON blog_posts FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- Add stripe_price_id to products for Stripe integration
ALTER TABLE products ADD COLUMN IF NOT EXISTS stripe_price_id TEXT;

-- Seed blog posts
INSERT INTO blog_posts (title_en, title_fr, slug, excerpt_en, excerpt_fr, body_en, body_fr, image_url, category, published) VALUES
(
  '5 Essential Skincare Tips for Glowing Skin',
  '5 Conseils Essentiels pour une Peau Eclatante',
  '5-essential-skincare-tips',
  'Discover the daily skincare routine that our experts recommend for maintaining radiant, healthy skin all year round.',
  'Decouvrez la routine de soins quotidienne que nos experts recommandent pour maintenir une peau radieuse et saine toute l''annee.',
  'Taking care of your skin is the foundation of true beauty. Here are five essential tips our aestheticians swear by:

1. **Double Cleanse** - Start with an oil-based cleanser to remove makeup, then follow with a water-based cleanser. This ensures every trace of impurity is removed without stripping your skin.

2. **Hydrate from Within** - Drink at least 2 liters of water daily. Hydrated skin looks plumper, healthier, and more youthful.

3. **Never Skip SPF** - Sun protection is the single most effective anti-aging step you can take. Use SPF 30+ every day, even when it is cloudy.

4. **Invest in a Quality Serum** - A vitamin C serum in the morning fights free radicals, while retinol at night promotes cell turnover.

5. **Be Consistent** - The best skincare routine is one you follow every day. Results come from consistency, not from the most expensive products.',
  'Prendre soin de votre peau est le fondement de la vraie beaute. Voici cinq conseils essentiels que nos estheticiennes recommandent :

1. **Double Nettoyage** - Commencez avec un nettoyant a base d''huile pour retirer le maquillage, puis suivez avec un nettoyant a base d''eau.

2. **Hydratez de l''Interieur** - Buvez au moins 2 litres d''eau par jour. Une peau hydratee parait plus rebondie et plus jeune.

3. **Ne Sautez Jamais le SPF** - La protection solaire est l''etape anti-age la plus efficace. Utilisez SPF 30+ chaque jour.

4. **Investissez dans un Serum de Qualite** - Un serum a la vitamine C le matin combat les radicaux libres.

5. **Soyez Constante** - La meilleure routine est celle que vous suivez chaque jour.',
  'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80',
  'Skincare',
  true
),
(
  'The Ultimate Guide to Eyelash Extensions',
  'Le Guide Ultime des Extensions de Cils',
  'ultimate-guide-eyelash-extensions',
  'Everything you need to know before getting eyelash extensions, from choosing the right style to aftercare tips.',
  'Tout ce que vous devez savoir avant de faire des extensions de cils, du choix du style aux conseils d''entretien.',
  'Eyelash extensions have revolutionized the beauty world, offering a way to wake up every morning looking effortlessly glamorous. Here is your complete guide:

**Choosing Your Style**
- Natural: Adds subtle length and volume for an everyday look
- Classic: One extension per natural lash for elegant definition
- Volume: Multiple thin extensions per lash for dramatic fullness
- Hybrid: A mix of classic and volume for the best of both worlds

**The Application Process**
The procedure takes 90-120 minutes for a full set. You will lie comfortably while your technician carefully applies each extension individually.

**Aftercare is Key**
- Avoid water for the first 24 hours
- Do not use oil-based products near your eyes
- Brush your lashes gently with a spoolie daily
- Schedule fills every 2-3 weeks

**Why Choose Zehra Glam**
Our certified lash artists use only premium, lightweight extensions that protect your natural lashes while delivering stunning results.',
  'Les extensions de cils ont revolutionne le monde de la beaute. Voici votre guide complet :

**Choisir Votre Style**
- Naturel : Ajoute subtilement longueur et volume
- Classique : Une extension par cil naturel
- Volume : Plusieurs extensions fines par cil
- Hybride : Un melange de classique et volume

**Le Processus d''Application**
La procedure prend 90 a 120 minutes pour un set complet.

**L''Entretien est Essentiel**
- Evitez l''eau pendant les premieres 24 heures
- N''utilisez pas de produits a base d''huile pres des yeux
- Brossez vos cils doucement chaque jour
- Planifiez des retouches toutes les 2-3 semaines',
  'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?w=800&q=80',
  'Beauty Tips',
  true
),
(
  'Why Laser Epilation is Worth the Investment',
  'Pourquoi l''Epilation Laser Vaut l''Investissement',
  'laser-epilation-worth-investment',
  'Learn how laser hair removal saves you time, money, and discomfort in the long run compared to traditional methods.',
  'Decouvrez comment l''epilation laser vous fait gagner du temps et de l''argent par rapport aux methodes traditionnelles.',
  'If you have been considering laser hair removal, here is why our clients say it is one of the best investments they have ever made:

**Long-Term Savings**
While the upfront cost is higher than a single wax session, most clients achieve permanent reduction in 6-8 sessions. Compare that to a lifetime of waxing or shaving.

**Precision and Speed**
Modern laser technology targets hair follicles with incredible precision, leaving surrounding skin undamaged. Small areas like the upper lip take just minutes.

**Reduced Ingrown Hairs**
Unlike shaving and waxing, laser treatment dramatically reduces ingrown hairs, giving you smoother, clearer skin.

**Minimal Discomfort**
Today''s advanced lasers feature built-in cooling systems. Most clients describe the sensation as a mild snap, far less painful than waxing.

**At Zehra Glam**, we use the latest laser technology suitable for all skin types. Book your free consultation today.',
  'Si vous envisagez l''epilation laser, voici pourquoi nos clientes disent que c''est l''un des meilleurs investissements :

**Economies a Long Terme**
Bien que le cout initial soit plus eleve, la plupart des clientes obtiennent une reduction permanente en 6-8 seances.

**Precision et Rapidite**
La technologie laser moderne cible les follicules pileux avec une precision incroyable.

**Reduction des Poils Incarnes**
Contrairement au rasage et a l''epilation a la cire, le laser reduit considerablement les poils incarnes.

**Inconfort Minimal**
Les lasers avances d''aujourd''hui disposent de systemes de refroidissement integres.',
  'https://images.unsplash.com/photo-1598524374912-6b0b0bda36a1?w=800&q=80',
  'Treatments',
  true
);
