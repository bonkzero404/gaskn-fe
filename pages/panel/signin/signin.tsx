import { AtSymbolIcon, LockClosedIcon } from "@heroicons/react/20/solid";
import { Input } from "../../../components/input";
import { Button } from "../../../components/button";
import { LayoutAuth } from "../../../components/layout/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { ValidationSchema } from "./validation";
import { Alert } from "../../../components/alert";

interface props {
  formSubmit: (data: any) => Promise<boolean>;
  showAlert: boolean;
  handleAlertClose?: () => void;
  submitErrorMessage: string;
  setAlertType?: string | undefined;
  setValue: {
    email: string;
    password: string;
    rememberme?: boolean;
  };
}

export function SignIn(props: props) {
  const formOptions = { resolver: yupResolver(ValidationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors }: any = formState;

  return (
    <LayoutAuth>
      <>
        <Alert
          type={props.setAlertType}
          message={props.submitErrorMessage}
          show={props.showAlert}
          handleClose={props.handleAlertClose}
        />
        <form
          className="mt-2 space-y-6"
          onSubmit={handleSubmit(props.formSubmit)}
        >
          <input type="hidden" name="remember" value="true" />

          <div>
            <label htmlFor="email-address" className="mb-2">
              Email Address
            </label>
            <Input
              id="email"
              name="email"
              type="text"
              autoComplete="email"
              placeholder="john.doe@example.com"
              icon={
                <AtSymbolIcon className="h-5 w-5 text-blue-500 group-hover:text-blue-400" />
              }
              className={errors.email ? "is-invalid" : ""}
              inputValidationRule={{ ...register("email") }}
              validationMessages={errors?.email?.message}
              defaultValue={props.setValue.email}
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-2">
              Password
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              icon={
                <LockClosedIcon className="h-5 w-5 text-blue-500 group-hover:text-blue-400" />
              }
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
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                defaultChecked={props.setValue.rememberme}
              />
              <label
                htmlFor="rememberme"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link
                href="/forgot-password"
                className="text-blue-600 hover:text-blue-500"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              label="Sign In"
              width="w-full"
              borderWidth="transparent"
            />
          </div>

          <div className="relative flex items-center justify-center w-full mt-6 border border-t">
            <div className="absolute px-5 bg-white">or</div>
          </div>

          <div>
            <div>
              <p className="text-center font-medium">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="text-blue-600 hover:text-blue-500"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </form>
      </>
    </LayoutAuth>
  );
}
