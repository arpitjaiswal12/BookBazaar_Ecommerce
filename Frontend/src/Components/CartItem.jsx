import { Heart, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function CartItem({
  bookImg,
  bookName,
  bookAuthor,
  bookOriginalPrice,
  bookDiscountPrice,
  bookQuantity,
  bookOffer,
  bookId,
  bookType,
}) {
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const [userBooks, setUserBooks] = useState([]);

  const handleBookDelete = async (bookId) => {
    // console.log(bookId);
    try {
      const res = await fetch(`/api/cart/delete/${bookId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserBooks(
        (prev) => prev.filter((book) => book._id !== bookId) //this will filter out the book which is deleted
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div key="" className="">
      <li className="flex py-6 sm:py-6 ">
        <div className="flex-shrink-0">
          <Link to={`/book/${bookId}`}>
            <img
              src={bookImg}
              alt={bookName}
              className="sm:h-38 sm:w-38 h-24 w-24 rounded-md object-contain object-center"
            />
          </Link>
        </div>

        <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
          <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
            <div>
              <div className="flex justify-between">
                <h3 className="text-sm">
                  <Link
                    to={`/book/${bookId}`}
                    className="font-semibold text-black"
                  >
                    {bookName}
                  </Link>
                </h3>
              </div>
              <div className="mt-1 flex text-sm">
                <p className="text-sm text-gray-500">{bookAuthor}</p>
              </div>

              <div className="mt-1 flex items-end">
                {!bookOffer && (
                  <p className="text-sm font-medium text-gray-900">
                    &#8377;{bookOriginalPrice}
                  </p>
                )}
                {bookOffer && (
                  <div className="flex">
                    <p className="text-sm font-medium text-gray-500 line-through">
                      &#8377;{bookOriginalPrice}
                    </p>
                    <p className="px-2 text-sm font-medium text-gray-900">
                      &#8377;{bookDiscountPrice}
                    </p>
                    <p className="pl-2 text-sm font-medium text-red-700">
                      OFFER
                    </p>
                  </div>
                )}
              </div>
              <div className="flex">
                <p className="text-sm font-medium text-green-700">
                  {" "}
                  {capitalizeFirstLetter(bookType)}
                </p>
                {bookType === "rent" && (
                  <p className="text-sm font-medium text-blue-700 px-2">
                    per month
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </li>
      <div className="mb-2 flex">
        <div className="min-w-24 flex">
          <p className="text-sm font-medium text-gray-900">
            Qty: {bookQuantity}
          </p>
        </div>
        <div className="ml-6 flex text-sm">
          <button
            onClick={() => handleBookDelete(bookId)}
            type="button"
            className="flex items-center space-x-1 px-2 py-1 pl-0"
          >
            <Trash size={12} className="text-red-500" />
            <span className="text-xs font-medium text-red-500">Remove</span>
          </button>
        </div>
      </div>
    </div>
  );
}
