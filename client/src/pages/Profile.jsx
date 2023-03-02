import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

// My Components
import Share from "../components/Share";
import Posts from "../components/Posts";
import UserInfo from "../components/UserInfo";
import FriendsList from "../components/FriendsList";

// MUI Components
import { Grid, useMediaQuery, useTheme } from "@mui/material";

// Custom Hooks
import useGetFriends from "../hooks/useGetFriends";

// Redux
import { useSelector } from "react-redux";
import { users } from "../features/users/usersSlice";

const Profile = () => {
  const theme = useTheme();
  const { pathname } = useLocation();

  const { id } = useParams();
  const { getFriends } = useGetFriends(id);

  const { user } = useSelector(users);
  const tablet = useMediaQuery(theme.breakpoints.down("md"));
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (id) getFriends();
  }, [id]); // eslint-disable-line

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return (
    <Grid container gap={2} mt={2} px={tablet ? 2 : 4} justifyContent="center">
      <Grid
        item
        xs={12}
        sm={4}
        md={3}
        mb={!mobile && 2}
        position={!mobile && "sticky"}
        top={!mobile && "96px"}
        height={!mobile && "fit-content"}
      >
        <UserInfo profile userId={id} />
        <FriendsList profile />
      </Grid>
      <Grid item xs={12} sm={7} md={6} mb={2}>
        {user._id === id && <Share />}

        <Posts url={`posts/${id}`} profile />
      </Grid>
    </Grid>
  );
};

export default Profile;
