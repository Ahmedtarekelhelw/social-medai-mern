import { Button, TextField, useTheme } from "@mui/material";
import { ErrorMessage, Field, Form } from "formik";
import React from "react";
import InputError from "../InputError";

const EmailFrom = ({ isValid, isSubmitting }) => {
  const { palette } = useTheme();
  return (
    <Form>
      <Field label="Email" name="email" fullWidth as={TextField} />
      <ErrorMessage name="email" component={InputError} />

      <Button
        type="submit"
        fullWidth
        disabled={!isValid || isSubmitting}
        sx={{
          p: "0.6rem",
          mt: "20px",
          backgroundColor: palette.primary.main,
          color: palette.background.alt,
        }}
      >
        Send Code To Your Email
      </Button>
    </Form>
  );
};

export default EmailFrom;
