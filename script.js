const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');

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
function addItem (e) {
    // Prevents the form from submitting
    e.preventDefault();
    
    // Initializes a variable with the current text in the textbox.
    const newItem = itemInput.value;

    // Validate Input
    if (newItem === '') {
        alert('Please add an item.');
        return;
    };

    // Create list item
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(newItem));

    // Create Button and appends it to the new item
    const button = createButton('remove-item btn-link text-red')
    li.appendChild(button);

    // Append new item to item list
    itemList.appendChild(li);

    // Sets itemInput to empty string
    itemInput.value = '';
};

// Function to remove items from the list
function removeItem(e) {
    // Checks if element being hit contains the correct class
    if (e.target.parentElement.classList.contains('remove-item')) {
        //Removes the parent of the button's parent element, or the whole list item
        e.target.parentElement.parentElement.remove();
    }
};

// Function to clear all items from the list
function clearItems() {
    // Iterates through the whole list so long as it has a child element
    while (itemList.firstChild) {
        // Removes the child element of the item list
        itemList.removeChild(itemList.firstChild);
    };
};

// Event Listeners
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItems);
