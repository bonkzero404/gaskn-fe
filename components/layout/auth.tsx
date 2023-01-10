import Image from "next/image";
import { Lang } from "../lang";
import { AuthLayoutProps } from "./props";

export const LayoutAuth = (props: AuthLayoutProps) => {
  // @ts-ignore
  const logoApp = ({ src }) => {
    return `https://tailwindui.com/img/logos/${src}?color=indigo&shade=600`;
  };

  return (
    <div className="flex min-h-full items-center justify-center">
      <div className="w-full max-w-md space-y-8">
        <div>
          <Image
            className="mx-auto h-12 w-auto"
            loader={logoApp}
            src={"mark.svg"}
            alt="GASKN"
            width={200}
            height={200}
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            {props.title}
          </h2>
        </div>
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
          {props.children}
        </div>

        <Lang />
      </div>
    </div>
  );
};
