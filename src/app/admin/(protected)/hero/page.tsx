import { getHeroContent } from "@/lib/data";
import { HeroForm } from "./HeroForm";

export default async function AdminHeroPage() {
  const hero = await getHeroContent();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Edit Hero Section</h1>
      <HeroForm hero={hero} />
    </div>
  );
}
