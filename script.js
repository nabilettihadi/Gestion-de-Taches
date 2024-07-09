document.addEventListener("DOMContentLoaded", () => {
    const taskTitleInput = document.getElementById("task-title");
    const taskDescInput = document.getElementById("task-desc");
    const addTaskBtn = document.getElementById("add-task-btn");
    const taskList = document.getElementById("task-list");
    const allTasksBtn = document.getElementById("all-tasks");
    const completedTasksBtn = document.getElementById("completed-tasks");
    const incompleteTasksBtn = document.getElementById("incomplete-tasks");
    const modal = document.getElementById("modal");
    const closeModalBtn = document.querySelector(".close-btn");
    const saveEditBtn = document.getElementById("save-edit-btn");
    const editTaskTitleInput = document.getElementById("edit-task-title");
    const editTaskDescInput = document.getElementById("edit-task-desc");
    
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let currentEditIndex = null;

    const renderTasks = (filter = "all") => {
        taskList.innerHTML = "";
        let filteredTasks = tasks;

        if (filter === "completed") {
            filteredTasks = tasks.filter(task => task.completed);
        } else if (filter === "incomplete") {
            filteredTasks = tasks.filter(task => !task.completed);
        }

        filteredTasks.forEach((task, index) => {
            const taskItem = document.createElement("li");
            taskItem.className = "task";
            
            const taskInfo = document.createElement("div");
            taskInfo.className = "task-info";
            
            const taskTitle = document.createElement("h3");
            taskTitle.innerText = task.title;
            
            const taskDesc = document.createElement("p");
            taskDesc.innerText = task.description;
            
            const editBtn = document.createElement("button");
            editBtn.className = "edit-btn";
            editBtn.innerText = "Modifier";
            editBtn.addEventListener("click", () => {
                currentEditIndex = index;
                openModal(task);
            });
            
            const deleteBtn = document.createElement("button");
            deleteBtn.className = "delete-btn";
            deleteBtn.innerText = "Supprimer";
            deleteBtn.addEventListener("click", () => deleteTask(index));
            
            const completeBtn = document.createElement("button");
            completeBtn.className = "complete-btn";
            completeBtn.innerText = task.completed ? "Non Complétée" : "Complétée";
            completeBtn.addEventListener("click", () => toggleComplete(index));
            
            taskInfo.appendChild(taskTitle);
            taskInfo.appendChild(taskDesc);
            taskItem.appendChild(taskInfo);
            taskItem.appendChild(editBtn);
            taskItem.appendChild(deleteBtn);
            taskItem.appendChild(completeBtn);
            taskList.appendChild(taskItem);
        });
    };

    const saveTasks = () => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    const addTask = () => {
        const title = taskTitleInput.value.trim();
        const description = taskDescInput.value.trim();
        
        if (title && description) {
            tasks.push({ title, description, completed: false });
            saveTasks();
            renderTasks();
            taskTitleInput.value = "";
            taskDescInput.value = "";
        }
    };

    const editTask = () => {
        const newTitle = editTaskTitleInput.value.trim();
        const newDescription = editTaskDescInput.value.trim();

        if (newTitle && newDescription)
            {
                tasks[currentEditIndex].title = newTitle;
                tasks[currentEditIndex].description = newDescription;
                saveTasks();
                renderTasks();
                closeModal();
                }
                };

                const deleteTask = (index) => {
                    tasks.splice(index, 1);
                    saveTasks();
                    renderTasks();
                };
                
                const toggleComplete = (index) => {
                    tasks[index].completed = !tasks[index].completed;
                    saveTasks();
                    renderTasks();
                };
                
                const openModal = (task) => {
                    modal.style.display = "flex";
                    editTaskTitleInput.value = task.title;
                    editTaskDescInput.value = task.description;
                };
                
                const closeModal = () => {
                    modal.style.display = "none";
                };
                
                addTaskBtn.addEventListener("click", addTask);
                allTasksBtn.addEventListener("click", () => {
                    renderTasks("all");
                    updateFilterButtons(allTasksBtn);
                });
                completedTasksBtn.addEventListener("click", () => {
                    renderTasks("completed");
                    updateFilterButtons(completedTasksBtn);
                });
                incompleteTasksBtn.addEventListener("click", () => {
                    renderTasks("incomplete");
                    updateFilterButtons(incompleteTasksBtn);
                });
                closeModalBtn.addEventListener("click", closeModal);
                saveEditBtn.addEventListener("click", editTask);
                
                const updateFilterButtons = (activeButton) => {
                    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
                    activeButton.classList.add('active');
                };
                
                renderTasks();
            });                