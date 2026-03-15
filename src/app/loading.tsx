import { HeroSkeleton, ServiceSkeleton } from "@/components/Skeleton";

export default function HomeLoading() {
  return (
    <main>
      <HeroSkeleton />
      <section className="py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <ServiceSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
