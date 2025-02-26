"use strict"

// Load coffees from local storage or use default data
let coffees = JSON.parse(localStorage.getItem('coffees')) || [
    {id: 1, name: 'Light City', roast: 'light', favorite: false, brew: 'Best for Pour Over'},
    {id: 2, name: 'Half City', roast: 'light', favorite: false, brew: 'Great for Chemex'},
    {id: 3, name: 'Cinnamon', roast: 'light', favorite: false, brew: 'Perfect for Drip Machines'},
    {id: 4, name: 'City', roast: 'medium', favorite: false, brew: 'Best for Espresso'},
    {id: 5, name: 'American', roast: 'medium', favorite: false, brew: 'Ideal for French Press'},
    {id: 6, name: 'Breakfast', roast: 'medium', favorite: false, brew: 'Good for Drip Coffee'},
    {id: 7, name: 'High', roast: 'dark', favorite: false, brew: 'Great for Moka Pot'},
    {id: 8, name: 'Continental', roast: 'dark', favorite: false, brew: 'Perfect for Cold Brew'},
    {id: 9, name: 'New Orleans', roast: 'dark', favorite: false, brew: 'Best for Chicory Blend'},
    {id: 10, name: 'European', roast: 'dark', favorite: false, brew: 'Good for Turkish Coffee'},
    {id: 11, name: 'Espresso', roast: 'dark', favorite: false, brew: 'Designed for Espresso Machines'},
    {id: 12, name: 'Viennese', roast: 'dark', favorite: false, brew: 'Great for French Press'},
    {id: 13, name: 'Italian', roast: 'dark', favorite: false, brew: 'Perfect for Cappuccinos'},
    {id: 14, name: 'French', roast: 'dark', favorite: false, brew: 'Best for Latte Art'}
];

// Function to show modal
function showModal(message) {
    document.getElementById('modal-message').textContent = message;
    let modal = new bootstrap.Modal(document.getElementById('errorModal'));
    modal.show();
}

// Render coffee item
function renderCoffee(coffee) {
    return `
        <div class="list-group-item d-flex flex-column bg-light border rounded p-3 shadow-sm">
            <div class="d-flex justify-content-between align-items-center w-100">
                <span class="fw-bold text-uppercase editable" data-id="${coffee.id}" contenteditable="false">${coffee.name}</span>
                <span class="text-muted">${coffee.roast}</span>
            </div>
            <p class="text-muted small mt-1">${coffee.brew || 'No brewing recommendation available'}</p>
            <div class="mt-2">
                <button class="btn btn-sm btn-danger delete-coffee" data-id="${coffee.id}">Delete</button>
                <button class="btn btn-sm ${coffee.favorite ? 'btn-success' : 'btn-outline-success'} favorite-coffee" data-id="${coffee.id}">⭐</button>
            </div>
        </div>`;
}

// Render list of coffees (sorted by ID in descending order)
function renderCoffees(coffees) {
    return coffees.sort((a, b) => b.id - a.id).map(renderCoffee).join('');
}

// Update displayed coffees based on filters
function updateCoffees() {
    let selectedRoast = document.getElementById('roast-selection').value;
    let searchQuery = document.getElementById('search-coffee').value.toLowerCase();

    let filteredCoffees = coffees.filter(coffee =>
        (selectedRoast === "all" || coffee.roast === selectedRoast) &&
        coffee.name.toLowerCase().includes(searchQuery)
    );

    document.getElementById('coffee-list').innerHTML = renderCoffees(filteredCoffees);
    attachEventListeners();
}

// Add new coffee
function addCoffee(event) {
    event.preventDefault();
    let newName = document.getElementById('new-coffee-name').value.trim();
    let newRoast = document.getElementById('new-coffee-roast').value;

    if (!newName) return;

    // Check for duplicate
    if (coffees.some(coffee => coffee.name.toLowerCase() === newName.toLowerCase())) {
        showModal("This coffee already exists!");
        return;
    }

    let newCoffee = {
        id: coffees.length + 1,
        name: newName,
        roast: newRoast,
        favorite: false,
        brew: 'Brewing method not specified'
    };

    coffees.push(newCoffee);
    localStorage.setItem('coffees', JSON.stringify(coffees));

    // Reset filter to 'All' and update coffee list
    document.getElementById('roast-selection').value = "all";
    updateCoffees();

    // Clear form fields
    document.getElementById('new-coffee-name').value = "";
    document.getElementById('new-coffee-roast').value = "light";
}


// Delete coffee
function deleteCoffee(event) {
    let coffeeId = parseInt(event.target.getAttribute("data-id"));
    coffees = coffees.filter(coffee => coffee.id !== coffeeId);
    localStorage.setItem('coffees', JSON.stringify(coffees));
    updateCoffees();
}

// Toggle favorite status
function toggleFavorite(event) {
    let coffeeId = parseInt(event.target.getAttribute("data-id"));
    coffees = coffees.map(coffee =>
        coffee.id === coffeeId ? {...coffee, favorite: !coffee.favorite} : coffee
    );
    localStorage.setItem('coffees', JSON.stringify(coffees));
    updateCoffees();
}


// Attach event listeners for dynamic elements
function attachEventListeners() {
    document.querySelectorAll('.save-coffee').forEach(button =>
        button.addEventListener('click', saveCoffee)
    );
    document.querySelectorAll('.delete-coffee').forEach(button =>
        button.addEventListener('click', deleteCoffee)
    );
    document.querySelectorAll('.favorite-coffee').forEach(button =>
        button.addEventListener('click', toggleFavorite)
    );
}

// Event Listeners
document.getElementById('roast-selection').addEventListener('change', updateCoffees);
document.getElementById('search-coffee').addEventListener('input', updateCoffees);
document.getElementById('add-coffee').addEventListener('click', addCoffee);

// Initial Render
updateCoffees();
