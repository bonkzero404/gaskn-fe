import { Bars3Icon, BellIcon, Cog6ToothIcon } from "@heroicons/react/20/solid";
import { Avatar } from "../avatar";
import { HeaderProps } from "./props";

export const Header = (props: HeaderProps) => {
  return (
    <nav className="fixed z-40 flex flex-wrap items-center justify-between px-0 py-3 text-gray-700 bg-white border-b border-white mb-3 shadow-md right-0 max-[640px]:left-0 lg:left-64 md:left-64 sm:left-64 min-h-[56.6px]">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between px-0">
          <button
            className="max-[640px]:block lg:hidden md:hidden sm:hidden cursor-pointer text-xl leading-none mr-2 border border-solid border-transparent rounded bg-transparent block outline-none focus:outline-none"
            type="button"
            onClick={props.actionDrawer}
          >
            <Bars3Icon className="h-7 w-7" />
          </button>
          <label className="max-[640px]:text-xl text-xl mt-[2px] font-semibold uppercase">
            {props.title}
          </label>

          <ul className="flex flex-row list-none ml-auto">
            <li className="nav-item">
              <a
                className="flex items-center text-xs uppercase font-bold leading-snug hover:opacity-75 mr-2"
                href="#pablo"
              >
                <BellIcon className="w-8 h-8" />
              </a>
            </li>
            <li className="nav-item">
              <a
                className="flex items-center text-xs uppercase font-bold leading-snug hover:opacity-75 mr-2"
                href="#pablo"
              >
                <Cog6ToothIcon className="w-8 h-8" />
              </a>
            </li>
            <li className="nav-item">
              <a
                className="flex items-center text-xs uppercase font-bold leading-snug hover:opacity-75"
                href="#pablo"
              >
                <Avatar name="John Item" maxCharacters={2} size={13} rounded />
              </a>
            </li>
          </ul>
        </div>
        {/* <div
          className="lg:flex flex-grow items-center max-[640px]:hidden md:hidden sm:hidden"
          id="example-navbar-warning"
        >
          <ul className="flex flex-col lg:flex-row list-none ml-auto">
            <li className="nav-item">
              <a
                className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug hover:opacity-75"
                href="#pablo"
              >
                EN
              </a>
            </li>
            <li className="nav-item">
              <a
                className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug hover:opacity-75"
                href="#pablo"
              >
                ID
              </a>
            </li>
            <li className="nav-item">
              <a
                className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug hover:opacity-75"
                href="#pablo"
              >
                Setting
              </a>
            </li>
          </ul>
        </div> */}
      </div>
    </nav>
  );
};
