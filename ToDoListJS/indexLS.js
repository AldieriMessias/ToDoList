"use strict";

// let dB = [
//   { "task": "Estudar", "status": "" },
//   { "task": "Assistir videos sobre JS", "status": "checked" },
// ];

const getDB = () => JSON.parse(localStorage.getItem("toDoList")) ?? [];
const setDB = (dB) => localStorage.setItem("toDoList", JSON.stringify(dB));

const craftItem = (task, status, index) => {
  const item = document.createElement("label");
  item.classList.add("todo__item");
  item.innerHTML = `
  <input type="checkbox" ${status} data-index=${index}>
          <div>${task}</div>
          <input type="button" value="X" data-index=${index} >
  `;
  document.getElementById("todoList").appendChild(item);
};

const clearTasks = () => {
  const todoList = document.getElementById("todoList");
  while (todoList.firstChild) {
    todoList.removeChild(todoList.lastChild);
  }
};

const updateTasks = () => {
  clearTasks();
  const dB = getDB();
  dB.forEach((item, index) => craftItem(item.task, item.status, index));
};

const addTasks = (e) => {
  const keyword = e.key;
  const textTask = e.target.value;
  function clearNewTask() {
    return (e.target.value = "");
  }
  //console.log(keyword);
  if (keyword == "Enter") {
    const dB = getDB();
    dB.push({ "task": textTask, "status": "" });
    setDB(dB);
    updateTasks();
    clearNewTask();
  }
};

const removeItem = (index) => {
  const dB = getDB();
  dB.splice(index, 1);
  setDB(dB);
  updateTasks();
};

const updateItem = (index) => {
  const dB = getDB();

  if (dB[index].status == "checked") {
    dB[index].status = "";
    setDB(dB);
  } else {
    dB[index].status = "checked";
    setDB(dB);
  }
};

const clickItem = (e) => {
  const element = e.target;
  if (element.type == "button") {
    const index = element.dataset.index;
    removeItem(index);
  } else if (element.type == "checkbox") {
    const index = element.dataset.index;
    updateItem(index);
  }

  //console.log(element);
};

document.getElementById("newItem").addEventListener("keypress", addTasks);
document.getElementById("todoList").addEventListener("click", clickItem);

updateTasks();
