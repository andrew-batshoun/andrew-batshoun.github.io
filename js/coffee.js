"use strict"
//renders coffee as div
function renderCoffee(coffee) {
    var html = '<div class="d-flex justify-content-start btn-outline-dark m-2">';
    html += '<div class="d-none" >' + coffee.id + '</div>';
    html += '<div class=" p-2 bd-highlight text-uppercase font-weight-bold">' + coffee.name + '</div>';
    html += '<div class="p-2 bd-highlight font-italic">' + coffee.roast + '</div>';
    html += '</div>';

    return html;
}
//renders coffee
function renderCoffees(coffees) {
    var html = '';
    for (var i = 0; i < coffees.length;  i++) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

//updates coffee by roast
function updateCoffees(e) {
    // e.preventDefault(); // don't submit the form, we just want to update the data
    var selectedRoast = roastSelection.value;
    var filteredCoffees = [];


    for (let i = 0; i < coffees.length; i++) {
        if (coffees[i].roast === selectedRoast) {
            filteredCoffees.push(coffees[i]);
            // console.log(filteredCoffees);
        }else if (selectedRoast === "all"){
            filteredCoffees.push(coffees[i]);
            // console.log(filteredCoffees);
        }
    }

    //new bucket of filtered coffees
    //iterate though and make sure they match in the showCoffee function
    filteredCoffees = showcoffee(filteredCoffees);

    tbody.innerHTML = renderCoffees(filteredCoffees);
}

//updates coffee by name
function showcoffee (coffees) {

    var selectedRoast = typename.value;
    var filterCoffees = [];
    var output = selectedRoast.toLowerCase()
    //////////////////////////////////////////////

    //////////////////////////////////////////////

    for (let i = 0; i < coffees.length; i++) {
        if(coffees[i].name.toLowerCase().includes(output)) {
            filterCoffees.push(coffees[i]);
        }
    }



    return filterCoffees;
}

//adds coffee
function addCoffee(e) {
    e.preventDefault()
    var newRoast = addRoast.value;
    var newName = addName.value;
    var object = {id: coffees.length, name: newName, roast: newRoast};
    coffees.push(object);

    tbody.innerHTML = renderCoffees(coffees);
}
    var submitCoffee = document.querySelector('.submit-me')
    var addRoast = document.querySelector('.add-roast');
    var addName = document.querySelector('.add-name');
    submitCoffee.addEventListener('click', addCoffee);

//coffee object
// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
var coffees = [
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
    {id: 14, name: 'French', roast: 'dark'},
];

var tbody = document.querySelector('#coffees');
var dropdown = document.querySelector('.test');
var roastSelection = document.querySelector('#roast-selection');
var typename = document.querySelector('.coffee-name')

tbody.innerHTML = renderCoffees(coffees); //this displays all of the coffees when the page loads

//events
dropdown.addEventListener('change', updateCoffees);
typename.addEventListener('input', updateCoffees);
