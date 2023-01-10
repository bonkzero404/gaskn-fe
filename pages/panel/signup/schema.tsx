import * as Yup from "yup";
import "yup-phone";

export const SignUpSchema = Yup.object().shape({
  full_name: Yup.string().required("Fullname is required"),
  phone: Yup.string()
    .phone(undefined, undefined, "phone must be a valid phone number.")
    .required("Phone is required"),
  email: Yup.string().required("Email is required").email("Email is invalid"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});
