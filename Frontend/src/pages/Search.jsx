import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BookCard from "../Components/BookCard";

export default function Search() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);

    const fetchBooks = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/book/get?${searchQuery}`);
      const data = await res.json();

      if (data.length > 11) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setBooks(data);
      setLoading(false);
    };

    fetchBooks();
  }, [location.search]);

  console.log(books);

  const onShowMoreClick = async () => {
    const numberOfBooks = books.length;
    const startIndex = numberOfBooks;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/book/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 12) {
      setShowMore(false);
    }
    setBooks([...books, ...data]);
  };

  return (
    <div
      /*className="p-7 flex gap-4"*/ className="mx-auto grid w-full max-w-7xl items-center space-y-4 px-2 py-10 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4 "
    >
      {!loading && books.length === 0 && (
        <p className="text-xl text-slate-700">No books found!</p>
      )}
      {loading && (
        <p className="text-xl text-slate-700 text-center w-full">Loading...</p>
      )}
      {!loading &&
        books &&
        books.map((book) => <BookCard key={book._id} book={book} />)}
      {showMore && (
        <p
          onClick={onShowMoreClick}
          className="text-blue-700 cursor-pointer hover:underline w-full"
        >
          Show more
        </p>
      )}
    </div>
  );
}
