import { useState } from "react";

//Api
import { axiosPublic } from "../../axiosInstance";

// Formik
import { Formik } from "formik";
import {
  codeSchema,
  passwordsSchema,
  resetInitialValues,
  resetSchema,
} from "../../formik";

// My Components
import CodeForm from "./CodeForm";
import EmailFrom from "./EmailFrom";
import PasswordForm from "./PasswordForm";

const ResetForm = ({ setIsReset, setErrorMsg }) => {
  const [step, setStep] = useState(1);

  const SendMail = async (values) => {
    const { email } = values;
    try {
      const res = await axiosPublic.get("auth/createResetPassword", {
        params: { email },
      });
      console.log(res.data);
      setErrorMsg("");
      setStep((prev) => prev + 1);
    } catch (err) {
      setErrorMsg(err.response.data.msg);
    }
  };

  const verifyCode = async (values) => {
    const { code } = values;
    try {
      await axiosPublic.get("auth/verifyOtp", { params: { code } });
      setErrorMsg("");
      setStep((prev) => prev + 1);
    } catch (err) {
      setErrorMsg(err.response.data.msg);
    }
  };

  const resetPassword = async (values) => {
    const { password } = values;
    try {
      await axiosPublic.patch("auth/resetPassword", {
        password,
      });
      setErrorMsg("");
      setIsReset(false);
    } catch (err) {
      console.log(err.response);
      setErrorMsg(err.response.data.msg);
    }
  };

  const handleSubmit = async (values, onSubmitProps) => {
    if (step === 1) {
      return await SendMail(values, onSubmitProps);
    } else if (step === 2) {
      return await verifyCode(values);
    }
    return await resetPassword(values, onSubmitProps);
  };
  return (
    <Formik
      initialValues={resetInitialValues}
      onSubmit={handleSubmit}
      validationSchema={
        step === 1 ? resetSchema : step === 2 ? codeSchema : passwordsSchema
      }
      validateOnMount
    >
      {(formik) => {
        const { isValid, isSubmitting } = formik;
        if (step === 1)
          return <EmailFrom isValid={isValid} isSubmitting={isSubmitting} />;
        if (step === 2)
          return <CodeForm isValid={isValid} isSubmitting={isSubmitting} />;

        return <PasswordForm isValid={isValid} isSubmitting={isSubmitting} />;
      }}
    </Formik>
  );
};

export default ResetForm;
