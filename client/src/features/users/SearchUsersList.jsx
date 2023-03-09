// My Components
import FriendInfo from "./FriendInfo";

// Redux
import { useSelector } from "react-redux";
import { users } from "./usersSlice";

// MUI Components
import { Stack, useTheme } from "@mui/material";
import { Link } from "react-router-dom";

const SearchUsersList = () => {
  const { palette } = useTheme();
  const { searchUsers } = useSelector(users);

  return searchUsers.map((user) => (
    <Link to={`/profile/${user._id}`} key={user._id}>
      <Stack
        backgroundColor={palette.background.alt}
        spacing={2}
        p={2}
        borderRadius={2}
      >
        <FriendInfo friend={user} />
      </Stack>
    </Link>
  ));
};

export default SearchUsersList;
