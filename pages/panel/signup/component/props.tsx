export interface SignUpComponentProps {
  lang?: { [key: string]: string };
  formSubmit: (data: any) => Promise<boolean>;
  handleAlertClose?: () => void;
  alertAction: { type: string | undefined; show: boolean; message: string };
  disabledWhileProccessButton?: boolean;
}
