import { useEffect, useState } from "react";

// My Components
import PostSkeleton from "../../components/skeleton/PostSkeleton";
import Post from "./Post";

// Api
import axiosInstance from "../../axiosInstance";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { endLoading, setPosts, startLoading } from "./postsSlice";
import { posts as reduxPosts } from "./postsSlice";

// MUI Components
import { Box, Stack, Typography, useTheme, Collapse } from "@mui/material";

import { TransitionGroup } from "react-transition-group";

const Posts = ({ url, profile, params }) => {
  const { palette } = useTheme();
  const { posts, loading } = useSelector(reduxPosts);
  const [page, setPage] = useState(1);

  const [hasMore, setHasMore] = useState(false);
  const dispatch = useDispatch();
  const [loadingMore, setLoadingMore] = useState(false);

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

    // this to target scroll on mobile view
    const OnTouch = () => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      if (scrollTop + clientHeight + 65 >= scrollHeight && hasMore) {
        setLoadingMore(true);
        setPage(page + 1);
      }
    };

    window.addEventListener("touchmove", OnTouch);
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("touchmove", OnTouch);
    };
  }, [page, hasMore]);

  // To Get Posts On Every Page
  useEffect(() => {
    const getPosts = async () => {
      try {
        dispatch(startLoading());
        const res = await axiosInstance.get(url, { params });
        setHasMore(res.data.hasMore);
        dispatch(
          setPosts({
            posts: res.data.posts,
          })
        );
        dispatch(endLoading());
      } catch (error) {
        dispatch(endLoading());
      }
    };

    getPosts();
  }, [dispatch, profile, params, url]); //eslint-disable-line

  // To get More Posts When Scrolling to bottom
  useEffect(() => {
    const getMorePosts = async () => {
      const res = await axiosInstance.get(url, {
        params: { page, ...params },
      });
      setHasMore(res.data.hasMore);
      dispatch(
        setPosts({
          posts: [...posts, ...res.data.posts],
        })
      );
      setLoadingMore(false);
    };
    if (page !== 1) getMorePosts();
  }, [profile, page]); //eslint-disable-line

  return (
    <Stack spacing={2}>
      {loading ? (
        Array(5)
          .fill(<PostSkeleton />)
          .map((item, i) => <Box key={i}>{item}</Box>)
      ) : posts.length > 0 ? (
        <TransitionGroup>
          {posts?.map((p) => (
            <Collapse
              key={p._id}
              sx={{ "&:not(&:last-child)": { marginBottom: "16px" } }}
            >
              <Post key={p._id} post={p} profile={profile} />
            </Collapse>
          ))}
        </TransitionGroup>
      ) : (
        <Box
          padding="20px"
          borderRadius="10px"
          backgroundColor={palette.background.alt}
          textAlign="center"
        >
          <Typography variant="h4">There is No Posts</Typography>
        </Box>
      )}
      {loadingMore &&
        Array(2)
          .fill(<PostSkeleton />)
          .map((item, i) => <Box key={i}>{item}</Box>)}
    </Stack>
  );
};

export default Posts;
