# User Management App

React Developer Recruitment Task - User List Management Application

---

## Description

This is a **Single Page Application (SPA)** built with React for managing a list of users.  
The app demonstrates modern React practices including **Redux for state management**, **react-router** for multiple pages, API integration, and CRUD operations.  

---

## Features

- **Login Page**
  - Login using API integration
  - Default credentials:  
    ```json
    {
      "email": "charlie.lee@mail.com",
      "password": "cityslicka"
    }
    ```

- **Users List**
  - Display a paginated list of users
  - View users in **List view** or **Card view**
  - Real-time search by first or last name

- **User CRUD**
  - Create, Edit, and Delete users via modal forms
  - Confirmation prompts for deletions
  - Form validation for user data

- **Client-side Search & Pagination**
  - Search updates results dynamically
  - Pagination divides user list into pages for better UX

- **State Management**
  - Redux with **redux-thunk** for async API calls
  - Clean separation of actions, reducers, and components

- **Routing**
  - Multi-page navigation with **react-router**
  - Routes: `/login`, `/users`, `/users/:id/edit` (optional)

- **UI & UX**
  - Responsive design for desktop and mobile
  - Loaders during API calls
  - Switch between List and Card view

---

## Tech Stack

- **Frontend:** React, React Router, Redux, Redux-thunk, Axios  
- **API:** [MockAPI.io](https://mockapi.io/) (mock API)  
- **Styling:** CSS / optionally UI kit (e.g., Material-UI or Styled Components)  
- **Other:** ES6+, modern JavaScript features


