import { XMarkIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { AlertProperty } from "./props";

export const Alert = (props: AlertProperty) => {
  const [alertColor, setAlertColor] = useState("sky");

  useEffect(() => {
    if (props.type === "danger") {
      setAlertColor("red");
    }

    if (props.type === "info") {
      setAlertColor("sky");
    }

    if (props.type === "warning") {
      setAlertColor("orange");
    }

    if (props.type === "success") {
      setAlertColor("green");
    }
  }, [props.type]);

  return props?.action?.show ? (
    <div
      className={`bg-${alertColor}-100 border border-${alertColor}-400 text-${alertColor}-700 px-4 py-2 rounded relative ${props.className}`}
      role="alert"
    >
      <span className="block sm:inline">{props?.action?.message}</span>
      {(props?.action?.cause || props?.action?.cause == "") && (
        <span className="block text-sm">{props?.action?.cause}</span>
      )}

      {!props?.disableClose && (
        <span
          className="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer"
          onClick={props.handleClose}
        >
          <XMarkIcon
            className={`fill-current h-4 top-0 text-${alertColor}-500`}
          />
        </span>
      )}
    </div>
  ) : (
    <></>
  );
};

Alert.getInitialProps = (props: AlertProperty) => {
  props.type = "info";
  props.disableClose = false;
};
