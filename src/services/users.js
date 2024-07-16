import request from "./request";
import { PAGE_SIZE } from "constants";

export function getUsers(payload) {
  return request.get("users", payload).then((data) => data);
}

export function getUser(payload) {
  return request.get(`users/${payload.id}`).then((data) => data);
}

export function addUser(payload) {
  return request.put(`users`, payload).then((data) => data);
}

export function updateUser(payload) {
  return request.post(`users/${payload.id}`, payload).then((data) => data);
}

export function deleteUser(payload) {
  return request.delete(`users/${payload.id}`).then((data) => data);
}
