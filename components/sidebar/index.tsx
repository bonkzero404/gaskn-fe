import { ChartPieIcon, XMarkIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { SidebarProps } from "./props";

export const SideBar = (props: SidebarProps) => {
  // @ts-ignore
  const logoApp = ({ src }) => {
    return `https://tailwindui.com/img/logos/${src}?color=indigo&shade=600`;
  };

  return (
    <>
      {props.isOpenDrawer && (
        <div className="opacity-25 fixed inset-0 z-50 bg-black"></div>
      )}
      <aside
        id="sidebar"
        className={`max-[640px]:fixed max-[640px]:z-50 overflow-auto w-64 h-screen max-[640px]:shadow-2xl max-[640px]:-ml-64 duration-300 ease-in-out transition-all transform ${
          props.isOpenDrawer
            ? "max-[640px]:translate-x-full"
            : "max-[640px]:translate-x-0"
        }`}
        aria-label="Sidebar"
      >
        <div className="overflow-y-auto min-h-full bg-sky-500 dark:bg-white-800 text-white">
          <div className="min-h-[56.6px] bg-sky-400 border-b border-sky-400 shadow-md">
            <button
              className="hidden max-[640px]:block absolute right-5 top-3.5"
              type="button"
              onClick={props.closeDrawer}
            >
              <XMarkIcon className="h-7 w-7" />
            </button>
            <a
              href="https://flowbite.com/"
              className="flex items-center px-4 py-3.5"
            >
              <Image
                loader={logoApp}
                src={"mark.svg"}
                alt="GASKN"
                width={28}
                height={28}
                className="h-6 mr-3 sm:h-7"
              />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-gray">
                GASKN
              </span>
            </a>
          </div>
          <div className="px-3 py-4 ">
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-base font-normal hover:text-white rounded-lg dark:text-gray hover:bg-gray-100 dark:hover:bg-sky-900"
                >
                  <ChartPieIcon className="w-7 h-7" />
                  <span className="ml-3">Dashboard</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
};
