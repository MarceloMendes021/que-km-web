import { UserMenu } from "./UserMenu";

export function AppHeader() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 flex items-center justify-between border-b border-(--border) bg-(--background) px-4 py-4" style={{ willChange: "transform" }}>
      <img src="/Logo-Que-KM-é-esse.png" alt="Logo Que KM é esse" className="h-16 w-auto object-contain" />
      <UserMenu />
    </header>
  );
}
