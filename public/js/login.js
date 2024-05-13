const checkUserNameAvailability = async (username, name, password) => {
    const userResponse = await fetch(`/api/username_available/${username}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const userAvailable = await userResponse.json();
    console.log(userAvailable);
    if (!userAvailable.available) {
        alert("Username is already taken.");
        return;
    }

    postNewUser(name, username, password);
};

const postNewUser = async (name, username, password) => {
    const newUserResponse = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({
            name: name,
            username: username,
            password: password,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (newUserResponse.ok) {
        console.log("User created successfully!");
        console.log(newUserResponse.status);
        document.location.replace("/todos");
    }
};

const registerFormSubmit = async (event) => {
    console.log("Register form submit event listener added.");
    const registerModal = document.getElementById("registerModal");
    console.log(registerModal);
    document
        .getElementById("registerForm")
        .addEventListener("submit", (event) => {
            console.log("Register form submitted.");
            event.preventDefault();
            let name = document.getElementById("name").value;
            let username = document.getElementById("username").value;
            let password = document.getElementById("password").value;
            let confirmPassword =
                document.getElementById("confirmPassword").value;
            if (password !== confirmPassword) {
                alert("Passwords do not match.");
                return;
            }
            checkUserNameAvailability(username, name, password);
        });
};

registerFormSubmit();
