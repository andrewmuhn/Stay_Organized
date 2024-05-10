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

            const completedP = document.createElement("img");
            completedP.style = "width: 20px; height: 20px;";
            if (todo.completed) {
                completedP.src = "/images/checkmark.png";
            } else {
                completedP.src = "/images/x.png";
            }

            cardBody.appendChild(categoryP);
            cardBody.appendChild(deadlineP);
            cardBody.appendChild(priorityP);
            cardBody.appendChild(completedP);

            card.appendChild(cardHeader);
            card.appendChild(cardBody);

            document.getElementById("todosContainer").appendChild(card);
        });
    }
};

loadUsers();

document.getElementById("userSelect").addEventListener("change", (event) => {
    document.getElementById("todosContainer").innerHTML = "";
    loadTodos(event.target.value);
});
