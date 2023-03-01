let timeDeclaration = moment().format("LLLL");
let timeNow = moment().minutes(0).seconds(0).milliseconds(0);
$("#currentDay").text(timeDeclaration);
let taskAreas = $(".container > .time-block");
let writtenNotes = $("textarea");

let timeLength = 9;
for (let i = 0; i < timeLength; i++) {
    let taskArea = $("<div>");
    taskArea.addClass("linearBlock  time-block");

    let time = $("<div>");
    time.addClass("time col-1");
    time.text(i + timeLength + ":00");

    let writtenNote = $("<textarea>");
    writtenNote.addClass("textarea col-9 information");

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

    $(".container").append(taskArea);

    // * Color-code each timeblock based on past, present, and future when the timeblock is viewed.
    let startTime = moment().hour(timeLength).minute(0).second(0).millisecond(0);
    let timeBlock = startTime.clone().add(i, "h")
    if (timeBlock.isBefore(timeNow)) {
        $(taskArea).addClass("timePassed");
    } else if (timeBlock.isSame(timeNow)) {
        $(taskArea).addClass("now")
    } else {
        $(taskArea).addClass("timeAhead")
    }

    // * Save the event in local storage when the save button is clicked in that timeblock.
    function logData() {
        $(buttonSave).on("click", function (event) {
            event.preventDefault();
            let text = $(writtenNote).val();
            if (text !== "") {
                localStorage.setItem("Reminder:" + (i + timeLength) + ":00", text);
            }
        })
    };
    logData();

    // function to clear data 
    function clearData() {
        $(buttonDelete).on("click", function (event) {
            event.preventDefault();
            localStorage.removeItem("Reminder:" + (i + timeLength) + ":00");
            $(writtenNote).text("");
        })
    };
    clearData();

    // * Persist events between refreshes of a page
    let addedText = localStorage.getItem("Reminder:" + (i + timeLength) + ":00");
    $(writtenNote).text(addedText);
}
