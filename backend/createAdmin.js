import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/User.js"; // adjust path

// Use your MongoDB URI directly
const MONGO_URI = "mongodb://127.0.0.1:27017/moviesApp";

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ DB connected"))
  .catch(err => console.log(err));

const createAdmin = async () => {
  try {
    const hashedPassword = bcrypt.hashSync("admin123", 10);

    const admin = new User({
      username: "admin",
      email: "admin@example.com",
      password: hashedPassword,
      isAdmin: true
    });

    await admin.save();
    console.log("✅ Admin user created!");
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.disconnect();
  }
};

createAdmin();
