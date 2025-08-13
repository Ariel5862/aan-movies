export const movies = [
  {
    id: 1,
    title: "Inception",
    year: 2010,
    rating: 8.8,
    genres: ["Sci-Fi", "Action"],
    poster: "https://picsum.photos/id/1011/300/450"
  },
  {
    id: 2,
    title: "The Dark Knight",
    year: 2008,
    rating: 9.0,
    genres: ["Action", "Drama"],
    poster: "https://picsum.photos/id/1012/300/450"
  },
  {
    id: 3,
    title: "Interstellar",
    year: 2014,
    rating: 8.6,
    genres: ["Sci-Fi", "Drama"],
    poster: "https://picsum.photos/id/1015/300/450"
  },
  {
    id: 4,
    title: "Parasite",
    year: 2019,
    rating: 8.6,
    genres: ["Thriller", "Drama"],
    poster: "https://picsum.photos/id/1024/300/450"
  },
  {
    id: 5,
    title: "La La Land",
    year: 2016,
    rating: 8.0,
    genres: ["Romance", "Drama"],
    poster: "https://picsum.photos/id/1035/300/450"
  },
  {
    id: 6,
    title: "The Matrix",
    year: 1999,
    rating: 8.7,
    genres: ["Sci-Fi", "Action"],
    poster: "https://picsum.photos/id/1041/300/450"
  },
  {
    id: 7,
    title: "Whiplash",
    year: 2014,
    rating: 8.5,
    genres: ["Drama", "Music"],
    poster: "https://picsum.photos/id/1050/300/450"
  },
  {
    id: 8,
    title: "The Social Network",
    year: 2010,
    rating: 7.8,
    genres: ["Drama"],
    poster: "https://picsum.photos/id/1062/300/450"
  },
  {
    id: 9,
    title: "Mad Max: Fury Road",
    year: 2015,
    rating: 8.1,
    genres: ["Action", "Adventure"],
    poster: "https://picsum.photos/id/1069/300/450"
  },
  {
    id: 10,
    title: "The Godfather",
    year: 1972,
    rating: 9.2,
    genres: ["Crime", "Drama"],
    poster: "https://picsum.photos/id/1074/300/450"
  },
  {
    id: 11,
    title: "Spider-Man: Into the Spider-Verse",
    year: 2018,
    rating: 8.4,
    genres: ["Animation", "Action"],
    poster: "https://picsum.photos/id/1084/300/450"
  },
  {
    id: 12,
    title: "Arrival",
    year: 2016,
    rating: 7.9,
    genres: ["Sci-Fi", "Drama"],
    poster: "https://picsum.photos/id/1080/300/450"
  },
  {
    id: 13,
    title: "Joker",
    year: 2019,
    rating: 8.4,
    genres: ["Crime", "Drama"],
    poster: "https://picsum.photos/id/1081/300/450"
  },
  {
    id: 14,
    title: "Coco",
    year: 2017,
    rating: 8.4,
    genres: ["Animation", "Family"],
    poster: "https://picsum.photos/id/1060/300/450"
  },
  {
    id: 15,
    title: "Dune",
    year: 2021,
    rating: 8.0,
    genres: ["Sci-Fi", "Adventure"],
    poster: "https://picsum.photos/id/1056/300/450"
  },
  {
    id: 16,
    title: "The Shawshank Redemption",
    year: 1994,
    rating: 9.3,
    genres: ["Drama"],
    poster: "https://picsum.photos/id/1016/300/450"
  },
  {
    id: 17,
    title: "Pulp Fiction",
    year: 1994,
    rating: 8.9,
    genres: ["Crime", "Drama"],
    poster: "https://picsum.photos/id/1018/300/450"
  },
  {
    id: 18,
    title: "The Avengers",
    year: 2012,
    rating: 8.0,
    genres: ["Action", "Adventure"],
    poster: "https://picsum.photos/id/1021/300/450"
  },
  {
    id: 19,
    title: "Toy Story",
    year: 1995,
    rating: 8.3,
    genres: ["Animation", "Family"],
    poster: "https://picsum.photos/id/1027/300/450"
  },
  {
    id: 20,
    title: "The Lion King",
    year: 1994,
    rating: 8.5,
    genres: ["Animation", "Adventure"],
    poster: "https://picsum.photos/id/1039/300/450"
  }
];

export const allGenres = Array.from(
  new Set(movies.flatMap((m) => m.genres))
).sort();


