document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
  const input = document.getElementById("taskInput");
  const task = input.value.trim();

  if (task === "") return;

  createTaskElement(task);
  saveTaskToLocalStorage(task);

  input.value = "";
}

function createTaskElement(taskText, completed = false) {
  const taskList = document.getElementById("taskList");

  const li = document.createElement("li");
  li.textContent = taskText;

  if (completed) li.classList.add("completed");

  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    updateTasksInLocalStorage();
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.onclick = (e) => {
    e.stopPropagation();
    li.remove();
    updateTasksInLocalStorage();
  };

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

function saveTaskToLocalStorage(taskText) {
  const tasks = getTasksFromLocalStorage();
  tasks.push({ text: taskText, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasksFromLocalStorage() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function updateTasksInLocalStorage() {
  const taskListItems = document.querySelectorAll("#taskList li");
  const tasks = Array.from(taskListItems).map(li => ({
    text: li.childNodes[0].textContent,
    completed: li.classList.contains("completed")
  }));
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = getTasksFromLocalStorage();
  tasks.forEach(task => createTaskElement(task.text, task.completed));
}
