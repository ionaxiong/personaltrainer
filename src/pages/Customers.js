import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import CustomerListResults from '../components/customer/CustomerListResults';
import CustomerListToolbar from '../components/customer/CustomerListToolBar';

const Customers = () => {
  // search state is here
  const [searchString, setSearchString] = useState("");

  return (
    <>
      <Helmet>
        <title>Customers | Material Kit</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <CustomerListToolbar 
            // prop: set search state
            setSearchString={setSearchString}
            searchString={searchString}
          />
          <Box sx={{ pt: 3 }}>
            <CustomerListResults 
              searchString={searchString}
            />
          </Box>
        </Container>
      </Box>
    </>
  )
};

export default Customers;
