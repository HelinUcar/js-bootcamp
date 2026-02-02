document.addEventListener("DOMContentLoaded", function () {
    const taskForm = document.getElementById("taskForm");
    const todoList = document.getElementById("todoList");

    let todoId = 0;

    taskForm.addEventListener("submit", function (event) {
        event.preventDefault();
        addToDo();
    });

    taskForm.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            addToDo();
        }
    });

    function buildTodoItem(task, checkboxId) {
        const li = document.createElement("li");
        li.classList.add("todo-item");

        // input (checkbox)
        const input = document.createElement("input");
        input.classList.add("inp-cbx");
        input.id = checkboxId;
        input.name = "todocheckbox";
        input.type = "checkbox";
        input.style.display = "none";

        // label
        const label = document.createElement("label");
        label.classList.add("cbx");
        label.setAttribute("for", checkboxId);

        // label > span (icon wrapper)
        const spanIcon = document.createElement("span");

        // svg + polyline (aynı görünüm)
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", "12px");
        svg.setAttribute("height", "9px");
        svg.setAttribute("viewBox", "0 0 12 9");

        const polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
        polyline.setAttribute("points", "1 5 4 8 11 1");

        svg.appendChild(polyline);
        spanIcon.appendChild(svg);

        // label > span (text)
        const spanText = document.createElement("span");
        spanText.textContent = task;

        // label içine ekle
        label.appendChild(spanIcon);
        label.appendChild(spanText);

        // delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.classList.add("delete-btn", "delete-btn--tab");
        deleteBtn.textContent = "Delete";

        // li içine ekle
        li.appendChild(input);
        li.appendChild(label);
        li.appendChild(deleteBtn);

        return li;

    }


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

            todoId += 1;
            const checkboxId = `cbx-${todoId}`;

            const taskItem = buildTodoItem(task, checkboxId);
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

    todoList.addEventListener("change", function (event) {
        // Sadece checkbox değişimlerini yakala
        if (!event.target.classList.contains("inp-cbx")) return;

        const li = event.target.closest("li");
        if (!li) return;

        // checked ise completed ekle, değilse çıkar
        li.classList.toggle("completed", event.target.checked);
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