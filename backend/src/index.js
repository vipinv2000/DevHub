import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import userRoutes from "./routes/user.route.js";
import projectMessageRoutes from "./routes/projectMessage.route.js";
import comunityRoutes from "./routes/comunity.route.js";
import { app, server } from "./lib/socket.js";
import fileUpload from "express-fileupload";

dotenv.config();

const PORT = process.env.PORT;
const __dirname = path.resolve();

// ✅ Increase payload size limits
app.use(express.json({ limit: "50mb" })); 
app.use(express.urlencoded({ limit: "50mb", extended: true })); 

// ✅ Configure file upload (Increase file size limit)
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
    abortOnLimit: true, // Automatically reject files exceeding limit
    responseOnLimit: "File size is too large",
  })
);

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// ✅ Debug: Log uploaded file size
app.use((req, res, next) => {
  if (req.files) {
    console.log("Uploaded Files:", req.files);
  }
  next();
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/userdash", userRoutes);
app.use("/api/projectMessage", projectMessageRoutes);
app.use("/api/comunity", comunityRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

server.listen(PORT, () => {
  console.log("🚀 Server is running on PORT:", PORT);
  connectDB();
});
