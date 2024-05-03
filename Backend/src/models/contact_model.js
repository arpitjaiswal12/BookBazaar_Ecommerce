import mongoose from 'mongoose'

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
        unique:false,
    },
  },
  { timestamps: true }
);


const ContactUser = mongoose.model('ContactUser', contactSchema);
export default ContactUser;