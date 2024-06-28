// https://github.com/reduxjs/redux/blob/master/examples/todos/src/containers/AddTodo.js
import React from "react";
import { connect } from "react-redux";
import { addTodo, requestTodos } from "actions/todos";
import Todos from "pages/Todos";
import { getTodos } from "selectors/todos";

const mapStateToProps = (state, ownProps) => ({
  todos: getTodos(state),
  total: state.todos.total,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  addTodo: (todo) => dispatch(addTodo(todo)),
  requestTodos: (payload) => dispatch(requestTodos(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
