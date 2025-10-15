import express from "express";
import express from "cors";
import "./db/dbConnection.js";
import movieRoutes from "./routes/movies.js";
import { PORT } from "./env.config.js";

const app = express();
app.use(express.json());

app.use(cors());

// בדיקה בסיסית
app.get("/", (req, res) => {
  res.send("🎬 Movie Rating Server is running!");
});

// חיבור לראוטים של סרטים
app.use("/api/movies", movieRoutes);


// 404 – אם לא נמצא נתיב מתאים
app.use((req, res, next) => {
  const err = new Error(`Not Found: ${req.method} ${req.originalUrl}`);
  err.status = 404;
  next(err);
});

// Error Handler מרכזי
app.use((err, req, res, _next) => {
  const status = err.status || 500;

  // לוג שימושי (בפרודקשן אפשר להסתיר stack)
  if (status >= 500) {
    console.error("[ERROR]", {
      method: req.method,
      url: req.originalUrl,
      message: err.message,
      stack: err.stack,
    });
  }

  res.status(status).json({
    error: {
      message: err.message || "Server error",
      code: err.code || "SERVER_ERROR",
    },
  });
});

// הפעלת השרת
app.listen(PORT, () => {
  console.log("🚀 Server running on http://localhost:3000");
});


