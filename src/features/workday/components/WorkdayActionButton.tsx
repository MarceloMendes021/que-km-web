import { Link } from "react-router-dom";
import { Play, Square } from "lucide-react";
import { Button } from "@/components/ui/button";

type WorkdayActionButtonProps = {
  workdayStarted: boolean;
};

export function WorkdayActionButton({ workdayStarted }: WorkdayActionButtonProps) {
  const label = workdayStarted ? "Encerrar jornada" : "Iniciar jornada";

  const description = workdayStarted ? "Toque para finalizar o dia" : "Toque para começar o dia";

  const route = workdayStarted ? "/workday/end" : "/workday/start";

  const buttonColor = workdayStarted ? "bg-red-500 hover:bg-red-600" : "bg-(--primary) hover:bg-(--primary-hover)";

  return (
    <Button asChild className={`w-full h-26 justify-between items-center ${buttonColor}`}>
      <Link to={route} className="flex w-full px-4">
        <div className="flex flex-col text-left">
          <span className="text-xl font-semibold text-(--text-primary) mb-1">{label}</span>

          <span className="text-xs text-(--text-primary)">{description}</span>
        </div>

        {workdayStarted ? <Square className="h-6! w-6! mr-2" /> : <Play className="h-7! w-7! mr-2" />}
      </Link>
    </Button>
  );
}
