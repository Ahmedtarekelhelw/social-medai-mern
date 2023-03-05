import { Button, Typography } from "@mui/material";
import FlexBetween from "./FlexBetween";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

const ImageInput = ({ setFieldValue, picture }) => {
  return (
    <Button variant="contained" component="label">
      {!picture ? (
        "Upload Your Image"
      ) : (
        <FlexBetween gap={1}>
          <Typography>{picture.name}</Typography>
          <EditOutlinedIcon />
        </FlexBetween>
      )}
      <input
        type="file"
        accept="image/png, image/jpeg"
        hidden
        onChange={(e) => {
          setFieldValue("picture", e.target.files[0]);
        }}
      />
    </Button>
  );
};

export default ImageInput;
