import React from 'react';
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

function CustomerListToolbar(props) {
    return (
        <Box>
        <Box
            sx={{
            display: "flex",
            justifyContent: "flex-end",
            }}
        >
            <Button sx={{ mx: 1 }} onClick={props.ExportSelectionGrid}>Export</Button>
            <Button color="primary" variant="contained">
            Add customer
            </Button>
        </Box>
        <Box sx={{ mt: 3, mb: 3 }}>
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
    )
};

export default CustomerListToolbar;