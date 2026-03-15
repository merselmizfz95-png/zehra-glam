import { Navbar } from "@/components/Navbar";
import { Skeleton, CardSkeleton } from "@/components/Skeleton";

export default function ProductsLoading() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Skeleton className="h-4 w-32 mx-auto mb-4 rounded-full" />
            <Skeleton className="h-12 w-56 mx-auto mb-4" />
            <Skeleton className="mt-6 h-[2px] w-16 mx-auto" />
          </div>

          <div className="flex justify-center gap-2 mb-14">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-9 w-24 rounded-full" />
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {Array.from({ length: 6 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
