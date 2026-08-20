"use client";

import { motion } from "framer-motion";

import ProjectCard from "@/components/ProjectCard";
import { staggerContainer, viewport } from "@/lib/animations";
import type { Project } from "@/lib/projects";

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  return (
    <motion.div
      className="grid gap-6 md:grid-cols-2"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </motion.div>
  );
}
