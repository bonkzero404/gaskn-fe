export interface ModalProps {
  isShown: boolean | undefined;
  modalTitle: string | undefined;
  modalContent: JSX.Element | undefined;
  actionLabel?: string | undefined;
  closeLabel?: string | undefined;
  handleClose?: () => void;
  handleAction?: (param?: any) => void;
}
