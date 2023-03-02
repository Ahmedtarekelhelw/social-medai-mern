// MUI Components
import { Grid, TextField } from "@mui/material";

const LoginForm = ({
  values,
  handleChange,
  handleBlur,
  touched,
  errors,
  isReset,
}) => {
  return (
    <>
      <Grid item xs={12}>
        <TextField
          label="Email"
          name="email"
          value={values.email}
          fullWidth
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(touched.email) && Boolean(errors.email)}
          helperText={touched.email && errors.email}
        />
      </Grid>
      {!isReset && (
        <Grid item xs={12}>
          <TextField
            label="Password"
            type="password"
            fullWidth
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(touched.password) && Boolean(errors.password)}
            helperText={touched.password && errors.password}
          />
        </Grid>
      )}
    </>
  );
};

export default LoginForm;
