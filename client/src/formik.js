import * as yup from "yup";

export const registerSchema = yup.object().shape({
  firstName: yup.string().required("This Field is Required"),
  lastName: yup.string().required("This Field is Required"),
  email: yup.string().email("invalid email").required("This Field is Required"),
  password: yup
    .string()
    .required("This Field is Required")
    .min(4, "Your password must be at least 4 characters")
    .trim(),

  location: yup.string().required("This Field is Required"),
  occupation: yup.string().required("This Field is Required"),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("This Field is Required"),
  password: yup.string().required("This Field is Required"),
});

export const resetSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("This Field is Required"),
});

export const codeSchema = yup.object().shape({
  code: yup
    .string()
    .required("This Field is Required")
    .length(6, "Your Code must be 6 characters"),
});

export const passwordsSchema = yup.object().shape({
  password: yup.string().required("This Field is Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Passwords must match")
    .required("This Field is Required"),
});

export const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

export const resetInitialValues = {
  email: "",
  code: "",
  password: "",
  confirmPassword: "",
};
