// Ukirudi
// Enable addition to local storage
// Enable Display, Editing and deletion

const form = document.querySelector('[data-form]'); 
const note = document.querySelector('[data-input]'); // input field
const output = document.querySelector('.output-section'); // output div
const date = document.querySelector('.note-footer > p'); // current date display paragraph
const trashCan = document.querySelector('.note-footer > span'); 

// Storage array for our note objects
let notesArr = [];

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
    // Remove Note from user interface (DOM)
    UI.removeNoteFromUI();
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
                        <p>${note.note}</p>
                    </div>
                    <div class="note-footer">
                        <p data-date>${note.date}</p>
                        <span class="remove">🗑️</span>
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
            // Remove note from the UI
            e.target.parentElement.parentElement.remove();
            // Remove note object from the notes array
        });
    }
}