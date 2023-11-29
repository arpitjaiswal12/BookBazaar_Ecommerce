import { Heart, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import empty_card from "../assets/images/empty-cart-for-not-login.jpg";

const products = [
  {
    id: 1,
    name: "Nike Air Force 1 07 LV8",
    href: "#",
    price: "₹47,199",
    originalPrice: "₹48,900",
    discount: "5% Off",
    color: "Orange",
    size: "8 UK",
    imageSrc:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/54a510de-a406-41b2-8d62-7f8c587c9a7e/air-force-1-07-lv8-shoes-9KwrSk.png",
  },
  {
    id: 2,
    name: "Nike Blazer Low 77 SE",
    href: "#",
    price: "₹1,549",
    originalPrice: "₹2,499",
    discount: "38% off",
    color: "White",
    leadTime: "3-4 weeks",
    size: "8 UK",
    imageSrc:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e48d6035-bd8a-4747-9fa1-04ea596bb074/blazer-low-77-se-shoes-0w2HHV.png",
  },
  {
    id: 3,
    name: "Nike Air Max 90",
    href: "#",
    price: "₹2219 ",
    originalPrice: "₹999",
    discount: "78% off",
    color: "Black",
    imageSrc:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/fd17b420-b388-4c8a-aaaa-e0a98ddf175f/dunk-high-retro-shoe-DdRmMZ.png",
  },
];

export default function Cart() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
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
          {!currentUser && (
            <div className="flex flex-col justify-center items-center text-center">
              <img src={empty_card} alt="" className=" w-[30%]" />
              <p className=" text-3xl ">
                Please{" "}
                <Link to="/login" className=" underline text-blue-300">
                  Login
                </Link>{" "}
                to view cart
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
                    {totalAmount >= 500 ? <span>Free</span> : <span>+ ₹ 100</span>}
                  </dd>
                </div>
                <div className="flex items-center justify-between border-y border-dashed py-4 ">
                  <dt className="text-base font-medium text-gray-900">
                    Total Amount
                  </dt>
                  <dd className="text-base font-medium text-gray-900">
                    ₹ {totalAmount >= 500 ? totalAmount : totalAmount+100}
                  </dd>
                </div>
              </dl>
              {/* <div className="px-2 pb-4 font-medium text-green-700">
                You will save ₹ 3,431 on this order
              </div> */}
            </div>
          </section>
        </form>
      </div>
    </div>
  );
}
