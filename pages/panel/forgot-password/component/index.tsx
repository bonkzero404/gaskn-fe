import { AtSymbolIcon } from "@heroicons/react/20/solid";
import { Input } from "../../../../components/input";
import { Button } from "../../../../components/button";
import { LayoutAuth } from "../../../../components/layout/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { ForgotPasswordSchema } from "../schema";
import { Alert } from "../../../../components/alert";
import { SignInComponentProps } from "./props";
import { useRouter } from "next/router";

export function ForgotPasswordComponent(props: SignInComponentProps) {
  const router = useRouter();
  const { email } = router.query;
  const formOptions = { resolver: yupResolver(ForgotPasswordSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors }: any = formState;

  return (
    <LayoutAuth title={props?.lang?.titlePage}>
      <>
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
              defaultValue={email as string}
            />
          </div>

          <div>
            <Button
              type="submit"
              label={props?.lang?.reqForgotPassButton}
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
