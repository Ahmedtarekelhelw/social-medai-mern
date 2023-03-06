import React, { useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import {
  TwitterShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TelegramIcon,
  TwitterIcon,
  FacebookIcon,
  LinkedinIcon,
} from "react-share";

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
} from "../users/usersSlice";
import { users } from "../users/usersSlice";
import { deletePost, likePost, updatePost } from "./postsSlice";

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

const Post = ({ post, profile }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const {
    user: { friends, _id },
  } = useSelector(users);
  const { mode } = useModeContext();
  const [like, setIsLike] = useState(post.likes.hasOwnProperty(_id));
  const { user } = useSelector(users);
  const [open, setOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  const { friendsIds, setFriendsIds, setAddFriendLoading } =
    useFriendsContext();

  const { setPost, setDesc, setPicPath } = usePostContext();

  const handleFriend = async () => {
    try {
      if (friendsIds.includes(post.userId)) {
        if (profile) {
          dispatch(removeUserFriends(_id));
        } else {
          dispatch(removeUserFriends(post.userId));
        }
        setFriendsIds(friends.filter((friendId) => friendId !== post.userId));
      } else {
        setAddFriendLoading(true);
        setFriendsIds([...friendsIds, post.userId]);
      }
      const res = await axiosInstance.patch(`users/${_id}/${post.userId}`);
      if (!friendsIds.includes(post.userId)) {
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
      setIsLike(res.data.likes.hasOwnProperty(_id));
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
          to={`/profile/${post.userId}`}
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <Stack direction="row" spacing={1}>
            <Avatar alt={post.userId} src={post.userPicturePath} />
            <Box>
              <Typography variant="h5" fontWeight="500">
                {post.firstName} {post.lastName}
              </Typography>
              <Typography>{moment(post.createdAt).fromNow()}</Typography>
            </Box>
          </Stack>
        </Link>
        {post.userId === _id && (
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
        {_id !== post.userId && (
          <IconButton
            onClick={handleFriend}
            sx={{
              backgroundColor: palette.primary.light,
            }}
          >
            {friendsIds?.includes(post.userId) ? (
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
            <IconButton>
              <ChatBubbleOutlineIcon />
            </IconButton>
            <Typography>3</Typography>
          </FlexBetween>
        </Stack>

        {/* Share  */}
        <Box position="relative">
          <IconButton onClick={() => setShareOpen(!shareOpen)}>
            <ShareIcon />
          </IconButton>
          <Stack
            position="absolute"
            display={shareOpen ? "flex" : "none"}
            direction="row"
            bottom={"100%"}
            right={0}
            zIndex={3}
            backgroundColor={palette.background.alt}
            boxShadow={4}
            borderRadius={2}
            p={1}
            gap={1}
          >
            <TwitterShareButton
              url={`http://localhost:3000/profile/${post.userId}`}
              quote={`${post.description}`}
              hashtag="#Sociality"
              style={{ display: "flex" }}
            >
              <TwitterIcon size={32} round />
            </TwitterShareButton>

            <FacebookShareButton
              style={{ display: "flex" }}
              url={`http://localhost:3000/profile/${post.userId}`}
              quote={`${post.description}`}
              hashtag="#Sociality"
            >
                
              <FacebookIcon size={32} round />
            </FacebookShareButton>

            <LinkedinShareButton
              style={{ display: "flex" }}
              url={`http://localhost:3000/profile/${post.userId}`}
              quote={`${post.description}`}
              hashtag="#Sociality"
            >
                
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>

            <TelegramShareButton
              style={{ display: "flex" }}
              url={`http://localhost:3000/profile/${post.userId}`}
              quote={`${post.description}`}
              hashtag="#Sociality"
            >
                
              <TelegramIcon size={32} round />
            </TelegramShareButton>
          </Stack>
        </Box>
      </FlexBetween>
    </Stack>
  );
};

export default React.memo(Post);
