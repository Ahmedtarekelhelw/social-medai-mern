import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

// My Components
import FlexBetween from "./FlexBetween";
import RightMenuNav from "./RightMenuNav";

// MUI Components
import {
  IconButton,
  InputBase,
  Typography,
  useMediaQuery,
  useTheme,
  Box,
  Slide,
} from "@mui/material";

// Material Icons
import { Search, Menu, Close } from "@mui/icons-material";

const Navbar = () => {
  const [isMobileToggleMenu, setIsMobileToggleMenu] = useState(false);
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:1000px)");
  const theme = useTheme();
  const { pathname } = useLocation();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("searchQuery") || ""
  );

  useEffect(() => {
    if (pathname !== "/search") {
      setSearchQuery("");
    }
  }, [pathname]);

  const neutralLight = theme.palette.neutral.light;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const handleSearch = (e) => {
    e.preventDefault();
    if (/\w+/.test(searchQuery)) {
      navigate(`/search?searchQuery=${searchQuery}`);
    }
  };

  return (
    <FlexBetween
      padding="1rem 6%"
      backgroundColor={alt}
      justifyContent={pathname.includes("/auth") && "center !important"}
      position="sticky"
      top="0"
      zIndex="99"
      boxShadow={1}
    >
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          color="primary"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          sx={{
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}
          onClick={() => !pathname.includes("/auth") && navigate("/")}
        >
          Sociality
        </Typography>

        {isNonMobile && !pathname.includes("/auth") && (
          <form onSubmit={handleSearch}>
            <FlexBetween
              backgroundColor={neutralLight}
              borderRadius="9px"
              gap="3rem"
              padding="0.1rem 1.5rem"
            >
              <InputBase
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <IconButton type="search">
                <Search />
              </IconButton>
            </FlexBetween>
          </form>
        )}
      </FlexBetween>

      {/* Desktop Nav */}
      {!pathname.includes("/auth") &&
        (isNonMobile ? (
          <RightMenuNav
            isMobileToggleMenu={isMobileToggleMenu}
            setIsMobileToggleMenu={setIsMobileToggleMenu}
          />
        ) : (
          <IconButton
            onClick={() => setIsMobileToggleMenu(!isMobileToggleMenu)}
          >
            <Menu />
          </IconButton>
        ))}

      {!isNonMobile && isMobileToggleMenu && !pathname.includes("/auth") && (
        <Slide
          direction="left"
          in={isMobileToggleMenu}
          mountOnEnter
          unmountOnExit
        >
          <Box
            position="fixed"
            right="0"
            bottom="0"
            height="100%"
            zIndex="10"
            maxWidth="500px"
            minWidth="250px"
            backgroundColor={background}
          >
            {/* CLOSE ICON */}
            <Box display="flex" justifyContent="flex-end" p="1rem">
              <IconButton
                onClick={() => setIsMobileToggleMenu(!isMobileToggleMenu)}
              >
                <Close />
              </IconButton>
            </Box>

            {/* MENU ITEMS */}
            {
              <RightMenuNav
                mobile
                isMobileToggleMenu={isMobileToggleMenu}
                setIsMobileToggleMenu={setIsMobileToggleMenu}
              />
            }
          </Box>
        </Slide>
      )}
    </FlexBetween>
  );
};

export default Navbar;
