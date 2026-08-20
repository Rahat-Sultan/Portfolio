"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import SectionHeading from "@/components/SectionHeading";
import { about, profile } from "@/lib/portfolio";
import { fadeUp, slideInRight, staggerContainer, viewport } from "@/lib/animations";

export default function About() {
  return (
    <section className="px-6 py-10 pt-4">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          id="about"
          label="About"
          title="A bit about me"
          description="Engineer, builder, and lifelong learner."
        />

        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Bio paragraphs — staggered */}
          <motion.div
            className="space-y-4 text-muted leading-relaxed"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {about.paragraphs.map((paragraph) => (
              <motion.p key={paragraph.slice(0, 24)} variants={fadeUp}>
                {paragraph}
              </motion.p>
            ))}
          </motion.div>

          {/* Photo + quick facts — slide in from right */}
          <motion.aside
            className="space-y-4"
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <div className="relative mx-auto h-48 w-48 lg:mx-0">
              <Image
                src="/profile.jpg"
                alt={`${profile.name} profile photo`}
                fill
                className="rounded-2xl object-cover border border-border"
              />
            </div>

            <div className="rounded-2xl border border-border bg-surface p-6">
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
                  <dd className="mt-1 font-medium">Full-stack web development</dd>
                </div>
              </dl>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
