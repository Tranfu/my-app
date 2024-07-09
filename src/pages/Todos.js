import { EllipsisOutlined, PlusOutlined } from "@ant-design/icons";
import {
  ProTable,
  TableDropdown,
  ProDescriptions,
  ModalForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormCheckbox,
} from "@ant-design/pro-components";
import { Button, Dropdown, Space, Tag, Modal } from "antd";
import { useCRUD } from "hooks/useCRUD";
import {
  getTodos,
  getTodo,
  addTodo,
  updateTodo,
  deleteTodo,
} from "services/todos";

// export default ({ getTodos, todos, total }) => {
export default () => {
  const {
    entity,
    proTab,
    toolBars,
    buttons,
    modal,
    proDescriptions,
    modalForm,
    handleDelete,
    getButtons,
  } = useCRUD(getTodos, getTodo, addTodo, updateTodo, deleteTodo);

  return (
    <>
      <ProTable
        {...proTab}
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
              ...getButtons(record),
              <TableDropdown
                key="actionGroup"
                onSelect={(action) => {
                  switch (action) {
                    case "delete":
                      handleDelete(record);
                      break;
                    default:
                      break;
                  }
                }}
                menus={[
                  { key: "delete", name: "删除" },
                  { key: "1", name: "1rd item" },
                  { key: "2", name: "2rd item" },
                ]}
              />,
            ],
          },
        ]}
        toolBarRender={() => [
          ...toolBars,
          <Dropdown
            key="menu"
            menu={{
              items: [
                {
                  key: "1",
                  label: "1st item",
                },
                {
                  key: "2",
                  label: "2nd item",
                },
              ],
              onClick: ({ key }) => {
                switch (key) {
                  case "1":
                    break;
                  default:
                    break;
                }
              },
            }}
          >
            <Button>
              <EllipsisOutlined />
            </Button>
          </Dropdown>,
        ]}
      />
      <Modal {...modal}>
        <ProDescriptions {...proDescriptions}>
          <ProDescriptions.Item label="ID" copyable={true}>
            {entity.id}
          </ProDescriptions.Item>
          <ProDescriptions.Item label="标题" copyable={true}>
            {entity.title}
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
            {entity.state}
          </ProDescriptions.Item>
          <ProDescriptions.Item label="标签">
            <Space>
              {entity.labels?.map(({ name, color }) => (
                <Tag color={color} key={name}>
                  {name}
                </Tag>
              ))}
            </Space>
          </ProDescriptions.Item>
          <ProDescriptions.Item label="创建时间" valueType="date">
            {entity.addTime}
          </ProDescriptions.Item>
          <ProDescriptions.Item label="备注">
            {entity.remark}
          </ProDescriptions.Item>
        </ProDescriptions>
      </Modal>
      <ModalForm {...modalForm}>
        <ProFormText
          label="标题"
          name="title"
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
          label="标签"
          name="labels"
          options={["low", "middle", "high"]}
        />
        <ProFormTextArea label="备注" name="remark" placeholder="请输入备注" />
      </ModalForm>
    </>
  );
};
