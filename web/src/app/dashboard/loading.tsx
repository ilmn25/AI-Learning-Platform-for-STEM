export default function DashboardLoading() {
  return (
    <div className="surface-page min-h-screen">
      <div className="border-b border-default bg-white/90">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
          <div className="h-3 w-48 animate-pulse rounded bg-[var(--border-default)]" />
          <div className="h-8 w-56 animate-pulse rounded-full bg-[var(--border-default)]" />
        </div>
      </div>
      <div className="mx-auto w-full max-w-6xl space-y-8 px-6 py-16" aria-busy="true">
        <div className="space-y-3">
          <div className="h-3 w-24 animate-pulse rounded bg-[var(--border-default)]" />
          <div className="h-8 w-80 animate-pulse rounded bg-[var(--border-default)]" />
          <div className="h-4 w-72 animate-pulse rounded bg-[var(--border-default)]" />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={`dashboard-skeleton-${index}`}
              className="rounded-3xl border border-default bg-white p-6"
            >
              <div className="h-3 w-20 animate-pulse rounded bg-[var(--border-default)]" />
              <div className="mt-3 h-6 w-2/3 animate-pulse rounded bg-[var(--border-default)]" />
              <div className="mt-3 h-4 w-1/2 animate-pulse rounded bg-[var(--border-default)]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
