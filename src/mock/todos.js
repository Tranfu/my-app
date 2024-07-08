import Mock from "mockjs";

const data = Mock.mock({
  "todos|20-60": [
    {
      id: "@increment(1)",
      title: "@ctitle",
      remark: "@cparagraph",
      addTime: "@date(yyyy-MM-dd hh:mm:ss)",
      "state|1": ["open", "closed", "processing"],
      labels: [
        {
          name: "important",
          color: "red",
        },
      ],
    },
  ],
});

// 含有分页的数据列表,有需要接受的参数要使用正则匹配
// /api/get/news?pagenum=1&pagesize=10
Mock.mock(/\/api\/get\/todos/, "get", (options) => {
  // 获取传递的参数pageindex
  const current = getQuery(options.url, "current");
  // 获取传递的参数pagesize
  const pageSize = getQuery(options.url, "pageSize");
  const title = getQuery(options.url, "title");
  // 截取数据的起始位置
  const start = (current - 1) * pageSize;
  // 截取数据的终点位置
  const end = current * pageSize;
  // 计算总页数
  const totalPage = Math.ceil(data.todos.length / pageSize);
  // 数据的起始位置：(pageindex-1)*pageSize  数据的结束位置：pageindex*pageSize
  let todos = data.todos;
  if (!!title) {
    todos = data.todos.filter((todo) =>
      todo.title.includes(decodeURIComponent(title)),
    );
  }
  todos = current > totalPage ? [] : todos.slice(start, end);
  return {
    status: 200,
    message: "获取新闻列表成功",
    data: {
      todos: todos,
      total: data.todos.length,
    },
  };
});

Mock.mock(/\/api\/todos/, "get", (options) => {
  const id = options.url.split("/")[5];
  return {
    data: data.todos.find((todo) => todo.id === Number(id)),
    message: "查询成功",
    status: 200,
    success: true,
  };
});

Mock.mock(/\/api\/todos/, "put", (options) => {
  const id = options.url.split("/")[5];
  const body = JSON.parse(options.body).data;
  data.todos.unshift(
    Mock.mock({
      id: "@increment(1)",
      title: body.title,
      state: body.state,
      labels: body.labels || [],
      remark: body.remark,
      addTime: "@now(yyyy-MM-dd HH:mm:ss)",
    }),
  );
  return {
    data: null,
    message: "创建成功",
    status: 200,
    success: true,
  };
});

Mock.mock(/\/api\/todos/, "post", (options) => {
  const id = options.url.split("/")[5];
  const body = JSON.parse(options.body).data;
  const todo = data.todos.find((todo) => todo.id === Number(id));
  Object.assign(todo, body);
  return {
    data: todo,
    message: "修改成功",
    status: 200,
    success: true,
  };
});

Mock.mock(/\/api\/todos/, "delete", (options) => {
  const id = options.url.split("/")[5];
  data.todos = data.todos.filter((todo) => todo.id !== Number(id));
  return {
    data: null,
    message: "删除成功",
    status: 200,
    success: true,
  };
});

const getQuery = (url, name) => {
  const index = url.indexOf("?");
  if (index !== -1) {
    const queryStrArr = url.substr(index + 1).split("&");
    for (var i = 0; i < queryStrArr.length; i++) {
      const itemArr = queryStrArr[i].split("=");
      if (itemArr[0] === name) {
        return itemArr[1];
      }
    }
  }
  return null;
};
