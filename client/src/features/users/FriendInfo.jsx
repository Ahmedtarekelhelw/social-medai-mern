import { useLocation } from "react-router-dom";

// My Components
import FlexBetween from "../../components/FlexBetween";

// Api
import axiosInstance from "../../axiosInstance";

//Context
import { useFriendsContext } from "../../context/FriendsContext";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { removeUserFriends, setFriends, users } from "./usersSlice";

// MUI Components
import {
  Avatar,
  Box,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

// Material Icons
import PersonRemoveAlt1OutlinedIcon from "@mui/icons-material/PersonRemoveAlt1Outlined";

const FriendInfo = ({ friend, profile }) => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const {
    user: { _id, friends },
  } = useSelector(users);
  const { pathname } = useLocation();
  const profileId = pathname.split("/")[2];
  const { friendsIds, setFriendsIds } = useFriendsContext();

  const handleFriend = async () => {
    try {
      if (friendsIds.includes(friend._id)) {
        setFriendsIds(friends.filter((friendId) => friendId !== friend._id));
        dispatch(removeUserFriends(friend._id));
      }
      const res = await axiosInstance.patch(`users/${_id}/${friend._id}`);
      dispatch(setFriends(res.data._id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <FlexBetween key={friend._id}>
      <Stack direction="row" spacing={1}>
        <Avatar alt={friend.firstName} src={friend.picturePath} />
        <Box>
          <Typography variant="h5" fontWeight="500">
            {friend.firstName} {friend.lastName}
          </Typography>
          <Typography>{friend.location}</Typography>
        </Box>
      </Stack>
      {profile ? (
        profileId === _id && (
          <IconButton
            onClick={handleFriend}
            sx={{
              backgroundColor: palette.primary.light,
            }}
          >
            <PersonRemoveAlt1OutlinedIcon
              sx={{ color: palette.primary.dark }}
            />
          </IconButton>
        )
      ) : (
        <IconButton
          onClick={handleFriend}
          sx={{
            backgroundColor: palette.primary.light,
          }}
        >
          <PersonRemoveAlt1OutlinedIcon sx={{ color: palette.primary.dark }} />
        </IconButton>
      )}
    </FlexBetween>
  );
};

export default FriendInfo;
