import React from "react";
import { Star, ChevronDown, CloudFog } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { Swiper, SwiperSlide } from "swiper/react";
// import SwiperCore from "swiper";
import { useSelector } from "react-redux";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

export default function UserBook() {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  const [cartItemData, setCartItemData] = useState({
    bookName: "",
    authorName: "",
    pickUpAddress: "",
    deliveryAddress: "",
    sellerName: "",
    customerName: "",
    regularPrice: 0,
    discountPrice: 0,
    type: "",
    category: "",
    offer: false,
    imageUrls: [],
    userRef:"",
  });

  const handleAddToCart = async (e) => {
    e.preventDefault();
    try {
      if (+cartItemData.regularPrice < +cartItemData.discountPrice)
        return setError("Discount price must be lower than regular price");
      setLoading(true);
      setError(false);
      const res = await fetch("/api/cart/add-cart-item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...cartItemData,
          userRef: currentUser._id,
          bookName: book.bookName,
          authorName:book.authorName,
          pickUpAddress: book.address,
          deliveryAddress: "none",
          sellerName: book.sellerName,
          customerName: currentUser.username,
          regularPrice: book.regularPrice,
          discountPrice: book.discountPrice,
          type: book.type,
          category: book.category,
          offer: book.offer,
          imageUrls: book.imageUrls[0],
          userRef: currentUser._id
        }),
      });
      const data = await res.json();
      console.log(data);
      setLoading(false);
      alert("Item is Added to card !! view card to see your item ")
      // navigate(`/view-cart`)
      if (data.success === false) {
        setError(data.message);
      }
      
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/book/get/${params.bookId}`);
        const data = await res.json();
        console.log(data);
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setBook(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchBook();
  }, [params.bookId]);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  console.log(book);
  // console.log(book.bookName);
  // console.log(book.type);
  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}

      {book && !loading && !error && (
        <section className="overflow-hidden ">
          <div className="mx-auto max-w-6xl px-5 py-24">
            <div className="mx-auto flex flex-wrap items-center lg:w-4/5">
              <div className="h-auto w-auto rounded lg:h-96 lg:w-1/3 ">
                <Carousel
                  autoPlay={true}
                  showThumbs={false}
                  transitionTime={6}
                  infiniteLoop={true}
                  showStatus={false}
                >
                  {book.imageUrls.map((url) => (
                    <div className="posterimage">
                      <img src={url} alt="" />
                    </div>
                  ))}
                </Carousel>
              </div>
              <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:pl-10">
                <h2 className="text-sm font-semibold tracking-widest text-gray-500">
                  {book.authorName}
                </h2>
                <h1 className="my-4 text-3xl font-semibold text-black">
                  {book.bookName}
                </h1>
                <div className="my-4 flex items-center">
                  <span className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="text-yellow-500" />
                    ))}
                    <span className="ml-3 inline-block text-xs font-semibold">
                      4 Reviews
                    </span>
                  </span>
                </div>
                <p className="text-sm font-medium text-red-700 mb-3">
                  {book.category}
                </p>
                <textarea
                  type="text"
                  placeholder="Description"
                  className="border p-3 rounded-lg w-full mb-2"
                  id="description"
                  required
                  value={book.description}
                  rows={8}
                  readOnly
                />
                {/* <p className="leading-relaxed">{book.description}</p> */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-700">
                      Actual Price
                    </p>
                    <p className="text-xl font-bold text-gray-900">
                      &#8377;{book.regularPrice}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-red-700">
                      Offer Price
                    </p>
                    <p className="text-xl font-bold text-gray-900">
                      &#8377;{(book.offer && book.discountPrice) || 0} /month
                    </p>
                  </div>

                  <div>
                    {() => {
                      <h1>hello</h1>;
                      if (book.offer) {
                        return (
                          <div>
                            <p className="text-xs font-medium text-gray-500 line-through">
                              {book.regularPrice}
                            </p>
                            <p className="text-sm font-medium text-gray-900">
                              &nbsp;&nbsp;{book.discountPrice} /month
                            </p>
                          </div>
                        );
                      } else {
                        return (
                          <p className="text-xs font-medium text-gray-500 line-through">
                            {book.regularPrice}
                          </p>
                        );
                      }
                    }}
                  </div>
                  {currentUser && (
                    <button
                    type="button"
                    className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </button>
                  ) || (
                    <button
                    type="button"
                    className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    Please Login to add item to Cart
                  </button>
                  ) }
                  
                </div>
                <p className="text-lg font-medium text-red-700">
                  {" "}
                  {capitalizeFirstLetter(book.type)}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
