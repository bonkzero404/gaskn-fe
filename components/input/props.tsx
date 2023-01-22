import { HTMLInputTypeAttribute, KeyboardEventHandler } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { SolidColor } from "../../shared/color";

export interface InputProperties {
  id?: string | undefined;
  name: string | undefined;
  type?: HTMLInputTypeAttribute | undefined;
  eyePassword?: boolean | undefined;
  icon?: (isErr: boolean) => JSX.Element | undefined;
  iconString?: string | undefined;
  width?: string | undefined;
  placeholder?: string | undefined;
  autoComplete?: string | undefined;
  required?: boolean | undefined;
  className?: string | undefined;
  fontSize?: string | undefined;
  borderWidth?: number | undefined;
  borderColor?: SolidColor | undefined;
  fontColor?: SolidColor | undefined;
  focusBorderColor?: SolidColor | undefined;
  rounded?: string | undefined;
  inputValidationRule?: UseFormRegisterReturn;
  validationMessages?: string | undefined;
  defaultValue?: string | undefined;
  onKeyUp?: KeyboardEventHandler<HTMLInputElement>;
}
