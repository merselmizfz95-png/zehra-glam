import { getServices } from "@/lib/data";
import { ServicesManager } from "./ServicesManager";

export default async function AdminServicesPage() {
  const services = await getServices();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Manage Services</h1>
      <ServicesManager services={services} />
    </div>
  );
}
