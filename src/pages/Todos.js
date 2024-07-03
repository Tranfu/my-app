import { EllipsisOutlined, PlusOutlined } from "@ant-design/icons";
import {
  ProTable,
  ProDescriptions,
  TableDropdown,
} from "@ant-design/pro-components";
import { Button, Dropdown, Space, Tag, Modal } from "antd";
import { useState } from "react";
import { useEffect } from "react";
import { DEFAULT_PAGE_SIZE } from "constants";
import { getTodo } from "services/todos";

export default ({ addTodo, requestTodos, todos, total }) => {
  const [current, setCurrent] = useState(1);
  const [params, setParams] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState(0);
  const [todo, setTodo] = useState({});

  useEffect(() => {
    requestTodos({
      current: 1,
      pageSize: DEFAULT_PAGE_SIZE,
    });
  }, []);

  const handleView = (record) => {
    setIsModalOpen(true);
    setId(record.id);
    getTodo({
      id: record.id,
    }).then((data) => {
      setTodo(data);
    });
  };

  const handleEdit = () => {
    setIsModalOpen(false);
  };
  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <ProTable
        headerTitle="表格"
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
        columns={[
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
              <a key="view" onClick={() => handleView(record)}>
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
        ]}
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
          reload: false,
        }}
      />
      <Modal
        title="详情"
        open={isModalOpen}
        width={800}
        onCancel={handleClose}
        footer={[
          <Button key="edit" onClick={handleEdit}>
            编辑
          </Button>,
          <Button key="close" type="primary" onClick={handleClose}>
            关闭
          </Button>,
        ]}
      >
        <ProDescriptions
          dataSource={todo}
          column={1}
          bordered={true}
          columns={[
            {
              title: "ID",
              dataIndex: "id",
              copyable: true,
            },
            {
              title: "标题",
              dataIndex: "title",
              copyable: true,
            },
            {
              title: "状态",
              dataIndex: "state",
              valueType: "select",
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
              render: (_, record) => (
                <Space>
                  {record.labels?.map(({ name, color }) => (
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
              valueType: "date",
            },
            {
              title: "备注",
              dataIndex: "remark",
            },
          ]}
        />
      </Modal>
    </>
  );
};
