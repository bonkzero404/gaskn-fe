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

      return `bg-${props.backgroundColor}-500 hover:bg-${props.backgroundColor}-600 focus:ring-${props.backgroundColor}-500`;
    }

    if (props.disabled) {
      return "cursor-not-allowed bg-sky-300 focus:ring-sky-200";
    }
    return "bg-sky-500 hover:bg-sky-600 focus:ring-sky-500";
  };

  const className = (): string => {
    return `p-4 group relative flex ${
      props.width ? props.width : "w-auto"
    } justify-center rounded-md border border${
      props.borderWidth ? `-${props.borderWidth}` : ""
    } cursor-pointer py-3 px-4 text-sm font-medium ${fontColor()} ${backgroundColor()} focus:outline-none focus:ring-2 focus:ring-offset-2 ${
      props.className
    }`;
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
        onClick={props.onClick}
      >
        {props.icon}
        {props.label}
      </button>
    );
  };

  return renderButton();
};
