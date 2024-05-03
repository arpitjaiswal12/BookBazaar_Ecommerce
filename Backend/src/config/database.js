import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();; // env configuration in process tag

const ConnectDB = () => {
    mongoose.connect(process.env.DATA_BASE_URL)
    .then(() => console.log("DataBase Connection is Successfull !! "))
    .catch( (error) => {
        console.log("Issue in DataBase Connection");
        console.error(error.message);
        process.exit(1);
    } );
}

export default ConnectDB;