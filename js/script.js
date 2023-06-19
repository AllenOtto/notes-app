// Ukirudi
// Enable addition to local storage
// Enable Display, Editing and deletion

const form = document.querySelector('[data-form]');
const note = document.querySelector('[data-input]');
const output = document.querySelector('[data-output]');

// Added storage for our note objects
let noteArr = [];

form.addEventListener("submit", (e) => {
    // Prevent page refresh
    e.preventDefault();
    // Generate a random Id for our Note class instance
    let id = Note.generateId(); 
    // 
    let date = Note.getCurrentDate();
    // Create our object and pass it our random id and note (user input)
    const noteObj = new Note(id, note.value, date);
    // Add note objects to note array using the spread operator
    noteArr = [...noteArr, noteObj];
    // Display our note
    Note.displayNote(noteArr);
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

    static displayNote(list) {
        // Display our note on the frontend
        output.innerHTML = "<p>Going OUT</p>";
        console.log(list);
    }

    // Function definition of our note-item-id generator
    static generateId() {
        return Math.random() * 1000000;
    }
}