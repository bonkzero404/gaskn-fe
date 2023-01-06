import { SolidColor } from "../color";

export interface ButtonProperties {
  type: "button" | "reset" | "submit" | undefined;
  label?: string | undefined;
  width?: string | undefined;
  borderWidth?: string | undefined;
  fontColor?: string | undefined;
  backgroundColor?: SolidColor | undefined;
  icon?: JSX.Element | undefined;
}
