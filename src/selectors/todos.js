// https://react-redux.js.org/tutorials/connect

export const getTodosState = (store) => store.todos;

export const getTodos = (store) => getTodosState(store).todos;

// export const getTodoById = (store, id) =>
//   getTodosState(store) ? { ...getTodosState(store).byIds[id], id } : {};

// /**
//  * example of a slightly more complex selector
//  * select from store combining information from multiple reducers
//  */
// export const getTodos = (store) =>
//   getTodoList(store).map((id) => getTodoById(store, id));

// export const getTodosByVisibilityFilter = (store, visibilityFilter) => {
//   const allTodos = getTodos(store);
//   switch (visibilityFilter) {
//     case VISIBILITY_FILTERS.COMPLETED:
//       return allTodos.filter((todo) => todo.completed);
//     case VISIBILITY_FILTERS.INCOMPLETE:
//       return allTodos.filter((todo) => !todo.completed);
//     case VISIBILITY_FILTERS.ALL:
//     default:
//       return allTodos;
//   }
// };
