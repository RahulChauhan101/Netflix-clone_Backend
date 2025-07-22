const mongoose = require("mongoose");
require("dotenv").config();
const Show = require("./Models/Show");

const seedData = [
  {
    id: 81,
    title: "Inception",
    originalTitle: "Inception",
    releaseYear: 2010,
    overview: "A skilled thief leads a team into dreams to steal secrets.",
    runtime: 148,
    rating: 87,
    genres: [{ name: "Sci-Fi" }, { name: "Thriller" }],
    directors: ["Christopher Nolan"],
    cast: ["Leonardo DiCaprio", "Elliot Page"],
    imageSet: {
      verticalPoster: "https://picsum.photos/id/1018/200/300",
      horizontalPoster: "https://picsum.photos/id/1018/400/200",
    },
  },
  {
    id: 82,
    title: "Interstellar",
    originalTitle: "Interstellar",
    releaseYear: 2014,
    overview: "A team travels through a wormhole in search of a new home.",
    runtime: 169,
    rating: 91,
    genres: [{ name: "Adventure" }, { name: "Drama" }],
    directors: ["Christopher Nolan"],
    cast: ["Matthew McConaughey", "Anne Hathaway"],
    imageSet: {
      verticalPoster: "https://picsum.photos/id/1025/200/300",
      horizontalPoster: "https://picsum.photos/id/1025/400/200",
    },
  },
  {
    id: 83,
    title: "The Matrix",
    originalTitle: "The Matrix",
    releaseYear: 1999,
    overview: "A hacker discovers the truth behind reality.",
    runtime: 136,
    rating: 88,
    genres: [{ name: "Action" }, { name: "Sci-Fi" }],
    directors: ["The Wachowskis"],
    cast: ["Keanu Reeves", "Laurence Fishburne"],
    imageSet: {
      verticalPoster: "https://picsum.photos/id/1035/200/300",
      horizontalPoster: "https://picsum.photos/id/1035/400/200",
    },
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Show.deleteMany({});
    await Show.insertMany(seedData);
    console.log("✅ Shows seeded successfully.");
    mongoose.disconnect();
  } catch (err) {
    console.error("❌ Error seeding shows:", err);
  }
};

seedDatabase();
