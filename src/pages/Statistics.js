import React from "react";
import { Helmet } from "react-helmet";
import { Box, Container } from "@material-ui/core";
import TrainingGraphStatistics from "../components/statistics/TrainingGraphStatistics";

const Statistics = () => (
  <>
    <Helmet>
      <title>Statistics</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: "background.default",
        minHeight: "100%",
        py: 3,
      }}
    >
      <Container maxWidth={false}>
        <Box sx={{ pt: 3 }}>
          <TrainingGraphStatistics />
        </Box>
      </Container>
    </Box>
  </>
);

export default Statistics;
