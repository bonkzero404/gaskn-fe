import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Repository } from "./repository";
import { ForgotPasswordComponent } from "./component";
import { getLangServerSideProps, withLang } from "../../../shared/hoc/lang";
import { En, Id } from "./lang";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";

const langList = { en: En, id: Id };

const ForgotPasswordPage = ({
  lang,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
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

  const formSubmit = async (data: { email: string }): Promise<boolean> => {
    setDisabledWhileProccessButton(true);

    const reqData = await repository.reSendActivation({
      email: data.email,
    });

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

    setTimeout(
      () => router.replace(`/panel/forgot-password?email=${data.email}`),
      500,
    );

    return false;
  };

  return (
    <ForgotPasswordComponent
      lang={lang}
      formSubmit={formSubmit}
      alertAction={alertAction}
      disabledWhileProccessButton={disabledWhileProccessButton}
      handleAlertClose={clearAlert}
    />
  );
};

export default withLang(ForgotPasswordPage, langList);

export const getServerSideProps: GetServerSideProps<{ lang: any }> = async (
  context: GetServerSidePropsContext,
) => getLangServerSideProps(context, langList);
