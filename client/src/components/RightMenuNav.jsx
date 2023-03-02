import { useLocation, useNavigate } from "react-router-dom";
// My Components
import FlexBetween from "./FlexBetween";

// Api
import axiosInstance from "../axiosInstance";

//Context
import { useModeContext } from "../context/DarkmodeContext";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../features/auth/authSlice";
import { users } from "../features/users/usersSlice";

// MUI Components
import {
  FormControl,
  IconButton,
  InputBase,
  MenuItem,
  Select,
  Typography,
  useTheme,
} from "@mui/material";

// Material Icons
import {
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
} from "@mui/icons-material";

const RightMenuNav = ({
  mobile,
  isMobileToggleMenu,
  setIsMobileToggleMenu,
}) => {
  const theme = useTheme();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { controlMode } = useModeContext();
  const { user } = useSelector(users);
  const dark = theme.palette.neutral.dark;
  const neutralLight = theme.palette.neutral.light;
  const fullName = `${user?.firstName} ${user?.lastName}`;

  const { pathname } = useLocation();

  const handleLogout = async () => {
    await axiosInstance.get("auth/logout");
    dispatch(setLogout());
    mobile && setIsMobileToggleMenu(!isMobileToggleMenu);
  };

  return (
    <FlexBetween
      flexDirection={mobile && "column"}
      justifyContent={mobile && "center"}
      gap={mobile ? "3rem" : "2rem"}
    >
      <IconButton onClick={() => controlMode()} sx={{ fontSize: "25px" }}>
        {theme.palette.mode === "dark" ? (
          <DarkMode sx={{ fontSize: "25px" }} />
        ) : (
          <LightMode sx={{ color: dark, fontSize: "25px" }} />
        )}
      </IconButton>
      <Message sx={{ fontSize: "25px" }} />
      <Notifications sx={{ fontSize: "25px" }} />
      <Help sx={{ fontSize: "25px" }} />
      <FormControl variant="standard" value={fullName}>
        <Select
          value={pathname === "/settings" ? "Settings" : fullName}
          sx={{
            backgroundColor: neutralLight,
            width: "150px",
            borderRadius: "0.25rem",
            p: "0.25rem 1rem",
            "& .MuiSvgIcon-root": {
              pr: "0.25rem",
              width: "3rem",
            },
            "& .MuiSelect-select:focus": {
              backgroundColor: neutralLight,
            },
          }}
          input={<InputBase />}
        >
          <MenuItem value={fullName}>
            <Typography>{fullName}</Typography>
          </MenuItem>
          <MenuItem
            value="Settings"
            onClick={() => {
              navigate("/settings");
              mobile && setIsMobileToggleMenu(!isMobileToggleMenu);
            }}
          >
            <Typography>Settings</Typography>
          </MenuItem>

          <MenuItem onClick={handleLogout}>Log Out</MenuItem>
        </Select>
      </FormControl>
    </FlexBetween>
  );
};
export default RightMenuNav;
