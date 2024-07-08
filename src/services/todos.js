import request from "./request";
import { PAGE_SIZE } from "constants";

export function getTodos(payload) {
  return request.get("todos", payload).then((data) => data);
}

export function getTodo(payload) {
  return request.get(`todos/${payload.id}`).then((data) => data);
}

export function addTodo(payload) {
  return request.put(`todos`, payload).then((data) => data);
}

export function updateTodo(payload) {
  return request.post(`todos/${payload.id}`, payload).then((data) => data);
}

export function deleteTodo(payload) {
  return request.delete(`todos/${payload.id}`).then((data) => data);
}
