export interface SignInComponentProps {
  lang?: any;
  formSubmit: (data: any) => Promise<boolean>;
  showAlert: boolean;
  handleAlertClose?: () => void;
  submitErrorMessage: string;
  setAlertType?: string | undefined;
  disabledWhileProccessButton?: boolean;
  setValue: {
    email: string;
    password: string;
    rememberme?: boolean;
  };
}
