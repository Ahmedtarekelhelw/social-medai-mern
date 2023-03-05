import { Typography } from "@mui/material";

const InputError = ({ children }) => {
  return (
    <Typography color="error" mt={1}>
      {children}
    </Typography>
  );
};

export default InputError;
