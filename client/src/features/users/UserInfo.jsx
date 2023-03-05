import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// My Components
import UserInfoSkeleton from "../../components/skeleton/UserInfoSkeleton";
import FlexBetween from "../../components/FlexBetween";

// Api
import axiosInstance from "../../axiosInstance";

//Redux
import { useSelector } from "react-redux";
import { users } from "./usersSlice";

// MUI Components
import {
  Avatar,
  Box,
  ButtonBase,
  Divider,
  Typography,
  useTheme,
} from "@mui/material";

// Material Icons
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";

const UserInfo = ({ profile, userId }) => {
  const navigate = useNavigate();
  const { palette } = useTheme();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});

  const { user: currentUser, friends } = useSelector(users);

  const info = profile ? user : currentUser;

  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);

      const res = await axiosInstance.get(`users/${userId}`);
      setUser({ ...res.data });
      setLoading(false);
    };
    if (profile) getUser();
  }, [userId, profile]);

  if (loading) return <UserInfoSkeleton profile />;

  return (
    <ButtonBase
      sx={{
        width: "100%",
        display: "block",
        padding: "20px",
        borderRadius: "10px",
        boxShadow:
          "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
        marginBottom: `${profile && "15px"}`,
        backgroundColor: palette.background.alt,
      }}
      onClick={() => navigate(`/profile/${info._id}`)}
    >
      <FlexBetween pb={2}>
        <FlexBetween gap={2}>
          <Avatar
            sx={{ width: "60px", height: "60px" }}
            alt={info.firstName}
            src={info.picturePath}
          />
          <Box textAlign="left">
            <Typography variant="h4" color={dark} fontWeight="500">
              {info.firstName} {info.lastName}
            </Typography>
            <Typography color={medium}>
              {friends.length > 0 ? friends.length : "No"}{" "}
              {friends.length === 1 ? "Friend" : "Friends"}
            </Typography>
          </Box>
        </FlexBetween>

        <ManageAccountsIcon />
      </FlexBetween>

      <Divider />

      <Box py={2}>
        <FlexBetween gap={1} justifyContent="flex-start !important" pb={1}>
          <LocationOnOutlinedIcon fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{info.location}</Typography>
        </FlexBetween>
        <FlexBetween gap={1} justifyContent="flex-start !important">
          <WorkOutlineOutlinedIcon fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{info.occupation}</Typography>
        </FlexBetween>
      </Box>

      <Divider />

      <Box pt={2}>
        <FlexBetween gap={1} pb={1}>
          <Typography color={medium}>Who's viewed your profile</Typography>
          <Typography color={main} fontWeight="500">
            {info.viewedProfile || 1200}
          </Typography>
        </FlexBetween>
        <FlexBetween gap={1}>
          <Typography color={medium}>Impressions of your post</Typography>
          <Typography color={main} fontWeight="500">
            {info.impressions || 200}
          </Typography>
        </FlexBetween>
      </Box>
    </ButtonBase>
  );
};

export default UserInfo;
