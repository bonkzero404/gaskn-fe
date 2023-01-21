import { Bars3Icon, Cog6ToothIcon } from "@heroicons/react/20/solid";
import { HeaderProps } from "./props";

export const Header = (props: HeaderProps) => {
  return (
    <nav className="fixed z-40 flex flex-wrap items-center justify-between px-0 py-3 bg-sky-500 mb-3 shadow-md right-0 max-[640px]:left-0 lg:left-64 md:left-64 sm:left-64 min-h-[56.6px]">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto px-0 lg:static lg:block lg:justify-start">
          <button
            className="max-[640px]:block lg:hidden md:hidden sm:hidden text-white cursor-pointer text-xl leading-none px-3 border border-solid border-transparent rounded bg-transparent block outline-none focus:outline-none"
            type="button"
            onClick={props.actionDrawer}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
          <label className="text-white text-xl">{props.title}</label>
          <button
            className="max-[640px]:block lg:hidden md:block text-white cursor-pointer text-xl leading-none px-3 border border-solid border-transparent rounded bg-transparent block outline-none focus:outline-none"
            type="button"
          >
            <Cog6ToothIcon className="w-6 h-6" />
          </button>
        </div>
        <div
          className="lg:flex flex-grow items-center max-[640px]:hidden md:hidden sm:hidden"
          id="example-navbar-warning"
        >
          <ul className="flex flex-col lg:flex-row list-none ml-auto">
            <li className="nav-item">
              <a
                className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                href="#pablo"
              >
                EN
              </a>
            </li>
            <li className="nav-item">
              <a
                className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                href="#pablo"
              >
                ID
              </a>
            </li>
            <li className="nav-item">
              <a
                className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                href="#pablo"
              >
                Setting
              </a>
            </li>
            <li className="nav-item">
              <a
                className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                href="#pablo"
              >
                Setting
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
