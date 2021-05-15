import { Box, Button, Container, Typography } from "@material-ui/core";
import React from "react";
import { Helmet } from "react-helmet";
import theme from "../theme";

const Home = () => (
  <>
    <Helmet>
      <title>Home Page</title>
    </Helmet>
    <div
      style={{
        backgroundImage: 'url("/static/sports.png")',
        backgroundSize: "cover",

        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        zIndex: 0,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center",
          marginBottom: "30vh",
          zIndex: 1,
          paddingLeft: "50vh",
          [theme.breakpoints.down("lg")]: {
            paddingLeft: "0",
          },
        }}
      >
        <Container
          sx={{
            marginRight: "10vh",
            marginTop: "20vh",
          }}
        >
          <Typography
            fontSize="calc(4em + 1vw)"
            fontFamily="Open Sans Condensed"
            fontWeight="900"
            color="#FFFFFFFF"
            textAlign="right"
          >
            PERSONAL TRAINER
          </Typography>
          <Typography
            fontSize="calc(1em + 1vw)"
            fontFamily="Open Sans Condensed"
            color="#F1F4FFFF"
            textAlign="right"
            marginTop="4vh"
            marginBottom="3vh"
            marginLeft="6vw"
            paddingLeft="20vw"
          >
            Premium weight loss and lifestyle transformation which create long
            lasting, dramatic results to your health, body and mind.
          </Typography>
          <Button
            size="large"
            style={{
              background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
              boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
              color: "white",
              display: "block",
              marginLeft: "auto",
              marginTop: "12vh",
            }}
          >
            {" "}
            Join Now
          </Button>
        </Container>
      </Box>
    </div>
  </>
);

export default Home;
