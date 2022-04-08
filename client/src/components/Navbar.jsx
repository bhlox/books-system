import React from "react";
import { Link } from "react-router-dom";

function Navbar({ darkTheme, setDarkTheme }) {
  return (
    <nav className="bg-blue-500">
      <div className="max-w-7xl mx-auto flex justify-between p-4">
        <Link to={"/"}>
          <span>Home</span>
        </Link>
        <div className="flex space-x-4">
          <Link to={"/login"}>
            <h3 className="text-3xl font-bold">login</h3>
          </Link>

          <Link to={"/signup"}>
            <h3 className="text-3xl font-bold">signup</h3>
          </Link>

          <button onClick={() => setDarkTheme((prev) => !prev)}>
            {darkTheme ? "Dark mode on" : "Dark mode off"}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
