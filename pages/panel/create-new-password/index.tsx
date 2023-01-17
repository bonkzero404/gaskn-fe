import { useRouter } from "next/router";
import { useState } from "react";
import { Repository } from "./repository";
import { CreateNewPasswordComponent } from "./component";
import { getLangServerSideProps, withLang } from "../../../shared/hoc/lang";
import { En, Id } from "./lang";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";

const langList = { en: En, id: Id };

const CreateNewPasswordPage = ({
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
    cause?: string;
  }>({ type: "info", show: false, message: "" });

  const clearAlert = () => {
    setAlertAction({
      type: "info",
      show: false,
      message: "",
    });
  };

  const formSubmit = async (data: {
    email: string;
    code: string;
    password: string;
    repeatPassword: string;
  }): Promise<boolean> => {
    setDisabledWhileProccessButton(true);

    const reqData = await repository.createNewPassword({
      email: data.email,
      code: data.code,
      password: data.password,
      repeat_password: data.repeatPassword,
    });

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
      message: lang?.successSubmit,
    });

    setDisabledWhileProccessButton(false);

    setTimeout(() => router.replace(`/panel/signin`), 500);

    return false;
  };

  return (
    <CreateNewPasswordComponent
      lang={lang}
      formSubmit={formSubmit}
      alertAction={alertAction}
      disabledWhileProccessButton={disabledWhileProccessButton}
      handleAlertClose={clearAlert}
    />
  );
};

export default withLang(CreateNewPasswordPage, langList);

export const getServerSideProps: GetServerSideProps<{ lang: any }> = async (
  context: GetServerSidePropsContext,
) => getLangServerSideProps(context, langList);
