import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";

// App config
const app = express();
const port = 4000;

// Middleware
app.use(express.json());
app.use(cors());

//db connection
connectDB();

//api endpoint
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))

// API
app.get("/", (req, res) => {
  res.send("API Working");
});

// Start server
app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});
//"mongodb+srv://lavyaagrawal123_db_user:FoodDelivery123@cluster0.1qdwmih.mongodb.net/food-delivery?retryWrites=true&w=majority"
