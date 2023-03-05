// MUI Components
import { Box, Divider, Skeleton, Stack, useTheme } from "@mui/material";

const UserInfoSkeleton = ({ profile }) => {
  const { palette } = useTheme();

  return (
    <Stack
      backgroundColor={palette.background.alt}
      p={2}
      borderRadius={2}
      gap={2}
      mb={profile && "15px"}
    >
      <Stack direction="row" gap={2}>
        <Skeleton variant="circular" width={40} height={40} />
        <Box>
          <Skeleton variant="text" width={150} sx={{ fontSize: "0.8rem" }} />
          <Skeleton variant="text" width={100} sx={{ fontSize: "0.8rem" }} />
        </Box>
      </Stack>
      <Divider />
      <Skeleton variant="text" width={200} sx={{ fontSize: "0.8rem" }} />
      <Skeleton variant="text" width={200} sx={{ fontSize: "0.8rem" }} />
      <Divider />
      <Skeleton variant="text" width={200} sx={{ fontSize: "0.8rem" }} />
      <Skeleton variant="text" width={200} sx={{ fontSize: "0.8rem" }} />
    </Stack>
  );
};

export default UserInfoSkeleton;
