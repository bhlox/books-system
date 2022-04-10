import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuthContext } from "../contexts/auth-context";
import { FaHome } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import NavLinks from "./NavLinks";

function Navbar({ darkTheme, setDarkTheme }) {
  const { isUser, setIsUser } = useAuthContext();

  const [showSide, setShowSide] = useState(false);

  return (
    <>
      <nav className="bg-blue-500">
        <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
          <NavLink
            onClick={() => setShowSide(false)}
            className={({ isActive }) =>
              isActive
                ? "text-4xl font-bold flex items-center dark:text-black text-white"
                : "text-3xl flex items-center"
            }
            to={"/"}
          >
            <FaHome />
            <span>Home</span>
          </NavLink>

          <button
            onClick={() => setShowSide((prev) => !prev)}
            className="inline-block md:hidden text-4xl z-30"
          >
            <GiHamburgerMenu />
          </button>
          <NavLinks
            showSide={showSide}
            darkTheme={darkTheme}
            setDarkTheme={setDarkTheme}
            setShowSide={setShowSide}
          />
        </div>
      </nav>
      {showSide && (
        <div
          onClick={() => setShowSide(false)}
          className="absolute top-0 left-0 w-screen h-screen bg-black opacity-50 z-10"
        ></div>
      )}
    </>
  );
}

export default Navbar;
