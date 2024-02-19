import mongoose from 'mongoose';

const CartItemSchema = new mongoose.Schema(
  {
    bookName: {
      type: String,
      required: true,
    },
    authorName: {
      type: String,
      required: true,
    },
    pickUpAddress: {
      type: String,
      required: true,
    },
    deliveryAddress: {
      type: String,
      required: true,
    },
    sellerName: {
      type: String,
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    regularPrice: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
      required: true,
    },
    type: { // sell or rent 
      type: String,
      required: true,
    },
    category:{
      type:String,
      require: true
    },
    offer: { // discount or not      
      type: Boolean,
      required: true,
    },
    imageUrls: {
      type: Array,
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },
    actual_bookId:{
      type:String,
      required:true,
    }
  },
  { timestamps: true }
);

const CartItemdetail = mongoose.model('CartItemdetail', CartItemSchema);

export default CartItemdetail;
