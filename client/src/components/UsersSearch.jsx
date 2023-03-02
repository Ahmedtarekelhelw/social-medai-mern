import { Fragment, useEffect, useState } from "react";

// My Components
import SearchUsersList from "./SearchUsersList";
import SearchUsersListSkeleton from "./SearchUsersListSkeleton";

// Api
import axiosInstance from "../axiosInstance";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { endLoading, posts, startLoading } from "../features/posts/postsSlice";
import { setSearchUser, users } from "../features/users/usersSlice";

// MUI Components
import { Stack, Typography, useTheme } from "@mui/material";

const UsersSearch = ({ url, params }) => {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const dispatch = useDispatch();
  const [loadingMore, setLoadingMore] = useState(false);
  const { searchUsers } = useSelector(users);
  const { loading } = useSelector(posts);
  const { palette } = useTheme();

  // Watch Scrolling If reach to bottom
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      if (scrollTop + clientHeight >= scrollHeight && hasMore) {
        setLoadingMore(true);
        setPage(page + 1);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [page, hasMore]);

  // To Get Users Search
  useEffect(() => {
    const getUsersSearch = async () => {
      try {
        dispatch(startLoading());
        const res = await axiosInstance.get(url, { params });
        setHasMore(res.data.hasMore);
        dispatch(
          setSearchUser({
            users: res.data.users,
          })
        );
        dispatch(endLoading());
      } catch (error) {
        console.log(error);
        dispatch(endLoading());
      }
    };
    getUsersSearch();
  }, [dispatch, params, url]); //eslint-disable-line

  // To get More Posts When Scrolling to bottom
  useEffect(() => {
    const getMoreResult = async () => {
      const res = await axiosInstance.get(url, {
        params: { page, ...params },
      });
      setHasMore(res.data.hasMore);
      dispatch(
        setSearchUser({
          users: [...searchUsers, ...res.data.users],
        })
      );
      setLoadingMore(false);
    };
    if (page !== 1) getMoreResult();
  }, [dispatch, page]); //eslint-disable-line

  return (
    <Stack spacing={2}>
      {loading ? (
        Array(3)
          .fill(<SearchUsersListSkeleton />)
          .map((item, i) => <Fragment key={i}>{item}</Fragment>)
      ) : searchUsers.length > 0 ? (
        <SearchUsersList />
      ) : (
        <Stack
          backgroundColor={palette.background.alt}
          spacing={2}
          p={2}
          borderRadius={2}
        >
          <Typography variant="h4" textAlign="center">
            No Users ):
          </Typography>
        </Stack>
      )}
      {loadingMore &&
        Array(2)
          .fill(<SearchUsersListSkeleton />)
          .map((item, i) => <Fragment key={i}>{item}</Fragment>)}
    </Stack>
  );
};

export default UsersSearch;
