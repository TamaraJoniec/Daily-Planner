// Cache frequently used elements to improve performance
const timeDeclaration = moment().format("LLLL");
const timeNow = moment().minutes(0).seconds(0).milliseconds(0);
const $currentDay = $("#currentDay");
const $container = $(".container");

const taskAreas = [];
const times = [];
const writtenNotes = [];
const saveButtons = [];
const deleteButtons = [];

// Use a template string to generate the task area HTML
function generateTaskAreaHTML(index, time) {
  return `
    <div class="linearBlock time-block">
      <div class="time col-1">${time}</div>
      <textarea class="textarea col-9 information"></textarea>
      <button class="buttonSave col-1">
        <i class="far fa-save"></i>
      </button>
      <button class="buttonDelete col-1">
        <i class="fas fa-trash-alt"></i>
      </button>
    </div>
  `;
}

// Generate the task areas and cache the necessary elements
for (let i = 0; i < 9; i++) {
  const time = i + 9 + ":00";
  const taskArea = $(generateTaskAreaHTML(i, time));
  taskAreas.push(taskArea);
  times.push(taskArea.find(".time"));
  writtenNotes.push(taskArea.find("textarea"));
  saveButtons.push(taskArea.find(".buttonSave"));
  deleteButtons.push(taskArea.find(".buttonDelete"));
}

// Append the task areas to the container element
$container.append(taskAreas);

// Color-code each timeblock based on past, present, and future
const startTime = moment().hour(9).minute(0).second(0).millisecond(0);
taskAreas.forEach((taskArea, i) => {
  const timeBlock = startTime.clone().add(i + 1, "h");
  if (timeBlock.isBefore(timeNow)) {
    taskArea.addClass("timePassed");
  } else if (timeBlock.isSame(timeNow)) {
    taskArea.addClass("now");
  } else {
    taskArea.addClass("timeAhead");
  }
});

// Update the current day display
$currentDay.text(timeDeclaration);

// Save the event in local storage when the save button is clicked in that timeblock
function logData(y) {
  $(saveButtons[y]).on("click", function (event) {
    event.preventDefault();
    const text = $(writtenNotes[y]).val();
    if (text !== "") {
      localStorage.setItem(`Reminder:${y + 9}:00`, text);
    }
  });
}

// Clear data from local storage and textarea
function clearData(y) {
  $(deleteButtons[y]).on("click", function (event) {
    event.preventDefault();
    localStorage.removeItem(`Reminder:${y + 9}:00`);
    $(writtenNotes[y]).val("");
  });
}

// Persist events between refreshes of a page
writtenNotes.forEach((note, i) => {
  const addedText = localStorage.getItem(`Reminder:${i + 9}:00`);
  $(note).val(addedText);
  logData(i);
  clearData(i);
});
