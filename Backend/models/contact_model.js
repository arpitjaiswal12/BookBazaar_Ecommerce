import mongoose from 'mongoose'

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
      unique: true,
    },
    phoneNumber:{
      type: String,
      unique:true,
      maxLength: 10,
    },
    message:{
        type:String,
        required:true,
    },
  },
  { timestamps: true }
);


const ContactUser = mongoose.model('ContactUser', contactSchema);
export default ContactUser;