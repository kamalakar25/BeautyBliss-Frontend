import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

const artists = [
  {
    name: "Sunitha Shetty",
    experience: 10,
    description: [
      "Specializes in bridal and glam makeup artistry",
      "Creates stunning looks for weddings and special events",
      "Expert in enhancing natural beauty",
      "Known for long-lasting makeup applications",
      "Brings elegance to every client's appearance",
    ],
    image:
      "https://nikky-bawa.in/wp-content/uploads/2024/04/Bridal-Makeup-Looks.jpg",
  },
  {
    name: "Likitha Gowda",
    experience: 8,
    description: [
      "Renowned for editorial and avant-garde styles",
      "Creates bold runway looks for fashion shows",
      "Master of innovative makeup techniques",
      "Works with top fashion photographers",
      "Pushes boundaries in creative expression",
    ],
    image:
      "https://images.herzindagi.info/image/2023/Nov/bridal-makeup-trend.jpg",
  },
  {
    name: "Eshwari Madhav",
    experience: 6,
    description: [
      "Expert in natural, glowing skin finishes",
      "Perfects looks for photoshoots and portraits",
      "Focuses on subtle enhancement techniques",
      "Creates flawless, camera-ready makeup",
      "Specializes in dewy, radiant appearances",
    ],
    image:
      "https://www.o3plus.com/cdn/shop/articles/The_Ultimate_Bridal_Glow.png?v=1739108575",
  },
  {
    name: "Nikitha Samudrala",
    experience: 7,
    description: [
      "Blends bold colors for unique designs",
      "Creates striking, artistic makeup styles",
      "Known for creative and vibrant looks",
      "Excels in experimental color combinations",
      "Brings personality to every creation",
    ],
    image:
      "https://media.istockphoto.com/id/1340302535/photo/beautiful-indian-woman-getting-ready-to-a-wedding-reception-at-the-beauty-parlor.jpg?s=612x612&w=0&k=20&c=GzhivtaqLIDXBQ69R0DlIOfwY4aOYUI67gxWKTM3ooA=",
  },
  {
    name: "Anitha Nagaraj",
    experience: 12,
    description: [
      "Master of special effects makeup",
      "Creates cinematic and theatrical looks",
      "Skilled in prosthetics and transformations",
      "Works on film and TV productions",
      "Expert in character-driven artistry",
    ],
    image:
      "https://www.frenchweddingstyle.com/wp-content/uploads/2024/07/theatre-of-real-life-photographer-french-wedding-style-.jpg",
  },
];

const BridalShowcase = () => {
  const [index, setIndex] = useState(0);

  const nextArtist = () => setIndex((prev) => (prev + 1) % artists.length);
  const prevArtist = () =>
    setIndex((prev) => (prev - 1 + artists.length) % artists.length);

  return (
    <Box
      sx={{
        overflowX: "hidden",
        overflowY: "auto",
        px: { xs: 2, sm: 3, md: 4 },
        py: { xs: 4, sm: 6 },
        boxSizing: "border-box",
        background: "#fff",
        minHeight: "100vh",
      }}
    >
      {/* Makeup Artists Carousel */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          p: { xs: 1, sm: 2 },
        }}
      >
        <style>
          {`
h2.text-primary {
            font-family: 'Poppins', sans-serif;
            font-weight: 700;
            font-size: 2.5rem;
            background: linear-gradient(90deg, #3498db, #1abc9c);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            position: relative;
            margin-bottom: 1.5rem;
            text-align: center;
          }

          h2.text-primary::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 100px;
            height: 4px;
            background: #1abc9c;
            border-radius: 2px;
          }`}
        </style>
        <h2
          className="text-primary fw-bold mb-4 animate__animated animate__fadeInDown"
          style={{
            animationDuration: "1s",
            fontSize: "1.8rem",
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: "#1abc9c",
          }}
        >
          Explore Our Makeup Artists
        </h2>

        <Box
          sx={{
            position: "relative",
            width: "100%",
            maxWidth: { xs: "100%", sm: "90%", md: "64rem" },
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  bgcolor: "#ffffff",
                  borderRadius: "1rem",
                  boxShadow: {
                    xs: "0 4px 10px rgba(0, 0, 0, 0.1)",
                    sm: "0 10px 15px rgba(0, 0, 0, 0.05)",
                  },
                  overflow: "hidden",
                  mx: "auto",
                }}
              >
                <Box
                  sx={{
                    width: { xs: "100%", md: "40%" },
                    height: { xs: "200px", sm: "250px", md: "383px" },
                    flexShrink: 0,
                    position: "relative",
                  }}
                >
                  <img
                    src={
                      artists[index].image ||
                      "https://via.placeholder.com/300x400?text=No+Image"
                    }
                    alt={artists[index].name}
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                      position: "absolute",
                      top: 0,
                      left: 0,
                      borderTopLeftRadius: { xs: "1rem", md: "1rem" },
                      borderTopRightRadius: { xs: "1rem", md: 0 },
                      borderBottomLeftRadius: { xs: 0, md: "1rem" },
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    width: { xs: "100%", md: "60%" },
                    p: { xs: 2, sm: 3, md: 4 },
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    backgroundImage: "linear-gradient(to bottom, rgb(26, 188, 156), rgb(142, 176, 208))",

                    borderBottomLeftRadius: { xs: "1rem", md: 0 },
                    borderBottomRightRadius: "1rem",
                    borderTopRightRadius: { xs: 0, md: "1rem" },
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
                      fontWeight: 600,
                      mb: 1,
                      color: "#f5f5f5",
                      fontFamily: '"Playfair Display", serif',
                    }}
                  >
                    {artists[index].name}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#f5f5f5",
                      fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" },
                      mb: 1.5,
                      fontFamily: '"Lora", serif',
                    }}
                  >
                    Experience: {artists[index].experience} years
                  </Typography>
                  <Box
                    component="ul"
                    sx={{
                      pl: { xs: 2, sm: 2.5 },
                      color: "#f5f5f5",
                      fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" },
                      mb: 2,
                      lineHeight: 1.6,
                      fontFamily: '"Lora", serif',
                    }}
                  >
                    {artists[index].description.map((item, idx) => (
                      <li key={idx} style={{ marginBottom: "8px" }}>
                        {item}
                      </li>
                    ))}
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      gap: { xs: 1, sm: 2 },
                      justifyContent: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <Button
                      variant="outlined"
                      onClick={prevArtist}
                      sx={{
                        color: "#f5f5f5",
                        borderColor: "#f5f5f5",
                        fontSize: { xs: "0.75rem", sm: "0.875rem" },
                        px: { xs: 2, sm: 3 },
                        py: 0.5,
                        textTransform: "none",
                        fontFamily: '"Lora", serif',
                        "&:hover": {
                          bgcolor: "#1abc9c",
                          borderColor: "#1abc9c",
                          color: "#ffffff",
                        },
                      }}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="contained"
                      onClick={nextArtist}
                      sx={{
                        bgcolor: "#1abc9c",
                        fontSize: { xs: "0.75rem", sm: "0.875rem" },
                        px: { xs: 2, sm: 3 },
                        py: 0.5,
                        textTransform: "none",
                        fontFamily: '"Lora", serif',
                        "&:hover": {
                          bgcolor: "#34495e",
                        },
                      }}
                    >
                      Next
                    </Button>
                  </Box>
                </Box>
              </Box>
            </motion.div>
          </AnimatePresence>
        </Box>
      </Box>
    </Box>
  );
};

export default BridalShowcase;