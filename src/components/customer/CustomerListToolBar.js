import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@material-ui/data-grid";
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

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const CustomerListToolbar = (props) => (
  <Box {...props}>
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
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>

  // return (
  //   <div style={{ height: 300, width: "100%" }}>
  //     <GridToolbarContainer>
  //       <GridToolbarExport />
  //       <DataGrid
  //         components={{
  //           Toolbar: CustomerToolbar,
  //         }}
  //       />
  //     </GridToolbarContainer>
  //   </div>
  // );
);

export default CustomerListToolbar;
