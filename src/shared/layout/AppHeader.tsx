import { UserMenu } from "./UserMenu";

export function AppHeader() {
  return (
    <header className="flex items-center justify-between border-b border-(--border) px-4 pb-4 pt-2">
      <img src="/Logo-Que-KM-é-esse.png" alt="Logo Que KM é esse" className="h-14 w-auto object-contain" />

      <UserMenu />
    </header>
  );
}
