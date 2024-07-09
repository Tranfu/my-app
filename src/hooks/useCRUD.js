import { useState, useEffect } from "react";
import { Button, message } from "antd";
import { EllipsisOutlined, PlusOutlined } from "@ant-design/icons";
import { DEFAULT_PAGE_SIZE } from "constants";

export function useCRUD(
  getEntities,
  getEntity,
  addEntity,
  updateEntity,
  deleteEntity,
) {
  const [params, setParams] = useState({});
  const [entity, setEntity] = useState({});
  const [entities, setEntities] = useState([]);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [tableDataChangeTime, setTableDataChangeTime] = useState(Date.now());

  useEffect(() => {
    getEntities({
      ...params,
      current,
      pageSize: DEFAULT_PAGE_SIZE,
    }).then((data) => {
      setEntities(data.list);
      setTotal(data.total);
    });
  }, [params, current, tableDataChangeTime]);

  const handleSubmit = (params) => {
    setCurrent(1);
    setParams(params);
  };

  const handleView = (record) => {
    setIsModalOpen(true);
    getEntity({
      id: record.id,
    }).then((data) => {
      setEntity(data);
    });
  };

  const handleCreate = () => {
    if (!!entity.id) setEntity({});
    setIsFormModalOpen(true);
  };

  const handleEdit = (record) => {
    setIsModalOpen(false);
    getEntity({
      id: record.id || entity.id,
    }).then((data) => {
      setEntity(data);
      setIsFormModalOpen(true);
    });
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleFinish = (values) => {
    if (!!entity.id) {
      updateEntity({
        ...values,
        id: entity.id,
      }).then(() => {
        setTableDataChangeTime(Date.now());
        message.success("更新成功");
      });
    } else {
      addEntity(values).then(() => {
        setTableDataChangeTime(Date.now());
        message.success("创建成功");
      });
    }
    return true;
  };

  const handleOpenChange = (value) => {
    setIsFormModalOpen(value);
  };

  const handleDelete = (entity) => {
    deleteEntity({
      id: entity.id,
    }).then(() => {
      setTableDataChangeTime(Date.now());
    });
  };

  const handleChange = (current) => {
    setCurrent(current);
  };

  const data = {
    entity,
    proTab: {
      headerTitle: "表格",
      cardBordered: true,
      search: {
        labelWidth: "auto",
        layout: "vertical",
      },
      rowKey: "id",
      onSubmit: handleSubmit,
      dataSource: entities,
      pagination: {
        pageSize: DEFAULT_PAGE_SIZE,
        total,
        onChange: handleChange,
      },
      options: {
        setting: {
          listsHeight: 400,
        },
        reload: false,
      },
    },
    toolBars: [
      <Button
        key="button"
        icon={<PlusOutlined />}
        onClick={handleCreate}
        type="primary"
      >
        新建
      </Button>,
    ],
    getButtons: (record) => {
      return [
        <a key="editable" onClick={() => handleEdit(record)}>
          编辑
        </a>,
        <a key="view" onClick={() => handleView(record)}>
          查看
        </a>,
      ];
    },
    modal: {
      title: "详情",
      open: isModalOpen,
      width: 800,
      onCancel: handleClose,
      footer: [
        <Button key="edit" onClick={handleEdit}>
          编辑
        </Button>,
        <Button key="close" type="primary" onClick={handleClose}>
          关闭
        </Button>,
      ],
    },
    proDescriptions: {
      column: 1,
      bordered: true,
    },
    modalForm: {
      title: !!entity.id ? "编辑" : "新建",
      open: isFormModalOpen,
      onOpenChange: handleOpenChange,
      autoFocusFirstInput: true,
      modalProps: {
        destroyOnClose: true,
      },
      submitTimeout: 2000,
      onFinish: handleFinish,
      initialValues: entity,
    },
    handleDelete,
  };

  return data;
}
