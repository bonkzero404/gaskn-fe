import { AtSymbolIcon, CodeBracketSquareIcon } from "@heroicons/react/20/solid";
import { Input } from "../../../../components/input";
import { Button } from "../../../../components/button";
import { LayoutAuth } from "../../../../components/layout/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { ActivationSchema } from "../schema";
import { Alert } from "../../../../components/alert";
import { SignInComponentProps } from "./props";
import { SolidColor } from "../../../../shared/color";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export function ActivationComponent(props: SignInComponentProps) {
  const router = useRouter();
  const { email } = router.query;
  const formOptions = { resolver: yupResolver(ActivationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors }: any = formState;
  const [visibleEmail, setVisibleEmail] = useState(true);

  useEffect(() => {
    if (email) {
      setVisibleEmail(false);
    }
  }, [email]);

  return (
    <LayoutAuth title={props?.lang?.titlePage}>
      <>
        <Alert
          type="info"
          action={{
            message: props?.lang?.activationInfo as string,
            show: true,
          }}
          disableClose
        />
        <Alert
          type={props.alertAction.type}
          action={{
            message: props.alertAction.message,
            show: props.alertAction.show,
            cause: props.alertAction?.cause,
          }}
          handleClose={props.handleAlertClose}
          className="mt-4"
        />
        <form
          className="mt-2 space-y-6"
          onSubmit={handleSubmit(props.formSubmit)}
        >
          <input type="hidden" name="remember" value="true" />
          <div className={visibleEmail ? "visible" : "hidden"}>
            <label htmlFor="email" className="mb-2">
              {props?.lang?.emailLabel}
            </label>
            <Input
              id="email"
              name="email"
              type="text"
              autoComplete="email"
              placeholder="john.doe@example.com"
              icon={(isError) => (
                <AtSymbolIcon
                  className={`h-5 w-5 ${
                    isError
                      ? "text-red-500 group-hover:text-red-400"
                      : "text-blue-500 group-hover:text-blue-400"
                  }`}
                />
              )}
              className={errors.email ? "is-invalid" : ""}
              inputValidationRule={{ ...register("email") }}
              validationMessages={errors?.email?.message}
              defaultValue={email as string}
            />
          </div>
          <div>
            <label htmlFor="code" className="mb-2">
              {props?.lang?.codeLabel}
            </label>
            <Input
              id="code"
              name="code"
              type="text"
              autoComplete="code"
              icon={(isError) => (
                <CodeBracketSquareIcon
                  className={`h-5 w-5 ${
                    isError
                      ? "text-red-500 group-hover:text-red-400"
                      : "text-blue-500 group-hover:text-blue-400"
                  }`}
                />
              )}
              className={errors.code ? "is-invalid" : ""}
              inputValidationRule={{ ...register("code") }}
              validationMessages={errors?.code?.message}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Button
                type="submit"
                label={props?.lang?.activationButton}
                width="w-full"
                borderWidth="transparent"
                disabled={props.disabledWhileProccessButton}
              />
            </div>

            <div>
              <Button
                link="/panel/re-activation"
                backgroundColor={SolidColor.Sky}
                label={props?.lang?.resendActivationButton}
                width="w-full"
                borderWidth="transparent"
              />
            </div>
          </div>
          <div className="relative flex items-center justify-center w-full mt-6 border border-t">
            <div className="absolute px-5 bg-white">{props?.lang?.orLine}</div>
          </div>

          <div>
            <div>
              <p className="text-center font-medium">
                {props?.lang?.registerDesc}{" "}
                <Link
                  href="/panel/signup"
                  className="text-blue-600 hover:text-blue-500"
                >
                  {props?.lang?.signupLink}
                </Link>
              </p>
            </div>
          </div>
        </form>
      </>
    </LayoutAuth>
  );
}
