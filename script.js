    
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Demo credentials
        if (username === "student" && password === "1234") {
            localStorage.setItem("loggedIn", "true");
            window.location.href = "dashboard.html";
        } else {
            const msg = document.getElementById("loginMessage");
            if (msg) msg.textContent = "Invalid username or password";
        }
    });
}

const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
        localStorage.removeItem("loggedIn");
        window.location.href = "index.html";
    });
}
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    const text = document.getElementById("taskInput").value.trim();
    const date = document.getElementById("dueDate").value;

    if (!text) return;

    const task = {
        id: Date.now(),
        text: text,
        dueDate: date,
        status: "todo"
    };

    tasks.push(task);
    saveTasks();
    renderTasks();

    document.getElementById("taskInput").value = "";
    document.getElementById("dueDate").value = "";
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

function editTask(id) {
    const newText = prompt("Edit task:");
    if (!newText) return;

    const task = tasks.find(t => t.id === id);
    task.text = newText;

    saveTasks();
    renderTasks();
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text/plain", ev.target.dataset.id);
}

function drop(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    
    const id = Number(ev.dataTransfer.getData("text/plain") || ev.dataTransfer.getData("text"));
    if (!id) return;
    
    // Find the closest .column, even if dropping on h2 or nested element
    let columnEl = ev.target.closest(".column");
    if (!columnEl) return;
    
    const column = columnEl.id;
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    
    task.status = column;
    saveTasks();
    renderTasks();
}

function renderTasks() {
    document.getElementById("todo").innerHTML = "<h2>📋 Todo</h2>";
    document.getElementById("progress").innerHTML = "<h2> In Progress</h2>";
    document.getElementById("done").innerHTML = "<h2> Finished</h2>";

    tasks.forEach(task => {
        const div = document.createElement("div");
        div.className = "task";
        div.draggable = true;
        div.dataset.id = task.id;
        div.ondragstart = drag;

        div.innerHTML = `
            <strong>${task.text}</strong>
            ${task.dueDate ? `<small>Due: ${task.dueDate}</small>` : ""}
            <div class="buttons">
                <button onclick="editTask(${task.id})">✏ Edit</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;

        document.getElementById(task.status).appendChild(div);
    });
}

renderTasks();
