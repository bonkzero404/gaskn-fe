import { Bars3Icon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { PanelLayoutProps } from "./props";

export const LayoutPanel = (props: PanelLayoutProps) => {
  // @ts-ignore
  const logoApp = ({ src }) => {
    return `https://tailwindui.com/img/logos/${src}?color=indigo&shade=600`;
  };

  return (
    <div className="container m-0 p-0 min-h-full min-w-full">
      <div className="flex flex-row flex-wrap">
        <aside
          id="sidebar"
          className="w-64 h-screen border-r border-gray-100 max-[640px]:hidden"
          aria-label="Sidebar"
        >
          <div className="px-3 py-4 overflow-y-auto min-h-full bg-white dark:bg-white-800">
            <a
              href="https://flowbite.com/"
              className="flex items-center pl-2.5 mb-9 p-2"
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
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-base font-normal text-gray-900 hover:text-white rounded-lg dark:text-gray hover:bg-gray-100 dark:hover:bg-blue-600"
                >
                  <svg
                    aria-hidden="true"
                    className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-gray"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                  </svg>
                  <span className="ml-3">Dashboard</span>
                </a>
              </li>
            </ul>
          </div>
        </aside>

        <div className="bg-gray-100 flex-1">
          <div className="md:w-full md:top-0 md:z-20 flex flex-row flex-wrap items-center bg-white p-6 border-b border-gray-100">
            <button
              className="hidden max-[640px]:block"
              type="button"
              data-drawer-target="sidebar"
              data-drawer-show="sidebar"
              aria-controls="sidebar"
            >
              <Bars3Icon className="h-5 w-5" />
            </button>
          </div>
          <div className="p-6">{props.children}</div>
        </div>
      </div>
    </div>
  );
};
