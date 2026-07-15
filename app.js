
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

// Simple navigation function
function showNextQuote() {
  currentIndex = (currentIndex + 1) % quotes.length;
  quoteText.textContent = `“${quotes[currentIndex].text}”`;
  quoteAuthor.textContent = `— ${quotes[currentIndex].author}`;
}

function showPrevQuote() {
  currentIndex = (currentIndex - 1 + quotes.length) % quotes.length;
  quoteText.textContent = `“${quotes[currentIndex].text}”`;
  quoteAuthor.textContent = `— ${quotes[currentIndex].author}`;
}

// Event listeners
document.getElementById('nextQuote').addEventListener('click', showNextQuote);
document.getElementById('prevQuote').addEventListener('click', showPrevQuote);


// Function to update displayed quote
function updateQuote(index) {
  const quote = quotes[index];
  quoteText.textContent = `“${quote.text}”`;
  quoteAuthor.textContent = `— ${quote.author}`;
}

// Manual navigation
document.getElementById('nextQuote').addEventListener('click', function() {
  currentIndex = (currentIndex + 1) % quotes.length;
  updateQuote(currentIndex);
});

document.getElementById('prevQuote').addEventListener('click', function() {
  currentIndex = (currentIndex - 1 + quotes.length) % quotes.length;
  updateQuote(currentIndex);
});

// Initialize with first quote
updateQuote(0);

// Keyboard navigation
document.addEventListener('keydown', function(event) {
  // Only respond if user is not typing in an input/textarea
  const tag = event.target.tagName.toLowerCase();
  if (tag === 'input' || tag === 'textarea' || tag === 'select') {
    return;
  }
  
  if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
    event.preventDefault();
    currentIndex = (currentIndex + 1) % quotes.length;
    quoteText.textContent = `“${quotes[currentIndex].text}”`;
    quoteAuthor.textContent = `— ${quotes[currentIndex].author}`;
  } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
    event.preventDefault();
    currentIndex = (currentIndex - 1 + quotes.length) % quotes.length;
    quoteText.textContent = `“${quotes[currentIndex].text}”`;
    quoteAuthor.textContent = `— ${quotes[currentIndex].author}`;
  }
});

// Focus management for buttons
document.querySelectorAll('.quote-nav button').forEach(btn => {
  btn.setAttribute('aria-label', 'Navigate wellness quotes');
});
