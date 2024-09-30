// Helper to create a command execution with or without value
function execCommand(command, value = null) {
    document.execCommand(command, false, value);
}

// Array of commands with respective element IDs and optional values
const commands = [
    { element: 'bold', command: 'bold' },
    { element: 'italic', command: 'italic' },
    { element: 'underline', command: 'underline' },
    { element: 'strikeThrough', command: 'strikeThrough' },
    { element: 'unorderedList', command: 'insertUnorderedList' },
    { element: 'orderedList', command: 'insertOrderedList' },
    { element: 'removeFormat', command: 'removeFormat' },
];

// Initialize buttons for basic text commands
commands.forEach(({ element, command }) => {
    document.getElementById(element).addEventListener('click', () => execCommand(command));
});

// Handling custom commands like creating a link or uploading an image
document.getElementById('createLink').addEventListener('click', () => {
    const url = prompt("Enter the link URL:");
    if (url) execCommand('createLink', url);
});

document.getElementById('imageUpload').addEventListener('change', () => uploadImage());

// Functions to change the font size, color, style, background, etc.
const dropdowns = [
    { element: 'fontSize', command: 'fontSize' },
    { element: 'fontColor', command: 'foreColor' },
    { element: 'backgroundColor', command: 'hiliteColor' },
    { element: 'fontStyle', command: 'fontName' },
    { element: 'pageColor', custom: changePageColor },
];

dropdowns.forEach(({ element, command, custom }) => {
    document.getElementById(element).addEventListener('change', (event) => {
        const value = event.target.value;
        if (command) execCommand(command, value);
        if (custom) custom(value);
    });
});

// Function to upload an image and insert it into the editor
function uploadImage() {
    const input = document.getElementById('imageUpload');
    const file = input.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = `<img src="${e.target.result}" style="max-width: 100%;"/>`;
            document.getElementById('editor').focus();
            document.execCommand('insertHTML', false, img);
        };
        reader.readAsDataURL(file);
    }
}

// Change the page (editor) background color
function changePageColor(color) {
    document.getElementById('editor').style.backgroundColor = color;
}

// Function to insert an image from a URL
document.getElementById('insertImageURL').addEventListener('click', () => {
    const imageUrl = prompt("Enter the Image URL:");
    if (imageUrl) {
        const img = `<img src="${imageUrl}" style="max-width: 100%;"/>`;
        document.getElementById('editor').focus();
        document.execCommand('insertHTML', false, img);
    }
});
