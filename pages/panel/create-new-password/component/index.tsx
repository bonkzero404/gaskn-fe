import {
  AtSymbolIcon,
  CodeBracketSquareIcon,
  LockClosedIcon,
} from "@heroicons/react/20/solid";
import { Input } from "../../../../components/input";
import { Button } from "../../../../components/button";
import { LayoutAuth } from "../../../../components/layout/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { CreateNewPasswordSchema } from "../schema";
import { Alert } from "../../../../components/alert";
import { SignInComponentProps } from "./props";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export function CreateNewPasswordComponent(props: SignInComponentProps) {
  const router = useRouter();
  const { email } = router.query;
  const formOptions = { resolver: yupResolver(CreateNewPasswordSchema) };
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
            message: props?.lang?.createPassInfo as string,
            show: true,
          }}
          disableClose
        />
        <Alert
          type={props.alertAction.type}
          action={{
            message: props.alertAction.message,
            show: props.alertAction.show,
            cause: props.alertAction.cause,
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

          <div>
            <label htmlFor="password" className="mb-2">
              {props?.lang?.passLabel}
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="password"
              icon={(isError) => (
                <LockClosedIcon
                  className={`h-5 w-5 ${
                    isError
                      ? "text-red-500 group-hover:text-red-400"
                      : "text-blue-500 group-hover:text-blue-400"
                  }`}
                />
              )}
              eyePassword
              inputValidationRule={{ ...register("password") }}
              validationMessages={errors?.password?.message}
            />
          </div>

          <div>
            <label htmlFor="repeat-password" className="mb-2">
              {props?.lang?.repeatPassLabel}
            </label>
            <Input
              id="repeat-password"
              name="repeat-password"
              type="password"
              autoComplete="repeat-password"
              icon={(isError) => (
                <LockClosedIcon
                  className={`h-5 w-5 ${
                    isError
                      ? "text-red-500 group-hover:text-red-400"
                      : "text-blue-500 group-hover:text-blue-400"
                  }`}
                />
              )}
              eyePassword
              inputValidationRule={{ ...register("repeatPassword") }}
              validationMessages={errors?.repeatPassword?.message}
            />
          </div>

          <div>
            <Button
              type="submit"
              label={props?.lang?.createPassButton}
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
