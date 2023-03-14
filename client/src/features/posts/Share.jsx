import { useEffect, useState } from "react";
// My Components
import FlexBetween from "../../components/FlexBetween";

// Api
import axiosInstance from "../../axiosInstance";

// Context
import { usePostContext } from "../../context/PostContext";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { addPost, endLoading, startLoading, updatePost } from "./postsSlice";
import { users } from "../users/usersSlice";

// MUI Components
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  InputBase,
  Typography,
  useTheme,
  CircularProgress,
} from "@mui/material";

// Material Icons
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";

const Share = () => {
  const { user } = useSelector(users);
  const dispatch = useDispatch();
  const [sharePostLoad, setSharePostLoad] = useState(false);

  const { palette } = useTheme();
  const [img, setImg] = useState(null);
  const [sharedPicPath, setSharedPicPath] = useState("");

  const { post, setPost, picPath, setPicPath, desc, setDesc } =
    usePostContext();

  const upload = async () => {
    try {
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onloadend = async () => {
        const res = await axiosInstance.post("upload", {
          data: reader.result,
        });
        setSharedPicPath(res.data);
      };
    } catch (error) {
      console.log(error);
    }
  };

  const handleShare = async () => {
    if (desc) {
      setSharePostLoad(true);
      dispatch(startLoading());
      if (img) return await upload();

      try {
        const res = post
          ? await axiosInstance.patch(`posts/${post._id}`, {
              desc,
              picPath,
            })
          : await axiosInstance.post("posts", {
              description: desc,
            });
        post
          ? dispatch(updatePost({ post: res.data }))
          : dispatch(addPost({ post: res.data }));
        setSharePostLoad(false);
        dispatch(endLoading());
        setPicPath("");
        setPost(null);
        setDesc("");
      } catch (error) {
        console.log(error);
        setSharePostLoad(false);
        dispatch(endLoading());
      }
    }
  };

  useEffect(() => {
    const CompleteUpload = async () => {
      const res = post
        ? await axiosInstance.patch(`posts/${post._id}`, {
            desc,
            picPath: img ? sharedPicPath : picPath,
          })
        : await axiosInstance.post("posts", {
            description: desc,
            picturePath: sharedPicPath,
          });

      post
        ? dispatch(updatePost({ post: res.data }))
        : dispatch(addPost({ post: res.data }));

      setSharePostLoad(false);
      dispatch(endLoading());

      setDesc("");
      setPicPath("");
      setPost(null);
      setImg(null);
    };
    if (sharedPicPath) {
      CompleteUpload();
    }
  }, [sharedPicPath]); // eslint-disable-line

  return (
    <Box
      backgroundColor={palette.background.alt}
      borderRadius={2}
      p={2}
      mb={2}
      boxShadow={1}
    >
      <FlexBetween gap={2}>
        <Avatar alt={user.firstName} src={user.picturePath} />
        <InputBase
          placeholder="What's on your mind..."
          fullWidth
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          sx={{
            backgroundColor: palette.neutral.light,
            padding: "10px 15px",
            borderRadius: "50px",
          }}
        />
      </FlexBetween>

      <Divider sx={{ my: 2 }} />

      <FlexBetween>
        <FlexBetween gap={1}>
          <input
            type="file"
            hidden
            accept="image/png, image/jpeg"
            id="file"
            onChange={(e) => {
              setPicPath("");
              setImg(e.target.files[0]);
            }}
          />
          <FlexBetween as={"label"} htmlFor="file" sx={{ cursor: "pointer" }}>
            <ImageOutlinedIcon />
            <Typography ml={1}>Images</Typography>
          </FlexBetween>
        </FlexBetween>
        <Button
          disabled={!desc || sharePostLoad}
          type="submit"
          onClick={() => handleShare()}
          sx={{
            borderRadius: "10px",
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
          }}
        >
          {sharePostLoad ? (
            <CircularProgress sx={{ color: palette.primary.light }} size={30} />
          ) : post ? (
            "Edit"
          ) : (
            "Share"
          )}
        </Button>
      </FlexBetween>

      {(img || picPath) && (
        <Box mt={2} position="relative">
          <IconButton
            onClick={() => {
              if (img) {
                setImg(null);
              } else if (picPath) {
                setPicPath("");
              }
            }}
            sx={{ position: "absolute", top: 0, right: 0 }}
          >
            <HighlightOffIcon sx={{ color: "#fff" }} />
          </IconButton>
          <img
            src={picPath ? picPath : URL.createObjectURL(img)}
            alt="Share"
            style={{ width: "100%", objectFit: "cover" }}
          />
        </Box>
      )}
    </Box>
  );
};

export default Share;
