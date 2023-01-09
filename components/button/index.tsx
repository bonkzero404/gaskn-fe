import { ButtonProperties } from "./props";

export const Button = (props: ButtonProperties) => {
  const fontColor = () => {
    if (props.fontColor) {
      return `text-${props.fontColor}-900`;
    }

    return "text-white";
  };

  const backgroundColor = () => {
    if (props.backgroundColor) {
      if (props.disabled) {
        return `cursor-not-allowed bg-${props.backgroundColor}-300 focus:ring-${props.backgroundColor}-200`;
      }

      return `bg-${props.backgroundColor}-600 hover:bg-${props.backgroundColor}-700 focus:ring-${props.backgroundColor}-500`;
    }

    if (props.disabled) {
      return "cursor-not-allowed bg-indigo-300 focus:ring-indigo-200";
    }
    return "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500";
  };

  return (
    <button
      type={props.type}
      className={`p-4 group relative flex ${
        props.width ? props.width : "w-auto"
      } justify-center rounded-md border border${
        props.borderWidth ? `-${props.borderWidth}` : ""
      } cursor-pointer py-3 px-4 text-sm font-medium ${fontColor()} ${backgroundColor()} focus:outline-none focus:ring-2 focus:ring-offset-2`}
      disabled={props.disabled}
    >
      {props.icon}
      {props.label}
    </button>
  );
};
