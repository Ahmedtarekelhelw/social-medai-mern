// My Components
import FriendInfoSkeleton from "./FriendInfoSkeleton";

// MUI Components
import { Stack, useTheme } from "@mui/material";

const SearchUsersListSkeleton = () => {
  const { palette } = useTheme();
  return (
    <Stack
      backgroundColor={palette.background.alt}
      spacing={2}
      p={2}
      borderRadius={2}
    >
      <FriendInfoSkeleton />
    </Stack>
  );
};

export default SearchUsersListSkeleton;
