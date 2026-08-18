-- Seed data for the projects table.
-- Run this in Supabase SQL Editor AFTER running schema.sql.

insert into public.projects (title, description, tech_stack, featured, live_url, github_url)
values
  (
    'RAG Web Application',
    'A retrieval-augmented generation website built with Next.js and React. Users can query a custom knowledge base and get AI-powered answers backed by vector search.',
    array['Next.js', 'React', 'Supabase', 'TypeScript', 'Vercel'],
    true,
    null,
    null
  ),
  (
    'Portfolio Website',
    'A dynamic CV site built with Next.js, Tailwind CSS, and Supabase. Features theme switching, a projects showcase, and a contact form for recruiters.',
    array['Next.js', 'Tailwind CSS', 'Supabase', 'TypeScript'],
    true,
    null,
    null
  );
