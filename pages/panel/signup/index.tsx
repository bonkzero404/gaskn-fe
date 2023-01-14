import { useRouter } from "next/router";
import { useState } from "react";
import { Repository } from "./repository";
import { SignUpComponent } from "./component";
import { getLangServerSideProps, withLang } from "../../../shared/hoc/lang";
import { En, Id } from "./lang";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";

const langList = { en: En, id: Id };

const SignUpPage = ({
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

    setTimeout(() => router.push(`/panel/activation?email=${data.email}`), 500);

    return false;
  };

  return (
    <SignUpComponent
      lang={lang}
      formSubmit={formSubmit}
      alertAction={alertAction}
      disabledWhileProccessButton={disabledWhileProccessButton}
      handleAlertClose={clearAlert}
    />
  );
};

export default withLang(SignUpPage, langList);

export const getServerSideProps: GetServerSideProps<{ lang: any }> = async (
  context: GetServerSidePropsContext,
) => getLangServerSideProps(context, langList);
