import { useState } from "react";
import { Link } from "react-router-dom";
import { User, Briefcase, HelpCircle, Info, LogOut } from "lucide-react";
import { useAuthStore } from "@/shared/hooks/useAuthStore";

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export function UserMenu() {
  const [open, setOpen] = useState(false);

  const user = useAuthStore((s) => s.user);
  const userName = user?.name ?? "Usuário";
  const userInitials = userName.slice(0, 2).toUpperCase();

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button type="button" className="flex items-center justify-center rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user?.avatarUrl ?? ""} />
            <AvatarFallback>{userInitials}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent side="bottom" align="end" sideOffset={-40} alignOffset={0} className="w-52 bg-(--background) border-(--border) rounded-md shadow-lg">
        <div className="flex items-center gap-3 px-3 py-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user?.avatarUrl ?? ""} />
            <AvatarFallback>{userInitials}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-semibold">Olá, {userName}</span>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link to="/profile" className="flex items-center gap-3 py-2">
            <User className="h-4 w-4" />
            Perfil
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link to="/my-journey" className="flex items-center gap-3 py-2">
            <Briefcase className="h-4 w-4" />
            Minha jornada
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link to="/help" className="flex items-center gap-3 py-2">
            <HelpCircle className="h-4 w-4" />
            Ajuda
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem className="flex items-center gap-3 py-2 text-(--text-secondary)">
          <Info className="h-4 w-4" />
          Versão 1.0.0
        </DropdownMenuItem>

        <DropdownMenuSeparator className="mt-2" />

        <DropdownMenuItem className="flex items-center gap-3 py-2 mt-1 text-(--danger)">
          <LogOut className="h-4 w-4" />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
