import { useEffect, useMemo, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

// MUi
import { Grid, useMediaQuery, useTheme } from "@mui/material";

// My Compoents
import FilterMenu from "../components/FilterMenu";

// redux
import Posts from "../features/posts/Posts";
import UsersSearch from "../features/users/UsersSearch";

const Search = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("searchQuery");
  const { pathname } = useLocation();
  const { breakpoints } = useTheme();

  /* 
  l do this beacuse if i pass object directly to Posts or UsersSearch compoents  as props
  this cause unnecessary rerender to Posts or UsersSearch 
   when change dark or light mode and make another request
   */
  const params = useMemo(() => {
    return { searchQuery: searchQuery };
  }, [searchQuery]);

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
          <Posts url={URL} params={params} />
        ) : (
          <UsersSearch url={URL} params={params} />
        )}
      </Grid>
    </Grid>
  );
};

export default Search;
