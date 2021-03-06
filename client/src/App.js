import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddBook from "./pages/Add-book";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Details from "./pages/Details";

function App() {
  const [darkTheme, setDarkTheme] = useState("false");

  return (
    <div className={`${darkTheme ? "dark" : ""}  overflow-hidden relative `}>
      <div className="bg-gray-100 dark:bg-slate-700 text-black dark:text-gray-100">
        <Router>
          <Navbar darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/add-book" element={<AddBook />}>
              <Route path=":bookId" element={<AddBook />} />
            </Route>
            <Route path="/book/:bookId" element={<Details />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
