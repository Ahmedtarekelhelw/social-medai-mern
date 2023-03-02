import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import FilterMenu from "../components/FilterMenu";
import Posts from "../components/Posts";
import UsersSearch from "../components/UsersSearch";

const Search = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("searchQuery");
  const { pathname } = useLocation();
  const { breakpoints } = useTheme();

  const tablet = useMediaQuery(breakpoints.down("md"));
  const [selectedIndex, setSelectedIndex] = useState(0);

  const URL = selectedIndex === 0 ? `posts/search` : `users/search`;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return (
    <Grid container gap={2} mt={2} px={tablet ? 2 : 4} justifyContent="center">
      <Grid item xs={12} md={4}>
        <FilterMenu
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
      </Grid>
      <Grid item xs={12} md={7} mb={2}>
        {selectedIndex === 0 ? (
          <Posts url={URL} params={{ searchQuery }} />
        ) : (
          <UsersSearch url={URL} params={{ searchQuery }} />
        )}
      </Grid>
    </Grid>
  );
};

export default Search;
