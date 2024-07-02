import { EllipsisOutlined, PlusOutlined } from "@ant-design/icons";
import {
  ProTable,
  ProDescriptions,
  ProCard,
  TableDropdown,
  useDeepCompareEffectDebounce,
} from "@ant-design/pro-components";
import { Button, Dropdown, Space, Tag, Modal, notification } from "antd";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { DEFAULT_PAGE_SIZE } from "constants";

export default ({ addTodo, requestTodos, todos, total }) => {
  const [current, setCurrent] = useState(1);
  const [params, setParams] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const columns = [
    {
      dataIndex: "index",
      valueType: "indexBorder",
      width: 48,
    },
    {
      title: "标题",
      dataIndex: "title",
      width: 150,
      ellipsis: true,
      tooltip: "标题过长会自动收缩",
      disable: true,
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
      width: 100,
      valueEnum: {
        all: { text: "全部" },
        open: {
          text: "未解决",
          status: "Error",
        },
        closed: {
          text: "已解决",
          status: "Success",
          disabled: true,
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
      width: 100,
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
      width: 150,
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
      width: 110,
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
        <a key="view" onClick={() => handleView()}>
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

  useEffect(() => {
    requestTodos({
      current: 1,
      pageSize: DEFAULT_PAGE_SIZE,
    });
  }, []);

  const handleView = () => {
    setIsModalOpen(true);
  };

  const handleEdit = () => {
    setIsModalOpen(false);
  };
  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleReload = () => {
    api.success({
      message: "刷新成功",
      pauseOnHover: true,
    });
  };

  return (
    <>
      {contextHolder}
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
            api.success({
              message: "刷新成功",
              pauseOnHover: true,
            });
          },
        }}
      />
      <Modal
        open={isModalOpen}
        width={800}
        onCancel={handleClose}
        footer={[
          <Button key="edit" onClick={handleEdit}>
            编辑
          </Button>,
          <Button key="reload" onClick={handleReload}>
            刷新
          </Button>,
          <Button key="close" type="primary" onClick={handleClose}>
            关闭
          </Button>,
        ]}
      >
        <ProDescriptions
          title="详情"
          column={1}
          bordered={true}
          dataSource={{
            id: "这是一段文本columns",
            date: "20200809",
            money: "1212100",
            state: "all",
            state2: "open",
          }}
          columns={[
            {
              title: "文本",
              key: "text",
              dataIndex: "id",
              ellipsis: true,
              copyable: true,
            },
            {
              title: "状态",
              key: "state",
              dataIndex: "state",
              valueType: "select",
              valueEnum: {
                all: { text: "全部", status: "Default" },
                open: {
                  text: "未解决",
                  status: "Error",
                },
                closed: {
                  text: "已解决",
                  status: "Success",
                },
              },
            },
            {
              title: "状态2",
              key: "state2",
              dataIndex: "state2",
            },
            {
              title: "时间",
              key: "date",
              dataIndex: "date",
              valueType: "date",
            },
            {
              title: "money",
              key: "money",
              dataIndex: "money",
              valueType: "money",
            },
          ]}
        >
          <ProDescriptions.Item label="百分比" valueType="percent">
            100
          </ProDescriptions.Item>
        </ProDescriptions>
      </Modal>
    </>
  );
};
