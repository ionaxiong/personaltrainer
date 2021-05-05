import React from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';

const Calendar = () => (
  <>
    <Helmet>
      <title>Calendar</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        {/* <CustomerListToolbar /> */}
        <Box sx={{ pt: 3 }}>
          {/* <CustomerListResults customers={customers} /> */}
        </Box>
      </Container>
    </Box>
  </>
);

export default Calendar;
