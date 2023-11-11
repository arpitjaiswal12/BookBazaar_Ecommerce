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