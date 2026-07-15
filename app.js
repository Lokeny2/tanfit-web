
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


// Auto-rotation every 7 seconds
let autoRotateInterval = setInterval(function() {
  currentIndex = (currentIndex + 1) % quotes.length;
  updateQuote(currentIndex);
}, 7000);

// Pause rotation when user interacts
document.querySelector('.quote-box').addEventListener('mouseenter', function() {
  clearInterval(autoRotateInterval);
});

document.querySelector('.quote-box').addEventListener('mouseleave', function() {
  autoRotateInterval = setInterval(function() {
    currentIndex = (currentIndex + 1) % quotes.length;
    updateQuote(currentIndex);
  }, 7000);
});

// Pause on touch devices
document.querySelector('.quote-box').addEventListener('touchstart', function() {
  clearInterval(autoRotateInterval);
});

// Enhanced update with animation
function updateQuoteWithAnimation(index) {
  const quoteBox = document.querySelector('.quote-box');
  
  // Fade out
  quoteBox.style.transition = 'opacity 0.3s ease';
  quoteBox.style.opacity = '0';
  
  setTimeout(() => {
    // Update content
    const quote = quotes[index];
    quoteText.textContent = `“${quote.text}”`;
    quoteAuthor.textContent = `— ${quote.author}`;
    
    // Fade in
    quoteBox.style.opacity = '1';
  }, 300);
}

// Override navigation to use animation
function navigateQuote(direction) {
  if (direction === 'next') {
    currentIndex = (currentIndex + 1) % quotes.length;
  } else if (direction === 'prev') {
    currentIndex = (currentIndex - 1 + quotes.length) % quotes.length;
  }
  updateQuoteWithAnimation(currentIndex);
}

// Update event listeners to use animated navigation
document.getElementById('nextQuote').onclick = function() {
  navigateQuote('next');
};

document.getElementById('prevQuote').onclick = function() {
  navigateQuote('prev');
};

// Keyboard support with animation
document.addEventListener('keydown', function(event) {
  const tag = event.target.tagName.toLowerCase();
  if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
  
  if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
    event.preventDefault();
    navigateQuote('next');
  } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
    event.preventDefault();
    navigateQuote('prev');
  }
});

// Initial display with animation
setTimeout(() => {
  updateQuoteWithAnimation(0);
}, 100);

// Save current quote index to session storage
function saveCurrentQuote(index) {
  try {
    sessionStorage.setItem('tanfit-current-quote', index);
  } catch (e) {
    
  }
}

// Load saved quote index
function loadSavedQuote() {
  try {
    const saved = sessionStorage.getItem('tanfit-current-quote');
    if (saved !== null) {
      const index = parseInt(saved, 10);
      if (index >= 0 && index < quotes.length) {
        return index;
      }
    }
  } catch (e) {
    
  }
  return 0;
}

// Override initialization with saved quote
function initQuoteCarousel() {
  const savedIndex = loadSavedQuote();
  currentIndex = savedIndex;
  updateQuote(currentIndex);
  
  // Save current index when navigation occurs
  document.getElementById('nextQuote').addEventListener('click', function() {
    saveCurrentQuote(currentIndex);
  });
  
  document.getElementById('prevQuote').addEventListener('click', function() {
    saveCurrentQuote(currentIndex);
  });
}

// Enhanced update function with save
const originalUpdate = updateQuote;
updateQuote = function(index) {
  originalUpdate(index);
  saveCurrentQuote(index);
};

initQuoteCarousel();

// Console welcome message
console.log('🧘 TanFit Wellness Carousel loaded!');
console.log(`📚 ${quotes.length} quotes available for inspiration.`);
