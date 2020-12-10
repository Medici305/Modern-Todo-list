// Global Variables
const todoInput = document.querySelector(".todo-input");
const todoContainer = document.querySelector(".todo-container");
const todoSubmit = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const todoIcon = document.querySelector(".todo-icon");

// Functions
function changeTheme(e) {
  const header = document.querySelector(".header");
  const footer = document.querySelector(".footer");
  const plusIcon = document.querySelector(".fa-plus-square");
  const dark = "url(../images/bg-desktop-dark.jpg)";
  const light = "url(../images/bg-desktop-light.jpg)";
  const moon = "/images/icon-moon.svg";
  const sun = "/images/icon-sun.svg";

  // Change icon
  if (!todoIcon.classList.contains("active")) {
    todoIcon.src = moon;
    todoIcon.classList.add("active");
  } else {
    todoIcon.src = sun;
    todoIcon.classList.remove("active");
  }

  // Change header theme
  if (header.classList.contains("dark-Theme")) {
    header.classList.remove("dark-Theme");
    header.classList.add("light-Theme");
  } else {
    header.classList.remove("light-Theme");
    header.classList.add("dark-Theme");
  }

  // Change footer bg color
  if (footer.classList.contains("bg-color")) {
    footer.classList.remove("bg-color");
  } else {
    footer.classList.add("bg-color");
  }

  // change container bg-color
  if (todoContainer.classList.contains("container-bg-color")) {
    todoContainer.classList.remove("container-bg-color");
    todoContainer.classList.add("light-container");
  } else {
    todoContainer.classList.add("container-bg-color");
    todoContainer.classList.remove("light-container");
  }

  // change input bg color
  if (todoInput.classList.contains("input-bg-color")) {
    todoInput.classList.remove("input-bg-color");
    todoInput.classList.add("light-input");
  } else {
    todoInput.classList.remove("light-input");
    todoInput.classList.add("input-bg-color");
  }

  // change button bg color
  if (todoSubmit.classList.contains("button-bg-color")) {
    todoSubmit.classList.remove("button-bg-color");
    todoSubmit.classList.add("light-button");
    plusIcon.classList.remove(".plus-bg-color");
    plusIcon.classList.add("fa-plus-dark");
  } else {
    todoSubmit.classList.remove("light-button");
    todoSubmit.classList.add("button-bg-color");
    plusIcon.classList.remove("fa-plus-dark");
    plusIcon.classList.add(".plus-bg-colro");
  }
}

function addList(e) {
  e.preventDefault();

  // Make item div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo-div");

  // Make List item
  const listItem = document.createElement("li");
  listItem.innerText = todoInput.value;
  listItem.classList.add("todo-li");

  saveToLocal(todoInput.value);
  // Add check button
  const completeButton = document.createElement("button");
  completeButton.classList.add("complete-btn");
  completeButton.innerHTML = '<i class="far fa-circle"></i>';
  // Add trash button
  const trashButton = document.createElement("button");
  trashButton.classList.add("trash-btn");
  trashButton.innerHTML = '<i class="fa fa-times"></i>';
  // Append all to div
  todoDiv.appendChild(completeButton);
  todoDiv.appendChild(listItem);
  todoDiv.appendChild(trashButton);
  //todoList.insertBefore(todoDiv, todoList.childNodes[0]);
  todoList.appendChild(todoDiv);
  // Clear input
  todoInput.value = "";
}

function removeList(e) {
  const item = e.target;
  if (item.classList.contains("trash-btn")) {
    item.parentElement.classList.add("fade");
    removeLocal(item.parentElement);
    item.parentElement.addEventListener("transitionend", () => {
      item.parentElement.remove();
    });
  }

  if (item.classList.contains("complete-btn")) {
    item.parentElement.classList.toggle("check");
  }
}

function saveToLocal(todo) {
  let todos;
  if (localStorage.getItem("list") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("list"));
  }
  todos.push(todo);
  localStorage.setItem("list", JSON.stringify(todos));
}

function getLocal() {
  let todos;
  if (localStorage.getItem("list") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("list"));
  }

  todos.forEach((todo) => {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo-div");
    const listItem = document.createElement("li");
    listItem.innerText = todo;
    listItem.classList.add("todo-li");
    const completeButton = document.createElement("button");
    completeButton.classList.add("complete-btn");
    completeButton.innerHTML = '<i class="far fa-circle"></i>';
    const trashButton = document.createElement("button");
    trashButton.classList.add("trash-btn");
    trashButton.innerHTML = '<i class="fa fa-times"></i>';
    todoDiv.appendChild(completeButton);
    todoDiv.appendChild(listItem);
    todoDiv.appendChild(trashButton);
    //todoList.insertBefore(todoDiv, todoList.childNodes[0]);
    todoList.appendChild(todoDiv);
  });
}

function removeLocal(todo) {
  let todos;
  if (localStorage.getItem("list") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("list"));
  }

  const itemIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(itemIndex), 1);
  localStorage.setItem("list", JSON.stringify(todos));
}

// EventListeners
todoSubmit.addEventListener("click", addList);
todoList.addEventListener("click", removeList);
document.addEventListener("DOMContentLoaded", getLocal);
todoIcon.addEventListener("click", changeTheme);
