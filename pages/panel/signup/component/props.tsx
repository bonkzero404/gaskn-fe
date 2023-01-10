export interface SignUpComponentProps {
  lang?: any;
  formSubmit: (data: any) => Promise<boolean>;
  handleAlertClose?: () => void;
  alertAction: { type: string | undefined; show: boolean; message: string };
  disabledWhileProccessButton?: boolean;
  setValue: {
    email: string;
    password: string;
    rememberme?: boolean;
  };
}
