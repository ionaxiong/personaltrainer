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
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="md">
          <Typography
            align="center"
            color="textPrimary"
            variant="h1"
          >
            PERSONAL TRAINER
          </Typography>
          <Typography
            align="center"
            color="textPrimary"
            variant="subtitle2"
          >
            Premium weight loss and lifestyle transformation which create long lasting, 
            dramatic results to your health, body and mind.
          </Typography>
          <Box sx={{ textAlign: 'center' }}>
            <img
              alt="TrainingImage"
              src="/static/training.svg"
              style={{
                marginTop: 50,
                display: 'inline-block',
                maxWidth: '100%',
                width: 560
              }}
            />
          </Box>
        </Container>
      </Box>
    </>
  );

export default Home;
