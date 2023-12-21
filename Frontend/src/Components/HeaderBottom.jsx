import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { FaSearch, FaUser, FaCaretDown, FaShoppingCart } from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const HeaderBottom = () => {
  const [showBooksError, setShowBooksError] = useState(false);
  const [userBooks, setUserBooks] = useState([]);
  const handleShowCartItem = async () => {
    try {
      setShowBooksError(false);
      const res = await fetch(`/api/user/view-cart/${currentUser._id}`);
      const data = await res.json();
      if (data.length == 0) {
        console.log("Books are not uploaded");
        document.getElementById("bookNotExist").innerHTML =
          "Books are not uploaded";
      }
      if (data.success === false) {
        setShowBooksError(true);
        return;
      }
      setUserBooks(data);
    } catch (error) {
      setShowBooksError(true);
    }
  };
  useEffect(() => {
    handleShowCartItem();
  });

  const [show, setShow] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const navigate = useNavigate();
  const ref = useRef();

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (ref.current.contains(e.target)) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
  }, [show, ref]);

  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
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

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showSearchBar, setShowSearchBar] = useState(false);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="w-full bg-gray-50 relative">
      <div className="max-w-container mx-auto">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full p-4 lg:pb-0 h-full lg:h-24">
          <div
            onClick={() => setShow(!show)}
            ref={ref}
            className="flex h-14 cursor-pointer items-center gap-2 text-primeColor"
          >
            <HiOutlineMenuAlt4 className="w-5 h-5" />
            <p className="text-[14px] font-normal">Shop by Category</p>

            {show && (
              <motion.ul
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute top-32 sm:top-40 z-50 bg-primeColor w-auto text-[#767676] h-auto p-1 pb-4"
              >
                <li className="text-gray-900 font-semibold  px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-green-700 hover:text-green-800 duration-300 cursor-pointer">
                  <a href="#">Novel Book</a>
                </li>

                <li className="text-gray-900 font-semibold  px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-green-700 hover:text-green-700 cursor-pointer">
                  <a href="#"> Self-Help Book</a>
                </li>
                <li className="text-gray-900 font-semibold  px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-green-700 hover:text-green-800 cursor-pointer">
                  <a href="#">Poetry Book</a>
                </li>
                <li className="text-gray-900 font-semibold  px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-green-700 hover:text-green-800 cursor-pointer">
                  <a>Text Book</a>
                </li>
                <li className="text-gray-900 font-semibold px-4 py-1 border-b-[1px] border-b-gray-400  hover:border-b-green-700 hover:text-green-800 cursor-pointer">
                  <a>Reference Book</a>
                </li>
              </motion.ul>
            )}
          </div>
          <form
            onSubmit={handleSubmit}
            className="relative w-full lg:w-[600px] h-[50px] text-base text-primeColor bg-slate-100 flex items-center gap-2 justify-between px-6 rounded-lg border-2"
          >
            <input
              className=" bg-transparent focus:outline-none w-full lg:w-[600px] sm:w-64 "
              type="text"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
              placeholder="Search your books here..."
            />
            <FaSearch className="w-5 h-5" />
          </form>
          <div className="flex gap-4 mt-2 lg:mt-0 items-center pr-6 cursor-pointer relative">
            <Link to="/view-cart">
              <div className="relative">
                <FaShoppingCart />
                {userBooks.length > 0 && (
                  <span className="absolute bg-red-300 font-titleFont font-bold bottom-3 -right-3.5 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-primeColor text-red-700">
                    {userBooks.length}
                  </span>
                )}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderBottom;
