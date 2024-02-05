import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function BookCard({ book }) {
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    // <div className="bg-white hover:drop-shadow-2xl">
    //   <Link to={`/book/${book._id}`}>
    //     <div>
    //       <div className="rounded-md border hover:text-blue-500">
    //         <img
    //           src={
    //             book.imageUrls[0] ||
    //             "https://img.freepik.com/premium-photo/opened-book-with-flying-pages-butterflies-dark-backgroundgenerative-ai_391052-12859.jpg"
    //           }
    //           alt="book cover"
    //           className="aspect-[16/9] w-full rounded-md md:aspect-auto md:h-[300px] lg:h-[200px]"
    //         />
    //         <div className="p-4">
    //           <h1 className=" items-center text-lg font-semibold line-clamp-2">
    //             {book.bookName}
    //           </h1>
    //           <h2 className="text-sm font-semibold tracking-widest text-gray-500 line-clamp-2">
    //             {book.authorName}
    //           </h2>
    //           <p className="mt-3 text-sm text-gray-600 line-clamp-2">
    //             {book.description}
    //           </p>
    //           {/* <div className="mt-4"> // NICE OPTION
    //             <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
    //               #Sneakers
    //             </span>
    //             <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
    //               #Nike
    //             </span>
    //             <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
    //               #Airmax
    //             </span>
    //           </div> */}
    //           <p className="text-gray-900 mt-2 font-semibold flex ">
    //             &#8377;
    //             {book.offer && book.discountPrice.toLocaleString("en-US")}
    //             {}
    //             {book.type === "rent" && (
    //               <p className="text-gray-900">/month</p>
    //             )}
    //             {book.offer && (
    //               <p className="px-2 font-medium text-gray-600 line-through">
    //               &#8377;{book.regularPrice.toLocaleString("en-US")}
    //             </p>
    //             )}
    //             {book.type === "rent" && (
    //               <p className="text-red-500 px-2">OFFER</p>
    //             )}
    //             {!book.offer && book.regularPrice.toLocaleString("en-US")}
    //           </p>

    //           <div className="mt-1 flex items-center space-x-2 text-red-700 font-medium">{capitalizeFirstLetter(book.type)}</div>
    //           {/* <button
    //             type="button"
    //             className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
    //           >
    //             Click To
    //           </button> */}
    //         </div>
    //       </div>
    //     </div>
    //   </Link>
    // </div>
    <div className="bg-white hover:drop-shadow-2xl">
      <Link to={`/book/${book._id}`}>
        <div className="w-[300px] h-full md:w-[280px] sm:w-[260px] rounded-md border hover:text-blue-500">
          <img
            src={
              book.imageUrls[0] ||
              "https://img.freepik.com/premium-photo/opened-book-with-flying-pages-butterflies-dark-backgroundgenerative-ai_391052-12859.jpg"
            }
            alt="book cover"
            className="aspect-[16/9] w-full rounded-md md:aspect-auto md:h-[300px] lg:h-[200px]"
          />
          <div className="p-4">
            <h1 className=" items-center text-lg font-semibold line-clamp-2">
              {book.bookName}
            </h1>
            <h2 className="text-sm font-semibold tracking-widest text-gray-500 line-clamp-2">
              {book.authorName}
            </h2>
            <h2 className="text-sm font-semibold tracking-widest text-gray-500 line-clamp-2">
              {book.category}
            </h2>
            <p className="mt-3 text-sm text-gray-600 line-clamp-2">
              {book.description}
            </p>
            <div className="mt-4">
              <p className="text-gray-900 mt-2 font-semibold flex ">
                &#8377;
                {book.offer && book.discountPrice.toLocaleString("en-US")}
                {}
                {book.type === "rent" && (
                  <p className="text-gray-900">/month</p>
                )}
                {book.offer && (
                  <p className="px-2 font-medium text-gray-600 line-through">
                    &#8377;{book.regularPrice.toLocaleString("en-US")}
                  </p>
                )}
                {book.type === "rent" && (
                  <p className="text-red-500 px-2">OFFER</p>
                )}
                {!book.offer && book.regularPrice.toLocaleString("en-US")}
              </p>
            </div>
            <div className="mt-1 flex items-center space-x-2 text-red-700 font-medium">
              {capitalizeFirstLetter(book.type)}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
