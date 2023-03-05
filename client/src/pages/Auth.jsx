import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import AuthForm from "../features/auth/AuthForm";
import ResetForm from "../components/resetForm/ResetForm";
import { useState } from "react";

const Auth = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width: 1000px)");
  const [isReset, setIsReset] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  return (
    <Stack mb={2}>
      <Box
        backgroundColor={theme.palette.background.alt}
        margin="20px auto"
        padding="20px"
        borderRadius="10px"
        width={isMobile ? "95%" : "50%"}
      >
        <Typography
          fontWeight="500"
          variant="h5"
          sx={{ mb: "1.5rem" }}
          textAlign="center"
        >
          Welcome to Sociality
        </Typography>
        <Typography mb={2} color="error" variant="h4">
          {errorMsg && errorMsg}
        </Typography>
        {isReset ? (
          <ResetForm
            setIsReset={setIsReset}
            errorMsg={errorMsg}
            setErrorMsg={setErrorMsg}
          />
        ) : (
          <AuthForm
            setIsReset={setIsReset}
            errorMsg={errorMsg}
            setErrorMsg={setErrorMsg}
          />
        )}
      </Box>
    </Stack>
  );
};

export default Auth;
