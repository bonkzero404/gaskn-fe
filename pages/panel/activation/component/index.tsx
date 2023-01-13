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

export function ActivationComponent(props: SignInComponentProps) {
  const formOptions = { resolver: yupResolver(ActivationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors }: any = formState;

  return (
    <LayoutAuth title={props?.lang?.titlePage}>
      <>
        <Alert
          type="info"
          action={{
            message: "Activation code has been sent to your email account",
            show: true,
          }}
          disableClose
        />
        <Alert
          type={props.alertAction.type}
          action={{
            message: props.alertAction.message,
            show: props.alertAction.show,
          }}
          handleClose={props.handleAlertClose}
          className="mt-4"
        />
        <form
          className="mt-2 space-y-6"
          onSubmit={handleSubmit(props.formSubmit)}
        >
          <input type="hidden" name="remember" value="true" />
          <div>
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

          <div>
            <Button
              type="submit"
              label={props?.lang?.activationButton}
              width="w-full"
              borderWidth="transparent"
              disabled={props.disabledWhileProccessButton}
            />
          </div>

          <div className="relative flex items-center justify-center w-full mt-6 border border-t">
            <div className="absolute px-5 bg-white">{props?.lang?.orLine}</div>
          </div>

          <div>
            <div>
              <p className="text-center font-medium">
                {props?.lang?.activationDesc}{" "}
                <Link
                  href="/panel/resend-activation"
                  className="text-blue-600 hover:text-blue-500"
                >
                  {props?.lang?.resendActivationLink}
                </Link>
              </p>
            </div>
          </div>
        </form>
      </>
    </LayoutAuth>
  );
}
