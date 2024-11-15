import { connectDB } from "./data/database.js";
import { app } from "./index.js";

connectDB();

app.listen(process.env.PORT, () => {
  console.log("connected express");
});
