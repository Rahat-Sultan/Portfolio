# Portfolio Website — Project Specification

## 1. Project Goal

Build a proper full-stack personal portfolio using **Next.js, React, Tailwind CSS, Supabase, and Vercel**.

The project should be dynamic rather than a collection of static JSON files. Projects should be stored in Supabase and manageable through a protected admin panel.

---

## 2. Technology Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14+ with App Router |
| UI | React Components |
| Styling | Tailwind CSS |
| Database | Supabase |
| Authentication | Supabase Auth |
| Deployment | Vercel |
| Contact handling | Next.js API Route / Server Action |
| Optional email alerts | Resend or Supabase Edge Function |
| Optional chatbot | Existing RAG pipeline |

### Environment

Use `.env.local` for Supabase keys and other secrets.

**Never commit `.env.local` to Git.**

---

## 3. High-Level Architecture

The application is divided into these phases:

1. Plan & Setup
2. Next.js Scaffold
3. Layout & Design System
4. Core Sections
5. Supabase Backend
6. Contact + Admin
7. Polish & Deploy
8. Optional Upgrades

---

## 4. Required Project Structure

```text
Portfolio/
├── app/
│   ├── layout.tsx
│   │   └── Root layout, fonts, metadata
│   ├── page.tsx
│   │   └── Home page containing all main sections
│   ├── admin/
│   │   └── page.tsx
│   │       └── Protected page for adding/editing projects
│   └── api/
│       └── contact/
│           └── route.ts
│               └── Handles contact form submission
│
├── components/
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Projects.tsx
│   │   └── Fetches projects from Supabase
│   ├── Skills.tsx
│   ├── Experience.tsx
│   ├── Contact.tsx
│   │   └── Contact form connected to Supabase
│   └── Footer.tsx
│
├── lib/
│   └── supabase.ts
│       └── Supabase client
│
├── public/
│   ├── profile.jpg
│   └── resume.pdf
│
├── .env.local
│   └── Supabase keys; never commit
│
└── package.json
```

Keep the project organized according to this structure unless a technical requirement makes a change necessary.

---

## 5. Main Website Sections

### Header

Create the site's navigation/header.

### Hero

The landing/intro section.

### About

Present personal/profile information.

### Projects

Display projects dynamically from the Supabase `projects` table.

Projects should not be hardcoded into the application.

### Skills

Display technical skills.

### Experience

Display professional/technical experience.

### Contact

Provide a form allowing visitors to submit:

- Name
- Email
- Message

The submission must be stored in Supabase.

### Footer

Provide the site's footer content and relevant links.

---

## 6. Supabase Data Model

Create the following tables.

### `projects`

| Field | Type |
|---|---|
| `id` | UUID, primary key |
| `title` | string |
| `description` | string |
| `tech_stack` | string |
| `image_url` | string |
| `live_url` | string |
| `github_url` | string |
| `featured` | boolean |
| `created_at` | timestamp |

### `messages`

| Field | Type |
|---|---|
| `id` | UUID, primary key |
| `name` | string |
| `email` | string |
| `company` | text |
| `message` | text |
| `read` | boolean |
| `created_at` | timestamp |

### `profile`

| Field | Type |
|---|---|
| `id` | UUID, primary key |
| `name` | string |
| `title` | text |
| `bio` | string |
| `avatar_url` | string |
| `skills` | JSONB |
| `social_links` | JSONB |

---

## 7. Dynamic Project Management

The portfolio must support project management through the admin page.

The admin should be able to:

- Add projects
- Edit existing projects
- View existing projects
- Manage project information without modifying source code

Project fields should include:

- Title
- Description
- Image
- Technology stack
- Live URL
- GitHub URL
- Featured status

When a project is saved to Supabase, it should automatically become available to the homepage's Projects section.

This dynamic Supabase-backed project system is an important requirement.

---

## 8. Contact Flow

Implement the following flow:

```text
Visitor
   ↓
Contact Form
   ↓
Validate Input
   ↓
POST /api/contact
   ↓
Supabase
   ↓
messages table
   ↓
Success Response
   ↓
"Thanks! I'll get back to you."
```

The contact form should submit visitor information to the API route.

The API route should validate the input and insert the message into the `messages` table.

Messages should then be viewable through the admin/Supabase dashboard.

Optional:

- Send an email notification using Resend.
- Alternatively use a Supabase Edge Function for notification handling.

---

## 9. Admin Flow

The admin area must be protected using Supabase Auth.

Expected flow:

```text
Visit /admin
   ↓
Logged in?
   ├── No → Supabase Auth login
   │
   └── Yes
        ↓
   Admin Dashboard
        ↓
   Add / Edit Projects
        ↓
   Save to Supabase
        ↓
   Projects appear on homepage
```

The admin dashboard should support:

- Adding new projects
- Editing existing projects
- Viewing projects
- Viewing contact messages

Use Supabase Auth to protect the admin area.

Use Row Level Security (RLS) policies where appropriate.

Secure the admin routes and database operations.

---

## 10. Development Phases

### Phase 0 — Plan & Setup

Tasks:

- Define Supabase data model
- Define website sections
- Refine requirements
- Make architecture decisions

