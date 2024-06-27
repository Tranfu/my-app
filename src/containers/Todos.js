// https://github.com/reduxjs/redux/blob/master/examples/todos/src/containers/AddTodo.js
import React from "react";
import { connect } from "react-redux";
import { addTodo, requestTodos } from "actions/todos";
import Todos from "pages/Todos";

// const getVisibleTodos = (todos, filter) => {
//   switch (filter) {
//     case VisibilityFilters.SHOW_ALL:
//       return todos
//     case VisibilityFilters.SHOW_COMPLETED:
//       return todos.filter(t => t.completed)
//     case VisibilityFilters.SHOW_ACTIVE:
//       return todos.filter(t => !t.completed)
//     default:
//       throw new Error('Unknown filter: ' + filter)
//   }
// }

const mapStateToProps = (state, ownProps) => ({
  // todos: getVisibleTodos(state.todos, state.visibilityFilter)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  addTodo: (todo) => dispatch(addTodo(todo)),
  requestTodos: (id) => dispatch(requestTodos(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
