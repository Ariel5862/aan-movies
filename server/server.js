import express from "express";
import "./db/dbConnection.js";
import movieRoutes from "./routes/movies.js";
import { PORT } from "./env.config.js";

const app = express();
app.use(express.json());

// בדיקה בסיסית
app.get("/", (req, res) => {
  res.send("🎬 Movie Rating Server is running!");
});

// חיבור לראוטים של סרטים
app.use("/api/movies", movieRoutes);

// הפעלת השרת
app.listen(PORT, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
