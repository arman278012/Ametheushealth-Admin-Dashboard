import React, { useState } from "react";
import { FaBars, FaTimes, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [contactMenu, setContactMenu] = useState(false);
  const [isPerscriptionMenuOpen, setIsPerscriptionMenuOpen] = useState(false);
  const [isProductsMenuOpen, setIsProductsMenuOpen] = useState(false);
  const [isCategoriesMenuOpen, setIsCategoriesMenuOpen] = useState(false);
  const [isManufacturersMenuOpen, setIsManufacturersMenuOpen] = useState(false);
  const [isGenericMenuOpen, setIsGenericMenuOpen] = useState(false);
  const [isUsersMenuOpen, setIsUsersMenuOpen] = useState(false);
  const [isBlogsOpen, setIsBlogsOpen] = useState(false);
  const [isCouponsMenuOpen, setIsCouponsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  const toggleContactMenu = () => {
    setContactMenu(!contactMenu);
  };

  const togglePerscriptionMenu = () => {
    setIsPerscriptionMenuOpen(!isPerscriptionMenuOpen);
  };

  const toggleProductsMenu = () => {
    setIsProductsMenuOpen(!isProductsMenuOpen);
  };

  const toggleCategoriesMenu = () => {
    setIsCategoriesMenuOpen(!isCategoriesMenuOpen);
  };

  const toggleManufacturersMenu = () => {
    setIsManufacturersMenuOpen(!isManufacturersMenuOpen);
  };

  const toggleGenericMenu = () => {
    setIsGenericMenuOpen(!isGenericMenuOpen);
  };

  const toggleUsersMenu = () => {
    setIsUsersMenuOpen(!isUsersMenuOpen);
  };

  const toggleBlogsMenu = () => {
    setIsBlogsOpen(!isBlogsOpen);
  };

  const toggleCouponsMenu = () => {
    setIsCouponsMenuOpen(!isCouponsMenuOpen);
  };

  const logOut = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("authorization");
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
                <img src="ametheusLogo.webp" className="w-[250px]" />
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
            <div className="text-xl font-bold">Ametheus Health</div>
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <FaTimes className="block h-6 w-6" />
            </button>
          </div>
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* orders */}
            <div className="relative">
              <button
                onClick={toggleSubMenu}
                className="w-full flex justify-between items-center text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
              >
                Orders
                {isSubMenuOpen ? (
                  <FaChevronUp className="ml-2 h-5 w-5" />
                ) : (
                  <FaChevronDown className="ml-2 h-5 w-5" />
                )}
              </button>
              {isSubMenuOpen && (
                <div className="pl-4 space-y-1">
                  <NavLink
                    to={"/orders"}
                    className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
                  >
                    All Orders
                  </NavLink>
                  <NavLink
                    to={"/create-order"}
                    className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
                  >
                    Create Order
                  </NavLink>
                </div>
              )}
            </div>

            {/* contact */}
            <div className="relative">
              <button
                onClick={toggleContactMenu}
                className="w-full flex justify-between items-center text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
              >
                Contacts
                {contactMenu ? (
                  <FaChevronUp className="ml-2 h-5 w-5" />
                ) : (
                  <FaChevronDown className="ml-2 h-5 w-5" />
                )}
              </button>
              {contactMenu && (
                <div className="pl-4 space-y-1">
                  <NavLink
                    to={"/all-contacts"}
                    className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
                  >
                    All Contacts
                  </NavLink>
                </div>
              )}
            </div>

            {/* Perscription Menu */}
            <div className="relative">
              <button
                onClick={togglePerscriptionMenu}
                className="w-full flex justify-between items-center text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
              >
                Perscription
                {isPerscriptionMenuOpen ? (
                  <FaChevronUp className="ml-2 h-5 w-5" />
                ) : (
                  <FaChevronDown className="ml-2 h-5 w-5" />
                )}
              </button>
              {isPerscriptionMenuOpen && (
                <div className="pl-4 space-y-1">
                  <NavLink
                    to={"/all-persciption"}
                    className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
                  >
                    All Perscription
                  </NavLink>
                </div>
              )}
            </div>

            {/* Products Menu */}
            <div className="relative">
              <button
                onClick={toggleProductsMenu}
                className="w-full flex justify-between items-center text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
              >
                Products
                {isProductsMenuOpen ? (
                  <FaChevronUp className="ml-2 h-5 w-5" />
                ) : (
                  <FaChevronDown className="ml-2 h-5 w-5" />
                )}
              </button>
              {isProductsMenuOpen && (
                <div className="pl-4 space-y-1">
                  <NavLink
                    to={"/product-details"}
                    className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
                  >
                    All Products
                  </NavLink>
                  <NavLink
                    to={"/add-product"}
                    className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
                  >
                    Add Products
                  </NavLink>
                </div>
              )}
            </div>

            {/* Categories Menu */}
            <div className="relative">
              <button
                onClick={toggleCategoriesMenu}
                className="w-full flex justify-between items-center text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
              >
                Categories
                {isCategoriesMenuOpen ? (
                  <FaChevronUp className="ml-2 h-5 w-5" />
                ) : (
                  <FaChevronDown className="ml-2 h-5 w-5" />
                )}
              </button>
              {isCategoriesMenuOpen && (
                <div className="pl-4 space-y-1">
                  <NavLink
                    to={"/all-categories"}
                    className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
                  >
                    All Categories
                  </NavLink>
                  <NavLink
                    to={"/add-category"}
                    className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
                  >
                    Add Categories
                  </NavLink>
                  <NavLink
                    to="/attach-categories"
                    className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
                  >
                    Attach Categories
                  </NavLink>
                </div>
              )}
            </div>

            {/* Manufacturares Menu */}
            <div className="relative">
              <button
                onClick={toggleManufacturersMenu}
                className="w-full flex justify-between items-center text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
              >
                Manufacturares
                {isManufacturersMenuOpen ? (
                  <FaChevronUp className="ml-2 h-5 w-5" />
                ) : (
                  <FaChevronDown className="ml-2 h-5 w-5" />
                )}
              </button>
              {isManufacturersMenuOpen && (
                <div className="pl-4 space-y-1">
                  <NavLink
                    to={"/all-manufacturers"}
                    className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
                  >
                    All Manufacturers
                  </NavLink>
                  <NavLink
                    to={"/add-manufacturer"}
                    className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
                  >
                    Add Manufacturers
                  </NavLink>
                  <NavLink
                    to={"/instant-manufacturer"}
                    className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
                  >
                    Instant Manufacturers
                  </NavLink>
                  <NavLink
                    to={"/attach-manufacturer"}
                    className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
                  >
                    Attach Manufacturers
                  </NavLink>
                </div>
              )}
            </div>

            {/* Generic Menu */}
            <div className="relative">
              <button
                onClick={toggleGenericMenu}
                className="w-full flex justify-between items-center text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
              >
                Generic
                {isGenericMenuOpen ? (
                  <FaChevronUp className="ml-2 h-5 w-5" />
                ) : (
                  <FaChevronDown className="ml-2 h-5 w-5" />
                )}
              </button>
              {isGenericMenuOpen && (
                <div className="pl-4 space-y-1">
                  <NavLink
                    to={"/instant-generic"}
                    className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
                  >
                    Instant Generic
                  </NavLink>
                  <NavLink
                    to={"/add-generic"}
                    className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
                  >
                    Add Generic
                  </NavLink>
                  <NavLink
                    to={"/attach-generic"}
                    className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
                  >
                    Attach Generic
                  </NavLink>
                </div>
              )}
            </div>

            {/* Blogs Menu */}
            <div className="relative">
              <button
                onClick={toggleBlogsMenu}
                className="w-full flex justify-between items-center text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
              >
                Blogs
                {isBlogsOpen ? (
                  <FaChevronUp className="ml-2 h-5 w-5" />
                ) : (
                  <FaChevronDown className="ml-2 h-5 w-5" />
                )}
              </button>
              {isBlogsOpen && (
                <div className="pl-4 space-y-1">
                  <NavLink
                    to={"/show-blogs"}
                    className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
                  >
                    All Blogs
                  </NavLink>
                  <NavLink
                    to={"/add-blogs"}
                    className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
                  >
                    Add Blogs
                  </NavLink>
                </div>
              )}
            </div>

            {/* coupons code Menu */}
            <div className="relative">
              <button
                onClick={toggleCouponsMenu}
                className="w-full flex justify-between items-center text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
              >
                Coupons
                {isCouponsMenuOpen ? (
                  <FaChevronUp className="ml-2 h-5 w-5" />
                ) : (
                  <FaChevronDown className="ml-2 h-5 w-5" />
                )}
              </button>
              {isCouponsMenuOpen && (
                <div className="pl-4 space-y-1">
                  <NavLink
                    to={"/add-coupons"}
                    className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
                  >
                    Add Coupons
                  </NavLink>
                  <NavLink
                    to={"/all-coupons"}
                    className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
                  >
                    All Coupons
                  </NavLink>
                </div>
              )}
            </div>

            {/* Users Menu */}
            <div className="relative">
              <button
                onClick={toggleUsersMenu}
                className="w-full flex justify-between items-center text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
              >
                Users
                {isUsersMenuOpen ? (
                  <FaChevronUp className="ml-2 h-5 w-5" />
                ) : (
                  <FaChevronDown className="ml-2 h-5 w-5" />
                )}
              </button>
              {isUsersMenuOpen && (
                <div className="pl-4 space-y-1">
                  <NavLink
                    to={"/all-users"}
                    className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
                  >
                    All Users
                  </NavLink>
                </div>
              )}
            </div>

            {/* Users Menu */}
            <div className="relative">
              <NavLink to={"/login"}>
                <button
                  onClick={logOut}
                  className="w-full flex justify-between items-center text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
                >
                  Logout
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default MobileNavbar;
