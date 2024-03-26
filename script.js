const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');

// Function to display items from localStorage
function displayItems() {
    // Initialize a variable and set it equal to the items in local storage via a function
    const itemsFromStorage = getItemsFromStorage();

    // Iterates through each item in localStorage and adds them to the dom using a function
    itemsFromStorage.forEach(item => addItemToDom(item));

    // Runs checkUI function
    checkUI();
}

// Function to create a new icon and set custom classes
function createIcon(classes) {
    // Create a new icon element
    const icon = document.createElement('i');

    // Sets classes to those passed in
    icon.className = classes;

    // Return the new icon element
    return icon;
};

// Function to create a new button and set custom classes
function createButton(classes) {
    // Creates a new button element
    const button = document.createElement('button');

    // Sets classes to those passed in
    button.className = classes;

    // Calls create icon function and appends it to the new button
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    
    // Returns the new button element
    return button;
};

// Function to add a new item to the itemList
function onAddItemSubmit (e) {
    // Prevents the form from submitting
    e.preventDefault();
    
    // Initializes a variable with the current text in the textbox.
    const newItem = itemInput.value;

    // Validate Input
    if (newItem === '') {
        alert('Please add an item.');
        return;
    };

    // Creates Item Dom element from a function
    addItemToDom(newItem);

    // Adds item to local storage
    addItemToStorage(newItem);

    // Runs checkUI Function
    checkUI();

    // Sets itemInput to empty string
    itemInput.value = '';
};

function getItemsFromStorage() {
    // Initialize variable to store all items saved in local storage
    let itemsFromStorage;

    // Check if there are any items in local storage
    if (localStorage.getItem('items') === null) {
        // If not, set the variable to an empty array
        itemsFromStorage = [];
    } else {
        // If so, parse the local storage to an array before declaring the variable equal to it
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    };

    return itemsFromStorage;
}

function addItemToDom(item) {
    // Create list item
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));

    // Create Button and appends it to the new item
    const button = createButton('remove-item btn-link text-red')
    li.appendChild(button);

    // Append new item to item list
    itemList.appendChild(li);
}

function addItemToStorage(item) {
    const itemsFromStorage = getItemsFromStorage();

    // Append the new item to the array 
    itemsFromStorage.push(item);
    
    // Convert to JSON string and set to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

// Function to remove items from the list
function removeItem(e) {
    // Prompts the user to confirm the list deletion
    if (e.target.parentElement.classList.contains('remove-item')) {
        // Checks if element being hit contains the correct class
        if (confirm('Are you sure?')) {
            //Removes the parent of the button's parent element, or the whole list item
            e.target.parentElement.parentElement.remove();
        }
    }

    // Runs checkUI Function
    checkUI();
};

// Function to clear all items from the list
function clearItems() {
    // Prompts the user to confirm the list deletion
    if (confirm('Warning: All items will be deleted.')) {
        // Iterates through the whole list so long as it has a child element
        while (itemList.firstChild) {
            // Removes the child element of the item list
            itemList.removeChild(itemList.firstChild);
        };
    }

    // Runs checkUI Function
    checkUI();
};

function filterItems (e) {
    // Initializes a variable with a value of all items in the list
    const items = itemList.querySelectorAll('li');

    // Initializes a variable with a value of the text in the filter textbox
    const text = e.target.value.toLowerCase();

    // Runs a loop to iterate through all items in the item list
    items.forEach(item => {
        // Initializes a variable and set it equal to the text of the item from the list
        const itemName = item.firstChild.textContent.toLowerCase();

        // Checks if the text from the item in the list contains the text in the filter textbox
        if (itemName.indexOf(text) != -1) {
            // If so, the item is displayed
            item.style.display = 'flex';
        } else {
            // If not, the item is hidden
            item.style.display = 'none';
        }
    });
};

// Function to check the state of certain UI features
function checkUI () {
    // Initializes a variable with a value of all items in the list
    const items = itemList.querySelectorAll('li');

    // Check if the list has items in it.
    if (items.length === 0) {
        // Hides the clear button and item filter search bar if list is empty
        clearBtn.style.display = 'none';
        itemFilter.style.display = 'none';
    } else {
        // Makes the clear button and item filter visible if the list is populated
        clearBtn.style.display = 'block';
        itemFilter.style.display = 'block';
    }
};

// Initialize app
function init() {
    // Event Listeners
    itemForm.addEventListener('submit', onAddItemSubmit);
    itemList.addEventListener('click', removeItem);
    clearBtn.addEventListener('click', clearItems);
    itemFilter.addEventListener('input', filterItems);
    document.addEventListener('DOMContentLoaded', displayItems);

    // Runs the checkUI function upon loading the webpage
    checkUI();
}

init();

