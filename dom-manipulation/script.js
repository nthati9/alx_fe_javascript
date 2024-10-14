
let quotes = [
    { text: "The best way to predict the future is to invent it.", category: "Inspiration" },
    { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Motivation" },
    { text: "The only way to do great work is to love what you do.", category: "Work" }
];


function showRandomQuote() {
    const quoteDisplay = document.getElementById("quoteDisplay");
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    quoteDisplay.innerHTML = `"${randomQuote.text}" - <strong>${randomQuote.category}</strong>`;
}

function createAddQuoteForm() {
    const formContainer = document.getElementById("quoteForm");

   
    const newQuoteTextInput = document.createElement("input");
    newQuoteTextInput.id = "newQuoteText";
    newQuoteTextInput.type = "text";
    newQuoteTextInput.placeholder = "Enter a new quote";

   
    const newQuoteCategoryInput = document.createElement("input");
    newQuoteCategoryInput.id = "newQuoteCategory";
    newQuoteCategoryInput.type = "text";
    newQuoteCategoryInput.placeholder = "Enter quote category";

    
    const addQuoteButton = document.createElement("button");
    addQuoteButton.innerText = "Add Quote";
    addQuoteButton.id = "addQuote";
    addQuoteButton.onclick = addQuote;

    
    formContainer.appendChild(newQuoteTextInput);
    formContainer.appendChild(newQuoteCategoryInput);
    formContainer.appendChild(addQuoteButton);
}


function addQuote() {
    const newQuoteText = document.getElementById("newQuoteText").value;
    const newQuoteCategory = document.getElementById("newQuoteCategory").value;

    
    if (newQuoteText && newQuoteCategory) {
        
        quotes.push({ text: newQuoteText, category: newQuoteCategory });
        
        
        document.getElementById("newQuoteText").value = '';
        document.getElementById("newQuoteCategory").value = '';
        
        showRandomQuote();
    } else {
        alert("Please fill in both fields.");
    }
}


document.getElementById("newQuote").addEventListener("click", showRandomQuote);


createAddQuoteForm();
showRandomQuote();

