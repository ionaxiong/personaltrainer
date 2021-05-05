import * as React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
} from "@material-ui/core";
import { Search as SearchIcon } from "react-feather";

import IconButton from "@material-ui/core/IconButton";
import ArchiveIcon from "@material-ui/icons/Archive";
import AddBoxIcon from "@material-ui/icons/AddBox";



const ToolBar = (props) => (
  <Box {...props} style={{ display: "flex", flexFlow: "row", height: 56 }}>
    <Box style={{ maxWidth: 500, padding: 12, marginLeft: "auto" }}>
      <TextField
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SvgIcon fontSize="small" color="action">
                <SearchIcon />
              </SvgIcon>
            </InputAdornment>
          ),
        }}
        placeholder="Search customer"
        onChange={(e) => props.setSearchString(e.target.value)}
        value={props.searchString}
      />
    </Box>
    <IconButton size="medium" color="inherit">
      <ArchiveIcon />
    </IconButton>
    <IconButton size="medium" color="inherit">
      <AddBoxIcon />
    </IconButton>
  </Box>
);

export default function SearchAppBar(props) {
  return (
    <ToolBar
      setSearchString={props.setSearchString}
      searchString={props.searchString}
    />
  );
}
