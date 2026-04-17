import api from "@/services/apiClient";

export interface UserProfile {
  displayName: string;
  avatarUrl: string | null;
  phone: string | null;
}

export async function getProfile(): Promise<UserProfile> {
  const response = await api.get("/api/profile");
  const data = response.data;
  return {
    displayName: data.display_name,
    avatarUrl: data.avatar_url,
    phone: data.phone,
  };
}

export async function updateProfile(data: UpdateProfilePayload) {
  const response = await api.patch("/api/profile", data);
  return response.data;
}
export interface UpdateProfilePayload {
  display_name?: string;
  phone?: string | null;
}
