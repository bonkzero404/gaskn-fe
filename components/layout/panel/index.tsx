import { useState } from "react";
import { Header } from "../../header";
import { SideBar } from "../../sidebar";
import { PanelLayoutProps } from "./props";

export const LayoutPanel = (props: PanelLayoutProps) => {
  const [isOpenDrawer, setOpenDrawer] = useState(false);

  return (
    <div className="container m-0 p-0 min-h-full min-w-full">
      <div className="flex flex-row">
        <SideBar
          isOpenDrawer={isOpenDrawer}
          closeDrawer={() => setOpenDrawer(false)}
        />

        <div className="relative bg-gray-200 flex-1 w-full max-[640px]:ml-0 overflow-auto h-screen">
          <Header
            title={props.titlePage}
            actionDrawer={() => setOpenDrawer(true)}
          />
          <div className="p-6 mt-14">{props.children}</div>
        </div>
      </div>
    </div>
  );
};
