import { Avatar, Box, Stack, Typography } from "@mui/material";

const Comment = ({ c }) => {
  return (
    <Stack direction="row" gap={2} alignItems="center">
      <Avatar
        sx={{ width: "35px", height: "35px" }}
        src={c?.postedBy?.picturePath}
        alt={c?.postedBy?.fistName}
      />
      <Box>
        <Typography variant="h4" fontSize={18}>
          {c?.postedBy?.firstName + " " + c?.postedBy?.lastName}
        </Typography>
        <Typography fontSize={13}>{c.text}</Typography>
      </Box>
    </Stack>
  );
};

export default Comment;
