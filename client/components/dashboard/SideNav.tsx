"use client";
import { Plus, List, ShoppingCart } from "lucide-react";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
  {
    name: "Add Product",
    href: "/adminDashboard",
    icon: Plus,
  },
  {
    name: "Orders",
    href: "/adminDashboard/order",
    icon: ShoppingCart,
  },
  {
    name: "Product list",
    href: "/adminDashboard/product-list",
    icon: List,
  },
];
function SideNav() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r hidden md:block border-gray-200 min-h-[calc(100vh-73px)]">
      <nav className="p-4 space-y-2">
        {links.map((link) => {
          const LinkIcon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                "flex items-center space-x-3 px-3 py-2 ",
                {
                  "bg-green-50  border-l-4 border-green-500 text-green-700 rounded-r":
                    pathname === link.href,
                }
              )}
            >
              <LinkIcon className="w-5 h-5" />

              <p className="font-medium">{link.name}</p>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

export default SideNav;
