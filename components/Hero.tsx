import Image from "next/image";
import { profile } from "@/lib/portfolio";

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-20 sm:pt-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full blur-3xl"
          style={{ backgroundColor: "var(--glow)" }}
        />
      </div>

      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col-reverse items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
          {/* Text content */}
          <div className="flex-1">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-sm text-muted backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Available for opportunities
            </p>

            <h1 className="mb-4 max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
              Hi, I&apos;m {profile.name}
              <span className="block text-muted sm:mt-2 sm:text-5xl">
                {profile.title}
              </span>
            </h1>

            <p className="mb-8 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
              {profile.tagline}
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#projects"
                className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90"
              >
                View my work
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:border-border-strong hover:bg-hover"
              >
                Get in touch
              </a>
              <a
                href={profile.resumeUrl}
                className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium text-muted transition-colors hover:text-foreground"
              >
                Download resume
              </a>
            </div>
          </div>

          {/* Profile picture */}
          <div className="shrink-0">
            <div className="relative h-32 w-32 sm:h-44 sm:w-44">
              <div
                className="absolute inset-0 rounded-full blur-xl opacity-40"
                style={{ backgroundColor: "var(--glow)" }}
              />
              <Image
                src="/profile.jpg"
                alt={`${profile.name} profile photo`}
                fill
                className="relative rounded-full object-cover border-2 border-border"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
