// MUI Components
import { Box, CircularProgress } from "@mui/material";

const SuspenseSkeleton = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="calc(100vh - 80px)"
    >
      <CircularProgress />
    </Box>
  );
};

export default SuspenseSkeleton;
