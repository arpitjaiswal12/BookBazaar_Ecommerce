import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      unique:false,
    },
    lastName: {
      type: String,
      required: true,
      unique:false,
    },
    email: {
      type: String,
      required: true,
      unique:true,
    },
    phoneNumber: {
      type: String,
      maxLength: 10,
      unique:true,
    },
    message: {
      type: String,
      required: true, 
      unique:false,
      
    },
  },
  { timestamps: true }
);

// contactSchema.createIndex({ firstName: 1, lastName: 1, message: 1 }, { unique: false });

// contactSchema.set('autoIndex', false);

const ContactUser = mongoose.model("ContactUser", contactSchema);
export default ContactUser;
