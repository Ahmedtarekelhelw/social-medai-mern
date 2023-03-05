import { Box, Button, Stack, TextField, useTheme } from "@mui/material";
import { ErrorMessage, Field, Form } from "formik";
import React from "react";
import InputError from "../InputError";

const PasswordForm = ({ isValid, isSubmitting }) => {
  const { palette } = useTheme();
  return (
    <Form>
      <Stack spacing={2}>
        <Box>
          <Field
            label="Password"
            name="password"
            fullWidth
            type="password"
            as={TextField}
          />
          <ErrorMessage name="password" component={InputError} />
        </Box>
        <Box>
          <Field
            label="Confirm Password"
            name="confirmPassword"
            fullWidth
            as={TextField}
            type="password"
          />
          <ErrorMessage name="confirmPassword" component={InputError} />
        </Box>
      </Stack>
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
        Change Password
      </Button>
    </Form>
  );
};

export default PasswordForm;
