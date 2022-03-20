var formEl =document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var taskFormHandler = function(event) {
    // prevents the page from refreshing after form is submitted
    event.preventDefault();
    // collects data from form
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    console.log(taskTypeInput);
   
   // package up data as an object
   var taskDataObj = {
    name: taskNameInput,
    type: taskTypeInput
  };

// check if input values are empty strings
if (!taskNameInput || !taskTypeInput) {
    alert("You need to fill out the task form!");
    return false;
  }
formEl.reset();  
  // send it as an argument to createTaskEl
  createTaskEl(taskDataObj);
}

var createTaskEl = function(taskDataObj) {
  // create list item
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";

  // create div to hole task info and and to list item
  var taskInfoEl = document.createElement("div");
  
  // giev it a class name
  taskInfoEl.className = "task-info";
  
  // add HTML content to div
  taskInfoEl.innerHTML = "<H3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

  listItemEl.appendChild(taskInfoEl);

  // add entire list item to list
  tasksToDoEl.appendChild(listItemEl);

}

formEl.addEventListener("submit", taskFormHandler);

