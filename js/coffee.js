"use strict"

// Function to show modal
function showModal(message) {
    document.getElementById('modal-message').textContent = message;
    let modal = new bootstrap.Modal(document.getElementById('errorModal'));
    modal.show();
}

// Render coffee item
function renderCoffee(coffee) {
    return `
        <div class="list-group-item d-flex justify-content-between align-items-center bg-light border rounded p-3 shadow-sm">
            <span class="fw-bold text-uppercase">${coffee.name}</span>
            <span class="text-muted">${coffee.roast}</span>
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
        roast: newRoast
    };

    coffees.push(newCoffee);

    // Reset filter to 'All' and update coffee list
    document.getElementById('roast-selection').value = "all";
    updateCoffees();

    // Clear form fields
    document.getElementById('new-coffee-name').value = "";
    document.getElementById('new-coffee-roast').value = "light";
}

// Initial Coffee Data
let coffees = [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'}
];

// Event Listeners
document.getElementById('roast-selection').addEventListener('change', updateCoffees);
document.getElementById('search-coffee').addEventListener('input', updateCoffees);
document.getElementById('add-coffee').addEventListener('click', addCoffee);

// Initial Render
updateCoffees();
