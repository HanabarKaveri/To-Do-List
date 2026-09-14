const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

const API_URL = "http://localhost:8080/api/todos";


// GET - Load all tasks
async function showTask() {

    try {

        const response = await fetch(API_URL);

        const todos = await response.json();

        listContainer.innerHTML = "";

        todos.forEach(todo => {

            createTaskElement(todo);

        });

    } catch (error) {

        console.error("Error loading tasks:", error);
    }
}


// Create HTML for one task
function createTaskElement(todo) {

    let li = document.createElement("li");

    li.innerHTML = todo.task;

    li.dataset.id = todo.id;

    if (todo.completed) {
        li.classList.add("checked");
    }

    let span = document.createElement("span");

    span.innerHTML = "\u00d7";

    li.appendChild(span);

    listContainer.appendChild(li);
}


// POST - Add task
async function addTask() {

    if (inputBox.value.trim() === "") {

        alert("You must add something!");
        return;
    }

    const todo = {
        task: inputBox.value,
        completed: false
    };

    try {

        const response = await fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(todo)
        });

        const savedTodo = await response.json();

        createTaskElement(savedTodo);

        inputBox.value = "";

    } catch (error) {

        console.error("Error adding task:", error);
    }
}


// PUT - Complete / uncomplete task
listContainer.addEventListener("click", async function(e) {

    if (e.target.tagName === "LI") {

        const li = e.target;

        const id = li.dataset.id;

        const completed = !li.classList.contains("checked");

        try {

            await fetch(`${API_URL}/${id}`, {

                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    task: li.firstChild.textContent,
                    completed: completed
                })
            });

            li.classList.toggle("checked");

        } catch (error) {

            console.error("Error updating task:", error);
        }
    }


    // DELETE - Remove task
    else if (e.target.tagName === "SPAN") {

        const li = e.target.parentElement;

        const id = li.dataset.id;

        try {

            await fetch(`${API_URL}/${id}`, {

                method: "DELETE"

            });

            li.remove();

        } catch (error) {

            console.error("Error deleting task:", error);
        }
    }

});


// Load tasks when page opens
showTask();