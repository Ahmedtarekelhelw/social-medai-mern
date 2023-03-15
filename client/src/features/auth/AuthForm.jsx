import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// My Components
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

// Api
import axiosInstance from "../../axiosInstance";

// Redux
import { useDispatch } from "react-redux";
import { setLogin } from "./authSlice";

// MUI Components

// Formik
import { Formik } from "formik";
import { initialValues, loginSchema, registerSchema } from "../../formik";

const AuthForm = ({ setIsReset, setErrorMsg }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    state: { from },
  } = useLocation();
  const [formData, setFormData] = useState();
  const [picPath, setPicPath] = useState("");
  const [loading, setLoading] = useState(false);

  const [isLogin, setIsLogin] = useState(true);

  const login = async (values) => {
    const { email, password } = values;
    try {
      const res = await axiosInstance.post("auth/login", { email, password });
      dispatch(setLogin({ user: res.data.user, token: res.data.accessToken }));
      setErrorMsg("");
      navigate(from.pathname);
    } catch (err) {
      setErrorMsg(err.response?.data?.msg);
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

  const register = async (values) => {
    const { picture, ...others } = values;
    setFormData(others);
    if (values.picture) {
      setLoading(true);
      return await upload(values.picture);
    }
    try {
      await axiosInstance.post("auth/register", values);
      setErrorMsg("");
      setIsLogin(true);
    } catch (err) {
      setErrorMsg(err.response.data.msg);
    }
  };

  useEffect(() => {
    const CompleteRegister = async () => {
      try {
        await axiosInstance.post("auth/register", {
          ...formData,
          picturePath: picPath,
        });
        setErrorMsg("");
        setIsLogin(true);
        setLoading(false);
      } catch (err) {
        setErrorMsg(err.response.data.msg);
        setLoading(false);
      }
    };
    if (picPath) {
      CompleteRegister();
    }
  }, [picPath]); // eslint-disable-line

  const handleFormSubmit = async (values) => {
    if (isLogin) return await login(values);
    await register(values);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validationSchema={isLogin ? loginSchema : registerSchema}
      validateOnMount
    >
      {(formik) => {
        const {
          setFieldValue,
          values: { picture },
          isValid,
          isSubmitting,
          resetForm,
        } = formik;
        if (isLogin)
          return (
            <LoginForm
              isValid={isValid}
              isSubmitting={isSubmitting}
              setIsLogin={setIsLogin}
              setIsReset={setIsReset}
              setErrorMsg={setErrorMsg}
              resetForm={resetForm}
              isLogin={isLogin}
            />
          );

        return (
          <RegisterForm
            setFieldValue={setFieldValue}
            picture={picture}
            isValid={isValid}
            isSubmitting={isSubmitting}
            setIsLogin={setIsLogin}
            setIsReset={setIsReset}
            setErrorMsg={setErrorMsg}
            resetForm={resetForm}
            isLogin={isLogin}
            loading={loading}
          />
        );
      }}
    </Formik>
  );
};

export default AuthForm;
