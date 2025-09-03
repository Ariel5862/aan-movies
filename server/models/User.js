import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // פרטי משתמש בסיסיים
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    // פרטים אישיים
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    avatar: {
      type: String, // URL לתמונת פרופיל
      default: null,
    },

    // העדפות סרטים
    favoriteGenres: [
      {
        type: String,
        trim: true,
      },
    ],
    preferredLanguage: {
      type: String,
      default: "he", // עברית כברירת מחדל
    },

    // רשימות סרטים
    watchlist: [
      {
        movieId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Movie",
        },
        addedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    watchedMovies: [
      {
        movieId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Movie",
        },
        watchedAt: {
          type: Date,
          default: Date.now,
        },
        rating: {
          type: Number,
          min: 1,
          max: 10,
        },
        review: {
          type: String,
          trim: true,
          maxlength: 1000,
        },
      },
    ],

    // הגדרות משתמש
    isActive: {
      type: Boolean,
      default: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },

    // סטטיסטיקות
    totalMoviesWatched: {
      type: Number,
      default: 0,
    },
    averageRating: {
      type: Number,
      default: 0,
    },

    // תאריכים
    lastLogin: {
      type: Date,
    },
    memberSince: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

// אינדקסים
userSchema.index({ username: 1 });
userSchema.index({ email: 1 });
userSchema.index({ favoriteGenres: 1 });

// Virtual field לשם מלא
userSchema.virtual("fullName").get(function () {
  if (this.firstName && this.lastName) {
    return `${this.firstName} ${this.lastName}`;
  }
  return this.username;
});

// Virtual field למספר הסרטים ברשימת הצפייה
userSchema.virtual("watchlistCount").get(function () {
  return this.watchlist.length;
});

// Virtual field למספר הסרטים שצפה בהם
userSchema.virtual("watchedCount").get(function () {
  return this.watchedMovies.length;
});

// Method להוספת סרט לרשימת הצפייה
userSchema.methods.addToWatchlist = function (movieId) {
  if (!this.watchlist.some((item) => item.movieId.equals(movieId))) {
    this.watchlist.push({ movieId, addedAt: new Date() });
    return this.save();
  }
  return Promise.resolve(this);
};

// Method להסרת סרט מרשימת הצפייה
userSchema.methods.removeFromWatchlist = function (movieId) {
  this.watchlist = this.watchlist.filter(
    (item) => !item.movieId.equals(movieId)
  );
  return this.save();
};

// Method להוספת סרט לסרטים שצפה בהם
userSchema.methods.addWatchedMovie = function (
  movieId,
  rating = null,
  review = null
) {
  const existingIndex = this.watchedMovies.findIndex((item) =>
    item.movieId.equals(movieId)
  );

  if (existingIndex >= 0) {
    // עדכון סרט קיים
    this.watchedMovies[existingIndex].watchedAt = new Date();
    if (rating) this.watchedMovies[existingIndex].rating = rating;
    if (review) this.watchedMovies[existingIndex].review = review;
  } else {
    // הוספת סרט חדש
    this.watchedMovies.push({
      movieId,
      watchedAt: new Date(),
      rating,
      review,
    });
  }

  // עדכון סטטיסטיקות
  this.totalMoviesWatched = this.watchedMovies.length;
  this.updateAverageRating();

  return this.save();
};

// Method לעדכון דירוג ממוצע
userSchema.methods.updateAverageRating = function () {
  const ratedMovies = this.watchedMovies.filter((movie) => movie.rating);
  if (ratedMovies.length > 0) {
    const totalRating = ratedMovies.reduce(
      (sum, movie) => sum + movie.rating,
      0
    );
    this.averageRating =
      Math.round((totalRating / ratedMovies.length) * 10) / 10;
  } else {
    this.averageRating = 0;
  }
};

// Method לבדיקה אם סרט ברשימת הצפייה
userSchema.methods.isInWatchlist = function (movieId) {
  return this.watchlist.some((item) => item.movieId.equals(movieId));
};

// Method לבדיקה אם צפה בסרט
userSchema.methods.hasWatched = function (movieId) {
  return this.watchedMovies.some((item) => item.movieId.equals(movieId));
};

// Static method לחיפוש משתמשים לפי ז'אנר מועדף
userSchema.statics.findByFavoriteGenre = function (genre) {
  return this.find({ favoriteGenres: { $regex: genre, $options: "i" } });
};

// Static method לחיפוש משתמשים לפי דירוג ממוצע
userSchema.statics.findByRatingRange = function (minRating, maxRating) {
  return this.find({
    averageRating: { $gte: minRating, $lte: maxRating },
  });
};

const User = mongoose.model("User", userSchema);

export default User;
