import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate, NavLink } from "react-router-dom";
import Dropdown from "./Dropdown";
import { useSelector } from "react-redux";
import { MdOutlineShoppingCart } from "react-icons/md";
import { navBarList } from "./Constants/index.js";
import { motion } from "framer-motion";
import logo from "../assets/images/logo.png";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className="bg-white  shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto px-2 py-1 sm:p-2">
        <Link to="/">
          {/* <h1 className="font-serif font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-red-800">Book</span>
            <span className="text-red-500">Bazaar</span>
          </h1> */}
          <img src={logo} alt="" className=" w-40 object-cover" />
        </Link>
        {/* <form
          onSubmit={handleSubmit}
          className="border-2 bg-slate-100 p-2 rounded-lg flex items-center"
        >
          <input
            type="text"
            placeholder="Search..."
            className=" bg-transparent focus:outline-none w-24 sm:w-64 "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className="text-red-500" />
          </button>
        </form> */}
        {/* <ul className="flex md:gap-8">
          <Link to="/">
            <li className="hidden sm:inline text-slate-950 hover:text-red-500">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-slate-950 hover:text-red-500">
              About
            </li>
          </Link>
          <Link to="/contact">
            <li className="hidden sm:inline text-slate-950 hover:text-red-500">
              Contact
            </li>
          </Link>
          <li className="hidden sm:inline text-slate-950 hover:text-red-500">
            <Dropdown />
          </li>

          <Link to="/profile">
            {currentUser ? ( // profile image
              <img
                className="rounded-full h-7 w-7 object-cover"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <li className=" text-slate-700 hover:underline"> Login</li>
            )}
          </Link>
          <Link to="/card">
            <div className="cursor-pointer pt-2">
              <MdOutlineShoppingCart />
            </div>
          </Link>
        </ul> */}
        <div>
          <motion.ul
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center w-auto z-50 p-0 gap-2"
          >
            <>
              {navBarList.map(({ _id, title, link }) => (
                <NavLink
                  key={_id}
                  className="flex font-normal hover:font-bold w-20 h-6 justify-center items-center px-12 text-base text-[#767676] hover:underline underline-offset-[4px] decoration-[1px] hover:text-[#262626] md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0"
                  to={link}
                  state={{ data: location.pathname.split("/")[1] }}
                >
                  <li>{title}</li>
                </NavLink>
              ))}
            </>
            <Link to="/profile">
              {currentUser ? ( // profile image
                <img
                  className="rounded-full h-7 w-7 object-cover"
                  src={currentUser.avatar}
                  alt="profile"
                />
              ) : (
                <li className=" flex font-normal hover:font-bold w-20 h-6 justify-center items-center px-12 text-base text-[#767676] hover:underline underline-offset-[4px] decoration-[1px] hover:text-[#262626] md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0">
                  {" "}
                  Login
                </li>
              )}
            </Link>
          </motion.ul>
        </div>
      </div>
    </header>
  );
}
