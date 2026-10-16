type DashboardPagePlaceholderProps = {
  title: string;
  description: string;
};

export default function DashboardPagePlaceholder({
  title,
  description,
}: DashboardPagePlaceholderProps) {
  return (
    <div className="rounded-lg border border-dashed border-border bg-surface p-6">
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-2 text-sm text-muted">{description}</p>
    </div>
  );
}
