import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://lavyaagrawal123_db_user:FoodDelivery123@cluster0.1qdwmih.mongodb.net/food-delivery?retryWrites=true&w=majority",
    )
    .then(() => console.log("DB Connected"));
};