Focus:

- Architecture
- Requirements
- Data modeling

---

### Phase 1 — Scaffold

Tasks:

- Create the Next.js application
- Configure Tailwind CSS
- Configure Supabase client
- Establish the initial project structure

Focus:

- Project setup
- Understanding the application structure

---

### Phase 2 — Layout

Tasks:

- Build Header
- Build Footer
- Create responsive page shell
- Establish reusable component structure

Focus:

- Component composition
- Responsive layout
- Design system

---

### Phase 3 — Core Sections

Build:

- Hero
- About
- Skills
- Experience

Focus:

- Static content
- Props
- Reusable components

Use the actual portfolio/profile information when implementing these sections.

---

### Phase 4 — Projects

Build the Projects section.

Requirements:

- Fetch projects from Supabase
- Render project cards dynamically
- Support featured projects
- Display project information and links

Focus:

- Server Components / data fetching where appropriate
- Supabase queries
- Debugging the Supabase connection

---

### Phase 5 — Contact

Build the Contact form.

Flow:

```text
Contact.tsx
   ↓
Validation
   ↓
API Route / Server Action
   ↓
Supabase messages table
```

Focus:

- Server Actions / API routes
- Input validation
- Error handling
- Successful form submission

---

### Phase 6 — Admin

Build an authentication-protected admin dashboard.

Requirements:

- Supabase Auth
- Protected routes
- CRUD operations for projects
- RLS policies
- Secure database access

Focus:

- Authentication
- Authorization
- CRUD
- Secure routes

---

### Phase 7 — Deploy

Deploy the application to Vercel.

Tasks:

- Configure production environment variables
- Deploy to Vercel
- Verify Supabase connectivity
- Test authentication
- Test project CRUD
- Test contact form

The deployment flow should follow the same general approach used for previous Vercel projects.

---

### Phase 8 — Polish

Improve:

- SEO
- Metadata
- Animations
- Resume download
- Responsive behavior
- Overall visual refinement

Optional technologies/features:

- Framer Motion
- Additional metadata
- More advanced animations


---

## 12. Beginner Plan vs Updated Architecture

Do **not** fall back to the beginner/static architecture.

| Beginner approach | Required updated approach |
|---|---|
| Plain HTML/CSS/JS | Next.js + React + Tailwind |
| Static project list in source code | Supabase-backed project list |
| Formspree | Supabase `messages` table |
| GitHub Pages | Vercel |
| No authentication | Supabase Auth |
| Static portfolio | Dynamic full-stack portfolio |

The goal is to reuse existing Next.js, Supabase, React, and Vercel knowledge and build a portfolio that demonstrates real full-stack patterns.

---

## 13. Optional RAG Chatbot

Only implement this after the core portfolio is complete and working.

Since the project can leverage an existing RAG experience, an optional chatbot can answer questions about the portfolio owner.

Example:

```text
Recruiter
   ↓
"What projects has Rahat built?"
   ↓
Chat widget
   ↓
RAG pipeline
   ↓
Portfolio bio + project data
   ↓
Answer
```

Potential data sources:

- Bio
- Projects
- Experience
- Skills

The RAG chatbot is **optional** and must come after the core portfolio is working.

---

## 14. IDE Agent Instructions

When implementing this project:

1. Follow the architecture and phase order defined in this document.
2. Use Next.js App Router.
3. Use reusable React components.
4. Use Tailwind CSS for styling.
5. Use Supabase for persistent portfolio data.
6. Do not hardcode the project list when the Supabase-backed Projects feature is being implemented.
7. Protect `/admin` with Supabase Auth.
8. Use secure database access and appropriate RLS policies.
9. Store contact submissions in the `messages` table.
10. Keep secrets in environment variables.
11. Never commit `.env.local`.
12. Keep optional features, especially the RAG chatbot, out of the core implementation until the main portfolio is functional.
13. Preserve the project structure unless there is a strong technical reason to change it.
14. Implement and verify each phase before moving to the next.
15. Prefer clean, maintainable, reusable code over unnecessary complexity.

---

## 15. Definition of Done

The core project is complete when:

- [ ] Next.js portfolio runs successfully.
- [ ] Responsive layout is implemented.
- [ ] Header and Footer work.
- [ ] Hero, About, Skills, and Experience sections are implemented.
- [ ] Projects are loaded dynamically from Supabase.
- [ ] Project links/images/details render correctly.
- [ ] Contact form validates input.
- [ ] Contact submissions are stored in Supabase.
- [ ] Admin authentication works.
- [ ] `/admin` is protected.
- [ ] Admin can add projects.
- [ ] Admin can edit projects.
- [ ] Admin can view projects/messages.
- [ ] Appropriate RLS/security policies are configured.
- [ ] Production environment variables are configured.
- [ ] Application deploys successfully to Vercel.
- [ ] Production functionality is tested.
- [ ] SEO/metadata and final UI polish are completed.

---

## 16. Future Enhancements

Possible future additions:

- Email alerts for new contact messages
- Analytics
- Blog
- RAG chatbot about the portfolio owner
- Additional animations
- More advanced admin functionality

These are secondary to the core portfolio and should not delay completion of the main application.
