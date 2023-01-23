import * as Yup from "yup";
import { withLangSchema } from "../../../shared/hoc/lang";
import { En, Id } from "./lang";

const ActivationSchemaPrep = (message: any) => {
  return Yup.object().shape({
    email: Yup.string()
      .required(message.validationFieldEmail)
      .email(message.validationFieldEmailValidate),
    code: Yup.string().required(message.validationFIeldCode),
  });
};

export const ActivationSchema = withLangSchema(ActivationSchemaPrep, {
  en: En,
  id: Id,
});
