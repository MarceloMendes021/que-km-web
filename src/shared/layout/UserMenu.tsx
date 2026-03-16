import { useState } from "react";
import { Link } from "react-router-dom";
import { User, Car, Info, LogOut } from "lucide-react";

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export function UserMenu() {
  const [open, setOpen] = useState(false);

  const userName = "Marcelo";

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button type="button" className="flex items-center justify-center h-10 w-10 mr-2 rounded-full">
          {!open && (
            <Avatar className="h-10 w-10  ">
              <AvatarImage src="/avatar.png" />
              <AvatarFallback>MA</AvatarFallback>
            </Avatar>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent side="top" align="end" sideOffset={-52} className="w-50 bg-(--background) border-(--border) rounded-md shadow-lg ">
        {/* Avatar + saudação */}
        <div className="flex items-center gap-3 px-3 py-3">
          <Avatar className="h-10 w-10 border-2 border-(--primary) ">
            <AvatarImage src="/avatar.png" />
            <AvatarFallback>MA</AvatarFallback>
          </Avatar>

          <span className="text-sm font-semibold">Olá, {userName}</span>
        </div>

        <DropdownMenuSeparator />

        {/* Navegação */}
        <DropdownMenuItem asChild>
          <Link to="/profile" className="flex items-center gap-2">
            <User className="h-4 w-4 my-2" />
            Perfil
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link to="/vehicle" className="flex items-center gap-2 ">
            <Car className="h-4 w-4" />
            Veículo
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Sistema */}
        <DropdownMenuItem className="text-muted-foreground">
          <Info className="h-4 w-4 gap-2 my-6" />
          Versão 1.0.0
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Logout */}
        <DropdownMenuItem className="text-red-600">
          <LogOut className="h-4 w-4 mr-2 my-2" />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
