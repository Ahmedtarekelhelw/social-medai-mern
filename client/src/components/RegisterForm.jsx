import Dropzone from "react-dropzone";

// My Components
import FlexBetween from "./FlexBetween";
import LoginForm from "./LoginForm";

// MUI Components
import { Grid, TextField, Typography, Box, useTheme } from "@mui/material";

// Material Icons
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

const RegisterForm = ({
  values,
  handleBlur,
  handleChange,
  touched,
  errors,
  setFieldValue,
}) => {
  const { palette } = useTheme();
  return (
    <>
      <Grid item xs={12} sm={6}>
        <TextField
          label="First Name"
          onBlur={handleBlur}
          onChange={handleChange}
          fullWidth
          value={values.firstName}
          name="firstName"
          error={Boolean(touched.firstName) && Boolean(errors.firstName)}
          helperText={touched.firstName && errors.firstName}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Last Name"
          name="lastName"
          value={values.lastName}
          onChange={handleChange}
          fullWidth
          onBlur={handleBlur}
          error={Boolean(touched.lastName) && Boolean(errors.lastName)}
          helperText={touched.lastName && errors.lastName}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Location"
          onBlur={handleBlur}
          onChange={handleChange}
          fullWidth
          value={values.location}
          name="location"
          error={Boolean(touched.location) && Boolean(errors.location)}
          helperText={touched.location && errors.location}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Occupation"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.occupation}
          fullWidth
          name="occupation"
          error={Boolean(touched.occupation) && Boolean(errors.occupation)}
          helperText={touched.occupation && errors.occupation}
        />
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
        <Dropzone
          acceptedFiles=".jpg,.jpeg,.png"
          multiple={false}
          onDrop={(acceptedFiles) => {
            setFieldValue("picture", acceptedFiles[0]);
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <Box
              {...getRootProps()}
              border={`2px dashed ${palette.primary.main}`}
              p="0.4rem 0.6rem"
              sx={{ "&:hover": { cursor: "pointer" } }}
            >
              <input {...getInputProps()} />
              {!values.picture ? (
                <p>Add Picture Here</p>
              ) : (
                <FlexBetween>
                  <Typography>{values.picture.name}</Typography>
                  <EditOutlinedIcon />
                </FlexBetween>
              )}
            </Box>
          )}
        </Dropzone>
      </Grid>

      <LoginForm
        values={values}
        errors={errors}
        touched={touched}
        handleBlur={handleBlur}
        handleChange={handleChange}
      />
    </>
  );
};

export default RegisterForm;
