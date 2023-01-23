import Image, { StaticImageData } from "next/image";
import { AvatarProps } from "./props";

export const Avatar = (props: AvatarProps) => {
  const wordCount = () => {
    const strToArray = props.name.split(" ");
    if (props.maxCharacters) {
      const newLength = strToArray.slice(0, props.maxCharacters);
      return newLength.length;
    }
    return strToArray.length;
  };

  const createAcronym = (): string => {
    if (props.name != "") {
      const matches = props.name.match(/\b(\w)/g);

      if (matches) {
        if (props.maxCharacters) {
          const acronym = matches.slice(0, props.maxCharacters).join("");
          return acronym;
        }
        const acronym = matches.join("");
        return acronym;
      }

      return "";
    }

    return "";
  };

  const setSizeAvatar = () => {
    if (props.size) {
      return {
        fontSize: props.size,
        width: props.size * (wordCount() <= 2 ? 2 : wordCount()) + 5,
        height: props.size * (wordCount() <= 2 ? 2 : wordCount()) + 5,
      };
    }

    return {
      fontSize: 22,
      width: 22 * (wordCount() <= 2 ? 2 : wordCount()) + 5,
      height: 22 * (wordCount() <= 2 ? 2 : wordCount()) + 5,
    };
  };

  return (
    <div
      style={setSizeAvatar()}
      className={`relative flex justify-center items-center ${
        props.twTextColor ? props.twTextColor : "text-white"
      } ${
        props.twBackground ? props.twBackground : "bg-sky-500"
      } font-semibold w-fit h-fit uppercase overflow-hidden ${
        props.rounded ? "rounded-full" : "rounded"
      } ${props.className}`}
    >
      {props.image ? (
        props.image.url ? (
          <Image
            fill
            loader={props.image.url}
            src={props.image.fallback as StaticImageData}
            alt={createAcronym()}
          />
        ) : (
          <Image
            fill
            src={props.image.path as StaticImageData}
            alt={createAcronym()}
          />
        )
      ) : (
        createAcronym()
      )}
    </div>
  );
};
