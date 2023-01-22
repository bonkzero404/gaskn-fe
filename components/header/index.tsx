import { Bars3Icon, BellIcon, EnvelopeIcon } from "@heroicons/react/20/solid";
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
                className="flex items-center text-xs uppercase font-bold leading-snug hover:text-sky-500 pt-1.5 px-2.5"
                href="#pablo"
              >
                <BellIcon className="w-5 h-5" />
              </a>
            </li>
            <li className="nav-item">
              <a
                className="flex items-center text-xs uppercase font-bold leading-snug hover:text-sky-500 pt-1.5 px-2.5"
                href="#pablo"
              >
                <EnvelopeIcon className="w-5 h-5" />
              </a>
            </li>
            <li className="nav-item">
              <div className="flex items-center text-xs uppercase font-bold leading-snug hover:opacity-75 cursor-pointer sm:pl-2.5 md:pl-2.5 lg:pl-2.5 bg-gray-200 rounded-full">
                <label className="max-[640px]:hidden mr-2 cursor-pointer">
                  Janitra Panji
                </label>
                <Avatar
                  name="Janitra Panji"
                  maxCharacters={2}
                  size={13}
                  rounded
                />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
