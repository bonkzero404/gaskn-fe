import * as Yup from "yup";
import { withLangSchema } from "../../../shared/hoc/lang";
import { En, Id } from "./lang";

const ReActivationSchemaPrep = (message?: any) => {
  return Yup.object().shape({
    email: Yup.string()
      .required(message.validationFieldEmail)
      .email(message.validationFieldEmailValidate),
  });
};

export const ReActivationSchema = withLangSchema(ReActivationSchemaPrep, {
  en: En,
  id: Id,
});
