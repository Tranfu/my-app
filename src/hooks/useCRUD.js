import { useState, useEffect } from "react";
import { Button, message } from "antd";
import { EllipsisOutlined, PlusOutlined } from "@ant-design/icons";
import { DEFAULT_PAGE_SIZE, proComponents } from "constants";

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
        message.success("更新成功");
        setTableDataChangeTime(Date.now());
      });
    } else {
      addEntity(values).then(() => {
        message.success("新建成功");
        setTableDataChangeTime(Date.now());
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
      message.success("删除成功");
      setTableDataChangeTime(Date.now());
    });
  };

  const handleChange = (current) => {
    setCurrent(current);
  };

  const handleReload = () => {
    message.success("刷新成功");
    setTableDataChangeTime(Date.now());
  };

  const data = {
    entity,
    proTab: {
      ...proComponents.proTab,
      onSubmit: handleSubmit,
      dataSource: entities,
      pagination: {
        pageSize: DEFAULT_PAGE_SIZE,
        total,
        onChange: handleChange,
      },
      options: {
        reload: handleReload,
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
      ...proComponents.modal,
      open: isModalOpen,
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
      ...proComponents.proDescriptions,
    },
    modalForm: {
      ...proComponents.modalForm,
      title: !!entity.id ? "编辑" : "新建",
      open: isFormModalOpen,
      initialValues: entity,
      onOpenChange: handleOpenChange,
      onFinish: handleFinish,
    },
    handleDelete,
  };

  return data;
}
