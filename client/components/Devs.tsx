import React from "react";
import Image from "next/image";
import Link from "next/link";
import devs from "@/public/assets/devs.svg";

function Devs() {
  return (
    <div className="flex flex-col items-center justify-center  bg-white dark:bg-gray-900 py-12 px-4 text-center">
      <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-white">
        Our devs are still building this page…
      </h1>

      {/* Loading animation */}
      <div className="flex items-center mb-6">
        <span className="text-gray-600 dark:text-gray-300 mr-2 text-lg">Loading</span>
        <span className="h-3 w-3 bg-gradient-to-br from-green-400 to-green-600 rounded-full animate-ping"></span>
      </div>

      <Image src={devs} alt="Developers Illustration" className="w-64 md:w-96 mb-6" />

      <Link href="/">
        <div className="px-6 py-3 bg-gradient-to-br from-green-400 to-green-600 text-white font-medium rounded-xl hover:bg-green-700 transition-all">
          Go Back Home
        </div>
      </Link>
    </div>
  );
}

export default Devs;
