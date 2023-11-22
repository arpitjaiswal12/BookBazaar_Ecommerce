import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Dropdown from "./Dropdown";
import { useSelector } from "react-redux";
import { MdOutlineShoppingCart } from "react-icons/md";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) =>{
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    //     <div>
    //         {/* <a href="#" class="bg-purple-600 text-gray-50 hover:bg-purple-700 p-3 px-3 sm:px-5 rounded-full">
    //     <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    //     </svg>
    //     Cart (0)
    //   </a> */}
    //   </div>

    <header className="bg-gray-50 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-2">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-red-800">Book</span>
            <span className="text-red-500">Buy</span>
          </h1>
        </Link>
        <form onSubmit={handleSubmit} className="border-2 bg-slate-100 p-2 rounded-lg flex items-center">
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
        </form>
        <ul className="flex gap-6">
          <Link to="/">
            <li className="hidden sm:inline text-slate-950 hover:underline">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-slate-950 hover:underline">
              About
            </li>
          </Link>
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
          <Dropdown />
          <Link to="/card">
            <div className="cursor-pointer pt-2">
              <MdOutlineShoppingCart />
            </div>
          </Link>
        </ul>
      </div>
    </header>
  );
}
