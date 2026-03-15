import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getProducts } from "@/lib/data";
import { ProductsGrid } from "./ProductsGrid";
import { PRODUCT_CATEGORIES, DEFAULT_PRODUCTS } from "@/constants/siteConfig";

export const metadata = {
  title: "Products | Zehra Glam",
  description: "Curated luxury beauty and cosmetic products.",
};

export default async function ProductsPage() {
  let products = await getProducts();

  if (products.length === 0) {
    products = DEFAULT_PRODUCTS.map((p, i) => ({
      id: String(i),
      ...p,
      image_url: null,
      stripe_price_id: null,
    }));
  }

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        <ProductsGrid products={products} categories={PRODUCT_CATEGORIES} />
      </main>
      <Footer />
    </>
  );
}
