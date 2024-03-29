import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from "../redux/user/userSlice.js";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// Hide Show password in react
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();
  const [showBooksError, setShowBooksError] = useState(false);
  const [userBooks, setUserBooks] = useState([]);


    // password show and hide
    const [password, setPassword] = useState("");
    const [type, setType] = useState("password");
    const [icon, setIcon] = useState(eyeOff);
  
    const handleToggle = () => {
      if (type === "password") {
        setIcon(eye);
        setType("text");
      } else {
        setIcon(eyeOff);
        setType("password");
      }
    };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(data.message));
    }
  };

  const confirmDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account?")) {
      handleDeleteUser();
    } else {
      console.log("Acount is not deleted");
    }
  };

  const confirmDeleteBook = () => {
    if (confirm("Press ok to delete book?")) {
      return () => handleBookDelete(book._id);
    } else {
      
    }
  };

  const handleShowBooks = async () => {
    try {
      setShowBooksError(false);
      const res = await fetch(`/api/user/books/${currentUser._id}`);
      const data = await res.json();
      console.log(data.length);
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

  const handleBookDelete = async (bookId) => {
    try {
      if (confirm("Press ok to delete book?")) {
        const res = await fetch(`/api/book/delete/${bookId}`, {
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
      }
      else{
        console.log("Book is not deleted");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <img
          src={currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />

        <input
          type="text"
          placeholder="username"
          defaultValue={currentUser.username}
          id="username"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          defaultValue={currentUser.email}
          id="email"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <div className="mb-4 flex">
          <input
            type={type}
            name="password"
            placeholder="password"
            className="border p-3 rounded-lg w-full"
            id="password"
            onChange={handleChange}
          />
          <span class="flex justify-around items-center" onClick={handleToggle}>
            <Icon class="absolute cursor-pointer mr-10" icon={icon} size={20} />
          </span>
        </div>
        <button
          disabled={loading}
          className="bg-green-800 text-white font-medium rounded-lg p-3 uppercase hover:opacity-90 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Update"}
        </button>
        <Link
          className="bg-red-700 text-white p-3 font-medium rounded-lg uppercase text-center hover:opacity-90"
          to={"/createbook"}
        >
          Add Book
        </Link>
      </form>
      <div className="flex justify-between mt-5">
        <span
          // onClick={handleDeleteUser}
          onClick={confirmDeleteAccount}
          className="text-red-700 font-medium cursor-pointer"
        >
          Delete account
        </span>
        <span
          onClick={handleSignOut}
          className="text-red-700 font-medium cursor-pointer"
        >
          Sign out
        </span>
      </div>
      <p className="text-red-700 mt-5">{error ? error : ""}</p>
      <p className="text-green-700 mt-5">
        {updateSuccess ? "User is updated successfully!" : ""}
      </p>
      {/* show user book section  */}
      <button
        onClick={handleShowBooks}
        type="button"
        className=" w-full justify-center inline-flex items-center rounded-md bg-yellow-600 p-3 text-sm font-semibold text-white hover:bg-yellow-600/80"
      >
        Show My Books
        <ArrowRight className="ml-2 h-4 w-4" />
      </button>

      <p className="text-green-700 mt-5" id="bookNotExist"></p>

      {userBooks && userBooks.length > 0 && (
        <div className="flex flex-col gap-4">
          <h1 className="text-center mt-7 text-2xl font-semibold">
            Your Books
          </h1>
          {userBooks.map((book) => (
            <div
              key={book._id}
              className="border rounded-lg p-3 flex justify-between items-center gap-4"
            >
              <Link to={`/book/${book._id}`}>
                <img
                  src={book.imageUrls[0]}
                  alt="book cover"
                  className="h-16 w-16 object-contain"
                />
              </Link>
              <Link
                className="text-slate-700 font-semibold  hover:underline truncate flex-1"
                to={`/book/${book._id}`}
              >
                <p>{book.bookName}</p>
                <p className="font-normal">{book.authorName}</p>
              </Link>

              <div className="flex flex-col item-center">
                <button
                  onClick={() => handleBookDelete(book._id)}
                  className="text-red-700 uppercase"
                >
                  Delete
                </button>
                <Link to={`/updatebook/${book._id}`}>
                  <button className="text-green-700 uppercase">Edit</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
