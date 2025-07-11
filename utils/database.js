import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    console.log("MongoDb already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "Share_prompt",
      useNewurlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log("MongoDB Connected");
  } catch (err) {
    console.log(err);
  }
};
