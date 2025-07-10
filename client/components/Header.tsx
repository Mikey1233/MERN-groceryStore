"use client";
import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, X } from "lucide-react";
import { AuthModal } from "./AuthModal";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import User
import { useAuth } from "@/contexts/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();
  // console.log(user)
  const pathName = usePathname();
  //track states for menu on mobile view
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  //track states for auth modal
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white shadow-sm px-6 py-4 md:px-24">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href={"/"} className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
            <ShoppingCart className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-semibold text-gray-800">walCart</span>
        </Link>
        {/* <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-full"></div>
          </div>
          <span className="text-xl font-bold text-gray-800">BigCart</span>
        </div> */}

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

        {/* login active state */}
        {user ? (
          <div className="flex items-center gap-4">
            <Link href={"/cart"} className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-600" />
              <Badge className="absolute -top-2 -right-2 bg-green-400 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center p-0">
                0
              </Badge>
            </Link>
            <Avatar>
              <AvatarImage src={user?.profileImage ?? undefined} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Button className="cursor-pointer" onClick={() => logout()}>Logout</Button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <Button
                onClick={() => setAuthModalOpen(true)}
                className="bg-green-400 hover:bg-green-600 text-white cursor-pointer px-6"
              >
                Get Started
              </Button>
            </div>

            {/* Hamburger Icon */}
            <button
              onClick={toggleMenu}
              className="md:hidden text-gray-600 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4">
          <Link
            href="/adminDashboard"
            className="text-gray-600 hover:text-gray-800"
          >
            Seller Dashboard
          </Link>
          <Link href="/" className="text-gray-600 hover:text-gray-800">
            Home
          </Link>
          <Link href="/products" className="text-gray-600 hover:text-gray-800">
            All Product
          </Link>
          <Button
            onClick={() => setAuthModalOpen(true)}
            className="bg-green-400 hover:bg-green-600 text-white w-full"
          >
            Login
          </Button>
        </div>
      )}
      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </header>
  );
}
