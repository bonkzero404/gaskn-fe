import { Input } from "../../../../components/input";
import { Button } from "../../../../components/button";
import { LayoutAuth } from "../../../../components/layout/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { ReActivationSchema } from "../schema";
import { Alert } from "../../../../components/alert";
import { SignInComponentProps } from "./props";
import { useRouter } from "next/router";

export function ReActivationComponent(props: SignInComponentProps) {
  const router = useRouter();
  const { email } = router.query;
  const formOptions = { resolver: yupResolver(ReActivationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors }: any = formState;

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
              defaultValue={email as string}
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
