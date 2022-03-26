var taskIdCounter = 0;
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var pageContentEl = document.querySelector("#page-content");

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

  // add task id as a custom attribute
  listItemEl.setAttribute("data-task-id", taskIdCounter);
  
  // create div to hole task info and and to list item
  var taskInfoEl = document.createElement("div");
  
  // giev it a class name
  taskInfoEl.className = "task-info";
  
  // add HTML content to div
  taskInfoEl.innerHTML = "<H3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
  

  listItemEl.appendChild(taskInfoEl);


  var taskActionsEl = createTaskAction(taskIdCounter);
  listItemEl.appendChild(taskActionsEl);
  
  tasksToDoEl.appendChild(listItemEl);

  // add entire list item to list
  tasksToDoEl.appendChild(listItemEl);

  // increas tas counter for next unique id
  taskIdCounter++;

}

var createTaskAction = function(taskId) {
  var actionContainerEl = document.createElement("div");
  actionContainerEl.className = "task-actions";

  // create edit button
  var editButtonEl = document.createElement("button");
  editButtonEl.textContent = "Edit";
  editButtonEl.className = "btn edit-btn";
  editButtonEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(editButtonEl);

  // create delete button
  var deleteButtonEl = document.createElement("button");
  deleteButtonEl.textContent = "Delete";
  deleteButtonEl.className = "btn delete-btn";
  deleteButtonEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(deleteButtonEl);

  var statusSelectEl = document.createElement("select");
  statusSelectEl.className = "select-status";
  statusSelectEl.setAttribute("name", "status-change");
  statusSelectEl.setAttribute("data-task-id", taskId);

  var statusChoices = ["To Do","In Progress","Completed"];
  for (var i = 0; i < statusChoices.length; i++) {
    // create option element
    var statusOptionEl = document.createElement("option");
    statusOptionEl.textContent = statusChoices[i];
    statusOptionEl.setAttribute("value", statusChoices[i]);
  
    // append to select
    statusSelectEl.appendChild(statusOptionEl);
  }

   //var taskActionsEl = createTaskAction(taskIdCounter)

  actionContainerEl.appendChild(statusSelectEl);

  return actionContainerEl;
};

var deleteTask = function(taskId) {
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  console.log(taskSelected);
  taskSelected.remove();
}

var editTask = function(taskId) {
  // get task list item element
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  // get content from task name and type
  var taskName = taskSelected.querySelector("h3.task-name").textContent;


  var taskType = taskSelected.querySelector("span.task-type").textContent;

  document.querySelector("input[name='task-name']").value = taskName;
  document.querySelector("select[name='task-type']").value = taskType;
  formEl.setAttribute("data-task-id", taskId);
  document.querySelector("#save-task").textContent = "Save Task";

};

var taskButtonHandler =function(event) {
   // get target element from event
   var targetEl = event.target;

   // edit button was clicked
   if (targetEl.matches(".edit-btn")) {
     var taskId = targetEl.getAttribute("data-task-id");
     editTask(taskId);
   } 
   // delete button was clicked
   else if (targetEl.matches(".delete-btn")) {
     var taskId = targetEl.getAttribute("data-task-id");
     deleteTask(taskId);
   }
}

formEl.addEventListener("submit", taskFormHandler);
pageContentEl.addEventListener("click", taskButtonHandler)

