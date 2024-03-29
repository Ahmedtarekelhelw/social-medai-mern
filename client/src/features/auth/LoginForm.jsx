// MUI Components
import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Field, ErrorMessage, Form } from "formik";
import FlexBetween from "../../components/FlexBetween";
import InputError from "../../components/InputError";

const LoginForm = ({
  isValid,
  isSubmitting,
  setIsLogin,
  setIsReset,
  setErrorMsg,
  resetForm,
  isLogin,
  loading,
}) => {
  const { palette } = useTheme();
  const mobile = useMediaQuery("(max-width:500px)");

  const style = {
    flexDirection: "column",
    alignItems: "flex-start !important",
    gap: "15px",
  };

  return (
    <Form>
      <Box mb={2}>
        <Field label="Email" name="email" fullWidth as={TextField} />
        <ErrorMessage name="email" component={InputError} />
      </Box>

      <Box>
        <Field
          label="Password"
          type="password"
          fullWidth
          name="password"
          as={TextField}
        />
        <ErrorMessage name="password" component={InputError} />
      </Box>

      <Button
        type="submit"
        fullWidth
        disabled={!isValid || isSubmitting || loading}
        sx={{
          p: "0.6rem",
          my: "20px ",
          backgroundColor: palette.primary.main,
          color: palette.background.alt,
        }}
      >
        {isLogin ? "Login" : "Register"}
      </Button>

      <FlexBetween width={"100%"} sx={mobile && style}>
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
          }}
        >
          {isLogin
            ? "Don't have an account ? Sign Up here."
            : "Already have an account ? Login here."}
        </Typography>
        {isLogin && (
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
            }}
          >
            Forget Password
          </Typography>
        )}
      </FlexBetween>
    </Form>
  );
};

export default LoginForm;
