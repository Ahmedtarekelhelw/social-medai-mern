import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { users, updateUserInfo } from "../features/users/usersSlice";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const Settings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { palette, breakpoints } = useTheme();
  const mobile = useMediaQuery(breakpoints.down("sm"));
  const { user } = useSelector(users);
  const [userInfo, setUserInfo] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: "",
    location: user.location,
    occupation: user.occupation,
    picturePath: user.picturePath,
  });

  const { password, picturePath, ...other } = userInfo;
  const [file, setFile] = useState();
  const [picPath, setPicPath] = useState("");
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const data = password
    ? {
        ...other,
        password,
        picturePath: picPath ? picPath : picturePath,
      }
    : {
        ...other,
        picturePath: picPath ? picPath : picturePath,
      };

  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleImg = (e) => {
    setFile(e.target.files[0]);
  };

  const upload = async () => {
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const res = await axiosInstance.post("upload", {
          data: reader.result,
        });
        setPicPath(res.data);
      };
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const CompleteEdit = async () => {
      try {
        const res = await axiosInstance.patch(`users`, data);
        dispatch(updateUserInfo(res.data));
        setPicPath("");
        setFile(null);
        setLoading(false);
        navigate("/");
      } catch (err) {
        setErrMsg(err?.response?.data?.msg);
        setLoading(false);
      }
    };
    if (picPath) {
      CompleteEdit();
    }
  }, [picPath]); // eslint-disable-line

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (file) return await upload();
    try {
      const res = await axiosInstance.patch(`users`, data);
      dispatch(updateUserInfo(res.data));
      setPicPath("");
      setFile(null);
      setLoading(false);
      navigate("/");
    } catch (err) {
      setErrMsg(err?.response?.data?.msg);
      setLoading(false);
    }
  };

  return (
    <Box
      my={2}
      mx="auto"
      width={mobile ? "95%" : "65%"}
      padding="20px"
      borderRadius="10px"
      boxShadow={2}
      backgroundColor={palette.background.alt}
    >
      <Typography variant="h3">Settings</Typography>
      <Stack spacing={2}>
        <label htmlFor="file" style={{ margin: "auto" }}>
          {!file && (
            <Avatar
              sx={{ width: "70px", height: "70px", cursor: "pointer" }}
              src={user.picturePath}
              alt={user.firstName}
            />
          )}
          {file && (
            <img
              src={URL.createObjectURL(file)}
              alt=""
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                objectFit: "cover",
                margin: "auto",
                cursor: "pointer",
              }}
            />
          )}
        </label>
        <TextField
          placeholder="File"
          type="file"
          inputProps={{ accept: "image/png, image/jpeg" }}
          label="File"
          id="file"
          name="File"
          sx={{
            position: "absolute",
            width: "100px",
            margin: "auto",
            left: "50%",
            transform: "translatex(-50%)",
            display: "none",
          }}
          onChange={handleImg}
        />

        {errMsg && (
          <Typography color="error" variant="h4">
            {errMsg}
          </Typography>
        )}
        <Stack direction={mobile ? "column" : "row"} gap={2}>
          <TextField
            name="firstName"
            label="First Name"
            sx={{ width: !mobile ? "50%" : "100%" }}
            placeholder="First Name"
            value={userInfo.firstName}
            onChange={handleChange}
          />
          <TextField
            name="lastName"
            sx={{ width: !mobile ? "50%" : "100%" }}
            label="Last Name"
            placeholder="Last Name"
            value={userInfo.lastName}
            onChange={handleChange}
          />
        </Stack>
        <TextField
          name="email"
          label="Email"
          placeholder="Email"
          value={userInfo.email}
          onChange={handleChange}
        />
        <TextField
          type="password"
          label="Password"
          name="password"
          placeholder="Password"
          value={userInfo.password}
          onChange={handleChange}
        />
        <Stack direction={!mobile ? "row" : "column"} gap={2}>
          <TextField
            name="location"
            sx={{ width: !mobile ? "50%" : "100%" }}
            label="Location"
            placeholder="Location"
            value={userInfo.location}
            onChange={handleChange}
          />
          <TextField
            placeholder="Occupation"
            label="Occupation"
            sx={{ width: !mobile ? "50%" : "100%" }}
            name="occupation"
            value={userInfo.occupation}
            onChange={handleChange}
          />
        </Stack>

        <Button
          disabled={loading}
          sx={{
            backgroundColor: palette.primary.main,
            color: palette.background.alt,
            fontWeight: "bold",
          }}
          onClick={handleSubmit}
        >
          {loading ? (
            <CircularProgress
              size="30px"
              sx={{
                color: palette.background.alt,
              }}
            />
          ) : (
            "Update"
          )}
        </Button>
      </Stack>
    </Box>
  );
};

export default Settings;
