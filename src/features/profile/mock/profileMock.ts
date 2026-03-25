export type UserProfile = {
  displayName: string;
  email: string;
  phone: string;
  avatarUrl: string | null;
};

export const profileMock: UserProfile = {
  displayName: "Marcelo",
  email: "marcelo@email.com",
  phone: "(11) 99999-9999",
  avatarUrl: null,
};
