import { createClient } from "@/lib/supabase/server";
import { fallbackProjects, type Project } from "@/lib/projects-fallback";

function isSupabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

export async function getProjects(): Promise<Project[]> {
  if (!isSupabaseConfigured()) {
    return fallbackProjects;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Failed to fetch projects:", error.message);
      return fallbackProjects;
    }

    if (!data?.length) {
      return fallbackProjects;
    }

    return data;
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return fallbackProjects;
  }
}

export type { Project };
