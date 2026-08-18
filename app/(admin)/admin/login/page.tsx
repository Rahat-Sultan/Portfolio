import AdminLoginForm from "@/components/admin/AdminLoginForm";

export const dynamic = "force-dynamic";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-8">
        <h1 className="mb-2 text-2xl font-bold">Admin login</h1>
        <p className="mb-6 text-sm text-muted">
          Sign in to manage projects and read contact messages.
        </p>
        <AdminLoginForm />
      </div>
    </div>
  );
}
