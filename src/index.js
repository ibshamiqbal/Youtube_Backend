import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`🚀 Server is running on port: ${process.env.PORT || 8000}`);
    });
  })
  .catch((err) => {
    console.error("❌ MONGO DB connection failed!!!", err);
    process.exit(1); // Exit only here
  });
