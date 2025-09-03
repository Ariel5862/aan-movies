import express from "express";
import axios from "axios";
const router = express.Router();

const TMDB_API_KEY = process.env.TMDB_API_KEY;

// GET /api/movies/search?query=Inception
// מחזיר תוצאות חיפוש בסיסיות מסודרות לשימוש קל בצד לקוח
router.get("/search", async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.status(400).json({ error: "חסר פרמטר query" });

    const { data } = await axios.get(
      "https://api.themoviedb.org/3/search/movie",
      {
        params: {
          api_key: TMDB_API_KEY,
          query,
          language: "he", // יחזיר טקסט בעברית אם קיים
          include_adult: false,
        },
      }
    );

    // מיפוי לתגובה נקייה וקלה לשימוש
    const results = (data.results || []).map((item) => ({
      id: item.id,
      title: item.title,
      year: item.release_date ? item.release_date.slice(0, 4) : "",
      overview: item.overview || "",
      posterUrl: item.poster_path
        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
        : null,
      voteAverage: item.vote_average ?? null,
    }));

    res.json(results);
  } catch (err) {
    console.error("TMDB search error:", err?.response?.data || err.message);
    res.status(500).json({ error: "שגיאה בבקשת TMDB (search)" });
  }
});

// GET /api/movies/:id/details
// מחזיר פרטי סרט + ז'אנרים + קישור לטריילר (YouTube) אם קיים
router.get("/:id/details", async (req, res) => {
  try {
    const { id } = req.params;

    // פרטי הסרט (כולל ז'אנרים)
    const [detailsRes, videosRes] = await Promise.all([
      axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
        params: { api_key: TMDB_API_KEY, language: "he" },
      }),
      axios.get(`https://api.themoviedb.org/3/movie/${id}/videos`, {
        params: { api_key: TMDB_API_KEY, language: "en-US" }, // לרוב הטריילרים באנגלית
      }),
    ]);

    const d = detailsRes.data;
    const trailerObj = (videosRes.data.results || []).find(
      (v) => v.type === "Trailer" && v.site === "YouTube"
    );

    const payload = {
      id: d.id,
      title: d.title,
      year: d.release_date ? d.release_date.slice(0, 4) : "",
      overview: d.overview || "",
      genres: (d.genres || []).map((g) => g.name),
      runtime: d.runtime || null,
      posterUrl: d.poster_path
        ? `https://image.tmdb.org/t/p/w500${d.poster_path}`
        : null,
      backdropUrl: d.backdrop_path
        ? `https://image.tmdb.org/t/p/w780${d.backdrop_path}`
        : null,
      voteAverage: d.vote_average ?? null,
      trailerUrl: trailerObj
        ? `https://www.youtube.com/watch?v=${trailerObj.key}`
        : null,
    };

    res.json(payload);
  } catch (err) {
    console.error("TMDB details error:", err?.response?.data || err.message);
    res.status(500).json({ error: "שגיאה בבקשת TMDB (details)" });
  }
});

export default router;
