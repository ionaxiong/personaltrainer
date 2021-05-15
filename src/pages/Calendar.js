import React from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import CalendarComponents from '../components/calendar/CalendarComponents';

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
        <Box sx={{ pt: 3 }}>
          <CalendarComponents />
        </Box>
      </Container>
    </Box>
  </>
);

export default Calendar;
