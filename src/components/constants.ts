import * as yup from "yup";

export const schema = yup.object({
  email: yup.string().required("Email is required").email("Email must be a valid email address"),
  password: yup.string().required("Password is required"),
}).required();

export const registerSchema = yup.object({
  email: yup.string().required("Email is required").email("Email must be a valid email address"),
  password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
  passwordConfirm: yup.string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
}).required();