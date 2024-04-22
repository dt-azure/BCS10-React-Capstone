import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import { getLocalStorage, removeLocalStorage } from "../../utils/util";
import PopoverCustom from "../../components/Popover/PopoverCustom";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const userLocal = getLocalStorage("user");
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState("h-0");

  const handleLogOut = () => {
    removeLocalStorage("user");
    navigate("/");
  };

  const content = (
    <div className="space-y-5">
      <div>
        <button
          onClick={() => {
            navigate("/account");
          }}
        >
          Account Information
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            removeLocalStorage("booking");
            removeLocalStorage("user");
            handleLogOut();
          }}
        >
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-3 overflow-hidden">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <a href="https://google.com" className="flex items-center">
            <img src={logo} className="mr-3 h-12 sm:h-14" alt="Logo" />
          </a>

          <div className="flex items-center lg:order-2 space-x-4">
            {userLocal ? (
              <PopoverCustom
                label={`Hi, ${userLocal.data.content.hoTen}`}
                content={content}
              />
            ) : (
              <>
                <NavLink
                  to="/sign-in"
                  className="text-gray-800  hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-0 md:px-4 lg:px-5 py-2 lg:py-2.5 mr-2 "
                >
                  Sign In
                </NavLink>
                <NavLink
                  to="/sign-up"
                  className="text-gray-800  hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-0 md:px-4 lg:px-5 py-2 lg:py-2.5 mr-2 "
                >
                  Sign Up
                </NavLink>
              </>
            )}

            <button
              data-collapse-toggle="navbar-default"
              data-collapse-target="navbar-default"
              type="button"
              class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-default"
              aria-expanded="false"
              onClick={() => {
                if (expanded == "h-0") {
                  setExpanded("h-full");
                } else {
                  setExpanded("h-0");
                }
              }}
            >
              <span class="sr-only">Open main menu</span>
              <svg
                class="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>

          <div
            className={`${expanded} justify-between items-center w-full lg:flex lg:w-auto lg:order-1`}
            id="navbar-default"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <NavLink
                  to="/"
                  className="block py-2 pr-4 pl-3 rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 hover:text-red-600"
                  aria-current="page"
                >
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  href="#"
                  className="block py-2 pr-4 pl-3 rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 hover:text-red-600"
                  aria-current="page"
                >
                  Now Showing
                </NavLink>
              </li>

              <li>
                <NavLink
                  href="#"
                  className="block py-2 pr-4 pl-3 rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 hover:text-red-600"
                  aria-current="page"
                >
                  Upcoming
                </NavLink>
              </li>

              <li>
                <NavLink
                  href="#"
                  className="block py-2 pr-4 pl-3 rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 hover:text-red-600"
                  aria-current="page"
                >
                  News
                </NavLink>
              </li>

              <li>
                <NavLink
                  href="#"
                  className="block py-2 pr-4 pl-3 rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 hover:text-red-600"
                  aria-current="page"
                >
                  App
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
