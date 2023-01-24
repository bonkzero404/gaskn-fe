import { XMarkIcon } from "@heroicons/react/20/solid";
import * as Icon from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../provider/auth/context";
import { SidebarProps } from "./props";
import { Repository } from "./repository";
import { useRouter } from "next/router";

export const SideBar = (props: SidebarProps) => {
  const authCtx = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(true);
  const [dataMenu, setDataMenu] = useState<Array<Object>>([]);
  const repository = new Repository();
  const router = useRouter();

  // @ts-ignore
  const logoApp = ({ src }) => {
    return `https://tailwindui.com/img/logos/${src}?color=indigo&shade=600`;
  };

  useEffect(() => {
    if (authCtx.token !== "") {
      setLoading(true);
      repository
        .getListMenu(authCtx.token)
        .then((menu) => {
          if (menu.errors) {
            setDataMenu([]);
          } else {
            setDataMenu(menu.data);
          }

          setLoading(false);
        })
        .catch((_err) => {
          setLoading(false);
          setDataMenu([]);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authCtx.token]);

  const renderMenu = (child: any, pad: number): JSX.Element => {
    if (loading) {
      return <label>Loading...</label>;
    }

    if (!loading && child.length > 0) {
      return (
        <ul className="py-1 space-y-2">
          {child.map((item: any, index: number) => {
            const Icn = (Icon as any)[item.menu_icon];
            return (
              <li key={item.parent_id + "-" + index}>
                <Link
                  href={item.menu_url}
                  className={`flex items-center p-2 text-base font-normal hover:text-white rounded-lg dark:text-gray hover:bg-gray-100 dark:hover:bg-sky-400 ${
                    router.asPath === item.menu_url && "bg-sky-400"
                  } pl-${pad}`}
                >
                  <Icn className="w-5 h-5" />
                  <span className="ml-3">{item.menu_name}</span>
                </Link>
                {item.children !== null && renderMenu(item.children, pad + 10)}
              </li>
            );
          })}
        </ul>
      );
    }

    return <label>Something went wrong</label>;
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
          <div className="px-3 py-4 ">{renderMenu(dataMenu, 0)}</div>
        </div>
      </aside>
    </>
  );
};
