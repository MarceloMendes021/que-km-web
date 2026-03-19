import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  showBackButton?: boolean;
};

export function PageHeader({ title, subtitle, icon, showBackButton = true }: PageHeaderProps) {
  const navigate = useNavigate();

  function handleGoBack() {
    navigate(-1);
  }

  return (
    <header className="flex flex-col gap-3 p-4">
      {showBackButton && (
        <Button variant="ghost" size="icon" onClick={handleGoBack}>
          <ArrowLeft className="h-6! w-6!" />
        </Button>
      )}

      <div className="flex items-start gap-3">
        {icon && <div className="mt-2 rounded-sm bg-(--primary) p-1 text-white">{icon}</div>}

        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold text-(--text-primary)">{title}</h1>

          {subtitle && <p className="text-sm text-(--text-secondary)">{subtitle}</p>}
        </div>
      </div>
    </header>
  );
}
