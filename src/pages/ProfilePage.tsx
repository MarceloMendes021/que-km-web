import { useState } from "react";
import { User, Phone } from "lucide-react";
import { AppHeader } from "@/shared/layout/AppHeader";
import { BottomTabBar } from "@/shared/layout/BottomTabBar";
import { PageHeader } from "@/shared/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProfile, updateProfile, type UserProfile, type UpdateProfilePayload } from "@/services/profileService";
import { useUser } from "@clerk/clerk-react";

export function ProfilePage() {
  const { data: profileData, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  const { user } = useUser();

  const [form, setForm] = useState<UserProfile | null>(null);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: UpdateProfilePayload) => updateProfile(data),
    onSuccess: async () => {
      setSaved(true);
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      if (form?.displayName) {
        await user?.update({ firstName: form.displayName });
      }
    },
  });

  const [saved, setSaved] = useState(false);

  const currentForm = form ?? profileData ?? null;

  if (isLoading)
    return (
      <main className="min-h-dvh bg-(--background) flex items-center justify-center">
        <p className="text-sm text-(--text-secondary)">Carregando...</p>
      </main>
    );
  if (!currentForm) return null;

  const initial = currentForm.displayName?.charAt(0).toUpperCase() || "?";

  function handleSave() {
    if (!form) return;
    mutation.mutate({
      display_name: form.displayName,
      phone: form.phone,
    });
  }

  return (
    <main className="min-h-dvh bg-(--background) pt-24 pb-28 text-(--text-primary)">
      <AppHeader />

      <PageHeader title="Perfil" subtitle="Suas informações pessoais" icon={<User size={28} />} showBackButton={false} />

      <section className="mt-4 px-4 space-y-6">
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-(--primary)/15 border-2 border-(--primary)/30">
            <span className="text-4xl font-bold text-(--primary)">{initial}</span>
          </div>
          <p className="text-xs text-(--text-secondary)">Toque para alterar a foto</p>
        </div>

        <div className="rounded-(--radius-card) border border-(--border) bg-(--surface) divide-y divide-(--border)">
          <div className="flex items-center gap-3 px-4 py-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-(--primary)/10">
              <User size={16} className="text-(--primary)" />
            </div>
            <div className="flex flex-col flex-1 gap-1">
              <span className="text-xs text-(--text-secondary)">Como quer ser chamado</span>
              <input
                type="text"
                placeholder="Seu nome"
                value={currentForm.displayName}
                onChange={(e) => setForm((prev) => ({ ...(prev ?? currentForm), displayName: e.target.value }))}
                className="bg-transparent text-sm font-medium text-(--text-primary) outline-none placeholder:text-(--text-secondary)"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 px-4 py-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-(--primary)/10">
              <Phone size={16} className="text-(--primary)" />
            </div>
            <div className="flex flex-col flex-1 gap-1">
              <span className="text-xs text-(--text-secondary)">Telefone</span>
              <input
                type="tel"
                placeholder="(00) 00000-0000"
                value={currentForm.phone ?? ""}
                onChange={(e) => setForm((prev) => ({ ...(prev ?? currentForm), phone: e.target.value }))}
                className="bg-transparent text-sm font-medium text-(--text-primary) outline-none placeholder:text-(--text-secondary)"
              />
            </div>
          </div>
        </div>

        <Button onClick={handleSave} className="w-full h-12 rounded-xl bg-(--primary) font-semibold text-white hover:bg-(--primary)/90">
          {saved ? "Salvo!" : "Salvar alterações"}
        </Button>
      </section>

      <BottomTabBar />
    </main>
  );
}
