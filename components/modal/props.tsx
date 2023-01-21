export interface ModalProps {
  isShown: boolean | undefined;
  modalTitle: string | undefined;
  modalContent: JSX.Element | undefined;
  handleClose?: () => void;
  handleAction?: (param?: any) => void;
}
