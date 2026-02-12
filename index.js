let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let tasklist = document.getElementById("tasklist");
let progressText = document.getElementById("progress")

function saveTasks () {
    localStorage.setItem("tasks",
        JSON.stringify(tasks)
    )
}

function updateProgress () {
    const completed = tasks.filter(task => task.completed).length;
    progressText.textContent = {completed}
}

function displayTasks() {
    tasklist.innerHTML = "";
    tasks.forEach(function(task,index) {
        let card = document.createElement("div");
        card.className = "task-card";

        card.innerHTML = `
        <h3>${task.title}</h3>
        <p>Due:${task.dueDate}</p>
        <p>Status:${task.completed ? "Completed" : "Pending"}</p>

        <button class="completeBtn">Mark Complete</button>
        <button class="deleteBtn">Delete</button>
        `;
        tasklist.appendChild(card);



let completeBtn =
card.queryselector(".completeBtn");
completeBtn.addEventListener("click",
    function() {
        task.completed = true;
        saveTasks();
        displayTasks();
        updateProgress();

    }
);

let deleteBtn =
card.queryselector(".deleteBtn");
deleteBtn.addEventListener("click", function()
{
    tasks.splice(index,1);
    saveTasks();
    displayTasks();
    updateProgress();

})
    });
}
displayTasks();
updateProgress();
