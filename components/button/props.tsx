import { MouseEventHandler } from "react";
import { SolidColor } from "../../shared/color";

export interface ButtonProperties {
  type?: "button" | "reset" | "submit" | undefined;
  label?: string | undefined;
  width?: string | undefined;
  borderWidth?: string | undefined;
  fontColor?: string | undefined;
  backgroundColor?: SolidColor | undefined;
  icon?: JSX.Element | undefined;
  disabled?: boolean;
  link?: string | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  className?: string | undefined;
}
