import mongoose from "mongoose";
import dotenv from "dotenv";
import chalk from 'chalk';

dotenv.config();
const connectionDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
       'mongodb+srv://sayyambutt317:1234@product.gypc7cm.mongodb.net/AdminPanel?retryWrites=true&w=majority&appName=Product'
      // `${process.env.MONGODB_URI}`
    );
   
    console.log(chalk.bgGreen(`Connected to database! ✅`));
  } catch (error) {
    console.log(chalk.bgRed("MongoDB connection failed ❌", error));
    process.exit(1);
  }
};

export { connectionDB };
