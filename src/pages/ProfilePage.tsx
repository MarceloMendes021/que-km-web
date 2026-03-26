import { useState, useRef } from "react";
import { User, Mail, Phone, Camera } from "lucide-react";
import { AppHeader } from "@/shared/layout/AppHeader";
import { BottomTabBar } from "@/shared/layout/BottomTabBar";
import { PageHeader } from "@/shared/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getProfile, type UserProfile } from "@/services/profileService";

export function ProfilePage() {
  const { data: profileData } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  const [profile, setProfile] = useState<UserProfile | null>(profileData ?? null);
  const [preview, setPreview] = useState<string | null>(profileData?.avatarUrl ?? null);
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!profile) return null;

  const initial = profile.displayName?.charAt(0).toUpperCase() || "?";

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
  }

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <main className="min-h-dvh bg-(--background) pt-24 pb-28 text-(--text-primary)">
      <AppHeader />

      <PageHeader title="Perfil" subtitle="Suas informações pessoais" icon={<User size={28} />} showBackButton={false} />

      <section className="mt-4 px-4 space-y-6">
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="relative flex h-24 w-24 items-center justify-center rounded-full bg-(--primary)/15 overflow-hidden border-2 border-(--primary)/30"
            >
              {preview ? <img src={preview} alt="Avatar" className="h-full w-full object-cover" /> : <span className="text-4xl font-bold text-(--primary)">{initial}</span>}
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity rounded-full">
                <Camera size={20} className="text-white" />
              </div>
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
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
                value={profile.displayName}
                onChange={(e) => setProfile((prev) => (prev ? { ...prev, displayName: e.target.value } : prev))}
                className="bg-transparent text-sm font-medium text-(--text-primary) outline-none placeholder:text-(--text-secondary)"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 px-4 py-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-(--primary)/10">
              <Mail size={16} className="text-(--primary)" />
            </div>
            <div className="flex flex-col flex-1 gap-1">
              <span className="text-xs text-(--text-secondary)">E-mail</span>
              <input
                type="email"
                placeholder="seu@email.com"
                value={profile.email}
                onChange={(e) => setProfile((prev) => (prev ? { ...prev, displayName: e.target.value } : prev))}
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
                value={profile.phone}
                onChange={(e) => setProfile((prev) => (prev ? { ...prev, displayName: e.target.value } : prev))}
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
