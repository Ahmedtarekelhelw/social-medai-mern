import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import AuthForm from "../components/AuthForm";

const Auth = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width: 1000px)");
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
        <AuthForm />
      </Box>
    </Stack>
  );
};

export default Auth;
