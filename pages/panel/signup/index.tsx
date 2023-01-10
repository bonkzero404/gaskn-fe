import { useRouter } from "next/router";
import { useState } from "react";
import { Repository } from "./repository";
import { SignUp } from "./component";

const SignUpPage = (): JSX.Element => {
  const repository = new Repository();
  const router = useRouter();
  const [disabledWhileProccessButton, setDisabledWhileProccessButton] =
    useState(false);
  const [alertAction, setAlertAction] = useState<{
    type: string;
    show: boolean;
    message: string;
  }>({ type: "info", show: false, message: "" });

  const clearAlert = () => {
    setAlertAction({
      type: "info",
      show: false,
      message: "",
    });
  };

  const formSubmit = async (data: {
    full_name: string;
    phone: string;
    email: string;
    password: string;
  }): Promise<boolean> => {
    setDisabledWhileProccessButton(true);

    const reqData = await repository.register(data);

    if (reqData.errors) {
      setAlertAction({
        type: "danger",
        show: true,
        message: reqData?.errors?.message,
      });
      setDisabledWhileProccessButton(false);
      return false;
    }

    setAlertAction({
      type: "success",
      show: true,
      message: "Authentication successful",
    });

    setDisabledWhileProccessButton(false);

    return false;
  };

  return (
    <SignUp
      formSubmit={formSubmit}
      alertAction={alertAction}
      disabledWhileProccessButton={disabledWhileProccessButton}
      handleAlertClose={clearAlert}
    />
  );
};

export default SignUpPage;
