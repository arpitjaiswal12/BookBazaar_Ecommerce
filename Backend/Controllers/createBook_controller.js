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


export const getBooks = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10; // means no. of books to be shown

    const startIndex = parseInt(req.query.startIndex) || 0;

    const searchTerm = req.query.searchTerm || '';

    const sort = req.query.sort || 'createdAt';

    const order = req.query.order || 'desc';

    const books = await Bookdetail.find({
      bookName: { $regex: searchTerm, $options: 'i' } // here regex serach the anywhere in the books and option means don't care about and small/capital letters 
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};


