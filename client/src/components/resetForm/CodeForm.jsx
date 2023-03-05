import { Button, TextField, useTheme } from "@mui/material";

import { ErrorMessage, Field, Form } from "formik";
import React from "react";
import InputError from "../InputError";

const CodeForm = ({ isValid, isSubmitting }) => {
  const { palette } = useTheme();
  return (
    <Form>
      <Field label="Code" name="code" fullWidth as={TextField} />
      <ErrorMessage name="code" component={InputError} />
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
        Verfiy Code
      </Button>
    </Form>
  );
};

export default CodeForm;
