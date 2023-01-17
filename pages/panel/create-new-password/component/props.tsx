export interface SignInComponentProps {
  lang?: { [key: string]: string };
  formSubmit: (data: any) => Promise<boolean>;
  handleAlertClose?: () => void;
  alertAction: { type: string; show: boolean; message: string; cause?: string };
  disabledWhileProccessButton?: boolean;
}
