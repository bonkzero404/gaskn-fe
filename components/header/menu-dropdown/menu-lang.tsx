import Link from "next/link";
import { Suspense } from "react";

export const MenuLang = () => {
  return (
    <Suspense>
      <Link
        href="/panel/profile"
        className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent hover:bg-gray-100"
      >
        English
      </Link>

      <Link
        href="/panel/settings"
        className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent hover:bg-gray-100"
      >
        Indonesia
      </Link>
    </Suspense>
  );
};
