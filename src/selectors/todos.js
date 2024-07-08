// https://react-redux.js.org/tutorials/connect

export const selectTodosState = (store) => store.todos;

export const selectTodos = (store) => selectTodosState(store).todos;
