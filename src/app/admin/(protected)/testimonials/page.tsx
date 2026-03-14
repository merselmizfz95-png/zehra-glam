import { getTestimonials } from "@/lib/data";
import { TestimonialsManager } from "./TestimonialsManager";

export default async function AdminTestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Manage Testimonials</h1>
      <TestimonialsManager testimonials={testimonials} />
    </div>
  );
}
