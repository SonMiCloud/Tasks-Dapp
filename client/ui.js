const taskForm = document.getElementById("taskForm");

taskForm.addEventListener("submit", e => {
    e.preventDefault();
    
    title = taskForm["title"].value;
    description = taskForm["description"].value;
    App.createTask(title, description);
});

