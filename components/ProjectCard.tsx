"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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

  // Memoize so the array reference is stable across renders —
  // prevents the cycling useEffect from tearing down and restarting
  // every time the parent re-renders with a new project object reference.
  // Guard against undefined explicitly: the `images` column may not
  // exist on the live DB yet (if the ALTER TABLE migration hasn't been
  // run), in which case Supabase returns undefined even though the TS
  // type says string[].
  const images = useMemo<string[] | null>(
    () => {
      const raw = project.images;
      if (!raw || !Array.isArray(raw) || raw.length === 0) return null;
      return raw;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [project.id, project.images],
  );

  const isMultiImage = images !== null && images.length > 1;

  const [isHovered, setIsHovered] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const prefersReducedMotion = useRef(
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false,
  );

  // Hover-gated cycling interval — starts on hover, resets to image 0 on leave.
  // Reduced-motion: interval is skipped even on hover; image 1 stays static.
  useEffect(() => {
    if (!isMultiImage) return;
    if (!isHovered) {
      setCurrentIndex(0); // always reset to first image when not hovered
      return;
    }
    if (prefersReducedMotion.current) return;

    const imgs = images as string[];
    const interval = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % imgs.length);
    }, SLIDE_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [isHovered, isMultiImage, images]);

  // Resolve the single-image src (used when not multi-image)
  const singleSrc = images ? images[0] : project.image_url;

  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface"
    >
      {/* Image area */}
      <div
        className="relative aspect-video w-full overflow-hidden border-b border-border bg-background"
        onMouseEnter={isMultiImage ? () => setIsHovered(true) : undefined}
        onMouseLeave={isMultiImage ? () => setIsHovered(false) : undefined}
      >
        {isMultiImage && images ? (
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

            {/* Preload the next image so the upcoming crossfade
                doesn't flash/wait on a fresh network fetch */}
            <Image
              src={images[(currentIndex + 1) % images.length]}
              alt=""
              width={1}
              height={1}
              className="hidden"
              aria-hidden="true"
              priority={false}
              loading="eager"
            />

            {/* Dot indicators */}
            <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
              {images.map((_, i) => (
                <span
                  key={i}
                  className={`block h-1.5 rounded-full transition-all duration-300 ${
                    i === currentIndex ? "w-4 bg-white" : "w-1.5 bg-white/50"
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
