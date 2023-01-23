import { Bars3Icon, BellIcon, FlagIcon } from "@heroicons/react/20/solid";
import { Avatar } from "../avatar";
import { Dropdown } from "../dropdown";
import { MenuLang } from "./menu-dropdown/menu-lang";
import { MenuProfile } from "./menu-dropdown/menu-profile";
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

          <ul className="flex flex-row space-x-3 list-none ml-auto">
            <li className="nav-item">
              <div className="flex items-center justify-center text-xs uppercase font-bold leading-snug w-8 h-8 cursor-pointer bg-gray-100 rounded-full hover:bg-gray-200">
                <BellIcon className="w-5 h-5" />
              </div>
            </li>
            <li className="nav-item max-[640px]:hidden sm:hidden md:block lg:block">
              <Dropdown
                popContent={<MenuLang />}
                closeAfterClick
                className="flex items-center justify-center text-xs uppercase font-bold leading-snug h-8 cursor-pointer bg-gray-100 rounded-full px-4 hover:bg-gray-200"
                popClassName="absolute z-50 bg-white p-2 rounded shadow-md min-w-[180px] border border-gray-100 mt-1"
                pos="bottom-center"
              >
                <>
                  <FlagIcon className="w-5 h-5" />
                  <label className="text-xs ml-2 cursor-pointer">ID</label>
                </>
              </Dropdown>
            </li>
            <li className="nav-item">
              <Dropdown
                popContent={<MenuProfile />}
                closeAfterClick
                className="flex items-center text-xs uppercase leading-snug cursor-pointer sm:pl-2.5 md:pl-2.5 lg:pl-2.5 bg-gray-100 rounded-full hover:bg-gray-200"
                popClassName="absolute z-50 bg-white p-2 rounded right-0 shadow-md min-w-[180px] border border-gray-100 mt-1"
                pos="bottom-right"
              >
                <>
                  <label className="max-[640px]:hidden mr-2 cursor-pointer">
                    Janitra Panji
                  </label>
                  <Avatar
                    name="Janitra Panji"
                    maxCharacters={2}
                    size={13}
                    rounded
                    twBackground="bg-sky-500"
                  />
                </>
              </Dropdown>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
