# Project Overview

This project is a simple yet powerful Todo application. It allows users to create, view, and manage their tasks. Each task, or "Todo", has a category, description, deadline, priority, and completion status. The application supports multiple users, each with their own set of Todos.

The application is built with Node.js and Express for the backend, and uses Handlebars for server-side rendering of the HTML. The data is stored in JSON files, making it easy to manage and update.

## Functionality

### Todo Page

The home page of the Todo application displays a list of all the Todos for the logged-in user. It shows the category, description, deadline, priority, and completion status of each Todo. Users can mark a Todo as complete, edit a Todo, or delete a Todo from this page.

### Create Todo Page

The create Todo page allows users to add a new Todo to their list. It provides input fields for the category, description, deadline, and priority of the Todo. Users can submit the form to create the Todo.

### User Registration Modal

The user registration Modal allows new users to create an account for the Todo application. It provides input fields for the username and password. Users can submit the form to create their account.

### User Login Modal

The user login page allows registered users to log in to the Todo application. It provides input fields for the username and password. Users can submit the form to authenticate and add to their Todos.

## Tooling

### Backend

- ![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white) - The runtime environment for executing JavaScript on the server side.
- ![fs module](https://img.shields.io/badge/fs%20module-339933?logo=node.js&logoColor=white) - A built-in Node.js package for working with the file system. It's used in this project to read and write data to mock database JSON files.
- ![Express.js](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white) - A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. 
- ![Express.js](https://img.shields.io/badge/Express%20Session.js-000000?logo=express&logoColor=white) - Added on express-session for user auth.

### Frontend

- ![Handlebars](https://img.shields.io/badge/Handlebars.js-f0772b?logo=handlebarsdotjs&logoColor=white) - A simple templating language that lets you generate HTML dynamically. It's used in this project to render the nav bar across pages and the modals for login/register.

- ![Bootstrap](https://img.shields.io/badge/Bootstrap-7952b3?logo=bootstrap&logoColor=white) - A popular CSS framework that provides pre-designed components and styles for building responsive web pages. It's used in this project to enhance the visual appearance and layout of the application.
- ![Fetch API](https://img.shields.io/badge/Fetch%20API-005571?logo=mozilla%20firefox&logoColor=white) - A modern interface for making HTTP requests. It's used in this project to communicate with the server and exchange JSON data.

### Testing

- ![Postman](https://img.shields.io/badge/Postman-ff6c37?logo=postman&logoColor=white) - A popular API client that makes it easy to test, develop, and document APIs by allowing users to send requests and see responses.

### Development

- ![Nodemon](https://img.shields.io/badge/Nodemon-76d04b?logo=nodemon&logoColor=white) - A utility that monitors changes in your Node.js application and automatically restarts the server. It's used in this project to improve the development workflow by automatically refreshing the server when changes are made to the code.

### Version Control

- ![Git](https://img.shields.io/badge/Git-f05032?logo=git&logoColor=white) - A free and open-source distributed version control system designed to handle everything from small to very large projects with speed and efficiency.
- ![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=white) - A web-based hosting service for version control using Git. It's used in this project for source code management.

## Usage

To get started with the project, clone the repository, install the dependencies with `npm install`, and start the server with `npm start`.