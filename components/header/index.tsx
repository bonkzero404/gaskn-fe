import { Bars3Icon } from "@heroicons/react/20/solid";
import { HeaderProps } from "./props";

export const Header = (props: HeaderProps) => {
  return (
    <div className="md:w-full md:top-0 md:z-20 flex flex-row flex-wrap items-center bg-white p-6 border-b border-gray-100">
      <button
        className="hidden max-[640px]:block"
        type="button"
        onClick={props.actionDrawer}
      >
        <Bars3Icon className="h-5 w-5" />
      </button>
    </div>
  );
};
