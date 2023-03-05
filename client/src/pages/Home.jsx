import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// My Components
import Share from "../features/posts/Share";
import Posts from "../features/posts/Posts";
import UserInfo from "../features/users/UserInfo";
import FriendsList from "../features/users/FriendsList";

// MUI Components
import { Grid, useMediaQuery, useTheme } from "@mui/material";

// Custom Hooks
import useGetFriends from "../hooks/useGetFriends";

// Redux
import { useSelector } from "react-redux";
import { users } from "../features/users/usersSlice";

const Home = () => {
  const theme = useTheme();
  const { pathname } = useLocation();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const {
    user: { _id },
  } = useSelector(users);

  const { getFriends } = useGetFriends(_id);

  useEffect(() => {
    if (_id) getFriends();
  }, [_id]); // eslint-disable-line

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return (
    <Grid container gap={2} mt={2} px={matches ? 2 : 4} justifyContent="center">
      <Grid
        item
        xs={12}
        md={3}
        position={!matches && "sticky"}
        top={!matches && "96px"}
        height={!matches && "fit-content"}
      >
        <UserInfo />
      </Grid>
      <Grid item xs={12} md={5} mb={2}>
        <Share />
        <Posts url={"posts"} />
      </Grid>
      {!matches && (
        <Grid
          item
          xs={12}
          md={3}
          position="sticky"
          top="96px"
          height="fit-content"
        >
          <FriendsList />
        </Grid>
      )}
    </Grid>
  );
};

export default Home;
