# Software Project I - Practice Assignment 1: Filter & Search Todos

## Completed Features
* **Backend (`todoController.js`)**: 
  * Updated `getTodos` to read the `done` query parameter from `req.query`.
  * Dynamically built a filter object (`filter.done = done === 'true'`) so that filtering is conditionally applied only when the query param is provided, preserving the default behavior when no filter is passed.
* **Frontend API (`api/todos.js`)**:
  * Updated `fetchTodos` to accept an optional filter argument and pass it securely as query parameters using Axios (`params: { done }`).
* **UI & State Management (`App.jsx`)**:
  * Added filter state (`'all'`, `'active'`, `'done'`) and hooked it up to a `useEffect` dependency array to re-fetch filtered todos whenever the user switches tabs.
  * Created three interactive tab buttons (All, Active, Done) for seamless server-side filtering.