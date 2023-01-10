import * as Yup from "yup";
import "yup-phone";
import { withLangSchema } from "../../../shared/hoc/lang";
import { En, Id } from "./lang";

const SignUpSchemaPrep = (message?: any) => {
  return Yup.object().shape({
    full_name: Yup.string().required(message?.validationFieldFullname),
    phone: Yup.string()
      .phone(undefined, undefined, message?.validationFieldPhoneValidate)
      .required(message?.validationFieldPhone),
    email: Yup.string()
      .required(message?.validationFieldEmail)
      .email(message?.validationFieldEmailValidate),
    password: Yup.string()
      .min(8, message?.validationFieldPasswordValidate)
      .required(message?.validationFieldPassword),
  });
};

export const SignUpSchema = withLangSchema(SignUpSchemaPrep, {
  en: En,
  id: Id,
});
