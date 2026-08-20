"use client";

import { motion } from "framer-motion";

import SectionHeading from "@/components/SectionHeading";
import { experience } from "@/lib/portfolio";
import { slideInLeft, staggerContainer, viewport } from "@/lib/animations";

export default function Experience() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          id="experience"
          label="Experience"
          title="What I've been building"
          description="Projects and experience that reflect how I work and what I've learned."
        />

        <motion.div
          className="space-y-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {experience.map((item) => (
            <motion.article
              key={item.title}
              variants={slideInLeft}
              className="rounded-2xl border border-border bg-surface p-6 sm:p-8"
            >
              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-muted">{item.organization}</p>
                </div>
                <p className="text-sm text-muted">{item.period}</p>
              </div>

              <p className="mb-4 text-muted leading-relaxed">{item.description}</p>

              <ul className="space-y-2 text-sm text-muted">
                {item.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-2">
                    <span className="text-accent">▹</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
