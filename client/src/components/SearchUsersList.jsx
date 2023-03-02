// My Components
import FriendInfo from "./FriendInfo";

// Redux
import { useSelector } from "react-redux";
import { users } from "../features/users/usersSlice";

// MUI Components
import { Stack, useTheme } from "@mui/material";

const SearchUsersList = () => {
  const { palette } = useTheme();
  const { searchUsers } = useSelector(users);

  return searchUsers.map((user) => (
    <Stack
      key={user._id}
      backgroundColor={palette.background.alt}
      spacing={2}
      p={2}
      borderRadius={2}
    >
      <FriendInfo friend={user} />
    </Stack>
  ));
};

export default SearchUsersList;
