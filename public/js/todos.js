const params = new URLSearchParams(window.location.search);

let user_id = params.get("userid");
// getSession = async () => {
//     const sessionResponse = await fetch("/api/users/session", {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//         },
//     });

//     if (sessionResponse.ok) {
//         const user = await sessionResponse.json();
//         user_id = user.id;
//     }
// };

const loadUsers = async () => {
    const usersResponse = await fetch("/api/users", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (usersResponse.ok) {
        const users = await usersResponse.json();
        users.forEach((user) => {
            const option = document.createElement("option");
            option.value = user.id;
            option.textContent = user.name;
            document.getElementById("userSelect").appendChild(option);
        });
    }
};

loadTodos = async (userid) => {
    const todosResponse = await fetch(`/api/todos/byuser/${userid}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (todosResponse.ok) {
        const todos = await todosResponse.json();
        todos.forEach((todo) => {
            const card = document.createElement("div");
            card.style = "width: 18rem; display: inline-block; margin: 10px;";
            const cardHeader = document.createElement("div");
            switch (todo.priority) {
                case "High":
                    card.className = "card bg-danger-subtle";
                    cardHeader.className = "card-header d-flex bg-danger";
                    break;
                case "Medium":
                    card.className = "card bg-warning-subtle";
                    cardHeader.className = "card-header d-flex bg-warning";
                    break;
                default:
                    card.className = "card bg-info-subtle";
                    cardHeader.className = "card-header d-flex bg-info";
                    break;
            }

            if (todo.completed) {
                card.className = "card bg-success-subtle";
                cardHeader.className = "card-header d-flex bg-success";
            }

            const descriptionSpan = document.createElement("span");
            descriptionSpan.textContent = todo.description;

            const flexSpan = document.createElement("span");
            flexSpan.className = "flex-grow-1";

            const deleteButton = document.createElement("button");
            deleteButton.type = "button";
            deleteButton.className = "btn btn-dark btn-sm";
            deleteButton.textContent = "X";
            deleteButton.value = "Delete";
            deleteButton.setAttribute("data-todo-id", todo.id);

            cardHeader.appendChild(descriptionSpan);
            cardHeader.appendChild(flexSpan);
            cardHeader.appendChild(deleteButton);

            const cardBody = document.createElement("div");
            cardBody.className = "card-body";

            const categoryP = document.createElement("p");
            categoryP.textContent = todo.category;

            const deadlineP = document.createElement("p");
            let deadlineDate = new Date(todo.deadline);
            let deadline = `${
                deadlineDate.getMonth() + 1
            }/${deadlineDate.getDate()}/${deadlineDate.getFullYear()}`;
            deadlineP.textContent = `Deadline: ${deadline}`;

            const priorityP = document.createElement("p");
            priorityP.textContent = `Priority: ${todo.priority}`;

            const completeSpan = document.createElement("span");
            completeSpan.className = "d-flex justify-content-between";

            const completedImg = document.createElement("img");
            completedImg.style = "width: 20px; height: 20px;";
            if (todo.completed) {
                completedImg.src = "/images/checkmark.png";
            } else {
                completedImg.src = "/images/x.png";
            }

            const completeButton = document.createElement("button");
            completeButton.type = "button";
            completeButton.className = "btn btn-success btn-sm";
            completeButton.textContent = "Mark Complete";
            if (todo.completed) {
                completeButton.textContent = "Mark Inprogress";
                completeButton.className = "btn btn-warning btn-sm";
            }
            completeButton.value = "Complete";
            completeButton.setAttribute("data-todo-id", todo.id);

            completeSpan.appendChild(completedImg);
            completeSpan.appendChild(completeButton);

            cardBody.appendChild(categoryP);
            cardBody.appendChild(deadlineP);
            cardBody.appendChild(priorityP);
            cardBody.appendChild(completeSpan);

            card.appendChild(cardHeader);
            card.appendChild(cardBody);

            document.getElementById("todosContainer").appendChild(card);
        });
    }
};

deleteTodo = async (todoId) => {
    const deleteResponse = await fetch(`/api/todos/${todoId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (deleteResponse.ok) {
        document.getElementById("todosContainer").innerHTML = "";
        loadTodos(document.getElementById("userSelect").value);
    }
};

markComplete = async (todoId) => {
    const todoResponse = await fetch(`/api/todos/${todoId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    todoResponseJson = await todoResponse.json();
    console.log(todoResponseJson.userid, user_id);
    if (todoResponseJson.userid !== user_id) {
        let markCompleteModal = new bootstrap.Modal("#markCompleteModal");
        markCompleteModal.show();
        return;
    }

    const completeResponse = await fetch(`/api/todos/${todoId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (completeResponse.ok) {
        document.getElementById("todosContainer").innerHTML = "";
        loadTodos(user_id);
    }
};

loadUsers();
// getSession();
loadTodos(user_id);

document.getElementById("userSelect").addEventListener("change", (event) => {
    document.getElementById("todosContainer").innerHTML = "";
    loadTodos(event.target.value);
});

document
    .getElementById("todosContainer")
    .addEventListener("click", async (event) => {
        if (event.target.value === "Delete") {
            const todoId = event.target.getAttribute("data-todo-id");
            deleteTodo(todoId);
        } else if (event.target.value === "Complete") {
            const todoId = event.target.getAttribute("data-todo-id");
            markComplete(todoId);
        }
    });
