import { XMarkIcon } from "@heroicons/react/20/solid";
import { SolidColor } from "../../shared/color";
import { Button } from "../button";
import { ModalProps } from "./props";

export const Modal = (props: ModalProps) => {
  return props.isShown ? (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative my-6 mx-auto max-w-3xl lg:min-w-[768px] md:min-w-[768px] sm:w-full sm:ml-4 sm:mr-4 max-[640px]:w-full max-[640px]:ml-2 max-[640px]:mr-2">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-3 border-b border-solid border-slate-200 rounded-t bg-sky-500 text-white">
              <h3 className="text-xl font-semibold mt-1 pl-3">
                {props.modalTitle}
              </h3>
              <button
                className="p-1 ml-auto border-0 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={props.handleClose}
              >
                <XMarkIcon className="w-7 h-7" />
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto max-h-96 overflow-auto ">
              {props.modalContent}
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-4 border-t border-solid border-slate-200 rounded-b">
              <Button
                type="button"
                backgroundColor={SolidColor.Gray}
                label={props.closeLabel ? props.closeLabel : "Close"}
                onClick={props.handleClose}
                className="mr-2 min-w-[120px]"
              />
              <Button
                type="button"
                label={props.actionLabel ? props.actionLabel : "Save"}
                onClick={props.handleAction}
                className="min-w-[120px]"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  ) : null;
};
