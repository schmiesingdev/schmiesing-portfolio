function Bone({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-muted motion-reduce:animate-none ${className ?? ""}`}
    />
  );
}

export function ProjectsSkeleton() {
  return (
    <section className="py-24 px-6" aria-hidden>
      <div className="mx-auto max-w-5xl">
        <div className="mb-12">
          <Bone className="h-10 w-40 mb-3" />
          <Bone className="h-5 w-80" />
        </div>
        <Bone className="h-10 w-full max-w-sm mb-8" />
        <div className="grid gap-6 sm:grid-cols-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-border p-6 space-y-4">
              <div className="space-y-2">
                <Bone className="h-6 w-3/4" />
                <Bone className="h-4 w-full" />
                <Bone className="h-4 w-5/6" />
              </div>
              <Bone className="h-16 w-full rounded-lg" />
              <div className="flex gap-2">
                <Bone className="h-5 w-16 rounded-full" />
                <Bone className="h-5 w-20 rounded-full" />
                <Bone className="h-5 w-14 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
