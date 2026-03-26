import { profileMock } from "@/features/profile/mock/profileMock";
import type { UserProfile } from "@/features/profile/mock/profileMock";
export type { UserProfile };

export async function getProfile(): Promise<UserProfile> {
  await new Promise((r) => setTimeout(r, 300));
  return profileMock;
}

export async function updateProfile(data: Partial<UserProfile>): Promise<UserProfile> {
  await new Promise((r) => setTimeout(r, 300));

  Object.assign(profileMock, data);
  return profileMock;
}
