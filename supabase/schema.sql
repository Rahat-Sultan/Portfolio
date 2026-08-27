-- Run this in the Supabase SQL Editor to set up your database.

-- ─── Storage bucket for project images ────────────────────────────────────
insert into storage.buckets (id, name, public)
values ('project-images', 'project-images', true)
on conflict (id) do nothing;

create policy "Public read access"
  on storage.objects for select
  using ( bucket_id = 'project-images' );

create policy "Authenticated users can upload"
  on storage.objects for insert
  to authenticated
  with check ( bucket_id = 'project-images' );

create policy "Authenticated users can delete"
  on storage.objects for delete
  to authenticated
  using ( bucket_id = 'project-images' );

-- ─── Tables ────────────────────────────────────────────────────────────────

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  tech_stack text[] not null default '{}',
  image_url text,
  images text[] not null default '{}',
  live_url text,
  github_url text,
  featured boolean not null default false,
  created_at timestamptz not null default now()
);

-- Migration: add images column to existing projects tables
alter table public.projects add column if not exists images text[] not null default '{}';

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  message text not null,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.profile (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  title text not null,
  bio text not null,
  avatar_url text,
  skills text[] not null default '{}',
  social_links jsonb not null default '{}',
  created_at timestamptz not null default now()
);

-- Public read access for projects and profile
alter table public.projects enable row level security;
alter table public.messages enable row level security;
alter table public.profile enable row level security;

create policy "Anyone can read projects"
  on public.projects for select
  using (true);

create policy "Anyone can read profile"
  on public.profile for select
  using (true);

create policy "Anyone can submit contact messages"
  on public.messages for insert
  with check (true);

-- Admin policies (authenticated users only) — we'll refine in Phase 6
create policy "Authenticated users can manage projects"
  on public.projects for all
  using (auth.role() = 'authenticated');

create policy "Authenticated users can read messages"
  on public.messages for select
  using (auth.role() = 'authenticated');

create policy "Authenticated users can manage profile"
  on public.profile for all
  using (auth.role() = 'authenticated');
