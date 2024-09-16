const apiKey = 'AIzaSyA5tS08jKGq3nbITnjf453IIxK0EpYXmL0';
const searchEngineId = '17816ef27e0594510';
let searchType = 'web'; // Default search type

// Function to handle search button click
document.getElementById('search-button').addEventListener('click', function() {
    const query = document.getElementById('search-input').value;
    if (query) {
        fetchResults(query, searchType);
    } else {
        alert("Please enter a search query.");
    }
});

// Function to handle category button click
document.querySelectorAll('.category-button').forEach(button => {
    button.addEventListener('click', function() {
        searchType = this.getAttribute('data-type');
        document.querySelectorAll('.category-button').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
    });
});

// Fetch results from Google Custom Search API
function fetchResults(query, type) {
    let searchTypeParam = '';
    
    if (type === 'image') {
        searchTypeParam = 'searchType=image';
    } else if (type === 'video') {
        searchTypeParam = 'searchType=video';
    } else if (type === 'book') {
        searchTypeParam = 'filter=1'; // Books filtering
    } else if (type === 'shopping') {
        searchTypeParam = 'c2coff=1'; // Shopping filtering
    } else {
        searchTypeParam = ''; // Default search type
    }

    const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&key=${apiKey}&cx=${searchEngineId}&${searchTypeParam}`;
    console.log('Fetching URL:', url); // Debugging URL

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log('Search Results:', data); // Debugging results
            displayResults(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Display search results
function displayResults(data) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; // Clear previous results

    if (data.items) {
        data.items.forEach(item => {
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';
            resultItem.innerHTML = `
                <h3><a href="${item.link}" target="_blank">${item.title}</a></h3>
                <p>${item.snippet}</p>
            `;
            resultsContainer.appendChild(resultItem);
        });
        resultsContainer.style.display = 'block';
    } else {
        resultsContainer.innerHTML = '<p>No results found.</p>';
        resultsContainer.style.display = 'block';
    }
}

// Sign-in form handling
document.getElementById('sign-in-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // For real authentication, send the credentials to your server here
    console.log('Email:', email);
    console.log('Password:', password);

    // Simulate successful sign-in
    document.getElementById('sign-in-section').style.display = 'none';
    document.getElementById('search-section').style.display = 'block';
    document.getElementById('categories').style.display = 'block';
});
