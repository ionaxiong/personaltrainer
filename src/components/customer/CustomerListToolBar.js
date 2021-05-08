import * as react from "react";
import {
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
} from "@material-ui/core";
import { Search as SearchIcon } from "react-feather";
import Box from "@material-ui/core/Box";
import AddCustomer from "./AddCustomer";

function CustomerListToolbar(props) {
  const handleAddCustomer = (newCustomer) => {
    props.addCustomer(newCustomer);
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button sx={{ mx: 1 }} onClick={props.ExportSelectionGrid}>
          Export
        </Button>
        <AddCustomer addCustomer={handleAddCustomer} />
        {/* <Button color="primary" variant="contained" onClick={handleAddCustomer} >
                Add customer
            </Button> */}
      </Box>
      <Box sx={{ mt: 3, mb: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
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
                variant="outlined"
                value={props.searchString}
                onChange={(e) => props.setSearchString(e.target.value)}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default CustomerListToolbar;
