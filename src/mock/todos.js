import Mock from "mockjs";

const data = Mock.mock({
  "todos|20-60": [
    {
      id: "@increment(1)",
      title: "@ctitle",
      content: "@cparagraph",
      add_time: "@date(yyyy-MM-dd hh:mm:ss)",
      "state|1": ["open", "closed", "processing"],
    },
  ],
});

// 删除
Mock.mock("/api/delete/news", "post", (options) => {
  let body = JSON.parse(options.body);
  const index = data.data.todos.findIndex((item) => item.id === body.id);
  data.data.todos.splice(index, 1);
  return {
    status: 200,
    message: "删除成功",
    todos: data.data.todos,
  };
});

// 添加
Mock.mock("/api/add/news", "post", (options) => {
  let body = JSON.parse(options.body);

  data.data.todos.push(
    Mock.mock({
      id: "@increment(1)",
      title: body.title,
      content: body.content,
      add_time: "@date(yyyy-MM-dd hh:mm:ss)",
    }),
  );

  return {
    status: 200,
    message: "添加成功",
    data: data.data,
  };
});

// 含有分页的数据列表,有需要接受的参数要使用正则匹配
// /api/get/news?pagenum=1&pagesize=10
Mock.mock(/\/api\/get\/todos/, "get", (options) => {
  // 获取传递的参数pageindex
  const current = getQuery(options.url, "current");
  // 获取传递的参数pagesize
  const pageSize = getQuery(options.url, "pageSize");
  // 截取数据的起始位置
  const start = (current - 1) * pageSize;
  // 截取数据的终点位置
  const end = current * pageSize;
  // 计算总页数
  const totalPage = Math.ceil(data.todos.length / pageSize);
  // 数据的起始位置：(pageindex-1)*pageSize  数据的结束位置：pageindex*pageSize
  const todos = current > totalPage ? [] : data.todos.slice(start, end);
  return {
    status: 200,
    message: "获取新闻列表成功",
    data: {
      todos: todos,
      total: data.todos.length,
    },
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
