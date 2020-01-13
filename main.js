// define
var button = document.getElementById("button");
var content = document.getElementById("content");
var list = document.getElementById("list");
var input = document.getElementById("input");
var dateElement = document.getElementById("date");

var CHECK = "fa-check-circle";
var UNCHECK = "fa-circle-thin";
const LINE_THROUGHT = "lineThrough";

// alert for name
function nameAlert() {
  var txt;
  var person = prompt("Please enter your name:", "");
  if (person == null || person == "") {
    txt = "User cancelled the prompt.";
  } else {
    txt = "Hello " + person + "! Set your goals for today!";
  }
  document.getElementById("name").innerHTML = txt;
}

//vars
let LIST = [],
  id = 0;

// show today date
const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric"
};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

function add_fields(inputValue, id, done, trash) {
  if (trash) {
    return;
  }

  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGHT : "";

  inputValue = document.getElementById("input").value;

  const fields = `<ul class="item">
    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
    <p class="text ${LINE}">${inputValue}</p>
    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
        </ul>`;
  list.insertAdjacentHTML("beforeend", fields); //adds fields in exact positions
}

button.addEventListener("click", add_fields); // adds after button click

// clear input field after button click
function clearFields() {
  input.value = "";
}
button.addEventListener("click", clearFields);

// add an item to the list after enter button
document.addEventListener("keyup", function(event) {
  if (event.keyCode == 13) {
    const inputValue = input.value;

    // the input is not empty
    if (inputValue) {
      add_fields(inputValue, id, false, false);

      LIST.push({
        name: inputValue,
        id: id,
        done: false,
        trash: false
      });

      id++;
    }
    input.value = "";
  }
});
// complete to do
function completeToDo(element) {
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGHT);

  // throws error of undefined
  //LIST[element.id].done = LIST[element.id].done ? false : true;
}

//remove to do
function removeToDo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);

  // throws error of undefined
  //LIST[element.id].trash = true;
}

//target items created
list.addEventListener("click", function(event) {
  const element = event.target;
  const elementJob = element.attributes.job.value;

  if (elementJob == "complete") {
    completeToDo(element);
  } else if (elementJob == "delete") {
    removeToDo(element);
  }
});
