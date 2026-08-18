type SectionHeadingProps = {
  id: string;
  label: string;
  title: string;
  description?: string;
};

export default function SectionHeading({
  id,
  label,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div id={id} className="mb-10 scroll-mt-24">
      <p className="mb-2 text-sm font-medium uppercase tracking-widest text-accent">
        {label}
      </p>
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {description ? (
        <p className="mt-3 max-w-2xl text-muted">{description}</p>
      ) : null}
    </div>
  );
}
