import SectionHeading from "@/components/SectionHeading";
import { about, profile } from "@/lib/portfolio";

export default function About() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          id="about"
          label="About"
          title="A bit about me"
          description="Engineer, builder, and lifelong learner."
        />

        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4 text-muted leading-relaxed">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>

          <aside className="rounded-2xl border border-border bg-surface p-6">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Quick facts
            </h3>
            <dl className="space-y-4 text-sm">
              <div>
                <dt className="text-muted">Location</dt>
                <dd className="mt-1 font-medium">{profile.location}</dd>
              </div>
              <div>
                <dt className="text-muted">Email</dt>
                <dd className="mt-1 font-medium">
                  <a
                    href={`mailto:${profile.email}`}
                    className="transition-colors hover:text-accent"
                  >
                    {profile.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-muted">Focus</dt>
                <dd className="mt-1 font-medium">
                  Full-stack web development
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </div>
    </section>
  );
}
