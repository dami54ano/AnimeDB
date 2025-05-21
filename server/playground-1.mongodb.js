// Use (or create) the database
use("animeDB");

// Drop the collection if it already exists
db.animes.drop();

// Create collection and insert sample data
db.animes.insertMany([
  {
    title: "Solo Leveling",
    genre: ["Action", "Fantasy"],
    episodes: 12,
    rating: 8.9,
    studio: "A-1 Pictures",
    characters: ["Sung Jin-Woo", "Cha Hae-In"],
    imageUrl: "https://link-to-solo.jpg",
    description: "A weak hunter gets a second chance to rise and become the strongest."
  },
  {
    title: "Attack on Titan",
    genre: ["Action", "Drama"],
    episodes: 87,
    rating: 9.1,
    studio: "MAPPA",
    characters: ["Eren Yeager", "Mikasa Ackerman"],
    imageUrl: "https://link-to-aot.jpg",
    description: "Humanity fights back against man-eating giants called Titans."
  },
  {
    title: "Jujutsu Kaisen",
    genre: ["Action", "Supernatural"],
    episodes: 24,
    rating: 8.6,
    studio: "MAPPA",
    characters: ["Yuji Itadori", "Gojo Satoru"],
    imageUrl: "https://link-to-jujutsu.jpg",
    description: "A high schooler becomes a Jujutsu sorcerer after swallowing a cursed object."
  },
  {
    title: "Demon Slayer",
    genre: ["Action", "Adventure"],
    episodes: 26,
    rating: 8.7,
    studio: "ufotable",
    characters: ["Tanjiro Kamado", "Nezuko Kamado"],
    imageUrl: "https://link-to-demonslayer.jpg",
    description: "A boy joins the Demon Slayer Corps to save his sister and avenge his family."
  }
]);

// Check inserted documents
db.animes.find({});
