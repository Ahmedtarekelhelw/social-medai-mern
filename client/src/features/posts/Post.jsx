import React, { Suspense, useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";

// My Components
import FlexBetween from "../../components/FlexBetween";

// Api
import axiosInstance from "../../axiosInstance";

//Context
import { useFriendsContext } from "../../context/FriendsContext";
import { useModeContext } from "../../context/DarkmodeContext";
import { usePostContext } from "../../context/PostContext";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  addUserFriends,
  removeUserFriends,
  setFriends,
  users,
} from "../users/usersSlice";
import { deletePost, updatePost } from "./postsSlice";

// MUI Components
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

// Material Icons
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import PersonRemoveAlt1OutlinedIcon from "@mui/icons-material/PersonRemoveAlt1Outlined";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ShareMenuSkeleton from "../../components/skeleton/ShareMenuSkeleton";
import CommentsSkeleton from "../../components/skeleton/CommentsSkeleton";

const Comments = React.lazy(() => import("../../components/Comments"));
const ShareMenu = React.lazy(() => import("../../components/ShareMenu"));

const Post = ({ post, profile }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const {
    user: { friends, _id },
  } = useSelector(users);
  const { mode } = useModeContext();
  const { user } = useSelector(users);
  const [open, setOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [openComment, setOpenComment] = useState(false);

  const { friendsIds, setFriendsIds, setAddFriendLoading } =
    useFriendsContext();

  const { setPost, setDesc, setPicPath } = usePostContext();

  let like = Boolean(post.likes[_id]);
  const handleFriend = async () => {
    try {
      if (friendsIds.includes(post.userId._id)) {
        if (profile) {
          dispatch(removeUserFriends(_id));
        } else {
          dispatch(removeUserFriends(post.userId._id));
        }
        setFriendsIds(
          friends.filter((friendId) => friendId !== post.userId._id)
        );
      } else {
        setAddFriendLoading(true);
        setFriendsIds([...friendsIds, post.userId._id]);
      }
      const res = await axiosInstance.patch(`users/${_id}/${post.userId._id}`);
      if (!friendsIds.includes(post.userId._id)) {
        profile
          ? dispatch(addUserFriends(user))
          : dispatch(addUserFriends(res.data));
      }
      dispatch(setFriends(res.data._id));
      setAddFriendLoading(false);
    } catch (err) {
      console.log(err);
      setAddFriendLoading(false);
    }
  };

  const handleDelete = async () => {
    // I do this incase the user click to edit then delete the post before edit it
    setPost(null);
    setDesc("");
    setPicPath("");
    try {
      await axiosInstance.delete(`posts/${post._id}`);
      dispatch(deletePost({ id: post._id }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = () => {
    setPost(post);
    setDesc(post.description);
    setPicPath(post.picturePath);
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLike = async () => {
    try {
      const res = await axiosInstance.patch(`posts/${post._id}/like`);
      dispatch(updatePost({ post: res.data }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack
      spacing={1}
      backgroundColor={palette.background.alt}
      p={2}
      borderRadius={2}
      boxShadow={1}
    >
      {/* Head */}
      <FlexBetween>
        <Link
          to={`/profile/${post.userId._id}`}
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <Stack direction="row" spacing={1}>
            <Avatar src={post.userId.picturePath} alt={post.userId._id} />
            <Box>
              <Typography variant="h5" fontWeight="500">
                {post.userId.firstName} {post.userId.lastName}
              </Typography>
              <Typography>{moment(post.createdAt).fromNow()}</Typography>
            </Box>
          </Stack>
        </Link>
        {post.userId._id === _id && (
          <Box position={"relative"}>
            <IconButton onClick={() => setOpen(!open)}>
              <MoreHorizIcon />
            </IconButton>
            {open && (
              <Box
                position="absolute"
                top={"100%"}
                right={"0"}
                width="150px"
                borderRadius={1}
                zIndex={2}
                p={1}
                backgroundColor={palette.background.alt}
              >
                <FlexBetween
                  justifyContent="center !important"
                  onClick={handleDelete}
                  gap={1}
                  p={1}
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor:
                        mode === "dark"
                          ? "rgba(255, 255, 255, 0.08)"
                          : "rgba(0, 0, 0, 0.08)",
                    },
                  }}
                >
                  <DeleteIcon color="error" />
                  <Typography>Delete</Typography>
                </FlexBetween>

                <Divider />

                <FlexBetween
                  justifyContent="center !important"
                  p={1}
                  gap={1}
                  onClick={handleEdit}
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor:
                        mode === "dark"
                          ? "rgba(255, 255, 255, 0.08)"
                          : "rgba(0, 0, 0, 0.08)",
                    },
                  }}
                >
                  <EditIcon />
                  <Typography>Edit</Typography>
                </FlexBetween>
              </Box>
            )}
          </Box>
        )}
        {_id !== post.userId._id && (
          <IconButton
            onClick={handleFriend}
            sx={{
              backgroundColor: palette.primary.light,
            }}
          >
            {friendsIds?.includes(post.userId._id) ? (
              <PersonRemoveAlt1OutlinedIcon
                sx={{ color: palette.primary.dark }}
              />
            ) : (
              <PersonAddIcon sx={{ color: palette.primary.dark }} />
            )}
          </IconButton>
        )}
      </FlexBetween>

      {/* Body */}
      <Box>
        <Typography>{post.description}</Typography>
        {post.picturePath && (
          <img
            src={post.picturePath}
            alt={post.id}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "10px",
              marginTop: "10px",
            }}
          />
        )}
      </Box>

      {/* Footer */}
      <FlexBetween>
        <Stack direction="row" spacing={1}>
          {/* Like  */}
          <FlexBetween>
            <IconButton onClick={handleLike}>
              {like ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
            </IconButton>
            <Typography>{Object.keys(post.likes).length}</Typography>
          </FlexBetween>

          {/* Comment */}
          <FlexBetween>
            <IconButton onClick={() => setOpenComment(!openComment)}>
              <ChatBubbleOutlineIcon />
            </IconButton>
            <Typography>{post.comments.length}</Typography>
          </FlexBetween>
        </Stack>

        {/* Share  */}
        <Box position="relative">
          <IconButton onClick={() => setShareOpen(!shareOpen)}>
            <ShareIcon />
          </IconButton>
          {shareOpen && (
            <Suspense fallback={<ShareMenuSkeleton />}>
              <ShareMenu post={post} />
            </Suspense>
          )}
        </Box>
      </FlexBetween>

      {openComment && (
        <Suspense fallback={<CommentsSkeleton />}>
          <Comments comments={post.comments} postId={post._id} />
        </Suspense>
      )}
    </Stack>
  );
};

export default React.memo(Post);
