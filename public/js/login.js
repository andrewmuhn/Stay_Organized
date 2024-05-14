const checkUserNameAvailability = async (username, name, password) => {
    const userResponse = await fetch(
        `/api/users/username_available/${username}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
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
    console.log(newUserResponse);

    if (newUserResponse.ok) {
        console.log("User created successfully!");
        console.log(newUserResponse.status);
        // document.location.replace("/todos");
    }
};

const loginUser = async (username, password) => {
    const userResponse = await fetch(`/api/users/login`, {
        method: "POST",
        body: JSON.stringify({
            username: username,
            password: password,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const user = await userResponse.json();
    console.log(user);
    if (userResponse.status === 403) {
        alert("Username or password is incorrect.");
        return;
    }
    console.log("Login successful.");
    // document.location.replace("/todos");
};

const registerFormSubmit = async () => {
    document
        .getElementById("registerForm")
        .addEventListener("submit", (event) => {
            console.log("Register form submitted.");
            event.preventDefault();
            let name = document.getElementById("name").value.trim();
            let username = document
                .getElementById("registerUsername")
                .value.trim();
            let password = document
                .getElementById("registerPassword")
                .value.trim();
            let confirmPassword = document
                .getElementById("confirmPassword")
                .value.trim();
            if (password !== confirmPassword) {
                alert("Passwords do not match.");
                return;
            }
            checkUserNameAvailability(username, name, password);
        });
};

const loginFormSubmit = async () => {
    document.getElementById("loginForm").addEventListener("submit", (event) => {
        console.log("Login form submitted.");
        event.preventDefault();
        let username = document.getElementById("loginUsername").value.trim();
        let password = document.getElementById("loginPassword").value.trim();
        console.log(username, password);
        loginUser(username, password);
    });
};

registerFormSubmit();
loginFormSubmit();
