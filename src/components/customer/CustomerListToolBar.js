import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
} from "@material-ui/core";
import { CsvBuilder } from 'filefy';
import { Search as SearchIcon } from "react-feather";

function CustomerListToolbar(props) {
  
  // const builder = new CsvBuilder('customers.csv');
  
  // builder
  //   .setDelimeter(',')
  //   .setColumns(['firstname', 'lastname', 'email', 'phone', 'streetaddress', 'postcode', 'city'])
  //   .addRows()
  //   .exportFile();

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button sx={{ mx: 1 }}>Export</Button>
        <Button color="primary" variant="contained">
          Add customer
        </Button>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500}}>
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
