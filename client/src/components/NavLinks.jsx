import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuthContext } from "../contexts/auth-context";
import { FaMoon, FaSun } from "react-icons/fa";

function NavLinks({ darkTheme, setDarkTheme, showSide, setShowSide }) {
  const { isUser, setIsUser } = useAuthContext();

  return (
    <>
      <div
        className={`${
          showSide ? "right-0 bg-blue-500" : "-right-[80%]"
        } absolute inset-y-0 md:static h-screen max-w-xs pt-24 px-4 space-y-6 z-20 md:h-auto md:space-x-4 md:pt-0 md:px-0 md:bg-transparent transition-all duration-300`}
      >
        <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-4">
          {!isUser && (
            <NavLink
              className={({ isActive }) =>
                isActive ? "active-nav-link" : "nav-link"
              }
              onClick={() => setShowSide(false)}
              to={"/login"}
            >
              <h3>login</h3>
            </NavLink>
          )}

          {!isUser && (
            <NavLink
              className={({ isActive }) =>
                isActive ? "active-nav-link" : "nav-link"
              }
              onClick={() => setShowSide(false)}
              to={"/signup"}
            >
              <h3>signup</h3>
            </NavLink>
          )}

          {isUser && (
            <NavLink
              className={({ isActive }) =>
                isActive ? "active-nav-link" : "nav-link"
              }
              onClick={() => setShowSide(false)}
              to={"/add-book"}
            >
              <h3>Add book</h3>
            </NavLink>
          )}

          <button
            className="text-3xl md:text-xl max-w-max"
            onClick={() => setDarkTheme((prev) => !prev)}
          >
            {darkTheme ? <FaSun /> : <FaMoon />}
          </button>

          {isUser && (
            <Link onClick={() => setShowSide(false)} to={"/login"}>
              <h3 onClick={() => setIsUser(false)} className="nav-link">
                logout
              </h3>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

export default NavLinks;
