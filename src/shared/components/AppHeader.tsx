import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function AppHeader() {
  return (
    <header className="flex items-center justify-between border-b border-(--border) px-4 pb-4 pt-2">
      <img src="/Logo-Que-KM-é-esse.png" alt="Logo Que KM é esse" className=" h-16  w-auto object-contain" />

      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" className=" h-11 w-11 ">
            <Menu className="h-5! w-5! text-(--text-primary)" />
          </Button>
        </SheetTrigger>

        <SheetContent side="right">
          {/* depois entra o conteúdo do menu lateral */}
          <div>Sidebar content</div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
