import SectionHeading from "@/components/SectionHeading";

type ComingSoonProps = {
  id: string;
  label: string;
  title: string;
  description: string;
  phase: string;
};

export default function ComingSoon({
  id,
  label,
  title,
  description,
  phase,
}: ComingSoonProps) {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <SectionHeading id={id} label={label} title={title} description={description} />

        <div className="rounded-2xl border border-dashed border-border bg-surface/50 p-10 text-center">
          <span className="mb-3 inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
            {phase}
          </span>
          <p className="text-muted">This section is coming in the next phase.</p>
        </div>
      </div>
    </section>
  );
}
