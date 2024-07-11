import React, { useState } from "react";
import { FaBars, FaTimes, FaChevronDown, FaChevronUp } from "react-icons/fa";

const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  return (
    <div>
      <nav className=" text-white">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <span className="sr-only">Open main menu</span>
                <FaBars className="block h-6 w-6" />
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex-shrink-0 text-xl font-bold">
                <img src="ametheusLogo.webp" className="w-[250px]"/>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`fixed inset-0 z-50 transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out sm:hidden bg-gray-800 w-64`}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
            <div className="text-xl font-bold">Menu</div>
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <FaTimes className="block h-6 w-6" />
            </button>
          </div>
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
            >
              Home
            </a>
            <div className="relative">
              <button
                onClick={toggleSubMenu}
                className="w-full flex justify-between items-center text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
              >
                Menu 1
                {isSubMenuOpen ? (
                  <FaChevronUp className="ml-2 h-5 w-5" />
                ) : (
                  <FaChevronDown className="ml-2 h-5 w-5" />
                )}
              </button>
              {isSubMenuOpen && (
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
              )}
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
