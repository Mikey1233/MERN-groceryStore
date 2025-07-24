"use client";
import { useState, useEffect } from "react";
import {
  BadgeCheck,
  ForkKnife,
  Menu,
  ShoppingCart,
  UserCircle2,
  X,
} from "lucide-react";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "./AuthModal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Header() {
  const { user, logout } = useAuth();
  const pathName = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  // Close menu on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isMenuOpen) {
        closeMenu();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMenuOpen]);

  return (
    <header
      className={`bg-white  'relative'  shadow-sm px-6 py-4 md:px-24 w-full z-50`}
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
            <ForkKnife className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-semibold text-gray-800">foodCart</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <div
            className={clsx("relative inline-block rounded-full", {
              "p-[2px] bg-[conic-gradient(at_top_right,_green,#22c55e,#16a34a,#22c55e)] animate-spin-slow":
                pathName === "/adminDashboard",
            })}
          >
            <div className="bg-white rounded-full">
              <Link
                href="/adminDashboard"
                className="block text-gray-600 hover:text-gray-800 py-1 px-4 rounded-full"
              >
                Seller Dashboard
              </Link>
            </div>
          </div>
          <Link href="/" className="text-gray-600 hover:text-gray-800">
            Home
          </Link>
          <Link href="/products" className="text-gray-600 hover:text-gray-800">
            All Product
          </Link>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="hidden md:flex items-center gap-4">
              <Link href="/cart" className="relative">
                <ShoppingCart className="w-6 h-6 text-gray-600" />
                <Badge className="absolute -top-2 -right-2 bg-green-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center p-0">
                  0
                </Badge>
              </Link>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Avatar className="cursor-pointer">
                      <AvatarImage src={user?.profileImage ?? undefined} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent>
                    <span
                      className={`text-xs px-2 py-1 rounded-full text-white font-medium flex items-center gap-1`}
                    >
                      {user?.role === "admin" ? (
                        <BadgeCheck className="w-3.5 h-3.5" />
                      ) : (
                        <UserCircle2 />
                      )}
                      {user?.role === "admin" ? "Admin" : "Customer"}
                    </span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Button className="bg-red-500" onClick={logout}>
                logout
              </Button>
            </div>
          ) : (
            <div className="hidden md:block">
              <Button
                onClick={() => setAuthModalOpen(true)}
                className="bg-gradient-to-br from-green-400 to-green-600 rounded-none hover:bg-green-600 text-white px-6"
              >
                Get Started
              </Button>
            </div>
          )}

          {/* Mobile Hamburger */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-600 focus:outline-none"
          >
            <Menu className="w-6 h-6" />
            {/* {isMenuOpen && (
           
            )} */}
          </button>
        </div>
      </div>

      {/* Mobile Side Menu */}
      <div
        className={clsx(
          "fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 md:hidden",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <X className="w-6 h-6 absolute right-2 top-3" onClick={closeMenu} />
        <div className="flex flex-col gap-6 p-6 pt-20">
          {user && (
            <Avatar className="w-10 h-10">
              <AvatarImage src={user?.profileImage ?? undefined} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          )}
          {user?.role == "admin" && (
            <Link
              href="/adminDashboard"
              className="text-gray-600 hover:text-gray-800"
              onClick={closeMenu}
            >
              Seller Dashboard
            </Link>
          )}
          <Link
            href="/"
            className="text-gray-600 hover:text-gray-800"
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link
            href="/products"
            className="text-gray-600 hover:text-gray-800"
            onClick={closeMenu}
          >
            All Product
          </Link>
          <Link
            href="/cart"
            className="relative flex items-center gap-3 text-gray-600 hover:text-gray-800"
          >
            {/* <ShoppingCart className="w-6 h-6 text-gray-600" /> */}
            <span>Cart</span>
            <Badge className=" bg-green-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center p-0">
              0
            </Badge>
          </Link>
          {user ? (
            <Button
              className="bg-red-500 w-full"
              onClick={() => {
                logout();
                closeMenu();
              }}
            >
              Logout
            </Button>
          ) : (
            <Button
              onClick={() => {
                closeMenu();
                setAuthModalOpen(true);
              }}
              className="bg-green-500 hover:bg-green-600 text-white w-full"
            >
              Login
            </Button>
          )}
        </div>
      </div>

      {/* Backdrop */}
      {isMenuOpen && (
        <div
          onClick={closeMenu}
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
        ></div>
      )}

      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </header>
  );
}
