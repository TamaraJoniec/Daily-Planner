// # Acceptance Criteria

// The app should:

// * Display the current day at the top of the calender when a user opens the planner.

let timeDeclaration = moment().format("LLLL");
let timeNow = moment().minutes(0).seconds(0).milliseconds(0);
$("#currentDay").text(timeDeclaration);
let time = $(".time");
let buttonSave = $(".buttonSave");
let taskArea = $(".time-block")
let buttonDelete = $(".buttonDelete")
let writtenNote = $(".typingSpace")

// * Present timeblocks for standard business hours when the user scrolls down.
let timeLength = 9;
for (let i = 0; i < time.length; i++) {
    let taskArea = $("<div>");
    taskArea.addClass("linearBlock  time-block");

    let time = $("<div>")
    time.addClass("time col-1");
    time.text((i + timeLength) + ":00")

    let writtenNote = $("<typingSpace>");
    writtenNote.addClass("typingSpace col-9 information");

    let buttonSave = $("<button>");
    buttonSave.addClass("buttonSave col-1");

    let buttonDelete = $("<button>");
    buttonDelete.addClass("buttonDelete col-1");

    let saveImage = $("<i>");
    saveImage.addClass("far fa-save");

    let deleteImage = $("<i>");
    deleteImage.addClass("fas fa-trash-alt");

    // appending variable functions to the tasks area
    taskArea.append(time);
    taskArea.append(writtenNote);
    taskArea.append(buttonSave);
    taskArea.append(buttonDelete);
    buttonSave.append(saveImage);
    buttonDelete.append(deleteImage);

    $(".timeblock-container").append(taskArea);
}

// * Color-code each timeblock based on past, present, and future when the timeblock is viewed.
// Beginning at 9am with 8
let startTime = moment().time(8).minutes(0).seconds(0).milliseconds(0);
// creating a for loop with if statements to work out timings
for (let i = 0; i < time.length; i++) {

    let timeBlock = startTime.add(1, "h")
    // else if statements to work out the period of time
    if (timeBlock.isBefore(timenow)) {
        $(taskArea[i]).addClass("timePassed")
    }
    // links to css for colour coding
    else if (timeBlock.isSame(timenow)) {
        $(taskArea[i]).addClass("now")
    }
    // links to css for colour coding
    else {
        $(taskArea[i]).addClass("timeAhead")

    }
}

// * Allow a user to enter an event when they click a timeblock
writtenNote = $(".typingSpace")

// * Save the event in local storage when the save button is clicked in that timeblock.
function logData(y) {
    $(buttonSave[y]).on("click", function (event) {
        event.preventDefault();
        let text = $(writtenNote[y]).val();
        if (text !== "") {
            localStorage.setItem("Reminder:" + (y + time.length) + ":00", text);
        }
    })
};
// function to clear data 
function clearData (y){
    $(buttonDelete[y]).on("click", function(event){
        event.preventDefault();
        localStorage.removeItem("Reminder:" + (y+time.length) +":00");
        $(writtenNote[y]).text(""); 
    })
};
// * Persist events between refreshes of a page
for (let i= 0;i<time.length;i++){
    let addedText =localStorage.getItem("Reminder:" + (i+time.length)+":00");
    $(writtenNote[i]).text(addedText); 
    logData(i);
    clearData(i);
}
