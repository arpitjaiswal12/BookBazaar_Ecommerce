import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

export default function Contact() {
  // const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const handleChange = (e) => {
    if (
      // e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch("/api/user/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          // userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      console.log(data);
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate("/contact/success/banner")
      
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4">
      {/* Hero Map */}
      <div className="flex flex-col space-y-8 pb-10 pt-12 md:pt-24">
        {/* <div className="mx-auto max-w-max rounded-full border bg-gray-50 p-1 px-3">
          <p className="text-center text-xs font-semibold leading-normal md:text-sm">
            Share your thoughts
          </p>
        </div> */}
        <p className="text-center text-3xl font-bold text-gray-900 md:text-5xl md:leading-10">
          Love to hear from you
        </p>
        <p className="mx-auto max-w-4xl text-center text-base text-gray-600 md:text-xl">
          Your feedback is invaluable to us, and we're committed to ensuring
          your BookBuy experience exceeds your expectations. Reach out, and
          let's continue this literary journey together! ✉️
        </p>
      </div>
      <div className="mx-auto max-w-7xl py-12 md:py-24">
        <div className="grid items-center justify-items-center gap-x-4 gap-y-10 lg:grid-cols-2">
          {/* contact from */}
          <div className="flex items-center justify-center">
            <div className="px-2 md:px-12">
              <p className="text-2xl font-bold text-gray-900 md:text-4xl">
                Get in touch
              </p>
              <p className="mt-4 text-lg text-gray-600">
                Our friendly team would love to hear from you.
              </p>
              <form
                onSubmit={handleSubmit}
                action=""
                className="mt-8 space-y-4"
              >
                <div className="grid w-full gap-y-4 md:gap-x-4 lg:grid-cols-2">
                  <div className="grid w-full  items-center gap-1.5">
                    <label
                      className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      htmlFor="first_name"
                    >
                      First Name
                    </label>
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-black dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                      type="text"
                      id="firstName" // here id must also need to be same
                      placeholder="First Name"
                      onChange={handleChange}
                      value={formData.firstName}
                    />
                  </div>
                  <div className="grid w-full  items-center gap-1.5">
                    <label
                      className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      htmlFor="last_name"
                    >
                      Last Name
                    </label>
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-black dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                      type="text"
                      id="lastName"
                      placeholder="Last Name"
                      onChange={handleChange}
                      value={formData.lastName}
                    />
                  </div>
                </div>
                <div className="grid w-full  items-center gap-1.5">
                  <label
                    className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-black dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                    type="text"
                    id="email"
                    placeholder="Email"
                    onChange={handleChange}
                    value={formData.email}
                  />
                </div>
                <div className="grid w-full  items-center gap-1.5">
                  <label
                    className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="phone_number"
                  >
                    Phone number
                  </label>
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-black dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                    type="text"
                    id="phoneNumber"
                    placeholder="Phone number"
                    onChange={handleChange}
                    value={formData.phoneNumber}
                  />
                </div>
                <div className="grid w-full  items-center gap-1.5">
                  <label
                    className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="message"
                  >
                    Message
                  </label>
                  <textarea
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-black dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                    id="message"
                    placeholder="Leave us a message"
                    cols={3}
                    onChange={handleChange}
                    value={formData.message}
                  />
                </div>
                {/* <button
                  type="button"
                  className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Send Message
                </button> */}
                <button
                  disabled={loading || uploading}
                  className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  {loading ? " Sending Message ....." : " Send Message"}
                </button>
                {error && <p className="text-red-700 text-sm">{error}</p>}
              </form>
            </div>
          </div>
          <img
            alt="Contact us"
            className="hidden max-h-full w-full rounded-lg object-cover lg:block"
            src="https://images.unsplash.com/photo-1615840287214-7ff58936c4cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&h=800&q=80"
          />
        </div>
      </div>
    </div>
  );
}
