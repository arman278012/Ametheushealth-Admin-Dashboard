import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <nav className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                  <FaTimes className="block h-6 w-6" />
                ) : (
                  <FaBars className="block h-6 w-6" />
                )}
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex-shrink-0 text-xl font-bold">Logo</div>
            </div>
          </div>
        </div>

        <div className={`${isOpen ? "block" : "hidden"} sm:hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
            >
              Home
            </a>
            <div className="relative">
              <button className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700">
                Menu 1
              </button>
              <div className="pl-4 space-y-1">
                <a
                  href="#"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
                >
                  Submenu 1
                </a>
                <a
                  href="#"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
                >
                  Submenu 2
                </a>
              </div>
            </div>
            <a
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
            >
              Menu 2
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default MobileNavbar;
