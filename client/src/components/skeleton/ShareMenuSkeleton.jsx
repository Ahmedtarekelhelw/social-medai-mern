import { Box, Skeleton, useTheme } from "@mui/material";

const ShareMenuSkeleton = () => {
  const { palette } = useTheme();
  return (
    <Box
      position="absolute"
      display="flex"
      direction="row"
      bottom={"100%"}
      right={0}
      zIndex={3}
      backgroundColor={palette.background.alt}
      boxShadow={4}
      borderRadius={2}
      p={1}
      gap={1}
    >
      <Skeleton variant="text" width={200} sx={{ fontSize: "0.8rem" }} />
    </Box>
  );
};

export default ShareMenuSkeleton;
