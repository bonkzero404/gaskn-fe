import { useRouter } from "next/router";
import { useState } from "react";
import useLocalStorage from "../../../shared/hook/localstorage";
import { useShouldSetSession } from "../../../shared/hook/auth";
import { Repository } from "./repository";
import { SignInComponent } from "./component";
import { getLangServerSideProps, withLang } from "../../../shared/hoc/lang";
import { En, Id } from "./lang";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";

const langList = { en: En, id: Id };

const SignInPage = ({
  lang,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
  const repository = new Repository();
  const router = useRouter();
  const [_sessionToken, SetSession] = useShouldSetSession();
  const [disabledWhileProccessButton, setDisabledWhileProccessButton] =
    useState(false);
  const [alertAction, setAlertAction] = useState<{
    type: string;
    show: boolean;
    message: string;
    cause?: string;
  }>({ type: "info", show: false, message: "" });
  const [rememberForm, setRememberForm] = useLocalStorage<{
    email: string;
    password: string;
    rememberme?: boolean;
  }>("remember-form-login", {
    email: "",
    password: "",
    rememberme: false,
  });

  const clearAlert = () => {
    setAlertAction({
      type: "info",
      show: false,
      message: "",
    });
  };

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
      setAlertAction({
        type: "danger",
        show: true,
        message: reqData?.errors?.message,
        cause: reqData?.errors?.cause,
      });
      setDisabledWhileProccessButton(false);
      return false;
    }

    setAlertAction({
      type: "success",
      show: true,
      message: lang.successSubmit,
    });

    SetSession({
      token: reqData?.data?.token,
      expires: reqData?.data?.expires,
    });

    setDisabledWhileProccessButton(false);

    setTimeout(() => router.replace("/panel/dashboard"), 500);

    return false;
  };

  return (
    <SignInComponent
      lang={lang}
      formSubmit={formSubmit}
      alertAction={alertAction}
      setValue={rememberForm}
      disabledWhileProccessButton={disabledWhileProccessButton}
      handleAlertClose={clearAlert}
    />
  );
};

export default withLang(SignInPage, langList);

export const getServerSideProps: GetServerSideProps<{ lang: any }> = async (
  context: GetServerSidePropsContext,
) => getLangServerSideProps(context, langList);
