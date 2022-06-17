import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header className="flex justify-between p-5 max-w-6xl mx-auto">
      <div className="flex items-center space-x-5">
        <Link href="/">
          <img
            className="w-44 object-contain cursor-pointer"
            src="https://links.papareact.com/yvf"
            alt=""
          />
        </Link>

        <div className="hidden md:inline-flex items-center space-x-5">
          <h3 className="cursor-pointer hover:underline decoration-green-600 decoration-3">About</h3>
          <h3 className="cursor-pointer hover:underline decoration-green-600 decoration-3">Contact</h3>
          <h3 className="text-white bg-green-600 px-4  py-1 rounded-full cursor-pointer hover:bg-green-700 duration-200">Follow</h3>
        </div>
      </div>

      <div className="flex items-center space-x-5 text-green-600 cursor-pointer">
        <h3>Sign in</h3>
        <h3 className="border border-green-600 rounded-full px-4 py-1 hover:bg-green-600 hover:text-white cursor-pointer duration-200">Get Started</h3>
        {/* Sign in */}
        {/* Get Started */}
      </div>
    </header>
  );
}
