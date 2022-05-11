export interface GButtonProps {
  className?: string;
  onClick?: () => void;
  text: string;
  loading?: boolean;
  loadingPosition?: "center" | "end" | "start";
}
