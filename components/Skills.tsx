"use client";

import { motion } from "framer-motion";

import SectionHeading from "@/components/SectionHeading";
import { skillGroups } from "@/lib/portfolio";
import { fadeUp, staggerContainer, viewport } from "@/lib/animations";

export default function Skills() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          id="skills"
          label="Skills"
          title="Technologies I work with"
          description="Tools and frameworks I use to design, build, and ship web applications."
        />

        <motion.div
          className="grid gap-6 md:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {skillGroups.map((group) => (
            <motion.article
              key={group.category}
              variants={fadeUp}
              className="rounded-2xl border border-border bg-surface p-6"
            >
              <h3 className="mb-4 text-lg font-semibold">{group.category}</h3>
              <ul className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full border border-border bg-background px-3 py-1 text-sm text-muted"
                  >
                    {skill}
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
