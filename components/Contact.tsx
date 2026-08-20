"use client";

import { motion } from "framer-motion";

import ContactForm from "@/components/ContactForm";
import SectionHeading from "@/components/SectionHeading";
import SocialIcons from "@/components/SocialIcons";
import { profile } from "@/lib/portfolio";
import { fadeUp, slideInLeft, slideInRight, viewport } from "@/lib/animations";

export default function Contact() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          id="contact"
          label="Contact"
          title="Let's work together"
          description="Have a role or project in mind? Send me a message and I'll get back to you."
        />

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.aside
            className="rounded-2xl border border-border bg-surface p-6"
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <h3 className="mb-4 text-lg font-semibold">Get in touch</h3>
            <p className="mb-6 text-sm leading-relaxed text-muted">
              Whether you&apos;re hiring, collaborating, or just want to say
              hello — I&apos;d love to hear from you.
            </p>

            <dl className="space-y-4 text-sm">
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
                <dt className="text-muted">Location</dt>
                <dd className="mt-1 font-medium">{profile.location}</dd>
              </div>
              <div>
                <dt className="text-muted">Social</dt>
                <dd className="mt-2">
                  <SocialIcons iconClassName="h-5 w-5" />
                </dd>
              </div>
            </dl>
          </motion.aside>

          <motion.div
            className="rounded-2xl border border-border bg-surface p-6 sm:p-8"
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
