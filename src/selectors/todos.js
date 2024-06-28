// https://react-redux.js.org/tutorials/connect

export const getTodosState = (store) => store.todos;

export const getTodos = (store) => getTodosState(store).todos;
