// https://redux-saga.js.org/docs/introduction/GettingStarted
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { TODOS_FETCH_REQUESTED } from "actionTypes/todos";
import { getTodos } from "services/todos";
import { receiveTodos } from "actions/todos";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchTodos(action) {
  try {
    const data = yield call(getTodos, action.payload);
    yield put(receiveTodos(data.list, data.total));
  } catch (e) {
    // yield put({ type: 'TODOS_FETCH_FAILED', message: e.message })
  }
}

export const todos = [takeEvery(TODOS_FETCH_REQUESTED, fetchTodos)];
