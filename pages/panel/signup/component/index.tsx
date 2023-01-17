import {
  AtSymbolIcon,
  IdentificationIcon,
  LockClosedIcon,
  PhoneIcon,
} from "@heroicons/react/20/solid";
import { Input } from "../../../../components/input";
import { Button } from "../../../../components/button";
import { LayoutAuth } from "../../../../components/layout/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { SignUpSchema } from "../schema";
import { Alert } from "../../../../components/alert";
import { SignUpComponentProps } from "./props";
import { SolidColor } from "../../../../shared/color";

export function SignUpComponent(props: SignUpComponentProps) {
  const formOptions = { resolver: yupResolver(SignUpSchema) };
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
            <label htmlFor="full_name" className="mb-2">
              {props?.lang?.fullName}
            </label>
            <Input
              id="full_name"
              name="full_name"
              type="text"
              placeholder="John Doe"
              icon={(isError) => (
                <IdentificationIcon
                  className={`h-5 w-5 ${
                    isError
                      ? "text-red-500 group-hover:text-red-400"
                      : "text-blue-500 group-hover:text-blue-400"
                  }`}
                />
              )}
              className={errors.full_name ? "is-invalid" : ""}
              inputValidationRule={{ ...register("full_name") }}
              validationMessages={errors?.full_name?.message}
            />
          </div>

          <div>
            <label htmlFor="phone" className="mb-2">
              {props?.lang?.phone}
            </label>
            <Input
              id="phone"
              name="phone"
              type="text"
              placeholder="+62"
              icon={(isError) => (
                <PhoneIcon
                  className={`h-5 w-5 ${
                    isError
                      ? "text-red-500 group-hover:text-red-400"
                      : "text-blue-500 group-hover:text-blue-400"
                  }`}
                />
              )}
              className={errors.phone ? "is-invalid" : ""}
              inputValidationRule={{ ...register("phone") }}
              validationMessages={errors?.phone?.message}
            />
          </div>

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
            <label htmlFor="password" className="mb-2">
              {props?.lang?.passLabel}
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
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
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Button
                type="submit"
                label={props?.lang?.signUpButton}
                borderWidth="transparent"
                width="w-full"
                disabled={props.disabledWhileProccessButton}
              />
            </div>

            <div>
              <Button
                link="/panel/activation"
                backgroundColor={SolidColor.Sky}
                label={props?.lang?.activationButton}
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
                {props?.lang?.signInDesc}{" "}
                <Link
                  href="/panel/signin"
                  className="text-blue-600 hover:text-blue-500"
                >
                  {props?.lang?.signinLink}
                </Link>
              </p>
            </div>
          </div>
        </form>
      </>
    </LayoutAuth>
  );
}
