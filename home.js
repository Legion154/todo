document.addEventListener("DOMContentLoaded", () => {
  const userId = localStorage.getItem("verified");
  if (userId) {
    loadTasks(userId);
  }
});

const loadTasks = (userId) => {
  const tasks = JSON.parse(localStorage.getItem(`tasks-${userId}`)) || [];
  const tasksContainer = document.getElementById("tasks");

  tasks.forEach((task) => {
    const taskElement = createTaskElement(task);
    tasksContainer.appendChild(taskElement);
  });
};

const createTaskElement = (task) => {
  const taskElement = document.createElement("div");
  taskElement.classList.add(
    "flex",
    "flex-row",
    "items-center",
    "justify-between",
    "gap-4",
    "bg-white",
    "rounded-md",
    "px-5",
    "py-5"
  );
  taskElement.setAttribute("data-id", task.id);

  taskElement.innerHTML = `
    <h1 class="px-3 py-0.5 text-pretty" style="text-decoration: ${
      task.completed ? "line-through" : "none"
    }; color: ${task.completed ? "#9e9e9e" : "black"}">${task.name}</h1>
    <div class="flex gap-2">
      <button onclick="completedTask(${
        task.id
      })" class="py-1 px-2 text-white font-bold rounded-md bg-emerald-500 hover:bg-emerald-600 select-none duration-200">${
    task.completed ? "Completed" : "Done!"
  }</button>
      <button onclick="deleteTask(${
        task.id
      })" class="py-1 px-2 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 select-none duration-200">Delete</button>
    </div>
  `;
  return taskElement;
};

const taskForm = async (e) => {
  e.preventDefault();

  const taskword = document.getElementById("taskword").value;
  const tasks = document.getElementById("tasks");
  const userId = localStorage.getItem("verified");

  if (!taskword) {
    return alert("Input mustn't be free");
  }

  if (!userId) {
    return alert("Please log in first!");
  }

  const newTask = {
    id: Date.now(),
    name: taskword,
    completed: false,
  };

  const taskElement = createTaskElement(newTask);
  tasks.appendChild(taskElement);

  const existingTasks =
    JSON.parse(localStorage.getItem(`tasks-${userId}`)) || [];
  existingTasks.push(newTask);

  localStorage.setItem(`tasks-${userId}`, JSON.stringify(existingTasks));

  document.getElementById("taskword").value = "";
};

const completedTask = (taskId) => {
  const userId = localStorage.getItem("verified");
  const tasks = JSON.parse(localStorage.getItem(`tasks-${userId}`));
  const taskIndex = tasks.findIndex((task) => task.id === taskId);
  const task = tasks[taskIndex];

  task.completed = !task.completed;

  localStorage.setItem(`tasks-${userId}`, JSON.stringify(tasks));

  const taskElement = document.querySelector(`[data-id="${taskId}"]`);
  const taskText = taskElement.querySelector("h1");
  const doneButton = taskElement.querySelector("button");

  if (task.completed) {
    taskText.style.textDecoration = "line-through";
    taskText.style.color = "#9e9e9e";
    doneButton.textContent = "Completed";
  } else {
    taskText.style.textDecoration = "none";
    taskText.style.color = "black";
    doneButton.textContent = "Done!";
  }
};

const deleteTask = (taskId) => {
  const userId = localStorage.getItem("verified");
  const taskElement = document.querySelector(`[data-id="${taskId}"]`);
  const tasks = JSON.parse(localStorage.getItem(`tasks-${userId}`));

  taskElement.remove();

  const updatedTasks = tasks.filter((task) => task.id !== taskId);

  localStorage.setItem(`tasks-${userId}`, JSON.stringify(updatedTasks));
};

const logout = () => {
  window.location.href = "index.html";
  localStorage.setItem("logout", true);
};
