import Mock from "mockjs";
import utils from "utils";

const data = Mock.mock({
  "users|20-60": [
    {
      id: "@increment(1)",
      name: "@cname",
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
Mock.mock(/\/api\/users/, "get", (options) => {
  const id = options.url.split("/")[5];
  if (!!id) {
    return {
      data: data.users.find((user) => user.id === Number(id)),
      message: "查询成功",
      status: 200,
      success: true,
    };
  } else {
    // 获取传递的参数pageindex
    const current = utils.getQuery(options.url, "current");
    // 获取传递的参数pagesize
    const pageSize = utils.getQuery(options.url, "pageSize");
    const name = utils.getQuery(options.url, "name");
    // 截取数据的起始位置
    const start = (current - 1) * pageSize;
    // 截取数据的终点位置
    const end = current * pageSize;
    // 计算总页数
    const totalPage = Math.ceil(data.users.length / pageSize);
    // 数据的起始位置：(pageindex-1)*pageSize  数据的结束位置：pageindex*pageSize
    let users = data.users;
    let total = data.users.length;
    if (!!name) {
      users = data.users.filter((user) =>
        user.name.includes(decodeURIComponent(name)),
      );
      total = users.length;
    }
    users = current > totalPage ? [] : users.slice(start, end);
    return {
      status: 200,
      message: "获取新闻列表成功",
      data: {
        list: users,
        total,
      },
    };
  }
});

Mock.mock(/\/api\/users/, "put", (options) => {
  const body = JSON.parse(options.body).data;
  data.users.unshift(
    Mock.mock({
      id: "@increment(1)",
      name: body.name,
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

Mock.mock(/\/api\/users/, "post", (options) => {
  const id = options.url.split("/")[5];
  const body = JSON.parse(options.body).data;
  const user = data.users.find((user) => user.id === Number(id));
  Object.assign(user, body);
  return {
    data: user,
    message: "修改成功",
    status: 200,
    success: true,
  };
});

Mock.mock(/\/api\/users/, "delete", (options) => {
  const id = options.url.split("/")[5];
  data.users = data.users.filter((user) => user.id !== Number(id));
  return {
    data: null,
    message: "删除成功",
    status: 200,
    success: true,
  };
});
