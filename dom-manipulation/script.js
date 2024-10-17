const quotes = [
    { text: "Quote 1", category: "inspiration", id: 1 },
    { text: "Quote 2", category: "life", id: 2 },
    // Add more initial quotes as needed
];

// Simulated server URL (for illustration)
const SERVER_URL = 'https://jsonplaceholder.typicode.com/posts'; // Not used for quotes but simulates server

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

// Periodically fetch new quotes
setInterval(async () => {
    const serverQuotes = await fetchQuotesFromServer();
    if (serverQuotes) {
        syncQuotes(serverQuotes);
    }
}, 60000); // Fetch every 60 seconds
