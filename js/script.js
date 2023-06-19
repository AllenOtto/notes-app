const form = document.querySelector('[data-form]');
const note = document.querySelector('[data-input]').value;
const output = document.querySelector('[data-output]');

form.addEventListener("submit", (e) => {
    // Prevent page refresh
    e.preventDefault();
    // Generate a random Id for our Note class instance
    let id = generateId(); 
    // Create our object and pass it our random id and note (user input)
    const noteObj = new Note(id, note);
    noteObj.displayNote();
});

class Note {
    constructor(id, note) {
        this.id = id;
        this.note = note;
    }

    displayNote() {
        // Display our note on the frontend
        output.innerHTML = "<p>Going OUT</p>";
    }
}

function generateId() {
        return Math.random() * 1000000;
    }