import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/20/solid";
import * as Icon from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../input";
import { IconListsProps } from "./props";

export const IconLists = (props: IconListsProps) => {
  const [iconItems, setIconItems] = useState<Array<string>>([]);
  const [selectIcon, setSelectIcon] = useState<string>("");
  const { register, handleSubmit } = useForm();
  const btnRef = useRef<Array<HTMLDivElement | any>>([]);
  const tooltipRef = useRef<Array<HTMLDivElement | any>>([]);

  const openLeftTooltip = (index: number) => {
    const pos = btnRef.current[index].offsetLeft;

    if (pos <= 100) {
      tooltipRef.current[index].classList.add("left-0");
      tooltipRef.current[index].children[0].classList.remove("left-1/2");
      tooltipRef.current[index].children[0].classList.add("left-5");
    }

    if (pos > 600) {
      tooltipRef.current[index].classList.add("right-0");
      tooltipRef.current[index].children[0].classList.remove("left-1/2");
      tooltipRef.current[index].children[0].classList.add("right-0");
    }

    tooltipRef.current[index].classList.remove("hidden");
  };

  const closeLeftTooltip = (index: number) => {
    tooltipRef.current[index].classList.add("hidden");
  };

  useEffect(() => {
    if (iconItems.length === 0 && Object.keys(Icon).length > 0) {
      setIconItems(Object.keys(Icon));
    }
  }, [iconItems]);

  const listsOfIcon = () => {
    return iconItems.map((item, index) => {
      const Icn = (Icon as any)[item];

      return (
        <div
          id={item}
          key={index}
          ref={(el) => (btnRef.current[index] = el)}
          className={`relative box-border h-24 w-24 p-5 border-2 flex items-center justify-center cursor-pointer ${
            selectIcon == item
              ? "bg-sky-500 text-white"
              : "bg-white-900 hover:bg-gray-100 dark:hover:bg-gray-300"
          }`}
          onMouseEnter={() => openLeftTooltip(index)}
          onMouseLeave={() => closeLeftTooltip(index)}
          onClick={() =>
            onIconSelected(
              item,
              props.onSelectedIcon
                ? props.onSelectedIcon
                : (v) =>
                    console.warn(
                      "Need Callback Function with value",
                      `[${v} as String]`,
                    ),
            )
          }
        >
          <div
            ref={(el) => (tooltipRef.current[index] = el)}
            className="bg-sky-500 text-white absolute p-2 rounded -bottom-12 z-10 hidden text-sm"
          >
            <div className="w-12 overflow-hidden absolute -top-3 left-1/2">
              <div className=" h-4 w-4 bg-sky-500 rotate-45 transform origin-bottom-left"></div>
            </div>
            <p className="font-semibold">{item}</p>
          </div>
          {selectIcon === item && (
            <XMarkIcon
              className="absolute w-5 h-5 top-1 right-1 cursor-pointer"
              onClick={() => {
                setTimeout(() => {
                  setSelectIcon("");

                  onIconSelected(
                    "",
                    props.onSelectedIcon
                      ? props.onSelectedIcon
                      : () =>
                          console.warn(
                            "Need Callback Function with value",
                            `["NULL" as String]`,
                          ),
                  );
                }, 1);
              }}
            />
          )}

          <Icn className="block w-10 h-10" />
        </div>
      );
    });
  };

  const onIconSelected = (icon: string, cb: (icon: string) => void) => {
    setSelectIcon(icon);
    cb(icon);
  };

  const onSearch = (dataForm: { searchIcon: string } | any) => {
    const searchText = dataForm.searchIcon;
    const search = searchText.toLowerCase();

    if (searchText === "") {
      setIconItems(Object.keys(Icon));
      return;
    }

    const filter = iconItems.filter((item) =>
      item.toLowerCase().includes(search),
    );
    setIconItems(filter);

    return;
  };

  return (
    <div className="mb-10 relative">
      <form className="mt-2 space-y-6 mb-5" onSubmit={handleSubmit(onSearch)}>
        <Input
          id="search-icon"
          name="search-icon"
          type="text"
          autoComplete="search-icon"
          placeholder="Search all icon"
          inputValidationRule={{ ...register("searchIcon") }}
          onKeyUp={handleSubmit(onSearch)}
          icon={() => <MagnifyingGlassIcon className="h-5 w-5" />}
        />
      </form>
      <div className="flex flex-wrap gap-2 justify-center">{listsOfIcon()}</div>
    </div>
  );
};
