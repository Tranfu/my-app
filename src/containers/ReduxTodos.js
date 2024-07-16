// https://github.com/reduxjs/redux/blob/master/examples/todos/src/containers/AddTodo.js
import React from "react";
import { connect } from "react-redux";
import { addTodo, getTodos } from "actions/todos";
import ReduxTodos from "pages/ReduxTodos";
import { selectTodos } from "selectors/todos";

const mapStateToProps = (state, ownProps) => ({
  todos: selectTodos(state),
  total: state.todos.total,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  addTodo: (todo) => dispatch(addTodo(todo)),
  getTodos: (payload) => dispatch(getTodos(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReduxTodos);
