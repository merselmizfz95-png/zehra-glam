import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-xl bg-muted/60",
        className
      )}
      {...props}
    />
  );
}

function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-border/50 overflow-hidden">
      <Skeleton className="aspect-[4/5] rounded-none" />
      <div className="p-6 space-y-3">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
        <div className="flex justify-between pt-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-8 w-24 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

function HeroSkeleton() {
  return (
    <div className="min-h-screen flex items-center bg-muted/30">
      <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pt-24">
        <div className="max-w-2xl space-y-6">
          <Skeleton className="h-8 w-48 rounded-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-3/4" />
          <Skeleton className="h-5 w-full max-w-md" />
          <Skeleton className="h-5 w-2/3 max-w-md" />
          <div className="flex gap-4 pt-4">
            <Skeleton className="h-12 w-40 rounded-lg" />
            <Skeleton className="h-12 w-40 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ServiceSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden">
      <Skeleton className="h-[420px]" />
    </div>
  );
}

export { Skeleton, CardSkeleton, HeroSkeleton, ServiceSkeleton };
