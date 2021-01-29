window.addEventListener("load", loadTimeTable);

function loadTimeTable() {
  addEntry("06", "AM 06:");
  addEntry("07", "AM 07:");
  addEntry("08", "AM 08:");
  addEntry("09", "AM 09:");
  addEntry("10", "AM 10:");
  addEntry("11", "AM 11:");
  addEntry("12", "AM 12:");
  addEntry("13", "PM 01:");
  addEntry("14", "PM 02:");
  addEntry("15", "PM 03:");
  addEntry("16", "PM 04:");
}

function addEntry(id, label) {
  // Get the template for our timetable entry (instead of creating the row via ugly javascript)
  let t = document.querySelector('#timetable_entry');
  
  let inputElement = t.content.querySelector("input");
  inputElement.id = id;  
  
  let labelElement = t.content.querySelector("label");
  // link the label to the input element, so mouse click will give focus to the imput
  labelElement.htmlFor = id;
  labelElement.innerText = label;
  
  let clone = document.importNode(t.content, true);

  let timetable_area = document.getElementById("timetable_area");
  timetable_area.appendChild(clone);
}