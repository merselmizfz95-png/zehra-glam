"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { updateContactInfo } from "@/actions/admin";
import { toast } from "sonner";
import type { ContactInfo } from "@/types/database";

interface ContactFormProps {
  contact: ContactInfo | null;
}

export function ContactForm({ contact }: ContactFormProps) {
  async function handleSubmit(formData: FormData) {
    const result = await updateContactInfo(formData);
    if (result.success) {
      toast.success("Contact info updated");
    } else {
      toast.error(result.error || "Failed to update");
    }
  }

  if (!contact) {
    return <p className="text-muted-foreground">No contact info found. Please seed the database.</p>;
  }

  return (
    <Card className="border-border/50">
      <CardContent className="p-6">
        <form action={handleSubmit} className="space-y-4">
          <input type="hidden" name="id" value={contact.id} />

          <div>
            <Label className="font-[family-name:var(--font-inter)]">Address</Label>
            <Input name="address" defaultValue={contact.address} className="mt-1.5" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="font-[family-name:var(--font-inter)]">Phone</Label>
              <Input name="phone" defaultValue={contact.phone} className="mt-1.5" />
            </div>
            <div>
              <Label className="font-[family-name:var(--font-inter)]">Email</Label>
              <Input name="email" type="email" defaultValue={contact.email} className="mt-1.5" />
            </div>
          </div>
          <div>
            <Label className="font-[family-name:var(--font-inter)]">Hours</Label>
            <Input name="hours" defaultValue={contact.hours} className="mt-1.5" />
          </div>
          <div>
            <Label className="font-[family-name:var(--font-inter)]">Booking URL</Label>
            <Input name="booking_url" defaultValue={contact.booking_url} className="mt-1.5" />
          </div>

          <Button type="submit" className="font-[family-name:var(--font-inter)]">Save Changes</Button>
        </form>
      </CardContent>
    </Card>
  );
}
