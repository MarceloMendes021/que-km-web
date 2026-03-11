import type { ReactNode } from "react";

type AppHeaderProps = {
  rightContent?: ReactNode;
};

export function AppHeader({ rightContent }: AppHeaderProps) {
  return (
    <header className="flex items-center justify-between">
      {/* Logo principal do aplicativo */}
      <div className="flex items-center">
        <img src="/Logo-Que-KM-é-esse.png" alt="Logo Que KM é esse" className="h-16 w-auto object-contain " />
      </div>

      <div>{rightContent}</div>
    </header>
  );
}
