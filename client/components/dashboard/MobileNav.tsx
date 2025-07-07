"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
function MobileNav() {
  const pathName = usePathname();
  return (
    <div className="w-full py-4 px-2 gap-4 flex flex-col justify-center  md:hidden">
      <div className="flex gap-2">
        <Link
          href={"/adminDashboard"}
          className={clsx(
            "bg-green-200 text-[#178d00] px-3 py-1 rounded-full text-sm",
            { "bg-green-400": pathName === "/adminDashboard" }
          )}
        >
          {" "}
          Add Product
        </Link>
        <Link
          href={"/adminDashboard/order"}
          className={clsx(
            "bg-red-200 text-red-600 px-3 py-1 rounded-full text-sm",
            { "bg-red-400": pathName === "/adminDashboard/orders" }
          )}
        >
          Orders
        </Link>
        <Link
          href={"/adminDashboard/product-list"}
          className={clsx(
            "bg-yellow-200 text-yellow-600 px-3 py-1 rounded-full text-sm",
            { "bg-yellow-400": pathName === "/adminDashboard/product-list" }
          )}
        >
          Product List
        </Link>
      </div>
      <div className="mb-4 bg-gradient-to-r from-transparent via-[#48494a47] to-transparent h-[1px] w-full"></div>
    </div>
  );
}

export default MobileNav;
