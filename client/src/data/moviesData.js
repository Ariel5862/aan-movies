// src/data/moviesData.js
export const moviesData = {
    featured: {
      title: "The Matrix Resurrections",
      description: "Return to the world of The Matrix with Neo and Trinity in an epic new adventure.",
      backgroundImage: "https://images.unsplash.com/photo-1489599510102-e9eec9827583?w=1200&h=400&fit=crop"
    },
    categories: [
      {
        id: "action",
        title: "Action Movies",
        movies: Array.from({ length: 12 }, (_, i) => ({
          id: `action-${i + 1}`,
          title: `Action Movie ${i + 1}`,
          thumbnail: `https://picsum.photos/300/450?random=${i + 1}`,
          year: 2020 + (i % 4),
          rating: (7 + Math.random() * 2).toFixed(1)
        }))
      },
      {
        id: "comedy", 
        title: "Comedy Movies",
        movies: Array.from({ length: 10 }, (_, i) => ({
          id: `comedy-${i + 1}`,
          title: `Comedy ${i + 1}`,
          thumbnail: `https://picsum.photos/300/450?random=${i + 20}`,
          year: 2018 + (i % 6),
          rating: (6.5 + Math.random() * 2.5).toFixed(1)
        }))
      },
      {
        id: "drama",
        title: "Drama Movies", 
        movies: Array.from({ length: 8 }, (_, i) => ({
          id: `drama-${i + 1}`,
          title: `Drama ${i + 1}`,
          thumbnail: `https://picsum.photos/300/450?random=${i + 40}`,
          year: 2015 + (i % 8),
          rating: (8 + Math.random() * 1.5).toFixed(1)
        }))
      }
    ]
  };