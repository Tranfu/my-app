import { EllipsisOutlined } from "@ant-design/icons";
import {
  ProTable,
  TableDropdown,
  ProDescriptions,
  ModalForm,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components";
import { Button, Dropdown, Modal } from "antd";
import { useCRUD } from "hooks/useCRUD";
import {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
} from "services/users";

export default () => {
  const {
    entity,
    proTab,
    toolBars,
    modal,
    proDescriptions,
    modalForm,
    handleDelete,
    getButtons,
  } = useCRUD(getUsers, getUser, addUser, updateUser, deleteUser);

  const handleSelect = (action, record) => {
    switch (action) {
      case "delete":
        handleDelete(record);
        break;
      default:
        break;
    }
  };

  const handleClick = ({ key }) => {
    switch (key) {
      case "btn1":
        debugger;
        break;
      default:
        break;
    }
  };

  return (
    <>
      {/* 主页表格 */}
      {/* https://procomponents.ant.design/components/table */}
      <ProTable
        {...proTab}
        columns={[
          {
            dataIndex: "index",
            valueType: "indexBorder",
            width: 48,
          },
          {
            title: "用户名",
            dataIndex: "name",
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
                onSelect={(action) => handleSelect(action, record)}
                menus={[
                  { key: "delete", name: "删除" },
                  { key: "btn1", name: "1rd item" },
                  { key: "btn2", name: "2rd item" },
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
                  key: "btn1",
                  label: "1st item",
                },
                {
                  key: "btn2",
                  label: "2nd item",
                },
              ],
              onClick: handleClick,
            }}
          >
            <Button>
              <EllipsisOutlined />
            </Button>
          </Dropdown>,
        ]}
      />
      {/* 详情对话框 */}
      {/* https://procomponents.ant.design/components/descriptions */}
      <Modal {...modal}>
        <ProDescriptions {...proDescriptions}>
          <ProDescriptions.Item label="ID" copyable={true}>
            {entity.id}
          </ProDescriptions.Item>
          <ProDescriptions.Item label="用户名" copyable={true}>
            {entity.name}
          </ProDescriptions.Item>
          <ProDescriptions.Item label="创建时间" valueType="date">
            {entity.addTime}
          </ProDescriptions.Item>
          <ProDescriptions.Item label="备注">
            {entity.remark}
          </ProDescriptions.Item>
        </ProDescriptions>
      </Modal>
      {/* 新建&编辑对话框 */}
      {/* https://procomponents.ant.design/components/field-set */}
      <ModalForm {...modalForm}>
        <ProFormText
          label="用户名"
          name="name"
          tooltip="最长为 24 位"
          placeholder="请输入"
          rules={[
            {
              required: true,
            },
            {
              max: 24,
            },
          ]}
        />
        <ProFormTextArea label="备注" name="remark" placeholder="请输入备注" />
      </ModalForm>
    </>
  );
};
