import React from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import TrainingListResults from "../components/training/TrainingListResults";

const Traininngs = () => (
  <>
    <Helmet>
      <title>Trainings</title>
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
          <TrainingListResults  />
        </Box>
      </Container>
    </Box>
  </>
);

export default Traininngs;
