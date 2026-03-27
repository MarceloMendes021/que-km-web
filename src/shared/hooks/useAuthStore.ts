import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthUser {
  name: string;
  avatarUrl: string | null;
}

interface AuthStore {
  isAuthenticated: boolean;
  user: AuthUser | null;
  login: (user: AuthUser) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: (user) => set({ isAuthenticated: true, user }),
      logout: () => set({ isAuthenticated: false, user: null }),
    }),
    { name: "auth-store" },
  ),
);
