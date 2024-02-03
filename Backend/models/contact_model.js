import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      maxLength: 10,
    },
    message: {
      type: String,
      required: true, 
      
    },
  },
  { timestamps: true }
);

// contactSchema.index({ firstName: 1, lastName: 1, message: 1 }, { unique: false });

// contactSchema.set('autoIndex', false);

const ContactUser = mongoose.model("ContactUser", contactSchema);
export default ContactUser;
