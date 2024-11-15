import mongoose from "mongoose";

export const connectDB = () => {
  console.log(process.env.MONGO_URL);
  mongoose
    .connect(process.env.MONGO_URL, {
      dbname: "vehicle",
    })
    .then((c) => console.log(`Database connected ${c.connection}`))
    .catch((e) => console.log(e));
};
