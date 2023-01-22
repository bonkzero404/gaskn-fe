import Link from "next/link";
import { Suspense } from "react";
import { DividerHorizontal } from "../../divider-horizontal";

export const MenuProfile = () => {
  return (
    <Suspense>
      <Link
        href="/panel/profile"
        className={
          "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent hover:bg-gray-100"
        }
      >
        Profile
      </Link>

      <Link
        href="/panel/settings"
        className={
          "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent hover:bg-gray-100"
        }
      >
        Settings
      </Link>

      <DividerHorizontal />
      <Link
        href="/panel/signout"
        className={
          "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent hover:bg-gray-100"
        }
      >
        Sign Out
      </Link>
    </Suspense>
  );
};
