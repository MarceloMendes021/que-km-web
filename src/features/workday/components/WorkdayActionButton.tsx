import { Link } from "react-router-dom";
import { CirclePause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

type WorkdayActionButtonProps = {
  workdayStarted: boolean;
};

export function WorkdayActionButton({ workdayStarted }: WorkdayActionButtonProps) {
  const label = workdayStarted ? "Encerrar jornada" : "Iniciar jornada";
  const description = workdayStarted ? "Toque para finalizar o dia" : "Toque para começar o dia";
  const route = workdayStarted ? "/workday/finish" : "/workday/start";
  const buttonColor = workdayStarted ? "bg-(--danger) hover:bg-(--danger)/90" : "bg-(--primary) hover:bg-(--primary)/90";

  return (
    <Button asChild className={`w-full h-26 justify-between items-center ${buttonColor}`}>
      <Link to={route} className="flex w-full px-4">
        <div className="flex flex-col text-left">
          <span className="text-xl font-semibold text-(--text-primary) mb-1">{label}</span>
          <span className="text-xs text-(--text-primary)">{description}</span>
        </div>

        {workdayStarted ? (
          <div className="h-9 w-9 mr-2 bg-black rounded-full flex items-center justify-center">
            <CirclePause className="h-7! w-7! text-(--danger)" />
          </div>
        ) : (
          <div className="h-9 w-9 mr-2 bg-(--text-primary) rounded-full flex items-center justify-center">
            <Play className="h-6! w-6! text-(--primary) " />{" "}
          </div>
        )}
      </Link>
    </Button>
  );
}
