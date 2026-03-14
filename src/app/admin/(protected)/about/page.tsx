import { getAboutContent } from "@/lib/data";
import { AboutForm } from "./AboutForm";

export default async function AdminAboutPage() {
  const about = await getAboutContent();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Edit About Section</h1>
      <AboutForm about={about} />
    </div>
  );
}
