import * as Yup from "yup";
import { withLangSchema } from "../../../shared/hoc/lang";
import { En, Id } from "./lang";

const SignInSchemaPrep = (message?: any) => {
  return Yup.object().shape({
    email: Yup.string()
      .required(message.validationFieldEmail)
      .email(message.validationFieldEmailValidate),
    password: Yup.string()
      .required(message.validationFIeldPassword)
      .min(8, message.validationFIeldPasswordLength),
  });
};

export const SignInSchema = withLangSchema(SignInSchemaPrep, {
  en: En,
  id: Id,
});
