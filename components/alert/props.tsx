export interface AlertProperty {
  message: string;
  type: string | undefined;
  show?: boolean | undefined;
  handleClose?: () => void;
}
