import React from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import CustomerList from '../components/customer/CustomerList';
import CustomerListToolbar from '../components/customer/CustomerListToolBar';

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
        <CustomerListToolbar />
        <Box sx={{ pt: 3 }}>
          <CustomerList />
        </Box>
      </Container>
    </Box>
  </>
);

export default Customers;
