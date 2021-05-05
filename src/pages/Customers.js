import React from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import CustomerListResults from '../components/customer/CustomerListResults';
import CustomerListToolBar from '../components/customer/CustomerListToolBar';

const Customers = () => (
  <>
    <Helmet>
      <title>Customers</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <Box sx={{ pt: 3 }}>
          {/* <CustomerListToolBar /> */}
          <CustomerListResults />
        </Box>
      </Container>
    </Box>
  </>
);

export default Customers;
