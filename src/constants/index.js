// https://react-redux.js.org/tutorials/connect
export const DEFAULT_PAGE_SIZE = 10;

export const proComponents = {
  proTab: {
    headerTitle: "表格",
    cardBordered: true,
    search: {
      labelWidth: "auto",
      layout: "vertical",
    },
    rowKey: "id",
  },
  modal: {
    title: "详情",
    width: 800,
  },
  proDescriptions: {
    column: 1,
    bordered: true,
    size: "small",
    labelStyle: {
      width: 90,
    },
  },
  modalForm: {
    autoFocusFirstInput: true,
    modalProps: {
      destroyOnClose: true,
    },
    size: "small",
    submitTimeout: 2000,
  },
};
