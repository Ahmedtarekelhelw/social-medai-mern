// MUI Components
import { Box, Skeleton, Stack, useMediaQuery, useTheme } from "@mui/material";

const PostSkeleton = () => {
  const { palette, breakpoints } = useTheme();
  const isMobile = useMediaQuery(breakpoints.down("sm"));
  return (
    <Stack
      backgroundColor={palette.background.alt}
      p={2}
      borderRadius={2}
      gap={1}
      height={isMobile ? 450 : 500}
    >
      <Stack direction="row" gap={2}>
        <Skeleton variant="circular" width={50} height={50} />
        <Box>
          <Skeleton variant="text" width={150} sx={{ fontSize: "1rem" }} />
          <Skeleton variant="text" width={100} sx={{ fontSize: "1rem" }} />
        </Box>
      </Stack>
      <Skeleton variant="text" width={200} sx={{ fontSize: "1rem" }} />
      <Skeleton variant="rounded" width="100%" height="100%" />
    </Stack>
  );
};

export default PostSkeleton;
