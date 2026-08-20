import { profile } from "@/lib/portfolio";
import SocialIcons from "@/components/SocialIcons";

export default function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 text-sm text-muted sm:flex-row">
        <p>
          &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
        <SocialIcons />
      </div>
    </footer>
  );
}
