import { Box, Container, Typography } from "@material-ui/core";
import React from "react";
import { Helmet } from "react-helmet";

// const Home = () => {
//   <>
//     <Helmet>
//       <title>Home Page</title>
//     </Helmet>
//     <Box
//       sx={{
//         backgroundColor: "backgound.default",
//         display: "flex",
//         flexDirection: "column",
//         height: "100%",
//         justifyContent: "center",
//       }}
//     >
//       <Container maxWidth="md">
//         <Typography
//           align="center"
//           color="textPrimary"
//           variant="h1"
//         >
//         PERSONAL TRAINER
//         </Typography>
//         <Typography
//           align="center"
//           color="textPrimary"
//           variant="subtitle2"
//         >
//           Premium weight loss and lifestyle transformation which create long lasting, 
//           dramatic results to your health, body and mind.
//         </Typography>
//         <Box sx={{ textAlign: "center" }}>
//           <img 
//             alt="TrainingImage" 
//             src="/static/training.svg" 
//             style={{
//                 marginTop: 50,
//                 display: 'inline-block',
//                 maxWidth: '100%',
//                 width: 560
//             }}
//             />
//         </Box>
//       </Container>
//     </Box>
//   </>;
// };

const Home = () => (
    <>
      <Helmet>
        <title>Home Page</title>
      </Helmet>
      <div style={{
        backgroundImage: 'url("/static/sports.png")',
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        zIndex: 0
      }}>

      
      <Box
        sx={{
          // backgroundImage: 'url("/static/sports.png")',
          // filter: "grayscale(100%)",
          backgroundSize: 'cover',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center',
          zIndex: 1
        }}
      >
        <Container maxWidth="md">
          {/* <Typography
            align="center"
            color="white"
            fontFamily="Segoe UI"
            variant="h1"
          >
            PERSONAL TRAINER
          </Typography> */}
          <h1 style={{fontSize: "calc(2em + 1vw)", color: 'white'}} className="mt-0 mb-16 reveal-from-bottom" data-reveal-delay="200">
              Landing template for <span className="text-color-primary">startups</span>
          </h1>
          <Typography
            align="center"
            color="textPrimary"
            variant="subtitle2"
          >
            Premium weight loss and lifestyle transformation which create long lasting, 
            dramatic results to your health, body and mind.
          </Typography>
          {/* <Box sx={{ textAlign: 'center' }}>
            <img
              alt="TrainingImage"
              src="/static/training.png"
              style={{
                marginTop: 50,
                display: 'inline-block',
                maxWidth: '100%',
                width: 960
              }}
            />
          </Box> */}
        </Container>
      </Box>
      </div>
    </>
  );

export default Home;
