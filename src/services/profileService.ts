import api from "@/services/apiClient";

export interface UserProfile {
  displayName: string;
  avatarUrl: string | null;
  phone: string | null;
}

export async function getProfile() {
  const response = await api.get("/api/profile");
  return response.data;
}

export async function updateProfile(data: Partial<UserProfile>) {
  const response = await api.patch("/api/profile", data);
  return response.data;
}
