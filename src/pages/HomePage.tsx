import { AppHeader } from "@/shared/components/AppHeader";
import { Menu } from "lucide-react";

export function HomePage() {
  return (
    <main className="min-h-dvh bg-(--background) px-6 py-4 text-(--text-primary)">
      <AppHeader
        rightContent={
          <button type="button" className="flex h-11 w-11 items-center justify-center rounded-full ">
            <Menu className="h-5 w-5 text-(--text-primary)" />
          </button>
        }
      />

      <section className="mt-6">
        <p className="text-(--text-secondary)">Home content</p>
      </section>
    </main>
  );
}
