// My Components
import LoginForm from "./LoginForm";
import ImageInput from "../../components/ImageInput";
import InputError from "../../components/InputError";

// MUI Components
import { Grid, TextField, useTheme } from "@mui/material";

// Formik Components
import { ErrorMessage, Field } from "formik";

const RegisterForm = ({
  picture,
  setFieldValue,
  setIsLogin,
  isValid,
  isSubmitting,
  setIsReset,
  setErrorMsg,
  resetForm,
  isLogin,
}) => {
  const { palette } = useTheme();
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Field label="First Name" fullWidth name="firstName" as={TextField} />
        <ErrorMessage name="firstName" component={InputError} />
      </Grid>

      <Grid item xs={12} sm={6}>
        <Field label="Last Name" name="lastName" fullWidth as={TextField} />
        <ErrorMessage name="lastName" component={InputError} />
      </Grid>

      <Grid item xs={12}>
        <Field label="Location" name="location" fullWidth as={TextField} />
        <ErrorMessage name="location" component={InputError} />
      </Grid>

      <Grid item xs={12}>
        <Field label="Occupation" name="occupation" fullWidth as={TextField} />
        <ErrorMessage name="occupation" component={InputError} />
      </Grid>

      <Grid
        item
        xs={12}
        border={`1px solid ${palette.neutral.medium}`}
        borderRadius="5px"
        p="1rem"
        ml="16px"
        mt={2}
      >
        <Field
          label="Picture"
          name="picture"
          as={ImageInput}
          setFieldValue={setFieldValue}
          picture={picture}
        />
        <ErrorMessage name="picture" component={InputError} />
      </Grid>

      <Grid item xs={12}>
        <LoginForm
          setIsLogin={setIsLogin}
          isValid={isValid}
          isSubmitting={isSubmitting}
          setIsReset={setIsReset}
          setErrorMsg={setErrorMsg}
          resetForm={resetForm}
          isLogin={isLogin}
        />
      </Grid>
    </Grid>
  );
};

export default RegisterForm;
