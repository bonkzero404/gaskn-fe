import { useRouter } from "next/router";
import { ButtonProperties } from "./props";

export const Button = (props: ButtonProperties) => {
  const router = useRouter();

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
      return "cursor-not-allowed bg-blue-300 focus:ring-blue-200";
    }
    return "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500";
  };

  const className = (): string => {
    return `p-4 group relative flex ${
      props.width ? props.width : "w-auto"
    } justify-center rounded-md border border${
      props.borderWidth ? `-${props.borderWidth}` : ""
    } cursor-pointer py-3 px-4 text-sm font-medium ${fontColor()} ${backgroundColor()} focus:outline-none focus:ring-2 focus:ring-offset-2`;
  };

  const renderButton = () => {
    if (props.link) {
      return (
        <button
          onClick={() => router.push(props.link as string)}
          type="button"
          className={className()}
          disabled={props.disabled}
        >
          {props.icon}
          {props.label}
        </button>
      );
    }

    return (
      <button
        type={props.type}
        className={className()}
        disabled={props.disabled}
      >
        {props.icon}
        {props.label}
      </button>
    );
  };

  return renderButton();
};
