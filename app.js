
// Quote database
const quotes = [
  {
    text: "The mind is everything. What you think you become.",
    author: "Buddha"
  },
  {
    text: "You don't have to be extreme, just consistent.",
    author: "Unknown"
  },
  {
    text: "Mental health is not a destination, it's a process.",
    author: "Dr. B. Palmer"
  },
  {
    text: "Strength comes from an indomitable will.",
    author: "Mahatma Gandhi"
  },
  {
    text: "Take care of your body — it's the only place you have to live.",
    author: "Jim Rohn"
  },
  {
    text: "Peace comes from within. Do not seek it without.",
    author: "Buddha"
  },
  {
    text: "The greatest wealth is health.",
    author: "Virgil"
  }
];

// DOM element references
const quoteText = document.getElementById('quoteText');
const quoteAuthor = document.getElementById('quoteAuthor');
let currentIndex = 0;
