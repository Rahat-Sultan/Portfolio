"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import type { Project } from "@/lib/projects";
import { fadeUp } from "@/lib/animations";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const hasLinks = project.live_url || project.github_url;

  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface"
    >
      <div className="relative aspect-video w-full overflow-hidden border-b border-border bg-background">
        {project.images?.length ? (
          <Image
            src={project.images[0]}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : project.image_url ? (
          <Image
            src={project.image_url}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-accent/10">
            <span className="text-5xl font-bold text-accent">
              {project.title.charAt(0)}
            </span>
          </div>
        )}

        {project.featured ? (
          <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
            Featured
          </span>
        ) : null}
      </div>

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
