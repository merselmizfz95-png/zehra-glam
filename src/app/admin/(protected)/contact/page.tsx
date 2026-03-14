import { getContactInfo } from "@/lib/data";
import { ContactForm } from "./ContactForm";

export default async function AdminContactPage() {
  const contact = await getContactInfo();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Edit Contact Info</h1>
      <ContactForm contact={contact} />
    </div>
  );
}
