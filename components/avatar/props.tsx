import { ImageLoader, StaticImageData } from "next/image";

interface StaticRequireImage {
  default: StaticImageData;
}

export interface AvatarProps {
  name: string;
  maxCharacters?: number;
  image?: {
    url?: ImageLoader | string | any;
    path?: string | StaticRequireImage | StaticImageData;
    fallback?: string | StaticRequireImage | StaticImageData;
  };
  className?: string;
  size?: number;
  rounded?: boolean | undefined;
  twBackground?: string | undefined;
  twTextColor?: string | undefined;
}
