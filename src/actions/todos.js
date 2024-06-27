import {
  ADD_TODO,
  TOGGLE_TODO,
  SET_FILTER,
  TODOS_FETCH_REQUESTED,
  TODOS_FETCH_SUCCEEDED,
  TODOS_FETCH_FAILED,
} from "actionTypes/todos";

let nextTodoId = 0;

export const addTodo = (todo) => ({
  type: ADD_TODO,
  payload: {
    todo,
  },
});

export const requestTodos = (todo) => ({
  type: TODOS_FETCH_REQUESTED,
  payload: {
    todo,
  },
});

export const receiveTodos = (todos) => ({
  type: TODOS_FETCH_SUCCEEDED,
  payload: {
    todos,
  },
});

export const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  payload: { id },
});

export const setFilter = (filter) => ({
  type: SET_FILTER,
  payload: { filter },
});
