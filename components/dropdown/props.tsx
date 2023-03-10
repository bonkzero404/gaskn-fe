export interface DropdownProps {
  id?: string;
  children?: JSX.Element;
  popContent?: JSX.Element;
  className?: string;
  popClassName?: string;
  closeAfterClick?: boolean;
  closeAfterAction?: boolean;
  pos?: "bottom-left" | "bottom-center" | "bottom-right";
}
