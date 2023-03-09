import { Box, Skeleton } from "@mui/material";
import React from "react";

const CommentsSkeleton = () => {
  return (
    <Box>
      <Skeleton variant="text" width={"100%"} sx={{ fontSize: "0.8rem" }} />
    </Box>
  );
};

export default CommentsSkeleton;
