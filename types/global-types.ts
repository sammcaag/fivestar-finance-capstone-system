import { LucideIcon } from "lucide-react";

export type StatisticProps = {
  title: string;
  statistic: number | string;
  summary: string;
  icon: LucideIcon;
};

export interface EmptyStateProps {
  emptyTitle?: string;
  emptyDescription?: string;
  emptyActionLabel?: string;
  emptyOnAction?: () => void;
  emptySecondaryActionLabel?: string;
  emptyOnSecondaryAction?: () => void;
}