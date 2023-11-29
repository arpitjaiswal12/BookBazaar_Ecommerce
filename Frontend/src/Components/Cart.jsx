import { Heart, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import empty_card from "../assets/images/empty-cart-for-not-login.jpg";
import { CheckOut } from "../pages/CheckOut";



export default function Cart() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
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

  let totalPrice = 0;
  let discountPrice = 0;
  const calculateTotalPrice = () => {
    userBooks.map((book) => {
      totalPrice = totalPrice + book.regularPrice;
    });
  };
  const calculateTotalDiscount = () => {
    userBooks.map((book) => {
      if (book.discountPrice) {
        discountPrice = discountPrice + book.regularPrice - book.discountPrice;
      }
      // console.log(`book ${book.authorName} id is ${book._id}` )
    });
  };
  calculateTotalPrice();
  calculateTotalDiscount();

  let totalAmount = totalPrice - discountPrice;


  return (
    <div className="mx-auto max-w-7xl px-2 lg:px-0">
      <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Shopping Cart
        </h1>
        <div>
          {currentUser && userBooks<0 && (
            <div className="flex flex-col justify-center items-center text-center">
              <img src={empty_card} alt="" className=" w-[30%]" />
              <p className=" text-xl ">
                Looks like you have not added anything to you cart. Go ahead &
                explore top categories.
              </p>
            </div>
          )}
          {!currentUser && (
            <div className="flex flex-col justify-center items-center text-center">
              <img src={empty_card} alt="" className=" w-[30%]" />
              <p className=" text-xl ">
                Looks like you have not added anything to you cart. Go ahead &
                explore top categories.
              </p>
            </div>
          )}
        </div>
        <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          {userBooks && userBooks.length > 0 && (
            <section
              aria-labelledby="cart-heading"
              className="rounded-lg bg-white lg:col-span-8"
            >
              <h2 id="cart-heading" className="sr-only">
                Items in your shopping cart
              </h2>
              <ul role="list" className="divide-y divide-gray-200">
                {userBooks.map((book, productIdx) => (
                  <CartItem
                    bookImg={book.imageUrls[0]}
                    bookName={book.bookName}
                    bookAuthor={book.authorName}
                    bookOriginalPrice={book.regularPrice}
                    bookDiscountPrice={book.offer && book.discountPrice}
                    bookQuantity={1}
                    bookOffer={book.offer}
                    bookId={book._id}
                    bookType={book.type}
                  />
                ))}
              </ul>
            </section>
          )}
          {/* Order summary */}
          {userBooks &&
            userBooks.length >
              0 && (
                <section
                  aria-labelledby="summary-heading"
                  className="mt-16 rounded-md bg-white lg:col-span-4 lg:mt-0 lg:p-0"
                >
                  <h2
                    id="summary-heading"
                    className=" border-b border-gray-200 px-4 py-3 text-lg font-medium text-gray-900 sm:p-4"
                  >
                    Price Details
                  </h2>
                  <div>
                    <dl className=" space-y-1 px-2 py-4">
                      <div className="flex items-center justify-between">
                        <dt className="text-sm text-gray-800">
                          Price {userBooks.length} items
                        </dt>
                        <dd className="text-sm font-medium text-gray-900">
                          ₹ {totalPrice}
                        </dd>
                      </div>
                      <div className="flex items-center justify-between pt-4">
                        <dt className="flex items-center text-sm text-gray-800">
                          <span>Discount</span>
                        </dt>
                        <dd className="text-sm font-medium text-green-700">
                          - ₹ {discountPrice}
                        </dd>
                      </div>
                      <div className="flex items-center justify-between py-4">
                        <dt className="flex text-sm text-gray-800">
                          <span>Delivery Charges</span>
                        </dt>
                        <dd className="text-sm font-medium text-green-700">
                          {totalAmount >= 500 ? (
                            <span>Free</span>
                          ) : (
                            <span>+ ₹ 100</span>
                          )}
                        </dd>
                      </div>
                      <div className="flex items-center justify-between border-y border-dashed py-4 ">
                        <dt className="text-base font-medium text-gray-900">
                          Total Amount
                        </dt>
                        <dd className="text-base font-medium text-gray-900">
                          ₹{" "}
                          {totalAmount >= 500 ? totalAmount : totalAmount + 100}
                        </dd>
                      </div>
                    </dl>
                    <Link to="/checkout">
                      <button
                        type="button"
                        class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-green-700 dark:hover:bg-green-700 dark:focus:ring-green-800"
                      >
                        <svg
                          class="w-3.5 h-3.5 me-2"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 18 21"
                        >
                          <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                        </svg>
                        Buy now
                      </button>
                    </Link>
                  </div>
                </section>
              )}
        </form>
      </div>
    </div>
  );
}
