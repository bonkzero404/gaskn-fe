import Image from "next/image";

export const LayoutAuth = ({ children }: { children: JSX.Element }) => {
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
            Sign in to your account
          </h2>
        </div>
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
          {children}
        </div>
      </div>
    </div>
  );
};
