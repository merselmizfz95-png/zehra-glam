import { getProducts } from "@/lib/data";
import { ProductsManager } from "./ProductsManager";
import { PRODUCT_CATEGORIES } from "@/constants/siteConfig";

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Manage Products</h1>
      <ProductsManager products={products} categories={PRODUCT_CATEGORIES} />
    </div>
  );
}
