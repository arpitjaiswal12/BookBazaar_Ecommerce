import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BannerImage from "../images/banner_img.jpg";
import BookCard from "../Components/BookCard";

export default function Home() {

  const [offerBooks, setOfferBooks] = useState([])
  const [saleBooks, setSellBooks] = useState([])
  const [rentBooks, setRentBooks] = useState([])

  useEffect(() => {
    const fetchOfferBooks = async () => {
      try {
        const res = await fetch('/api/book/get?offer=true&limit=4');
        const data = await res.json();
        setOfferBooks(data);
        fetchRentBooks();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentBooks = async () => {
      try {
        const res = await fetch('/api/book/get?type=rent&limit=4');
        const data = await res.json();
        setRentBooks(data);
        fetchSaleBooks();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleBooks = async () => {
      try {
        const res = await fetch('/api/book/get?type=sale&limit=4');
        const data = await res.json();
        setSellBooks(data);
      } catch (error) {
        log(error);
      }
    };
    fetchOfferBooks();
  }, []);



  return (
    <div className="bg-slate-50">
      <div className="max-w-screen-2xl container mx-auto xl:px-24 bg-gradient-to-r from-0% from-[#EFFAFC] to-[#EFFAFC] to-100%">
        <div className="py-20 flex flex-col md:flex-row-reverse items-center justify-between gap-8">
          {/* img */}
          <div className="">
            <div className="flex flex-col md:flex-row items-center justify-around -mt-14 gap-4">
              <div className="flex items-center gap-3">
                <img
                  // src="https://m.media-amazon.com/images/I/51vUoD0JIhL.jpg"
                  // src="https://m.media-amazon.com/images/I/51vUoD0JIhL.jp"
                  // src="https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books-illustration_23-2149341898.jpg"
                  src={BannerImage}
                  alt=""
                  className=" w-[30rem]"
                />
              </div>
            </div>
          </div>

          {/* texts */}
          <div className="md:w-1/2 px-4 space-y-7">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              Dive into a world of endless possibilities at our{" "}
              <span className="text-red-800">Book</span>{" "}
              <span className="text-red-500">Bazaar</span>
            </h2>
            <p className="text-[#0a0909] text-xl">
              your one-stop shop for buying, selling, and renting books.
            </p>

            <div>
              <Link to="/search">
                <button className="bg-sky-400 font-semibold hover:bg-red-400 text-white px-8 py-3 rounded-full">
                  Buy Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Book results for offer,rent and sell */}

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {offerBooks && offerBooks.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent offers
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?offer=true"}
              >
                Show more offers
              </Link>
            </div>
            <div className="flex gap-8">
              {offerBooks.map((book) => (
                // <bookItem book={book} key={book._id} />
                <BookCard book={book} key={book._id} />
              ))}
            </div>
          </div>
        )}
        {rentBooks && rentBooks.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent books for rent
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=rent"}
              >
                Show more books for rent
              </Link>
            </div>
            <div className="flex gap-8">
              {rentBooks.map((book) => (
                <BookCard book={book} key={book._id} />
              ))}
            </div>
          </div>
        )}
        {saleBooks && saleBooks.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent books for sale
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=sale"}
              >
                Show more books for sale
              </Link>
            </div>
            <div className="flex gap-8">
              {saleBooks.map((book) => (
                <BookCard book={book} key={book._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
