import * as Yup from "yup";
import { withLangSchema } from "../../../shared/hoc/lang";
import { En, Id } from "./lang";

const CreateNewPasswordSchemaPrep = (message?: any) => {
  return Yup.object().shape({
    email: Yup.string()
      .required(message.validationFieldEmail)
      .email(message.validationFieldEmailValidate),
    code: Yup.string().required(message.validationFIeldCode),
    password: Yup.string()
      .required(message.validationFIeldPassword)
      .min(8, message.validationFIeldPasswordLength),
    repeatPassword: Yup.string()
      .required(message.validationFIeldRepeatPassword)
      .min(8, message.validationFIeldRepeatPasswordLength),
  });
};

export const CreateNewPasswordSchema = withLangSchema(
  CreateNewPasswordSchemaPrep,
  {
    en: En,
    id: Id,
  },
);
