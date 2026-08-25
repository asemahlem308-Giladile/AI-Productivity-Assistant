export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <header className="border-b border-border pb-5">
      <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-primary">{eyebrow}</p>
      <h1 className="mt-2 font-display text-2xl font-semibold sm:text-3xl">{title}</h1>
      <p className="mt-2 max-w-3xl text-sm text-muted-foreground">{description}</p>
    </header>
  );
}
