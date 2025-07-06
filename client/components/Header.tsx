'use client'
import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button"; 
import { Badge } from "@/components/ui/badge";
import { Menu, X } from "lucide-react";
import { AuthModal } from "./AuthModal";

export default function Header() {
    //track states for menu on mobile view
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  //track states for auth modal
  const [authModalOpen, setAuthModalOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white shadow-sm px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-full"></div>
          </div>
          <span className="text-xl font-bold text-gray-800">BigCart</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-gray-600 hover:text-gray-800 border-1 border-gray-400 py-1 px-4 rounded-full ">
            Seller Dashboard
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-800">
            Home
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-800">
            All Product
          </a>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <ShoppingCart className="w-6 h-6 text-gray-600" />
            <Badge className="absolute -top-2 -right-2 bg-green-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center p-0">
              0
            </Badge>
          </div>
          <div className="hidden md:block">
            <Button onClick={() => setAuthModalOpen(true)} className="bg-green-500 hover:bg-green-600 text-white px-6">
              Login
            </Button>
          </div>

          {/* Hamburger Icon */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-600 focus:outline-none"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4">
          <a href="#" className="text-gray-600 hover:text-gray-800">
            Seller Dashboard
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-800">
            Home
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-800">
            All Product
          </a>
          <Button onClick={() => setAuthModalOpen(true)} className="bg-green-500 hover:bg-green-600 text-white w-full">
            Login
          </Button>
        </div>
      )}
     <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />

    </header>
  );
}
