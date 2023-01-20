import { useState } from "react";
import { Header } from "../../header";
import { SideBar } from "../../sidebar";
import { PanelLayoutProps } from "./props";

export const LayoutPanel = (props: PanelLayoutProps) => {
  const [isOpenDrawer, setOpenDrawer] = useState(false);

  return (
    <div className="container m-0 p-0 min-h-full min-w-full">
      <div className="flex flex-row flex-wrap">
        <SideBar
          isOpenDrawer={isOpenDrawer}
          closeDrawer={() => setOpenDrawer(false)}
        />

        <div className="bg-gray-100 flex-1">
          <Header actionDrawer={() => setOpenDrawer(true)} />
          <div className="p-6">{props.children}</div>
        </div>
      </div>
    </div>
  );
};
