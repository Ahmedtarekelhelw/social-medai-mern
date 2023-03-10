import { Divider, Typography } from "@mui/material";
import FlexBetween from "../components/FlexBetween";

const NotFound = () => {
  return (
    <FlexBetween
      height="calc(100vh - 80px)"
      justifyContent="center !important"
      gap={2}
    >
      <Typography variant="h4">404</Typography>
      <Divider orientation="vertical" sx={{ height: "60px" }} />
      <Typography variant="h4">This page could not be found.</Typography>
    </FlexBetween>
  );
};

export default NotFound;
