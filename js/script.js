// Ukirudi
// Enable addition to local storage
// Enable Display, Editing and deletion

const form = document.querySelector('[data-form]'); 
const note = document.querySelector('[data-input]'); // input field
note.maxLength = 90;
const output = document.querySelector('.output-section'); // output div
const date = document.querySelector('.note-footer > p'); // current date display paragraph

// Storage for storing notes persistently in local storage
// Declared synchronously above where its getNotesFromLocalStorage 
// function is called to populate the notes array because it has to be
// initialized before it's called; otherwise it throws an error. 
class Storage {
    // Add notes array to local storage
    static addNotesToLocalStorage(notesArray) {
        // Parse it into a JSON string before pushing it to localStorage with the key of 'notes'
        localStorage.setItem("notes", JSON.stringify(notesArray));
    }
    
    // Get notes array from local storage
    static getNotesFromLocalStorage() {
        // Chech if the 'notes' key does not exist in localStorage. If true, return an empty array
        // If it does, fetch the value of it and parse it before saving it to our 'storage' variable
        let storage = !localStorage.getItem("notes") ? [] : JSON.parse(localStorage.getItem('notes'));
        return storage;
    }
}

// Storage array for our note objects
let notesArr = Storage.getNotesFromLocalStorage();

form.addEventListener("submit", (e) => {
    // Prevent page refresh
    e.preventDefault();
    // Generate a random Id for our Note class instance
    let id = Note.generateId(); 
    // Get data as at when note object was created
    let date = Note.getCurrentDate();
    // Create our object and pass it our random id and note (user input)
    const noteObj = new Note(id, note.value, date);
    // Clear input field after object has been created
    UI.clearInput();
    // Add note objects to note array using the spread operator
    notesArr = [noteObj, ...notesArr];
    // Display our note
    UI.displayNote(notesArr);
    // Edit Note
    UI.editNote();
    // Function to delete all notes from UI, notesArr, and localStorage
    UI.deleteAll();
    // Remove Note from user interface (DOM)
    UI.removeNoteFromUI();
    // Implemented condition around showing/hiding the delete all button
    UI.removeDeleteAllBtn();
    // Add notes array to localStorage for persistence
    Storage.addNotesToLocalStorage(notesArr);
    // Get notes array from localStorage
    Storage.getNotesFromLocalStorage();
});

// Blueprint for defining the characteristics and behaviour
// of instances of our Note class
class Note {
    constructor(id, note, date) {
        this.id = id;
        this.note = note;
        this.date = date;
    }

    // Get current date as at note instance creation
    static getCurrentDate() {
        let currentDate = new Date();
        // Get Day of the month
        let day = currentDate.getDate().toString();
        // Get Month of the year. Added 1 coz getMonth is zero indexed and returns 0 - 11
        let month = currentDate.getMonth() + 1;
        month = month.toString();
        // Get current year
        let year = currentDate.getFullYear();

        return day.padStart(2, '0') + '-' + month.padStart(2, '0') + '-' + year;
    }

    // Function definition of our note-item-id generator
    static generateId() {
        return Math.random() * 1000000;
    }
}

class UI {
    static displayNote(list) {
        // Display each of our notes in the DOM individually
        let displayNote = list.map((note) => {
            return `
                <div class="note-container">
                    <div class="note-body">
                        <p class="note-p">${note.note}</p>
                    </div>
                    <div class="note-footer">
                        <p data-date>${note.date}</p>
                        <div>
                            <span class="remove" data-id="${note.id}">🗑️</span>
                            <span class="edit" data-id="${note.id}">🖊️</span>
                        </div>
                    </div>
                </div>`;
        });

        output.innerHTML = (displayNote).join(" ");
    }

    // Function to remove user input from input field to allow for fresh input.
    // This input.value is cleared only after it has been used to create our 
    // note object in the backend
    static clearInput() {
        note.value = "";
    }

    static removeNoteFromUI() {
        output.addEventListener('click', (e) => {
            // Remove note from the UI if the target of the click event (e.target) in the 
            // current target (the output div - the element on which the event listener
            // is attached) has a class of 'remove'.
            if(e.target.classList.contains('remove')) {
                e.target.parentElement.parentElement.parentElement.remove();
                // Remove note object from the notes array
                notesArr = notesArr.filter(note => note.id !== +e.target.dataset.id);
                // Update localStorage with changes to notesArr
                Storage.addNotesToLocalStorage(notesArr);
                // Implemented condition around showing/hiding the delete all button
                UI.removeDeleteAllBtn();
            }
        });
    }

    // Function to edit note 
    static editNote() {
        // Set an event listener to listen for a click on our output div
        output.addEventListener('click', (e) => {
            // When a click happens, check to see that the target of the click has the class "edit" on it
            // If it does, the purpose of the click is to edit the note clicked on
            if(e.target.classList.contains('edit')) {
                // Fetch the paragraph clicked on for editing
                let p = e.target.closest(".note-container").querySelector(".note-p");
                p.style.overflow = "hidden";
                // Set paragraph to be edited to editable
                p.contentEditable = true;
                // Focus in on text input when editable is set to true
                p.focus();
                // Change the pencil icon temporarily to save to prompt one to click it to save changes made to paragraph
                e.target.innerHTML = "<b>Save</b>";
                // Give the Save text a blue color
                e.target.style.color = "blue";
                // Add an eventListener that waits fot a click event on the now "Save" button
                e.target.addEventListener('click', () => {
                    // Create a loop that compares ids in the notesArr with the id we are currently working on
                    // Find the note object with a matching id and update its note property
                    // with the updated text currently in the paragraph
                    // The id from the html is in string format. Convert it to a number before comparing
                    for(let i = 0; i < notesArr.length; i++) {
                        if(notesArr[i].id === +e.target.dataset.id) {
                            notesArr[i].note = p.innerText;
                        }
                    }
                    // After making changes
                    // Set the paragraph back to not editable
                    p.contentEditable = false;
                    // Change the content of our edit button back to our pen icon from the 'save' text
                    e.target.innerText = "🖊️";
                    // Update localStorage with our updated notesArr
                    Storage.addNotesToLocalStorage(notesArr);
                });
            }

        });
    }

    static deleteAll() {
        // Create function to delete all notes from UI, notesArr and localStorage
        document.querySelector('.delete-all__btn').addEventListener('click', () => {
            // Empty notes array
            notesArr = [];
            // Update local storage with our now empty array
            Storage.addNotesToLocalStorage(notesArr);
            // Update our UI with our now empty array
            UI.displayNote(notesArr);
            // Implemented condition around showing/hiding the delete all button
            UI.removeDeleteAllBtn();
        });
    }

    static removeDeleteAllBtn() {
        if(notesArr.length === 0) {
            document.querySelector(".delete-all__btn").style.display = "none";
        } else {
            document.querySelector(".delete-all__btn").style.display = "flex";
        }
    }
}

// Set an event listener to the window object to call functions on page load.
// Notes stored in the notesArr/localStorage should show up on page load. 
// They should therefore be stored under this window.eventListener
window.addEventListener("DOMContentLoaded", () => {
    // Display our notes on page load
    UI.displayNote(notesArr);
    // Avail the removeNoteFromUI function on page load
    // It was previously only available after form submission
    UI.removeNoteFromUI();
    // Function to edit note
    UI.editNote();
    // Function to delete all notes from UI, notesArr, and localStorage
    UI.deleteAll();
    // Implemented condition around showing/hiding the delete all button
    UI.removeDeleteAllBtn();
});