import { EllipsisOutlined, PlusOutlined } from "@ant-design/icons";
import {
  ProTable,
  TableDropdown,
  useDeepCompareEffectDebounce,
} from "@ant-design/pro-components";
import { Button, Dropdown, Space, Tag } from "antd";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { DEFAULT_PAGE_SIZE } from "constants";

const columns = [
  {
    dataIndex: "index",
    valueType: "indexBorder",
    width: 48,
  },
  {
    title: "标题",
    dataIndex: "title",
    // search: false,
    ellipsis: true,
    tooltip: "标题过长会自动收缩",
    formItemProps: {
      rules: [
        {
          required: true,
          message: "此项为必填项",
        },
      ],
    },
  },
  {
    title: "状态",
    dataIndex: "state",
    valueType: "select",
    // search: false,
    disable: true,
    filters: true,
    onFilter: true,
    ellipsis: true,
    valueEnum: {
      all: { text: "全部" },
      open: {
        text: "未解决",
        status: "Error",
      },
      closed: {
        text: "已解决",
        status: "Success",
        // disabled: true,
      },
      processing: {
        text: "解决中",
        status: "Processing",
      },
    },
  },
  {
    title: "标签",
    dataIndex: "labels",
    search: false,
    disable: true,
    renderFormItem: (_, { defaultRender }) => {
      return defaultRender(_);
    },
    render: (_, record) => (
      <Space>
        {record.labels.map(({ name, color }) => (
          <Tag color={color} key={name}>
            {name}
          </Tag>
        ))}
      </Space>
    ),
  },
  {
    title: "创建时间",
    dataIndex: "addTime",
    valueType: "dateTime",
    hideInSearch: true,
    fieldProps: {
      format: "YYYY-MM-DD HH:mm",
    },
  },
  {
    title: "创建时间",
    dataIndex: "addTime",
    valueType: "dateTimeRange",
    hideInTable: true,
    fieldProps: {
      format: "YYYY-MM-DD HH:mm",
    },
    search: {
      transform: (value) => {
        return {
          startTime: value[0],
          endTime: value[1],
        };
      },
    },
  },
  {
    title: "备注",
    dataIndex: "remark",
    search: false,
    ellipsis: true,
    tooltip: "标题过长会自动收缩",
  },
  {
    title: "操作",
    valueType: "option",
    key: "option",
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,
      <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => action?.reload()}
        menus={[
          { key: "copy", name: "复制" },
          { key: "delete", name: "删除" },
        ]}
      />,
    ],
  },
];

export default ({ addTodo, requestTodos, todos, total }) => {
  const [current, setCurrent] = useState(1);
  const [params, setParams] = useState({});

  useEffect(() => {
    requestTodos({
      current: 1,
      pageSize: DEFAULT_PAGE_SIZE,
    });
  }, []);

  return (
    <ProTable
      headerTitle="Todo List"
      cardBordered
      search={{
        labelWidth: "auto",
      }}
      rowKey="id"
      onSubmit={(params) => {
        console.log(params);
        setParams(params);
        requestTodos({
          current: 1,
          pageSize: DEFAULT_PAGE_SIZE,
          ...params,
        });
      }}
      columns={columns}
      dataSource={todos}
      pagination={{
        pageSize: DEFAULT_PAGE_SIZE,
        total,
        onChange: (current) => {
          setCurrent(current);
          requestTodos({
            current,
            pageSize: DEFAULT_PAGE_SIZE,
            ...params,
          });
        },
      }}
      toolBarRender={() => [
        <Button
          key="button"
          icon={<PlusOutlined />}
          onClick={() => {}}
          type="primary"
        >
          新建
        </Button>,
        <Dropdown
          key="menu"
          menu={{
            items: [
              {
                label: "1st item",
                key: "1",
              },
              {
                label: "2nd item",
                key: "2",
              },
              {
                label: "3rd item",
                key: "3",
              },
            ],
          }}
        >
          <Button>
            <EllipsisOutlined />
          </Button>
        </Dropdown>,
      ]}
      options={{
        setting: {
          listsHeight: 400,
        },
        reload: () => {
          requestTodos({
            current,
            pageSize: DEFAULT_PAGE_SIZE,
            ...params,
          });
        },
      }}
    />
  );
};
