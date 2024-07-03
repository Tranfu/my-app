import request from "./request";
import { PAGE_SIZE } from "constants";

export function requestTodos(payload) {
  return request.get("get/todos", payload).then((data) => data);
}

export function getTodo(payload) {
  return request.get(`todos/${payload.id}`, null).then((data) => data);
}
