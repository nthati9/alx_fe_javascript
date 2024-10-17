const quotes = [
    { text: "Quote 1", category: "inspiration", id: 1 },
    { text: "Quote 2", category: "life", id: 2 },
    // Add more initial quotes as needed
];

// Simulated server URL (for illustration)
const SERVER_URL = 'https://jsonplaceholder.typicode.com/posts'; // Not for quotes, simulates server

// Function to fetch quotes from the server
async function fetchQuotesFromServer() {
    try {
        const response = await fetch(SERVER_URL);
        const data = await response.json();
        // Simulate server quotes based on fetched data
        return data.slice(0, 5).map((item, index) => ({
            text: item.title,
            category: "inspiration",
            id: index + 100 // Ensure unique ID
        }));
    } catch (error) {
        console.error("Error fetching quotes:", error);
    }
}

// Function to post a new quote to the server
async function postQuoteToServer(quote) {
    try {
        const response = await fetch(SERVER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(quote) // Convert the quote object to JSON
        });
        const data = await response.json();
        console.log("Quote posted to server:", data);
        return data;
    } catch (error) {
        console.error("Error posting quote:", error);
    }
}

// Periodically fetch new quotes from the server
setInterval(async () => {
    const serverQuotes = await fetchQuotesFromServer();
    if (serverQuotes) {
        syncQuotes(serverQuotes);
    }
}, 60000); // Fetch every 60 seconds

// Function to sync local quotes with server quotes
function syncQuotes(serverQuotes) {
    const localQuoteIds = quotes.map(quote => quote.id);
    let updated = false;

    serverQuotes.forEach(serverQuote => {
        const index = localQuoteIds.indexOf(serverQuote.id);
        if (index > -1) {
            // Conflict: existing local quote, prefer server version
            quotes[index] = serverQuote;
            updated = true;
        } else {
            // New quote
            quotes.push(serverQuote);
            updated = true;
        }
    });

    if (updated) {
        localStorage.setItem('quotes', JSON.stringify(quotes));
        displayQuotes(quotes);
        notifyUser("Quotes synced with server!"); // Alert user
    }
}

// Function to notify users of updates
function notifyUser(message) {
    alert(message); // Alert to notify the user
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
async function addQuote(text, category) {
    const newQuote = { text, category, id: Date.now() }; // Use timestamp for unique ID
    quotes.push(newQuote);
    await postQuoteToServer(newQuote); // Post the new quote to the server
    updateCategoryDropdown(category);
    displayQuotes(quotes);
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
