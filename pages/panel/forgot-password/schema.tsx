import * as Yup from "yup";
import { withLangSchema } from "../../../shared/hoc/lang";
import { En, Id } from "./lang";

const ForgotPasswordSchemaPrep = (message?: any) => {
  return Yup.object().shape({
    email: Yup.string()
      .required(message.validationFieldEmail)
      .email(message.validationFieldEmailValidate),
  });
};

export const ForgotPasswordSchema = withLangSchema(ForgotPasswordSchemaPrep, {
  en: En,
  id: Id,
});
