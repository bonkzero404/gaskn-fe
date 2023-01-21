import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/20/solid";
import * as Icon from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../input";
import { IconListsProps } from "./props";

export const IconLists = (props: IconListsProps) => {
  const [iconItems, setIconItems] = useState<Array<string>>([]);
  const [selectIcon, setSelectIcon] = useState<string>("");
  const { register, handleSubmit } = useForm();

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
          key={index}
          className={`relative box-border h-25 w-25 p-10 border-2 flex items-center justify-center cursor-pointer ${
            selectIcon == item
              ? "bg-sky-500 text-white"
              : "bg-white-900 hover:bg-gray-100 dark:hover:bg-gray-300"
          }`}
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
                      : (v) =>
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
          <span className="absolute text-[8px] bottom-2">
            {item.replace("Icon", "")}
          </span>
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
