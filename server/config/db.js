
import mongoose from "mongoose";

// --------------------------------------------------
// MONGODB DATABASE CONNECTION
// --------------------------------------------------

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
      throw new Error("MONGODB_URI is missing in environment variables");
    }

    const connection = await mongoose.connect(mongoURI);

    console.log(
      `MongoDB Connected Successfully: ${connection.connection.host}`
    );

  } catch (error) {
    console.error("MongoDB Connection Failed:", error.message);

    process.exit(1);
  }
};

export default connectDB;
