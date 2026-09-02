export function PageLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div
          className="h-10 w-10 animate-spin rounded-full border-2 border-slate-200 border-t-slate-900"
          aria-hidden="true"
        />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}
