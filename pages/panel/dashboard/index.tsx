import { Suspense, useState } from "react";
import { Button } from "../../../components/button";
import { IconLists } from "../../../components/iconlist";
import { LayoutPanel } from "../../../components/layout/panel";
import { Modal } from "../../../components/modal";
import { SlideWindow } from "../../../components/slide-window";

export default function Dashboard() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showSlideWindow, setShowSlideWindow] = useState<boolean>(false);
  return (
    <LayoutPanel titlePage="Dashboard">
      <>
        {/* <h1 className="text-3xl font-bold underline">Horay!</h1> */}
        {/* <Suspense fallback={<div>Loading...</div>}>
          <IconLists
            onSelectedIcon={(icon) => console.log("ICON SELECTED", icon)}
          />
        </Suspense> */}
        <Button label="Open Icon" onClick={() => setShowModal(true)} />
        <Button label="Open Window" onClick={() => setShowSlideWindow(true)} />
        <Modal
          modalTitle="Choose Icons"
          isShown={showModal}
          modalContent={
            <Suspense fallback={<div>Loading...</div>}>
              <IconLists
                onSelectedIcon={(icon) => {
                  console.log("ICON SELECTED", icon);
                  setTimeout(() => setShowModal(false), 100);
                }}
              />
            </Suspense>
          }
          handleClose={() => setShowModal(false)}
          handleAction={() => console.log("Huaa")}
        />
        <SlideWindow
          isOpenSlider={showSlideWindow}
          closeOpenSlider={() => setShowSlideWindow(false)}
          windowTitle="My Form"
        >
          <>
            <h2>Hello</h2>
          </>
        </SlideWindow>
      </>
    </LayoutPanel>
  );
}
