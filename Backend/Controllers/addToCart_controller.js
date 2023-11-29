import { errorHandler } from "../utils/error.js";
import CartItemdetail from "../models/cart_model.js";

export const createCartItem = async (req, res, next) => {
  try {
    const bookdetail = await CartItemdetail.create(req.body);
    return res.status(201).json(bookdetail);
  } catch (error) {
    next(error);
  }
};

export const deleteCartItem = async (req, res, next) => {
  const item = await CartItemdetail.findById(req.params.id);
  
  if (!item) {
    return next(errorHandler(404, "item not found!"));
  }


  if (req.user.id !== item.userRef) {
    return next(errorHandler(401, "You can only delete your own item!"));
  }

  try {
    await CartItemdetail.findByIdAndDelete(req.params.id);
    res.status(200).json("item has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const getUserCartItem = async (req, res, next) => {
    try {
      const item = await CartItemdetail.find({ userRef: req.params.id });
      res.status(200).json(item);
    } catch (error) {
      next(error);
    }
};