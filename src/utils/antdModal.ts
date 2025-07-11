interface AntdModalType {
  open: boolean;
  onCancel: () => void;
  onOk: () => void;
  afterClose: () => void;
}

const antdModal = (modal: any): AntdModalType => {
  return {
    open: modal.open,
    onOk: () => modal.hide(),
    onCancel: () => modal.hide(),
    afterClose: () => {
      modal.resolveHide();
      if (!modal.keepMounted) modal.remove();
    }
  };
};

export default antdModal;
