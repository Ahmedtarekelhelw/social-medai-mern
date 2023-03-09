// react-share
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

// MUI Components
import { Stack, useTheme } from "@mui/material";

const ShareMenu = ({ post }) => {
  const { palette } = useTheme();
  return (
    <Stack
      position="absolute"
      display="flex"
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
        url={`http://localhost:3000/profile/${post.userId._id}`}
        quote={`${post.description}`}
        hashtag="#Sociality"
        style={{ display: "flex" }}
      >
        <TwitterIcon size={32} round />
      </TwitterShareButton>

      <FacebookShareButton
        style={{ display: "flex" }}
        url={`http://localhost:3000/profile/${post.userId._id}`}
        quote={`${post.description}`}
        hashtag="#Sociality"
      >
          
        <FacebookIcon size={32} round />
      </FacebookShareButton>

      <LinkedinShareButton
        style={{ display: "flex" }}
        url={`http://localhost:3000/profile/${post.userId._id}`}
        quote={`${post.description}`}
        hashtag="#Sociality"
      >
          
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>

      <TelegramShareButton
        style={{ display: "flex" }}
        url={`http://localhost:3000/profile/${post.userId._id}`}
        quote={`${post.description}`}
        hashtag="#Sociality"
      >
          
        <TelegramIcon size={32} round />
      </TelegramShareButton>
    </Stack>
  );
};

export default ShareMenu;
