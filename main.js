console.log("Connected");

let tasks = [];
loadFromLocalStorage();

function addTask() {
    event.preventDefault();
    // form validation//    
    if (isFormValid()) {
        // get input elements
        const dateInput = document.getElementById("dateInput");
        const timeInput = document.getElementById("timeInput");
        const subjectInput = document.getElementById("subjectInput");
        const noteContentInput = document.getElementById("noteContentInput");
        const pinColor = selectedPinColor();

        const noteDetails = {
            date: dateInput.value,
            time: timeInput.value,
            subject: subjectInput.value,
            noteContent: noteContentInput.value,
            pinColor: pinColor
        }
        console.log(noteDetails);
        console.log(tasks);

        //add note to array
        tasks.push(noteDetails);

        //save & display
        saveToLocalStorage();
        displayNotes();

        // clear inputs
        dateInput.value = "";
        timeInput.value = "";
        subjectInput.value = "";
        noteContentInput.value = "";
        document.getElementById("redPin").checked = true;
    }
}

function displayNotes() {
    const notesArea = document.getElementById("notesArea");

    let html = ``;

    // adding new notes
    for (let i = 0; i < tasks.length; i++) {
        html += `<div class="note" id="${i}">
        <div class="pin">${selectedPinImage(tasks[i].pinColor)}</div>
            <div>
                <a href="#" class="large-icon delete-icon" onclick="deleteNote(this)" id="${i}">
                </a>
            </div>
        <h3>${tasks[i].subject}</h3>
        <div class="details-container"> 
            <div class="date-details-container">
                <div class="small-icon small-icon-date"></div>
                <p class="orange-text">${tasks[i].date}</p>
            </div>
            <div class="time-details-container">
                <div class="small-icon small-icon-time"></div>
                <p class="orange-text">${tasks[i].time}</p>
            </div>
        </div>
        <p class="note-content">${tasks[i].noteContent}</p>
        <div class="note-corner"></div>
    </div>`
    }
    notesArea.innerHTML = html;
};

function saveToLocalStorage() {
    const tasksString = JSON.stringify(tasks);
    localStorage.setItem("savedNotes", tasksString);
};

function loadFromLocalStorage() {
    const loadedString = localStorage.getItem("savedNotes");
    if (loadedString) {
        tasks = JSON.parse(loadedString);
    } else {
        console.log("No data to load from local storage")
    }
    displayNotes();
};

function deleteNote(noteToDelete) {
    const index = noteToDelete.id;
    tasks.splice(index, 1);
    saveToLocalStorage();
    displayNotes();
}

function clearBoard() {
    tasks = [];
    saveToLocalStorage();
    const notesArea = document.getElementById("notesArea");
    let html = ``;
    notesArea.innerHTML = html;
};

function isFormValid() {
    const dateInput = document.getElementById("dateInput");
    const timeInput = document.getElementById("timeInput");
    const subjectInput = document.getElementById("subjectInput");
    const noteContentInput = document.getElementById("noteContentInput");

    if (!subjectInput.value || !timeInput.value || !dateInput.value || !noteContentInput.value) {
        alert("Please fill the missing details");
        return false;
    } else {
        return true;
    };
};

function fadeIn() {
    const noteToFadeId = tasks.length - 1;
    console.log(`last note id: ${noteToFadeId}`);
    const noteToFade = document.getElementById(`${noteToFadeId}`);
    noteToFade.classList.toggle("fade-in")
};

function selectedPinColor() {
    let selectedPinColor = "redPin"
    if (document.getElementById("redPin").checked) {
        selectedPinColor = "redPin";
    } else if (document.getElementById("orangePin").checked) {
        selectedPinColor = "orangePin"
    } else if (document.getElementById("greenPin").checked) {
        selectedPinColor = "greenPin"
    };
    return selectedPinColor;
};

function selectedPinImage(pinColor) {
    let selectedPinImg = ``;

    if (pinColor === "redPin") {
        selectedPinImg = `<img src="assets/icons/red-pin.svg" alt="note-red-pin">`;
    } else if (pinColor === "orangePin") {
        selectedPinImg = `<img src="assets/icons/orange-pin.svg" alt="note-red-pin">`;
    } else if (pinColor === "greenPin") {
        selectedPinImg = `<img src="assets/icons/green-pin.svg" alt="note-red-pin">`;
    }
    return selectedPinImg;
};