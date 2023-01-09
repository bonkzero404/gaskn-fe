import { useRouter } from "next/router";
import { useState } from "react";
import useLocalStorage from "../../../shared/hook/localstorage";
import { useShouldSetSession } from "../../../shared/hook/auth";
import { Repository } from "./repository";
import { SignIn } from "./component";

const SignInPage = (): JSX.Element => {
  const repository = new Repository();
  const router = useRouter();
  const [_sessionToken, SetSession] = useShouldSetSession();
  const [disabledWhileProccessButton, setDisabledWhileProccessButton] =
    useState(false);
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
    setDisabledWhileProccessButton(true);

    const reqData = await repository.authenticate({
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
      setDisabledWhileProccessButton(false);
      return false;
    }

    setAlertType("success");
    setShowSubmitErrorMessage("Authentication successful");
    setShowAlert(true);

    SetSession({
      token: reqData?.data?.token,
      expires: reqData?.data?.expires,
    });

    setDisabledWhileProccessButton(false);

    setTimeout(() => router.replace("/panel/dashboard"), 500);

    return false;
  };

  return (
    <SignIn
      formSubmit={formSubmit}
      showAlert={showAlert}
      submitErrorMessage={showSubmitErrorMessage}
      setValue={rememberForm}
      setAlertType={alertType}
      disabledWhileProccessButton={disabledWhileProccessButton}
      handleAlertClose={() => {
        setShowAlert(false);
        setShowSubmitErrorMessage("");
      }}
    />
  );
};

export default SignInPage;
