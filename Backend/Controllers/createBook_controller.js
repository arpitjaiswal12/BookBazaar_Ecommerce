import { errorHandler } from '../utils/error.js';
import Bookdetail from "../models/book_model.js"

export const createBook = async (req, res, next) => {
  try {
    const bookdetail = await Bookdetail.create(req.body);
    return res.status(201).json(bookdetail);
  } catch (error) {
    next(error);
  }
};

export const deleteBook = async (req, res, next) => {
  const book = await Bookdetail.findById(req.params.id);

  if (!book) {
    return next(errorHandler(404, 'book not found!'));
  }

  if (req.user.id !== book.userRef) {
    return next(errorHandler(401, 'You can only delete your own books!'));
  }

  try {
    await Bookdetail.findByIdAndDelete(req.params.id);
    res.status(200).json('book has been deleted!');
  } catch (error) {
    next(error);
  }
};

export const updateBook = async (req, res, next) => {
  const book = await Bookdetail.findById(req.params.id);
  if (!book) {
    return next(errorHandler(404, 'book not found!'));
  }
  if (req.user.id !== book.userRef) {
    return next(errorHandler(401, 'You can only update your own books!'));
  }

  try {
    const updatedBook = await Bookdetail.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedBook);
  } catch (error) {
    next(error);
  }
};

export const getBook = async (req, res, next) => {
  try {
    const book = await Bookdetail.findById(req.params.id);
    if (!book) {
      return next(errorHandler(404, 'book not found!'));
    }
    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
};
