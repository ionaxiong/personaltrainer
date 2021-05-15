import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Box, Container } from "@material-ui/core";
import CustomerListResults from "../components/customer/CustomerListResults";

const Customers = () => {
  const [searchString, setSearchString] = useState("");

  return (
    <>
      <Helmet>
        <title>Customers</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 3,
        }}
      >
        <Container maxWidth={false}>
          <Box>
            <CustomerListResults
              setSearchString={setSearchString}
              searchString={searchString}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Customers;
