import React, { useState } from "react";
import {
  FaUsers,
  FaBox,
  FaChevronDown,
  FaChevronRight,
  FaBars,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const MySideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isUsersMenuOpen, setIsUsersMenuOpen] = useState(false);
  const [isProductsMenuOpen, setIsProductsMenuOpen] = useState(false);
  const [isOrdersMenuOpen, setIsOrdersMenuOpen] = useState(false);
  const [isCategoriesMenuOpen, setIsCategoriesMenuOpen] = useState(false);
  const [isManufacturersMenuOpen, setIsManufacturersMenuOpen] = useState(false);
  const [isGenericMenuOpen, setIsGenericMenuOpen] = useState(false);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  const toggleUsersMenu = () => setIsUsersMenuOpen(!isUsersMenuOpen);
  const toggleProductsMenu = () => setIsProductsMenuOpen(!isProductsMenuOpen);
  const toggleOrdersMenu = () => setIsOrdersMenuOpen(!isOrdersMenuOpen);
  const toggleCategoriesMenu = () =>
    setIsCategoriesMenuOpen(!isCategoriesMenuOpen);
  const toggleManufacturersMenu = () =>
    setIsManufacturersMenuOpen(!isManufacturersMenuOpen);
  const toggleGenericMenu = () => setIsGenericMenuOpen(!isGenericMenuOpen);

  return (
    <div className="sm:flex md:flex hidden sticky">
      <div
        className={`bg-gray-800 text-white h-auto ${
          isCollapsed ? "w-16" : "w-64"
        } transition-all duration-300`}
      >
        <div className="flex flex-col p-4">
          <button
            onClick={toggleSidebar}
            className="text-xl mb-6 focus:outline-none"
          >
            <FaBars className="ml-[16px]" />
          </button>
          <div className="flex flex-col space-y-2">
            {/* orders Menu */}
            <div>
              <button
                onClick={toggleOrdersMenu}
                className="flex items-center justify-between w-full px-4 py-2 text-left focus:outline-none focus:bg-gray-700"
              >
                <span className="flex items-center">
                  <FaUsers className="mr-2" />
                  {!isCollapsed && "Orders"}
                </span>
              </button>
            </div>

            {/* Products Menu */}
            <div>
              <button
                onClick={toggleProductsMenu}
                className="flex items-center justify-between w-full px-4 py-2 text-left focus:outline-none focus:bg-gray-700"
              >
                <span className="flex items-center">
                  <FaBox className="mr-2" />
                  {!isCollapsed && "Products"}
                </span>
                {!isCollapsed &&
                  (isProductsMenuOpen ? <FaChevronDown /> : <FaChevronRight />)}
              </button>
              {!isCollapsed && isProductsMenuOpen && (
                <div className="ml-6 mt-2 flex flex-col space-y-2">
                  <a
                    href="product-details"
                    className="hover:bg-gray-700 px-4 py-2"
                  >
                    All Products
                  </a>
                  <a
                    href="add-product"
                    className="hover:bg-gray-700 px-4 py-2"
                  >
                    Add Products
                  </a>

                  <a
                    href="add-product"
                    className="hover:bg-gray-700 px-4 py-2"
                  >
                    Import Products
                  </a>

                  <a
                    href="add-product"
                    className="hover:bg-gray-700 px-4 py-2"
                  >
                    Export Products
                  </a>
                </div>
              )}
            </div>

            {/* Categories Menu */}
            <div>
              <button
                onClick={toggleCategoriesMenu}
                className="flex items-center justify-between w-full px-4 py-2 text-left focus:outline-none focus:bg-gray-700"
              >
                <span className="flex items-center">
                  <FaUsers className="mr-2" />
                  {!isCollapsed && "Categories"}
                </span>
                {!isCollapsed &&
                  (isCategoriesMenuOpen ? (
                    <FaChevronDown />
                  ) : (
                    <FaChevronRight />
                  ))}
              </button>
              {!isCollapsed && isCategoriesMenuOpen && (
                <div className="ml-6 mt-2 flex flex-col space-y-2">
                  <a
                    href="all-categories"
                    className="hover:bg-gray-700 px-4 py-2"
                  >
                    All Categories
                  </a>
                  <a
                    href="add-category"
                    className="hover:bg-gray-700 px-4 py-2"
                  >
                    Add Categories
                  </a>
                  <a href="#" className="hover:bg-gray-700 px-4 py-2">
                    Attach Categories
                  </a>
                </div>
              )}
            </div>

            {/* Manufacturares Menu */}
            <div>
              <button
                onClick={toggleManufacturersMenu}
                className="flex items-center justify-between w-full px-4 py-2 text-left focus:outline-none focus:bg-gray-700"
              >
                <span className="flex items-center">
                  <FaUsers className="mr-2" />
                  {!isCollapsed && "Manufacturers"}
                </span>
                {!isCollapsed &&
                  (isManufacturersMenuOpen ? (
                    <FaChevronDown />
                  ) : (
                    <FaChevronRight />
                  ))}
              </button>
              {!isCollapsed && isManufacturersMenuOpen && (
                <div className="ml-6 mt-2 flex flex-col space-y-2">
                  <a href="#" className="hover:bg-gray-700 px-4 py-2">
                    All Manufacturers
                  </a>
                  <a href="#" className="hover:bg-gray-700 px-4 py-2">
                    Add Manufacturers
                  </a>
                  <a href="#" className="hover:bg-gray-700 px-4 py-2">
                    Attach Manufacturers
                  </a>
                </div>
              )}
            </div>

            {/* Generic Menu */}
            <div>
              <button
                onClick={toggleGenericMenu}
                className="flex items-center justify-between w-full px-4 py-2 text-left focus:outline-none focus:bg-gray-700"
              >
                <span className="flex items-center">
                  <FaUsers className="mr-2" />
                  {!isCollapsed && "Generic"}
                </span>
                {!isCollapsed &&
                  (isGenericMenuOpen ? <FaChevronDown /> : <FaChevronRight />)}
              </button>
              {!isCollapsed && isGenericMenuOpen && (
                <div className="ml-6 mt-2 flex flex-col space-y-2">
                  <a href="#" className="hover:bg-gray-700 px-4 py-2">
                    All Generic
                  </a>
                  <a href="#" className="hover:bg-gray-700 px-4 py-2">
                    Add Generic
                  </a>
                  <a href="#" className="hover:bg-gray-700 px-4 py-2">
                    Attach Generic
                  </a>
                </div>
              )}
            </div>

            {/* Users Menu */}
            <div>
              <button
                onClick={toggleUsersMenu}
                className="flex items-center justify-between w-full px-4 py-2 text-left focus:outline-none focus:bg-gray-700"
              >
                <span className="flex items-center">
                  <FaUsers className="mr-2" />
                  {!isCollapsed && "Users"}
                </span>
                {!isCollapsed &&
                  (isUsersMenuOpen ? <FaChevronDown /> : <FaChevronRight />)}
              </button>
              {!isCollapsed && isUsersMenuOpen && (
                <div className="ml-6 mt-2 flex flex-col space-y-2">
                  <a href="#" className="hover:bg-gray-700 px-4 py-2">
                    All Users
                  </a>
                  <a href="#" className="hover:bg-gray-700 px-4 py-2">
                    Add User
                  </a>
                </div>
              )}
            </div>

            {/* Login */}
            <div>
              <NavLink to="/login">
                <button className="flex items-center justify-between w-full px-4 py-2 text-left focus:outline-none focus:bg-gray-700">
                  <span className="flex items-center">
                    <FaUsers className="mr-2" />
                    {!isCollapsed && "Login"}
                  </span>
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MySideBar;
