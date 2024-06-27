// https://github.com/redux-saga/redux-saga/issues/160
import { all } from "redux-saga/effects";
import { todos } from "./todos";

export default function* rootSaga() {
  yield all([...todos]);
}
