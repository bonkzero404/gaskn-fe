import { Suspense } from "react";
import { Button } from "../../../components/button";
import { IconLists } from "../../../components/iconlist";
import { LayoutPanel } from "../../../components/layout/panel";

export default function Dashboard() {
  return (
    <LayoutPanel titlePage="Dashboard">
      <>
        {/* <h1 className="text-3xl font-bold underline">Horay!</h1> */}
        {/* <Suspense fallback={<div>Loading...</div>}>
          <IconLists
            onSelectedIcon={(icon) => console.log("ICON SELECTED", icon)}
          />
        </Suspense> */}
        <Button label="Open Icon" />
      </>
    </LayoutPanel>
  );
}
