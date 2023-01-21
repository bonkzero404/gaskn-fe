import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { InputProperties } from "./props";

export const Input = (props: InputProperties) => {
  const [showPass, setShowPass] = useState(false);

  let padLeft = "";

  const handleClickShowPassword = () => {
    setShowPass(!showPass);
  };

  const withIcon = () => {
    if (props.icon) {
      padLeft = "pl-10";
      return (
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          {props.icon(props.validationMessages ? true : false)}
        </div>
      );
    }
  };

  const eyePassword = () => {
    if (props.eyePassword) {
      return (
        <div
          className="absolute cursor-pointer inset-y-0 flex items-center pl-3 right-4 z-50"
          onClick={handleClickShowPassword}
        >
          {showPass ? (
            <EyeIcon
              className={`h-6 font-extralight text-${
                props.validationMessages
                  ? "red"
                  : props.borderColor
                  ? props.borderColor
                  : "sky"
              }-500 group-hover:text-${
                props.validationMessages
                  ? "red"
                  : props.borderColor
                  ? props.borderColor
                  : "sky"
              }-400`}
            />
          ) : (
            <EyeSlashIcon
              className={`h-6 font-extralight text-${
                props.validationMessages
                  ? "red"
                  : props.borderColor
                  ? props.borderColor
                  : "sky"
              }-500 group-hover:text-${
                props.validationMessages
                  ? "red"
                  : props.borderColor
                  ? props.borderColor
                  : "sky"
              }-400`}
            />
          )}
        </div>
      );
    }
  };

  const borderColor = () => {
    if (props.borderColor) {
      return `border-${props.borderColor}-300`;
    }

    return "border-gray-300";
  };

  const focusBorderColor = () => {
    if (props.borderColor) {
      return `dark:focus:ring-${props.focusBorderColor}-500 dark:focus:border-${props.focusBorderColor}-500`;
    }

    return "dark:focus:ring-sky-500 dark:focus:border-sky-500";
  };

  const fontColor = () => {
    if (props.fontColor) {
      return `text-${props.fontColor}-900`;
    }

    return "text-gray-900";
  };

  return (
    <>
      <div className="relative">
        {withIcon()}

        <input
          data-lpignore
          id={props.id}
          name={props.name}
          type={props.eyePassword && showPass ? "text" : props.type}
          autoComplete={props.autoComplete}
          defaultValue={props.defaultValue}
          className={`block ${
            props.width ? props.width : "w-full"
          } p-4 ${padLeft} ${
            props.fontSize ? props.fontSize : "text-sm"
          } py-3 px-4 ${fontColor()} border${
            props.borderWidth ? `-${props.borderWidth}` : ""
          } ${borderColor()} ${
            props.rounded ? props.rounded : "rounded-lg"
          } dark:placeholder-gray-300 ${focusBorderColor()} ${
            props.validationMessages
              ? "border-red-500 dark:focus:ring-red-500 dark:focus:border-red-500"
              : ""
          } ${props.className ? props.className : ""}`}
          placeholder={props.placeholder}
          required={props.required ? true : false}
          {...props.inputValidationRule}
          onKeyUp={props.onKeyUp}
        />

        {eyePassword()}
      </div>
      {props.validationMessages && (
        <label className="text-xs text-red-500">
          {props.validationMessages}
        </label>
      )}
    </>
  );
};
