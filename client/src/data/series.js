export const series = [
    {
        id: 1,
        title: "Breaking Bad",
        year: 2008,
        rating: 9.5,
        genres: ["Crime", "Drama", "Thriller"],
        poster: "https://picsum.photos/id/2001/300/450",
        seasons: 5,
        episodes: 62,
        status: "הסתיים"
    },
    {
        id: 2,
        title: "Game of Thrones",
        year: 2011,
        rating: 9.3,
        genres: ["Action", "Adventure", "Drama"],
        poster: "https://picsum.photos/id/2002/300/450",
        seasons: 8,
        episodes: 73,
        status: "הסתיים"
    },
    {
        id: 3,
        title: "Stranger Things",
        year: 2016,
        rating: 8.7,
        genres: ["Drama", "Fantasy", "Horror"],
        poster: "https://picsum.photos/id/2003/300/450",
        seasons: 4,
        episodes: 34,
        status: "מתמשך"
    },
    {
        id: 4,
        title: "The Crown",
        year: 2016,
        rating: 8.7,
        genres: ["Biography", "Drama", "History"],
        poster: "https://picsum.photos/id/2004/300/450",
        seasons: 6,
        episodes: 60,
        status: "הסתיים"
    },
    {
        id: 5,
        title: "The Mandalorian",
        year: 2019,
        rating: 8.8,
        genres: ["Action", "Adventure", "Sci-Fi"],
        poster: "https://picsum.photos/id/2005/300/450",
        seasons: 3,
        episodes: 24,
        status: "מתמשך"
    },
    {
        id: 6,
        title: "The Witcher",
        year: 2019,
        rating: 8.2,
        genres: ["Action", "Adventure", "Fantasy"],
        poster: "https://picsum.photos/id/2006/300/450",
        seasons: 3,
        episodes: 24,
        status: "מתמשך"
    },
    {
        id: 7,
        title: "Money Heist",
        year: 2017,
        rating: 8.3,
        genres: ["Action", "Crime", "Drama"],
        poster: "https://picsum.photos/id/2007/300/450",
        seasons: 5,
        episodes: 41,
        status: "הסתיים"
    },
    {
        id: 8,
        title: "The Boys",
        year: 2019,
        rating: 8.7,
        genres: ["Action", "Comedy", "Crime"],
        poster: "https://picsum.photos/id/2008/300/450",
        seasons: 4,
        episodes: 32,
        status: "מתמשך"
    },
    {
        id: 9,
        title: "Wednesday",
        year: 2022,
        rating: 8.1,
        genres: ["Comedy", "Crime", "Fantasy"],
        poster: "https://picsum.photos/id/2009/300/450",
        seasons: 1,
        episodes: 8,
        status: "מתמשך"
    },
    {
        id: 10,
        title: "The Last of Us",
        year: 2023,
        rating: 8.8,
        genres: ["Action", "Adventure", "Drama"],
        poster: "https://picsum.photos/id/2010/300/450",
        seasons: 1,
        episodes: 9,
        status: "מתמשך"
    },
    {
        id: 11,
        title: "House of the Dragon",
        year: 2022,
        rating: 8.5,
        genres: ["Action", "Adventure", "Drama"],
        poster: "https://picsum.photos/id/2011/300/450",
        seasons: 1,
        episodes: 10,
        status: "מתמשך"
    },
    {
        id: 12,
        title: "The Bear",
        year: 2022,
        rating: 8.6,
        genres: ["Comedy", "Drama"],
        poster: "https://picsum.photos/id/2012/300/450",
        seasons: 2,
        episodes: 18,
        status: "מתמשך"
    },
    {
        id: 13,
        title: "Succession",
        year: 2018,
        rating: 8.8,
        genres: ["Comedy", "Drama"],
        poster: "https://picsum.photos/id/2013/300/450",
        seasons: 4,
        episodes: 39,
        status: "הסתיים"
    },
    {
        id: 14,
        title: "Better Call Saul",
        year: 2015,
        rating: 8.9,
        genres: ["Crime", "Drama"],
        poster: "https://picsum.photos/id/2014/300/450",
        seasons: 6,
        episodes: 63,
        status: "הסתיים"
    },
    {
        id: 15,
        title: "The Handmaid's Tale",
        year: 2017,
        rating: 8.4,
        genres: ["Drama", "Sci-Fi", "Thriller"],
        poster: "https://picsum.photos/id/2015/300/450",
        seasons: 5,
        episodes: 56,
        status: "מתמשך"
    },
    {
        id: 16,
        title: "Ozark",
        year: 2017,
        rating: 8.5,
        genres: ["Crime", "Drama", "Thriller"],
        poster: "https://picsum.photos/id/2016/300/450",
        seasons: 4,
        episodes: 44,
        status: "הסתיים"
    },
    {
        id: 17,
        title: "The Queen's Gambit",
        year: 2020,
        rating: 8.6,
        genres: ["Drama"],
        poster: "https://picsum.photos/id/2017/300/450",
        seasons: 1,
        episodes: 7,
        status: "הסתיים"
    },
    {
        id: 18,
        title: "Bridgerton",
        year: 2020,
        rating: 7.3,
        genres: ["Drama", "Romance"],
        poster: "https://picsum.photos/id/2018/300/450",
        seasons: 3,
        episodes: 24,
        status: "מתמשך"
    },
    {
        id: 19,
        title: "The Umbrella Academy",
        year: 2019,
        rating: 7.9,
        genres: ["Action", "Adventure", "Comedy"],
        poster: "https://picsum.photos/id/2019/300/450",
        seasons: 4,
        episodes: 40,
        status: "הסתיים"
    },
    {
        id: 20,
        title: "Dark",
        year: 2017,
        rating: 8.7,
        genres: ["Crime", "Drama", "Mystery"],
        poster: "https://picsum.photos/id/2020/300/450",
        seasons: 3,
        episodes: 26,
        status: "הסתיים"
    }
];

export const allSeriesGenres = Array.from(
    new Set(series.flatMap((s) => s.genres))
).sort();
