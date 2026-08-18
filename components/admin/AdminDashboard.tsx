"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/types/database";

type Project = Database["public"]["Tables"]["projects"]["Row"];
type Message = Database["public"]["Tables"]["messages"]["Row"];

type Tab = "projects" | "messages";

type AdminDashboardProps = {
  initialProjects: Project[];
  initialMessages: Message[];
};

// ─── Shared style constants ────────────────────────────────────────────────
const inputCls =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted/70 focus:border-accent";
const labelCls = "mb-1.5 block text-sm font-medium";
const btnPrimary =
  "inline-flex items-center justify-center rounded-full bg-accent px-5 py-2 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-60";
const btnSecondary =
  "inline-flex items-center justify-center rounded-full border border-border px-5 py-2 text-sm font-medium transition-colors hover:border-border-strong hover:bg-hover disabled:cursor-not-allowed disabled:opacity-60";
const btnDanger =
  "inline-flex items-center justify-center rounded-full border border-red-500/40 px-4 py-2 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-60";

// ─── Empty project form state ──────────────────────────────────────────────
const emptyForm = {
  title: "",
  description: "",
  tech_stack: "",
  image_url: "",
  live_url: "",
  github_url: "",
  featured: false,
};

export default function AdminDashboard({
  initialProjects,
  initialMessages,
}: AdminDashboardProps) {
  const [tab, setTab] = useState<Tab>("projects");
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  // Project form state
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [formStatus, setFormStatus] = useState<"idle" | "saving" | "error">("idle");
  const [formError, setFormError] = useState("");

  // Deletion state
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const supabase = createClient();
  const unreadCount = messages.filter((m) => !m.read).length;

  // ── Helpers ────────────────────────────────────────────────────────────
  function openNewForm() {
    setEditingId(null);
    setForm(emptyForm);
    setFormError("");
    setFormStatus("idle");
    setShowForm(true);
  }

  function openEditForm(project: Project) {
    setEditingId(project.id);
    setForm({
      title: project.title,
      description: project.description,
      tech_stack: project.tech_stack.join(", "),
      image_url: project.image_url ?? "",
      live_url: project.live_url ?? "",
      github_url: project.github_url ?? "",
      featured: project.featured,
    });
    setFormError("");
    setFormStatus("idle");
    setShowForm(true);
  }

  function cancelForm() {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  }

  // ── Project CRUD ───────────────────────────────────────────────────────
  async function handleSaveProject() {
    if (!form.title.trim() || !form.description.trim()) {
      setFormError("Title and description are required.");
      return;
    }

    setFormStatus("saving");
    setFormError("");

    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      tech_stack: form.tech_stack
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      image_url: form.image_url.trim() || null,
      live_url: form.live_url.trim() || null,
      github_url: form.github_url.trim() || null,
      featured: form.featured,
    };

    if (editingId) {
      const { data, error } = await supabase
        .from("projects")
        .update(payload)
        .eq("id", editingId)
        .select()
        .single();

      if (error) {
        setFormStatus("error");
        setFormError(error.message);
        return;
      }

      setProjects((prev) => prev.map((p) => (p.id === editingId ? data : p)));
    } else {
      const { data, error } = await supabase
        .from("projects")
        .insert(payload)
        .select()
        .single();

      if (error) {
        setFormStatus("error");
        setFormError(error.message);
        return;
      }

      setProjects((prev) => [data, ...prev]);
    }

    setFormStatus("idle");
    cancelForm();
  }

  async function handleDeleteProject(id: string) {
    setDeletingId(id);
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (!error) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
    }
    setDeletingId(null);
  }

  // ── Message helpers ────────────────────────────────────────────────────
  async function handleToggleRead(message: Message) {
    const { data, error } = await supabase
      .from("messages")
      .update({ read: !message.read })
      .eq("id", message.id)
      .select()
      .single();

    if (!error && data) {
      setMessages((prev) => prev.map((m) => (m.id === message.id ? data : m)));
    }
  }

  async function handleDeleteMessage(id: string) {
    const { error } = await supabase.from("messages").delete().eq("id", id);
    if (!error) {
      setMessages((prev) => prev.filter((m) => m.id !== id));
    }
  }

  // ── Render ─────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      {/* Stats row */}
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Total projects" value={projects.length} />
        <StatCard label="Total messages" value={messages.length} />
        <StatCard
          label="Unread messages"
          value={unreadCount}
          highlight={unreadCount > 0}
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-xl border border-border bg-surface p-1 w-fit">
        <TabButton active={tab === "projects"} onClick={() => setTab("projects")}>
          Projects
        </TabButton>
        <TabButton active={tab === "messages"} onClick={() => setTab("messages")}>
          Messages
          {unreadCount > 0 && (
            <span className="ml-1.5 rounded-full bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground">
              {unreadCount}
            </span>
          )}
        </TabButton>
      </div>

      {/* ── Projects tab ─────────────────────────────────────────────── */}
      {tab === "projects" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Projects</h2>
            {!showForm && (
              <button type="button" onClick={openNewForm} className={btnPrimary}>
                + Add project
              </button>
            )}
          </div>

          {/* Project form */}
          {showForm && (
            <div className="rounded-2xl border border-border bg-surface p-6 space-y-4">
              <h3 className="text-base font-semibold">
                {editingId ? "Edit project" : "New project"}
              </h3>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelCls}>
                    Title <span className="text-accent">*</span>
                  </label>
                  <input
                    className={inputCls}
                    value={form.title}
                    onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                    placeholder="My awesome project"
                  />
                </div>

                <div>
                  <label className={labelCls}>Tech stack (comma-separated)</label>
                  <input
                    className={inputCls}
                    value={form.tech_stack}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, tech_stack: e.target.value }))
                    }
                    placeholder="Next.js, TypeScript, Supabase"
                  />
                </div>
              </div>

              <div>
                <label className={labelCls}>
                  Description <span className="text-accent">*</span>
                </label>
                <textarea
                  className={`${inputCls} resize-y`}
                  rows={3}
                  value={form.description}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, description: e.target.value }))
                  }
                  placeholder="What this project does and what makes it interesting…"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className={labelCls}>Image URL</label>
                  <input
                    className={inputCls}
                    value={form.image_url}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, image_url: e.target.value }))
                    }
                    placeholder="https://…"
                  />
                </div>
                <div>
                  <label className={labelCls}>Live URL</label>
                  <input
                    className={inputCls}
                    value={form.live_url}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, live_url: e.target.value }))
                    }
                    placeholder="https://…"
                  />
                </div>
                <div>
                  <label className={labelCls}>GitHub URL</label>
                  <input
                    className={inputCls}
                    value={form.github_url}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, github_url: e.target.value }))
                    }
                    placeholder="https://github.com/…"
                  />
                </div>
              </div>

              <label className="flex cursor-pointer items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, featured: e.target.checked }))
                  }
                  className="h-4 w-4 rounded border-border accent-accent"
                />
                Mark as featured
              </label>

              {formError && (
                <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                  {formError}
                </p>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleSaveProject}
                  disabled={formStatus === "saving"}
                  className={btnPrimary}
                >
                  {formStatus === "saving" ? "Saving…" : editingId ? "Update" : "Add project"}
                </button>
                <button
                  type="button"
                  onClick={cancelForm}
                  className={btnSecondary}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Projects list */}
          {projects.length === 0 ? (
            <EmptyState message="No projects yet. Add your first one above." />
          ) : (
            <div className="space-y-3">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-5 sm:flex-row sm:items-start sm:justify-between"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold">{project.title}</h3>
                      {project.featured && (
                        <span className="rounded-full bg-accent/15 px-2 py-0.5 text-xs font-medium text-accent">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="mt-1 line-clamp-2 text-sm text-muted">
                      {project.description}
                    </p>
                    {project.tech_stack.length > 0 && (
                      <ul className="mt-2 flex flex-wrap gap-1.5">
                        {project.tech_stack.map((tech) => (
                          <li
                            key={tech}
                            className="rounded-full border border-border bg-background px-2.5 py-0.5 text-xs text-muted"
                          >
                            {tech}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="flex shrink-0 gap-2">
                    <button
                      type="button"
                      onClick={() => openEditForm(project)}
                      className={btnSecondary}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      disabled={deletingId === project.id}
                      onClick={() => handleDeleteProject(project.id)}
                      className={btnDanger}
                    >
                      {deletingId === project.id ? "Deleting…" : "Delete"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Messages tab ─────────────────────────────────────────────── */}
      {tab === "messages" && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">
            Messages
            {unreadCount > 0 && (
              <span className="ml-2 text-sm font-normal text-muted">
                ({unreadCount} unread)
              </span>
            )}
          </h2>

          {messages.length === 0 ? (
            <EmptyState message="No messages yet." />
          ) : (
            <div className="space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`rounded-2xl border bg-surface p-5 transition-colors ${
                    message.read ? "border-border" : "border-accent/40"
                  }`}
                >
                  <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{message.name}</span>
                        {!message.read && (
                          <span className="rounded-full bg-accent/15 px-2 py-0.5 text-xs font-medium text-accent">
                            New
                          </span>
                        )}
                      </div>
                      <div className="mt-0.5 flex flex-wrap gap-x-3 text-sm text-muted">
                        <a
                          href={`mailto:${message.email}`}
                          className="hover:text-foreground transition-colors"
                        >
                          {message.email}
                        </a>
                        {message.company && <span>{message.company}</span>}
                        <span>{formatDate(message.created_at)}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleToggleRead(message)}
                        className={btnSecondary}
                      >
                        {message.read ? "Mark unread" : "Mark read"}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteMessage(message.id)}
                        className={btnDanger}
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-muted">
                    {message.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Small sub-components ──────────────────────────────────────────────────

function StatCard({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: number;
  highlight?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <p className="text-sm text-muted">{label}</p>
      <p
        className={`mt-1 text-3xl font-bold ${highlight ? "text-accent" : ""}`}
      >
        {value}
      </p>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
        active
          ? "bg-background text-foreground shadow-sm"
          : "text-muted hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-border p-12 text-center text-sm text-muted">
      {message}
    </div>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
