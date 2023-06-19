const form = document.querySelector('[data-form]');
const note = document.querySelector('[data-input]');
const output = document.querySelector('[data-output]');

// Added storage for our note objects
let noteArr = [];

form.addEventListener("submit", (e) => {
    // Prevent page refresh
    e.preventDefault();
    // Generate a random Id for our Note class instance
    let id = generateId(); 
    // Create our object and pass it our random id and note (user input)
    const noteObj = new Note(id, note.value);
    // Add note objects to note array using the spread operator
    noteArr = [...noteArr, noteObj];
    // Display our note
    Note.displayNote(noteArr);
});

// Blueprint for defining the characteristics and behaviour
// of instances of our Note class
class Note {
    constructor(id, note) {
        this.id = id;
        this.note = note;
    }


    static displayNote(list) {
        // Display our note on the frontend
        output.innerHTML = "<p>Going OUT</p>";
        console.log(list);
    }
}

// Function definition of our note-item-id generator
function generateId() {
    return Math.random() * 1000000;
}