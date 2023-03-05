// MUI Components
import { Box, Skeleton, Stack } from "@mui/material";

const FriendInfoSkeleton = () => {
  return (
    <Stack direction="row" gap={2}>
      <Skeleton variant="circular" width={40} height={40} />
      <Box>
        <Skeleton variant="text" width={150} sx={{ fontSize: "0.8rem" }} />
        <Skeleton variant="text" width={100} sx={{ fontSize: "0.8rem" }} />
      </Box>
    </Stack>
  );
};

export default FriendInfoSkeleton;
