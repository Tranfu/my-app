import { EllipsisOutlined, PlusOutlined } from "@ant-design/icons";
import {
  ProTable,
  TableDropdown,
  ProDescriptions,
  ModalForm,
  ProForm,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormCheckbox,
} from "@ant-design/pro-components";
import { Button, Dropdown, Space, Tag, Modal, Form, message } from "antd";
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
  const [modalVisit, setModalVisit] = useState(false);

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

  const waitTime = (time = 100) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  };

  const [form] = Form.useForm();

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
            onClick={() => setModalVisit(true)}
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
        <ProDescriptions dataSource={todo} column={1} bordered={true}>
          <ProDescriptions.Item label="ID" copyable={true}>
            {todo.id}
          </ProDescriptions.Item>
          <ProDescriptions.Item label="标题" copyable={true}>
            {todo.title}
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label="状态"
            valueEnum={{
              all: { text: "全部", status: "Default" },
              open: {
                text: "未解决",
                status: "Error",
              },
              closed: {
                text: "已解决",
                status: "Success",
              },
              processing: {
                text: "解决中",
                status: "Processing",
              },
            }}
          >
            {todo.state}
          </ProDescriptions.Item>
          <ProDescriptions.Item label="标签">
            <Space>
              {todo.labels?.map(({ name, color }) => (
                <Tag color={color} key={name}>
                  {name}
                </Tag>
              ))}
            </Space>
          </ProDescriptions.Item>
          <ProDescriptions.Item label="创建时间" valueType="date">
            {todo.addTime}
          </ProDescriptions.Item>
          <ProDescriptions.Item label="备注">
            {todo.remark}
          </ProDescriptions.Item>
        </ProDescriptions>
      </Modal>
      <ModalForm
        title="新建"
        // readonly={true}
        open={modalVisit}
        onOpenChange={setModalVisit}
        form={form}
        autoFocusFirstInput
        submitTimeout={2000}
        onFinish={async (values) => {
          await waitTime(2000);
          console.log(values);
          message.success("提交成功");
          return true;
        }}
      >
        <ProFormText
          name="title"
          label="标题"
          tooltip="最长为 24 位"
          placeholder="请输入标题"
          rules={[
            {
              required: true,
            },
            {
              max: 24,
            },
          ]}
        />
        <ProFormSelect
          label="状态"
          name="state"
          value={"open"}
          options={[
            {
              value: "open",
              label: "未解决",
            },
            {
              value: "closed",
              label: "已解决",
            },
            {
              value: "processing",
              label: "解决中",
            },
          ]}
        />
        <ProFormCheckbox.Group
          name="labels"
          label="标签"
          options={["low", "middle", "high"]}
        />
        <ProFormTextArea name="remark" label="备注" placeholder="请输入备注" />
      </ModalForm>
    </>
  );
};
