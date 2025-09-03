# AAN Movies Server

שרת Node.js עם MongoDB לניהול סרטים ומשתמשים.

## התקנה

1. התקן את התלויות:

```bash
npm install
```

2. צור קובץ `.env` בתיקיית השרת עם המשתנים הבאים:

```env
# MongoDB Connection
MONGO_URI=mongodb://localhost:27017/aan-movies

# TMDB API Key
TMDB_API_KEY=your_tmdb_api_key_here

# Server Configuration
PORT=3000
NODE_ENV=development

# JWT Secret (for user authentication)
JWT_SECRET=your_jwt_secret_here
```

3. הפעל את השרת:

```bash
npm run dev
```

## מבנה הנתונים

### Movie Schema

- **tmdbId**: מזהה ייחודי מה-TMDB
- **title**: כותרת הסרט
- **overview**: תיאור הסרט
- **genres**: מערך של ז'אנרים
- **voteAverage**: דירוג ממוצע
- **posterUrl**: קישור לפוסטר
- **trailerUrl**: קישור לטריילר
- **userRating**: דירוג אישי של המשתמש
- **isInMyList**: האם הסרט ברשימת "הסרטים שלי"

### User Schema

- **username**: שם משתמש ייחודי
- **email**: כתובת אימייל
- **favoriteGenres**: ז'אנרים מועדפים
- **watchlist**: רשימת סרטים לצפייה
- **watchedMovies**: סרטים שצפה בהם עם דירוג וביקורת
- **totalMoviesWatched**: סך הסרטים שצפה בהם

### Genre Schema

- **tmdbId**: מזהה מה-TMDB
- **name**: שם הז'אנר בעברית
- **nameEn**: שם הז'אנר באנגלית
- **movieCount**: מספר הסרטים בז'אנר
- **averageRating**: דירוג ממוצע של הז'אנר

## שימוש במודלים

### ייבוא המודלים

```javascript
import { Movie, User, Genre } from "./models/index.js";
```

### יצירת סרט חדש

```javascript
const newMovie = new Movie({
  tmdbId: 12345,
  title: "שם הסרט",
  overview: "תיאור הסרט",
  genres: ["אקשן", "דרמה"],
  voteAverage: 8.5,
});

await newMovie.save();
```

### חיפוש סרטים

```javascript
// חיפוש לפי ז'אנר
const actionMovies = await Movie.findByGenre("אקשן");

// חיפוש סרטים חדשים
const newMovies = await Movie.findNewMovies();

// חיפוש לפי דירוג
const topRated = await Movie.findByRating(8);
```

### ניהול משתמשים

```javascript
// הוספת סרט לרשימת הצפייה
await user.addToWatchlist(movieId);

// הוספת סרט לסרטים שצפה בהם
await user.addWatchedMovie(movieId, 9, "סרט מעולה!");

// בדיקה אם סרט ברשימת הצפייה
const isInWatchlist = user.isInWatchlist(movieId);
```

## אינדקסים

המערכת כוללת אינדקסים לביצועים טובים יותר:

- חיפוש טקסט בשם ותיאור הסרט
- חיפוש לפי ז'אנר
- חיפוש לפי שנה
- מיון לפי דירוג
- מיון לפי תאריך יציאה

## Middleware

- **timestamps**: מוסיף אוטומטית `createdAt` ו-`updatedAt`
- **pre-save**: מעדכן את `updatedAt` בכל שמירה
- **validation**: בדיקות תקינות נתונים אוטומטיות

## Virtual Fields

- **averageRating**: דירוג ממוצע בין דירוג המשתמש לדירוג הכללי
- **isNew**: האם הסרט יצא השנה
- **fullName**: שם מלא של המשתמש

## Methods

### Movie Methods

- `getWeightedRating()`: חישוב דירוג משוקלל לפי נוסחת IMDB

### User Methods

- `addToWatchlist(movieId)`: הוספת סרט לרשימת הצפייה
- `removeFromWatchlist(movieId)`: הסרת סרט מרשימת הצפייה
- `addWatchedMovie(movieId, rating, review)`: הוספת סרט לסרטים שצפה בהם

## Static Methods

### Movie Static Methods

- `findByGenre(genre)`: חיפוש סרטים לפי ז'אנר
- `findNewMovies()`: חיפוש סרטים חדשים
- `findByRating(minRating)`: חיפוש סרטים לפי דירוג

### User Static Methods

- `findByFavoriteGenre(genre)`: חיפוש משתמשים לפי ז'אנר מועדף
- `findByRatingRange(min, max)`: חיפוש משתמשים לפי טווח דירוג

### Genre Static Methods

- `findActive()`: חיפוש ז'אנרים פעילים
- `findPopular(limit)`: חיפוש ז'אנרים פופולריים
- `findByRating(minRating)`: חיפוש ז'אנרים לפי דירוג

