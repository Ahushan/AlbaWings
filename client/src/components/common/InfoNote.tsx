import {
  Info,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import type { ReactNode } from "react";

type InfoNoteType = "info" | "warning" | "success" | "error";

interface InfoNoteProps {
  type?: InfoNoteType;
  children: ReactNode;
}

const styles = {
  info: {
    icon: Info,
    container: "bg-blue-50 text-blue-700 border-blue-200",
  },
  warning: {
    icon: AlertTriangle,
    container: "bg-yellow-50 text-yellow-700 border-yellow-200",
  },
  success: {
    icon: CheckCircle,
    container: "bg-green-50 text-green-700 border-green-200",
  },
  error: {
    icon: XCircle,
    container: "bg-red-50 text-red-700 border-red-200",
  },
};

export const InfoNote = ({
  type = "info",
  children,
}: InfoNoteProps) => {
  const Icon = styles[type].icon;

  return (
    <div
      className={`flex gap-2 items-start p-3 rounded border ${styles[type].container}`}
    >
      <Icon size={18} className="mt-0.5 shrink-0" />
      <div className="text-sm">{children}</div>
    </div>
  );
};
