import { Input } from "../../../../components/input";
import { Button } from "../../../../components/button";
import { LayoutAuth } from "../../../../components/layout/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { SignInSchema } from "../schema";
import { Alert } from "../../../../components/alert";
import { SignInComponentProps } from "./props";

export function SignInComponent(props: SignInComponentProps) {
  const formOptions = { resolver: yupResolver(SignInSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  return (
    <LayoutAuth title={props?.lang?.titlePage}>
      <>
        <Alert
          type={props.alertAction.type}
          action={{
            message: props.alertAction.message,
            show: props.alertAction.show,
            cause: props.alertAction.cause,
          }}
          handleClose={props.handleAlertClose}
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
              iconString="AtSymbolIcon"
              className={errors.email ? "is-invalid" : ""}
              inputValidationRule={{ ...register("email") }}
              validationMessages={errors?.email?.message}
              defaultValue={props.setValue.email}
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
              autoComplete="current-password"
              iconString="LockClosedIcon"
              eyePassword
              inputValidationRule={{ ...register("password") }}
              validationMessages={errors?.password?.message}
              defaultValue={props.setValue.password}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                {...register("rememberme")}
                id="rememberme"
                name="rememberme"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-sky-500 focus:ring-blue-500"
                defaultChecked={props.setValue.rememberme}
              />
              <label
                htmlFor="rememberme"
                className="ml-2 block text-sm text-gray-900"
              >
                {props?.lang?.remember}
              </label>
            </div>

            <div className="text-sm">
              <Link
                href="/panel/forgot-password"
                className="text-sky-500 hover:text-sky-600"
              >
                {props?.lang?.forgotPass}
              </Link>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              label={props?.lang?.signInButton}
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
                  className="text-sky-500 hover:text-sky-600"
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
