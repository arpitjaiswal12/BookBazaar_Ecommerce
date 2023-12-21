import React from "react";
import { Home, ChevronRight, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const steps = ["Personal Information", "Payment Method", "Confirmation"];

export function CheckOut() {
  return (
    <div className="mx-auto w-full max-w-7xl  py-2">
      <div className="mx-auto my-4 max-w-2xl md:my-6">
        {/* breadcrumb */}
        <nav className="mb-8 flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <a
                href="#"
                className="ml-1 inline-flex text-sm font-medium text-gray-900 hover:underline md:ml-2"
              >
                <Home size={16} className="mr-2 text-gray-900" />
                <Link to="/view-cart">Cart</Link>
              </a>
            </li>
            {steps.map((step) => (
              <li key={step}>
                <div className="flex items-center">
                  <ChevronRight size={16} className="mr-2 text-gray-600" />
                  <a
                    href="#"
                    className="ml-1 text-sm font-medium text-gray-900 hover:underline md:ml-2"
                  >
                    {step}
                  </a>
                </div>
              </li>
            ))}
          </ol>
        </nav>
        {/* Form */}
        <div className="overflow-hidden rounded-xl bg-white p-4 shadow">
          <div className="mb-4 flex items-center rounded-lg py-2">
            <div className="mr-2 rounded-full bg-gray-100  p-2 text-black">
              <ShoppingCart size={20} />
            </div>
            <div className="flex flex-1">
              <p className="text-sm font-medium">
                {/* You have <strong>4</strong> items in cart. Sub total is <strong>₹10,000</strong> */}
              </p>
            </div>
            <button
              type="button"
              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              <Link to={"/view-cart"}>View Items</Link>
            </button>
          </div>
          <p className="text-sm font-bold text-gray-900">Personal Info</p>
          <div className="mt-6 gap-6 space-y-4 md:grid md:grid-cols-2 md:space-y-0">
            <div className="w-full">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="Enter your first name"
                id="firstName"
              ></input>
            </div>

            <div className="w-full">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="Enter your last name"
                id="lastName"
              ></input>
            </div>
            <div className="col-span-2 grid">
              <div className="w-full">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="email"
                  placeholder="Enter your email"
                  id="email"
                ></input>
              </div>
            </div>
            <div className="col-span-2 grid">
              <div className="w-full">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="address"
                >
                  Delivery Address
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Enter your address"
                  id="address"
                ></input>
              </div>
            </div>

            <div className="col-span-2 grid">
              <button
                type="button"
                className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Next Step
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
