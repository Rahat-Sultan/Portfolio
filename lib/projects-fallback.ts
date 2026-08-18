import type { Database } from "@/types/database";

export type Project = Database["public"]["Tables"]["projects"]["Row"];

export const fallbackProjects: Project[] = [
  {
    id: "fallback-cnn",
    title: "Image Classification with CNNs",
    description:
      "Selected and preprocessed image datasets (CIFAR-10, MNIST, and custom datasets), then designed and trained CNN architectures. Tuned hyperparameters and regularization techniques to improve accuracy, and iterated on architecture based on test-set evaluation.",
    tech_stack: ["Python", "CNN", "CIFAR-10", "MNIST", "Machine Learning"],
    image_url: null,
    live_url: null,
    github_url: null,
    featured: true,
    created_at: "2024-05-01T00:00:00.000Z",
  },
  {
    id: "fallback-network",
    title: "Hierarchical Computer Network Design",
    description:
      "Designed a hierarchical network combining wired and wireless connectivity, assigning a unique IP address to each device. Built a scalable bus topology to support future growth while optimizing traffic flow and reducing congestion.",
    tech_stack: ["Networking", "TCP/IP", "Cisco", "Network Design"],
    image_url: null,
    live_url: null,
    github_url: null,
    featured: false,
    created_at: "2023-10-01T00:00:00.000Z",
  },
  {
    id: "fallback-db",
    title: "Movie Theater Database Management System",
    description:
      "Designed and implemented a SQL/MySQL database to manage movie schedules, ticket sales, and customer records. Wrote optimized queries and enforced data integrity to streamline the ticket booking process.",
    tech_stack: ["SQL", "MySQL", "Database Design"],
    image_url: null,
    live_url: null,
    github_url: null,
    featured: false,
    created_at: "2023-01-01T00:00:00.000Z",
  },
  {
    id: "fallback-portfolio",
    title: "Portfolio Website",
    description:
      "This dynamic portfolio site — built with Next.js, Tailwind CSS, and Supabase. Features a 4-theme switcher, projects showcase fetched from a database, contact form with validation, and a protected admin panel.",
    tech_stack: ["Next.js", "Tailwind CSS", "Supabase", "TypeScript"],
    image_url: null,
    live_url: null,
    github_url: null,
    featured: true,
    created_at: "2026-01-01T00:00:00.000Z",
  },
];
