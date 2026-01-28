document.addEventListener("DOMContentLoaded", function () {
    const taskForm = document.getElementById("taskForm");
    const todoList = document.getElementById("todoList");
    let todoId = 0;
    taskForm.addEventListener("submit", function (event) {
        event.preventDefault();
        addToDo();
    });



    function addToDo() {
        try {
            const taskInput = document.getElementById("task");

            if (!taskInput) {
                throw new Error("Necessary HTML requirements are missing!");
            }

            const task = taskInput.value.trim();
            if (!task) {
                alert("Please enter a task title!");
                taskInput.focus();
                return;
            }

            const taskItem = document.createElement("li");
            taskItem.classList.add("todo-item");

            todoId += 1;
            const checkboxId = `cbx-${todoId}`;
            taskItem.innerHTML = `<input class="inp-cbx" id="${checkboxId}" type="checkbox" style="display: none" />
                <label class="cbx" for="${checkboxId}"><span>
                        <svg width="12px" height="9px" viewbox="0 0 12 9">
                            <polyline points="1 5 4 8 11 1"></polyline>
                        </svg></span><span>${task}</span></label> 
                        <button type="button" class="delete-btn delete-btn--tab">
                        Delete
                    </button>`;

            todoList.appendChild(taskItem);
            taskForm.reset();
        } catch (error) {
            console.error("Error occurred:", error);
            alert("An error occurred while adding the todo! Please try again.");
        }
    }

    todoList.addEventListener("click", function (event) {
        const deleteBtn = event.target.closest(".delete-btn");
        if (!deleteBtn) return;

        const li = deleteBtn.closest("li");
        if (li) li.remove();
    });

    function renderToday() {
        const dayEl = document.getElementById("day");
        const monthEl = document.getElementById("month");
        const yearEl = document.getElementById("year");

        if (!dayEl || !monthEl || !yearEl) return;

        const today = new Date();

        const day = String(today.getDate()).padStart(2, "0");
        const month = String(today.getMonth() + 1).padStart(2, "0"); // 0-based
        const year = String(today.getFullYear());

        dayEl.textContent = day;
        monthEl.textContent = month;
        yearEl.textContent = year;
    }

    renderToday();
})