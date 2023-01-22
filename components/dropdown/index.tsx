import { useEffect, useRef, useState } from "react";
import { DropdownProps } from "./props";

export const Dropdown = (props: DropdownProps) => {
  const refContainer = useRef<HTMLDivElement>(null);
  const refPop = useRef<HTMLDivElement>(null);
  const refAction = useRef<HTMLDivElement>(null);
  const [showBox, setShowBox] = useState<boolean>(false);
  const [position, setPosition] = useState<Object>({
    marginRight: 0,
  });
  const [isDelayed, setIsDelayed] = useState<boolean>(false);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (refPop.current && refPop.current.contains(event.target)) {
        if (props.closeAfterClick) {
          setShowBox(false);
        }
      }

      if (refPop.current && !refPop.current.contains(event.target)) {
        if (refAction.current && !refAction.current.contains(event.target)) {
          setShowBox(false);
        }
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [props.closeAfterClick, showBox]);

  useEffect(() => {
    if (props.pos && props.pos === "bottom-left") {
      setPosition({
        left: 0,
      });
    }

    if (props.pos && props.pos === "bottom-right") {
      setPosition({
        right: 0,
      });
    }

    if (props.pos && props.pos === "bottom-center") {
      if (refContainer.current && showBox) {
        const childAction: HTMLDivElement | any =
          refContainer.current.children[0];
        const childPop: HTMLDivElement | any = refContainer.current.children[1];

        if (childPop.offsetWidth > childAction.offsetWidth) {
          setPosition({
            left: -(childPop.offsetWidth / 2 - childAction.offsetWidth / 2),
          });
        } else {
          setPosition({
            left: childAction.offsetWidth / 2 - childPop.offsetWidth / 2,
          });
        }
      }
    }
  }, [props.pos, showBox]);

  useEffect(() => {
    if (showBox) {
      const timeout = setTimeout(() => {
        setIsDelayed(true);
      }, 100);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [showBox]);

  return (
    <div ref={refContainer} className="relative">
      <div
        ref={refAction}
        onClick={() => setShowBox(!showBox)}
        className={`relative ${props.className ? props.className : ""}`}
      >
        {props.children}
      </div>

      {showBox && (
        <div
          ref={refPop}
          style={position}
          className={`absolute ${
            props.popClassName ? props.popClassName : ""
          } ${!isDelayed && "opacity-0"}`}
        >
          {props.popContent}
        </div>
      )}
    </div>
  );
};
