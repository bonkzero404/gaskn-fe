import { useState } from "react";
import useLocalStorage from "../../components/hook/localstorage";
import { Repository } from "./repository";
import { SignIn } from "./ui";

export const Interactor = (): JSX.Element => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("danger");
  const [showSubmitErrorMessage, setShowSubmitErrorMessage] = useState("");
  const [rememberForm, setRememberForm] = useLocalStorage<{
    email: string;
    password: string;
    rememberme?: boolean;
  }>("remember-form-login", {
    email: "",
    password: "",
    rememberme: false,
  });

  const formSubmit = async (data: {
    email: string;
    password: string;
    rememberme?: boolean;
  }): Promise<boolean> => {
    const reqData = await Repository.Auth({
      email: data.email,
      password: data.password,
    });

    if (data.rememberme) {
      setRememberForm({
        email: data.email,
        password: data.password,
        rememberme: data.rememberme,
      });
    } else {
      setRememberForm({
        email: "",
        password: "",
        rememberme: data.rememberme,
      });
    }

    if (reqData.errors) {
      setAlertType("danger");
      setShowSubmitErrorMessage(reqData?.errors?.message);
      setShowAlert(true);
      return false;
    }

    setAlertType("success");
    setShowSubmitErrorMessage("Authentication successful");
    setShowAlert(true);
    return false;
  };

  return (
    <SignIn
      formSubmit={formSubmit}
      showAlert={showAlert}
      submitErrorMessage={showSubmitErrorMessage}
      setValue={rememberForm}
      setAlertType={alertType}
      handleAlertClose={() => {
        setShowAlert(false);
        setShowSubmitErrorMessage("");
      }}
    />
  );
};
