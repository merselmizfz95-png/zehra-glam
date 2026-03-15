import { Navbar } from "@/components/Navbar";
import { Skeleton } from "@/components/Skeleton";

export default function BlogLoading() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Skeleton className="h-4 w-28 mx-auto mb-4 rounded-full" />
            <Skeleton className="h-12 w-48 mx-auto mb-4" />
            <Skeleton className="h-5 w-96 max-w-full mx-auto" />
            <Skeleton className="mt-6 h-[2px] w-16 mx-auto" />
          </div>

          <div className="flex justify-center gap-2 mb-14">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-9 w-24 rounded-full" />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-2xl border border-border/50 overflow-hidden">
                <Skeleton className="aspect-[16/10] rounded-none" />
                <div className="p-6 space-y-3">
                  <div className="flex gap-2">
                    <Skeleton className="h-5 w-20 rounded-full" />
                    <Skeleton className="h-5 w-28 rounded-full" />
                  </div>
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-24 mt-2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
