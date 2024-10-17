const quotes = [
    { text: "Quote 1", category: "inspiration" },
    { text: "Quote 2", category: "life" },
    { text: "Quote 3", category: "inspiration" },
    { text: "Quote 4", category: "humor" },
    { text: "Quote 5", category: "life" },
    // Add more quotes as needed
];

// Function to populate the category dropdown
function populateCategories() {
    const categorySet = new Set(quotes.map(quote => quote.category));
    const categoryFilter = document.getElementById('categoryFilter');

    categorySet.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        categoryFilter.appendChild(option);
    });
}

// Function to filter and display quotes based on selected category
function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    const filteredQuotes = selectedCategory === 'all'
        ? quotes
        : quotes.filter(quote => quote.category === selectedCategory);

    displayQuotes(filteredQuotes);
}

// Function to display quotes in the DOM
function displayQuotes(filteredQuotes) {
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = ''; // Clear previous quotes

    // Randomly select one quote from the filtered list
    if (filteredQuotes.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
        const randomQuote = filteredQuotes[randomIndex];
        
        const quoteElement = document.createElement('div');
        quoteElement.textContent = randomQuote.text;
        quoteDisplay.appendChild(quoteElement);
    } else {
        quoteDisplay.textContent = "No quotes available for this category.";
    }
}

// Function to add a new quote and update categories
function addQuote(text, category) {
    quotes.push({ text, category });
    updateCategoryDropdown(category);
    filterQuotes(); // Optionally filter quotes after adding a new one
}

// Function to update the category dropdown
function updateCategoryDropdown(newCategory) {
    const categoryFilter = document.getElementById('categoryFilter');
    const existingOptions = [...categoryFilter.options].map(option => option.value);

    if (!existingOptions.includes(newCategory)) {
        const option = document.createElement('option');
        option.value = newCategory;
        option.textContent = newCategory.charAt(0).toUpperCase() + newCategory.slice(1);
        categoryFilter.appendChild(option);
    }
}

// Restore the last selected filter when the page loads
window.onload = function() {
    populateCategories(); // Populate categories on page load
    const lastCategory = localStorage.getItem('lastSelectedCategory') || 'all';
    document.getElementById('categoryFilter').value = lastCategory;
    filterQuotes(); // Filter quotes based on the last selected category
};

