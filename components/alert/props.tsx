export interface AlertProperty {
  type: string | undefined;
  action?: { show: boolean; message: string; cause?: string };
  handleClose?: () => void;
  disableClose?: boolean;
  className?: string | undefined;
}
