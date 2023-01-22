import { XMarkIcon } from "@heroicons/react/20/solid";
import { SlideWindowProps } from "./props";

export const SlideWindow = (props: SlideWindowProps) => {
  return (
    <>
      <aside
        id="slide-window"
        className={`fixed top-0 z-50 overflow-hidden h-screen border-l w-1/2 max-[640px]:w-full shadow-2xl ${
          props.isOpenSlider
            ? "right-0 max-[640px]:right-0"
            : "-right-1/2 max-[640px]:-right-full"
        } border-gray-100 duration-300 ease-in-out transition-all transform `}
        aria-label="SlideWindow"
      >
        <div className="relative overflow-hidden min-h-full bg-white dark:bg-white-800 ">
          <div className="fixed w-full bg-white min-h-[56.6px] shadow-md p-3 z-20 border-b border-white">
            <button
              className="absolute left-3 top-3.5"
              type="button"
              onClick={props.closeOpenSlider}
            >
              <XMarkIcon className="h-7 w-7" />
            </button>

            <p className="ml-10 text-lg mt-[2px]">{props.windowTitle}</p>
          </div>
          <div className="absolute overflow-y-auto w-full p-4 bottom-0 top-14">
            {props.children}
          </div>
        </div>
      </aside>
      {props.isOpenSlider && (
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      )}
    </>
  );
};
