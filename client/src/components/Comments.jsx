import { Avatar, Button, useTheme, TextField, Stack } from "@mui/material";
import Comment from "./Comment";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FlexBetween from "./FlexBetween";
import { users } from "../features/users/usersSlice";
import axiosInstance from "../axiosInstance";
import { updatePost } from "../features/posts/postsSlice";

const Comments = ({ comments, postId }) => {
  const { palette } = useTheme();
  const { user } = useSelector(users);
  const [laoding, setLoading] = useState(false);
  const commentRef = useRef("");
  const dispatch = useDispatch();

  const handleComment = async (e) => {
    e.preventDefault();
    const { value } = commentRef.current;
    setLoading(true);
    if (value) {
      try {
        const res = await axiosInstance.patch(`posts/${postId}/comment`, {
          comment: value,
        });
        dispatch(updatePost({ post: res.data }));
        commentRef.current.value = "";
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };

  return (
    <Stack gap={2}>
      <FlexBetween gap={2}>
        <Avatar
          sx={{
            width: "35px",
            height: "35px",
          }}
          src={user.picturePath}
          alt={user.firstName}
        />
        <form
          style={{
            width: "100%",
            display: "flex",
            gap: "15px",
            alignItems: "center",
          }}
        >
          <TextField
            name="comment"
            placeholder="Write Your Comment"
            size="small"
            fullWidth
            inputRef={commentRef}
          />

          <Button
            size="small"
            onClick={handleComment}
            disabled={laoding}
            type="submit"
            sx={{
              padding: "5px 15px ",
              borderRadius: "10px",
              color: palette.background.alt,
              backgroundColor: palette.primary.main,
              fontWeight: "bold",
              textTransform: "capitalize",
            }}
          >
            Comment
          </Button>
        </form>
      </FlexBetween>

      {comments.map((c) => (
        <Comment key={c._id} c={c} />
      ))}
    </Stack>
  );
};

export default Comments;
