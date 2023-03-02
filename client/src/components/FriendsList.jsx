import { Fragment } from "react";

// My Components
import FriendInfo from "./FriendInfo";
import FriendInfoSkeleton from "./FriendInfoSkeleton";

// MUI Components
import { Stack, Typography, useTheme } from "@mui/material";

//Context
import { useFriendsContext } from "../context/FriendsContext";

// Redux
import { useSelector } from "react-redux";
import { users } from "../features/users/usersSlice";

const FriendsList = ({ profile }) => {
  const { palette } = useTheme();
  const { friends, loadFriends } = useSelector(users);
  const { addFriendLoading } = useFriendsContext();

  return (
    <Stack
      backgroundColor={palette.background.alt}
      spacing={2}
      p={2}
      borderRadius={2}
      boxShadow={1}
    >
      <Typography variant="h5" fontWeight="500">
        FriendsList
      </Typography>
      <Stack spacing={2}>
        {loadFriends ? (
          Array(3)
            .fill(<FriendInfoSkeleton />)
            .map((item, i) => <Fragment key={i}>{item}</Fragment>)
        ) : friends.length > 0 ? (
          friends.map((friend) => (
            <FriendInfo profile={profile} key={friend._id} friend={friend} />
          ))
        ) : friends.length === 0 && !addFriendLoading ? (
          <Typography>No Friends ): </Typography>
        ) : null}
        {addFriendLoading && <FriendInfoSkeleton />}
      </Stack>
    </Stack>
  );
};

export default FriendsList;
