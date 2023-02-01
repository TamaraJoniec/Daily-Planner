// # Acceptance Criteria

// The app should:

// * Display the current day at the top of the calender when a user opens the planner.
 
let timeDeclaration = moment().format("LLLL");
let timeNow =moment().minutes(0).seconds(0).milliseconds(0);
$("#currentDay").text(timeDeclaration);
let time = $(".time");
let buttonSave = $(".buttonSave");
let taskArea=$(".time-block")
let buttonDelete = $(".buttonDelete")
let writtenNote = $(".typingSpace")
    
// * Present timeblocks for standard business hours when the user scrolls down.
let timeLength =9;
for (let i = 0; i < time.length; i++ ){
    let taskArea = $("<div>");
    taskArea.addClass("linearBlock  time-block");
  
    let time = $("<div>")
    time.addClass("time col-1");
    time.text((i+timeLength) + ":00")

    let writtenNote = $("<typingSpace>");
    writtenNote.addClass("typingSpace col-9 information");

    let buttonSave = $("<button>");
    buttonSave.addClass("buttonSave col-1");
}

// * Color-code each timeblock based on past, present, and future when the timeblock is viewed.
 
// * Allow a user to enter an event when they click a timeblock

// * Save the event in local storage when the save button is clicked in that timeblock.

// * Persist events between refreshes of a page
