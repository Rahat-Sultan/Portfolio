"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import type { Project } from "@/lib/projects";
import { fadeUp } from "@/lib/animations";

type ProjectCardProps = {
  project: Project;
};

const SLIDE_INTERVAL_MS = 4000;

export default function ProjectCard({ project }: ProjectCardProps) {
  const hasLinks = project.live_url || project.github_url;
  const images = project.images?.length ? project.images : null;
  const isMultiImage = images && images.length > 1;

  const [currentIndex, setCurrentIndex] = useState(0);
  const prefersReducedMotion = useRef(false);

  // Detect reduced-motion once on mount (client only)
  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  // Auto-cycling interval — only when multiple images exist
  useEffect(() => {
    if (!isMultiImage) return;
    if (prefersReducedMotion.current) return;

    const interval = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % images.length);
    }, SLIDE_INTERVAL_MS);

    // Pause when tab is hidden
    function handleVisibilityChange() {
      if (document.visibilityState === "hidden") {
        clearInterval(interval);
      }
    }
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isMultiImage, images]);

  // Determine the cover image src for the non-multi-image path
  const singleSrc = images ? images[0] : project.image_url;

  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface"
    >
      {/* Image area */}
      <div className="relative aspect-video w-full overflow-hidden border-b border-border bg-background">

        {isMultiImage ? (
          // ── Multi-image: animated crossfade slideshow ──────────────────
          <>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={images[currentIndex]}
                  alt={`${project.title} — image ${currentIndex + 1} of ${images.length}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority={currentIndex === 0}
                />
              </motion.div>
            </AnimatePresence>

            {/* Dot indicators */}
            <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
              {images.map((_, i) => (
                <span
                  key={i}
                  className={`block h-1.5 rounded-full transition-all duration-300 ${
                    i === currentIndex
                      ? "w-4 bg-white"
                      : "w-1.5 bg-white/50"
                  }`}
                />
              ))}
            </div>
          </>
        ) : singleSrc ? (
          // ── Single image ───────────────────────────────────────────────
          <Image
            src={singleSrc}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        ) : (
          // ── Letter placeholder ─────────────────────────────────────────
          <div className="flex h-full items-center justify-center bg-accent/10">
            <span className="text-5xl font-bold text-accent">
              {project.title.charAt(0)}
            </span>
          </div>
        )}

        {/* Featured badge — always on top */}
        {project.featured ? (
          <span className="absolute left-4 top-4 z-10 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
            Featured
          </span>
        ) : null}
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-2 text-xl font-semibold">{project.title}</h3>
        <p className="mb-4 flex-1 text-sm leading-relaxed text-muted">
          {project.description}
        </p>

        <ul className="mb-5 flex flex-wrap gap-2">
          {project.tech_stack.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted"
            >
              {tech}
            </li>
          ))}
        </ul>

        {hasLinks ? (
          <div className="flex flex-wrap gap-3">
            {project.live_url ? (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90"
              >
                Live demo
              </a>
            ) : null}
            {project.github_url ? (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-border-strong hover:bg-hover"
              >
                GitHub
              </a>
            ) : null}
          </div>
        ) : (
          <p className="text-xs text-muted">Links coming soon</p>
        )}
      </div>
    </motion.article>
  );
}
