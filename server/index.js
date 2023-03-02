import express from "express";
import mongoose from "mongoose";
import cloudinary from "./cloudinary.js";

//Middleware
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

//Routes
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import refreshRoute from "./routes/refresh.js";

dotenv.config();

//init app
const app = express();

// MiddleWare
app.use(express.json());
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

const port = process.env.PORT || 8000;

// Routes With Files
app.post("/upload", async (req, res) => {
  try {
    const { data } = req.body;
    const uploadRes = await cloudinary.uploader.upload(data, {
      upload_preset: "wkiynpgr/assets",
    });
    res.status(200).json(uploadRes.url);
  } catch (error) {
    console.log(error);
  }
});

//Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/refresh", refreshRoute);

// mogoose setup
// mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is Running on Port ${port}`);
    });
  })
  .catch((err) => console.log(err));
