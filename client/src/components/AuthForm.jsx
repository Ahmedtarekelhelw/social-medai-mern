import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// My Components
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import FlexBetween from "./FlexBetween";

// Api
import axiosInstance, { axiosPublic } from "../axiosInstance";

// Redux
import { useDispatch } from "react-redux";
import { setLogin } from "../features/auth/authSlice";
// import { setLogin } from "../state";

// MUI Components
import { Button, Grid, Typography, useTheme } from "@mui/material";

// Formik
import { Formik } from "formik";
import * as yup from "yup";

const registerSchema = yup.object().shape({
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
  picture: yup.string().required("This Field is Required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("This Field is Required"),
  password: yup.string().required("This Field is Required"),
});

const resetSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("This Field is Required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const initialValuesReset = {
  email: "",
};

const AuthForm = () => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    state: { from },
  } = useLocation();
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState();
  const [picPath, setPicPath] = useState("");
  const [loading, setLoading] = useState(false);

  const [isLogin, setIsLogin] = useState(true);
  const [isReset, setIsReset] = useState(false);

  const login = async (values, onSubmitProps) => {
    try {
      setLoading(true);
      const res = await axiosInstance.post("auth/login", values);
      dispatch(setLogin({ user: res.data.user, token: res.data.accessToken }));
      onSubmitProps.resetForm();
      setErrorMsg("");
      setLoading(false);
      navigate(from.pathname);
    } catch (err) {
      setErrorMsg(err.response?.data?.msg);
      setLoading(false);
    }
  };

  const upload = async (img) => {
    try {
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onloadend = async () => {
        const res = await axiosInstance.post("upload", {
          data: reader.result,
        });
        setPicPath(res.data);
      };
    } catch (error) {
      console.log(error);
    }
  };

  const register = async (values, onSubmitProps) => {
    setLoading(true);
    if (values.picture) await upload(values.picture);
    const { picture, ...others } = values;
    setFormData(others);
  };

  useEffect(() => {
    const CompleteRegister = async () => {
      try {
        await axiosInstance.post("auth/register", {
          ...formData,
          picturePath: picPath,
        });
        setErrorMsg("");
        setLoading(false);
        setIsLogin(true);
      } catch (err) {
        setErrorMsg(err.response.data.msg);
        setLoading(false);
      }
    };
    if (picPath) {
      CompleteRegister();
    }
  }, [picPath]); // eslint-disable-line

  const handleReset = async (values, onSubmitProps) => {
    const { email } = values;
    try {
      setLoading(true);
      const res = await axiosPublic.get("auth/createResetPassword", {
        params: { email },
      });
      console.log(res.data);
      // dispatch(setLogin({ user: res.data.user, token: res.data.accessToken }));
      onSubmitProps.resetForm();
      setErrorMsg("");
      setLoading(false);
      // navigate(from.pathname);
    } catch (err) {
      setErrorMsg(err.response.data.msg);
      setLoading(false);
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isReset) {
      return await handleReset(values, onSubmitProps);
    } else if (isLogin) {
      return await login(values, onSubmitProps);
    }
    await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={
        isReset
          ? initialValuesReset
          : isLogin
          ? initialValuesLogin
          : initialValuesRegister
      }
      validationSchema={
        isReset ? resetSchema : isLogin ? loginSchema : registerSchema
      }
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Typography mb={2} color="error" variant="h4">
            {errorMsg && errorMsg}
          </Typography>
          <Grid container spacing={2}>
            {isReset ? (
              <LoginForm
                values={values}
                errors={errors}
                touched={touched}
                handleBlur={handleBlur}
                handleChange={handleChange}
                isReset={isReset}
              />
            ) : isLogin ? (
              <LoginForm
                values={values}
                errors={errors}
                touched={touched}
                handleBlur={handleBlur}
                handleChange={handleChange}
              />
            ) : (
              <RegisterForm
                values={values}
                errors={errors}
                touched={touched}
                handleBlur={handleBlur}
                handleChange={handleChange}
                isLogin={isLogin}
                setFieldValue={setFieldValue}
                setIsLogin={setIsLogin}
              />
            )}

            <Button
              type="submit"
              fullWidth
              disabled={loading}
              sx={{
                p: "0.6rem",
                m: "20px 0px 20px 16px ",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
              }}
            >
              {isReset ? "Send Email Otp" : isLogin ? "Login" : "Register"}
            </Button>
            <FlexBetween width={"100%"}>
              <Typography
                onClick={() => {
                  setIsLogin(!isLogin);
                  setIsReset(false);
                  setErrorMsg("");
                  resetForm();
                }}
                sx={{
                  textDecoration: "underline",
                  color: palette.primary.main,
                  cursor: "pointer",
                  ml: "16px",
                }}
              >
                {isLogin
                  ? "Don't have an account ? Sign Up here."
                  : "Already have an account ? Login here."}
              </Typography>
              {isLogin && !isReset && (
                <Typography
                  onClick={() => {
                    setIsReset(true);
                    setErrorMsg("");
                    resetForm();
                  }}
                  sx={{
                    textDecoration: "underline",
                    color: palette.primary.main,
                    cursor: "pointer",
                    ml: "16px",
                  }}
                >
                  Forget Password
                </Typography>
              )}
            </FlexBetween>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default AuthForm;
