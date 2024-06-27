import request from "./request";

export function requestTodos(pagenum, pagesize) {
  return request
    .get("get/todos", {
      pagenum: 1,
      pagesize: 10,
    })
    .then((data) => data.list);
}
