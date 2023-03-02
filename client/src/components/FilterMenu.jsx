import {
  Divider,
  Stack,
  Typography,
  useTheme,
  ListItemText,
  ListItemButton,
  List,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";
import Box from "@mui/material/Box";

const FilterMenu = ({ selectedIndex, setSelectedIndex }) => {
  const { palette } = useTheme();
  const [searchParams] = useSearchParams();

  return (
    <Stack backgroundColor={palette.background.alt} p={2} borderRadius={2}>
      <Typography variant="h3">Search results for</Typography>
      <Typography mt={1}>{searchParams.get("searchQuery")}</Typography>
      <Divider sx={{ margin: "10px 0" }} />
      <Box sx={{ bgcolor: palette.background.alt }}>
        <Typography variant="h4">Filters</Typography>
        <List component="nav">
          <ListItemButton
            selected={selectedIndex === 0}
            onClick={() => setSelectedIndex(0)}
          >
            <ListItemText primary="Posts" />
          </ListItemButton>

          <ListItemButton
            selected={selectedIndex === 1}
            onClick={() => setSelectedIndex(1)}
          >
            <ListItemText primary="People" />
          </ListItemButton>
        </List>
      </Box>
    </Stack>
  );
};

export default FilterMenu;
