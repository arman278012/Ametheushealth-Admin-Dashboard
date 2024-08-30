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
  const [isContactMenuOpen, setIsContactMenuOpen] = useState(false);
  const [isPerscriptionMenuOpen, setIsPerscriptionMenuOpen] = useState(false);
  const [isBlogsOpen, setIsBlogsOpen] = useState(false);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  const toggleUsersMenu = () => setIsUsersMenuOpen(!isUsersMenuOpen);
  const toggleProductsMenu = () => setIsProductsMenuOpen(!isProductsMenuOpen);
  const toggleOrdersMenu = () => setIsOrdersMenuOpen(!isOrdersMenuOpen);
  const toggleCategoriesMenu = () =>
    setIsCategoriesMenuOpen(!isCategoriesMenuOpen);
  const toggleManufacturersMenu = () =>
    setIsManufacturersMenuOpen(!isManufacturersMenuOpen);
  const toggleGenericMenu = () => setIsGenericMenuOpen(!isGenericMenuOpen);
  const toggleContactMenu = () => setIsContactMenuOpen(!isContactMenuOpen);
  const togglePerscriptionMenu = () =>
    setIsPerscriptionMenuOpen(!isPerscriptionMenuOpen);
  const toggleBlogsMenu = () => setIsBlogsOpen(!isBlogsOpen);

  const id = localStorage.getItem("id");
  const authorization = localStorage.getItem("authorization");

  return (
    <div className="sm:flex md:flex hidden sticky">
      <div
        className={`bg-gray-800 text-white min-h-screen ${
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
                  <FaBox className="mr-2" />
                  {!isCollapsed && "Orders"}
                </span>
                {!isCollapsed &&
                  (isOrdersMenuOpen ? <FaChevronDown /> : <FaChevronRight />)}
              </button>
              {!isCollapsed && isOrdersMenuOpen && (
                <div className="ml-6 mt-2 flex flex-col space-y-2">
                  <NavLink
                    to={"/orders"}
                    className="hover:bg-gray-700 px-4 py-2"
                  >
                    All Orders
                  </NavLink>
                  <NavLink
                    to={"/create-order"}
                    className="hover:bg-gray-700 px-4 py-2"
                  >
                    Create Order
                  </NavLink>
                </div>
              )}
            </div>
            {/* contact Menu */}
            <div>
              <button
                onClick={toggleContactMenu}
                className="flex items-center justify-between w-full px-4 py-2 text-left focus:outline-none focus:bg-gray-700"
              >
                <span className="flex items-center">
                  <FaBox className="mr-2" />
                  {!isCollapsed && "Contacts"}
                </span>
                {!isCollapsed &&
                  (isContactMenuOpen ? <FaChevronDown /> : <FaChevronRight />)}
              </button>
              {!isCollapsed && isContactMenuOpen && (
                <div className="ml-6 mt-2 flex flex-col space-y-2">
                  <NavLink
                    to={"/all-contacts"}
                    className="hover:bg-gray-700 px-4 py-2"
                  >
                    All Contacts
                  </NavLink>
                  {/* <NavLink
                    to={"/add-orders"}
                    className="hover:bg-gray-700 px-4 py-2"
                  >
                    Add Orders
                  </NavLink> */}
                </div>
              )}
            </div>

            {/* Perscription Menu */}
            <div>
              <button
                onClick={togglePerscriptionMenu}
                className="flex items-center justify-between w-full px-4 py-2 text-left focus:outline-none focus:bg-gray-700"
              >
                <span className="flex items-center">
                  <FaBox className="mr-2" />
                  {!isCollapsed && "Perscription"}
                </span>
                {!isCollapsed &&
                  (isPerscriptionMenuOpen ? (
                    <FaChevronDown />
                  ) : (
                    <FaChevronRight />
                  ))}
              </button>
              {!isCollapsed && isPerscriptionMenuOpen && (
                <div className="ml-6 mt-2 flex flex-col space-y-2">
                  <NavLink
                    to={"/all-persciption"}
                    className="hover:bg-gray-700 px-4 py-2"
                  >
                    All Perscription
                  </NavLink>
                  {/* <NavLink
                    to={"/add-orders"}
                    className="hover:bg-gray-700 px-4 py-2"
                  >
                    Add Orders
                  </NavLink> */}
                </div>
              )}
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
                  <NavLink
                    to={"/product-details"}
                    className="hover:bg-gray-700 px-4 py-2"
                  >
                    All Products
                  </NavLink>
                  <NavLink
                    to={"/add-product"}
                    className="hover:bg-gray-700 px-4 py-2"
                  >
                    Add Products
                  </NavLink>

                  <NavLink
                    href="add-product"
                    className="hover:bg-gray-700 px-4 py-2"
                  >
                    Import Products
                  </NavLink>

                  <NavLink
                    href="add-product"
                    className="hover:bg-gray-700 px-4 py-2"
                  >
                    Export Products
                  </NavLink>
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
                  <NavLink
                    to={"/all-categories"}
                    // href="all-categories"
                    className="hover:bg-gray-700 px-4 py-2"
                  >
                    All Categories
                  </NavLink>
                  <NavLink
                    to={"/add-category"}
                    // href="add-category"
                    className="hover:bg-gray-700 px-4 py-2"
                  >
                    Add Categories
                  </NavLink>
                  <NavLink
                    to="/attach-categories"
                    className="hover:bg-gray-700 px-4 py-2"
                  >
                    Attach Categories
                  </NavLink>
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
                  <NavLink
                    to={"/all-manufacturers"}
                    className="hover:bg-gray-700 px-4 py-2"
                  >
                    All Manufacturers
                  </NavLink>
                  <NavLink
                    to={"/add-manufacturer"}
                    className="hover:bg-gray-700 px-4 py-2"
                  >
                    Add Manufacturers
                  </NavLink>
                  <NavLink
                    to={"/instant-manufacturer"}
                    className="hover:bg-gray-700 px-4 py-2"
                  >
                    Instant Manufacturers
                  </NavLink>
                  <NavLink
                    to="/attach-manufacturer"
                    className="hover:bg-gray-700 px-4 py-2"
                  >
                    Attach Manufacturers
                  </NavLink>
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
                  <NavLink
                    to={"/instant-generic"}
                    className="hover:bg-gray-700 px-4 py-2"
                  >
                    Instant Generic
                  </NavLink>
                  <a href="all-generic" className="hover:bg-gray-700 px-4 py-2">
                    All Generic
                  </a>
                  <NavLink
                    to={"/add-generic"}
                    className="hover:bg-gray-700 px-4 py-2"
                  >
                    Add Generic
                  </NavLink>

                  <NavLink
                    to={"/attach-generic"}
                    className="hover:bg-gray-700 px-4 py-2"
                  >
                    Attach Generic
                  </NavLink>
                </div>
              )}
            </div>

            {/* Blogs Menu */}
            <div>
              <button
                onClick={toggleBlogsMenu}
                className="flex items-center justify-between w-full px-4 py-2 text-left focus:outline-none focus:bg-gray-700"
              >
                <span className="flex items-center">
                  <FaUsers className="mr-2" />
                  {!isCollapsed && "Blogs"}
                </span>
                {!isCollapsed &&
                  (isUsersMenuOpen ? <FaChevronDown /> : <FaChevronRight />)}
              </button>
              {!isCollapsed && isBlogsOpen && (
                <div className="ml-6 mt-2 flex flex-col space-y-2">
                  <NavLink
                    to={"/show-blogs"}
                    className="hover:bg-gray-700 px-4 py-2"
                  >
                    All Blogs
                  </NavLink>
                  <NavLink
                    to={"/add-blogs"}
                    className="hover:bg-gray-700 px-4 py-2"
                  >
                    Add Blogs
                  </NavLink>

                  {/* <a href="#" className="hover:bg-gray-700 px-4 py-2">
                    Add User
                  </a> */}
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
            {authorization && id ? (
              <div>
                <NavLink to="/">
                  <button className="flex items-center justify-between w-full px-4 py-2 text-left focus:outline-none focus:bg-gray-700">
                    <span className="flex items-center">
                      <FaUsers className="mr-2" />
                      {!isCollapsed && "Logout"}
                    </span>
                  </button>
                </NavLink>
              </div>
            ) : (
              <div>
                <NavLink to="/">
                  <button className="flex items-center justify-between w-full px-4 py-2 text-left focus:outline-none focus:bg-gray-700">
                    <span className="flex items-center">
                      <FaUsers className="mr-2" />
                      {!isCollapsed && "Login"}
                    </span>
                  </button>
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MySideBar;
