import type { LucideIcon } from "lucide-react";

export type ToastType = "error" | "success" | "info";
export type ToastValue = {
  Icon: LucideIcon;
  className: string;
};
