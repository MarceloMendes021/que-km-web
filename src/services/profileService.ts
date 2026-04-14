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

export async function updateProfile(data: UpdateProfilePayload) {
  const response = await api.patch("/api/profile", data);
  return response.data;
}
export interface UpdateProfilePayload {
  display_name?: string;
  phone?: string | null;
}
