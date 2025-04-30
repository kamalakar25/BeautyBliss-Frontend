import React, { useState } from "react";
import { Box, Slider, Typography } from "@mui/material";
import beforehair from "../Assets/before.png";
import afterhair from "../Assets/after.png";
import beforeskin from "../Assets/beforeskin.jpg";
import afterskin from "../Assets/afterskin.png";

const Transformation = () => {
  const [hairSliderPosition, setHairSliderPosition] = useState(50);
  const [skinSliderPosition, setSkinSliderPosition] = useState(50);

  const handleHairSliderChange = (e) => {
    setHairSliderPosition(e.target.value);
  };

  const handleSkinSliderChange = (e, newValue) => {
    setSkinSliderPosition(newValue);
  };

  return (
    <Box
      sx={{
        background: "#d8f4ee",
        minHeight: "100vh",
        py: { xs: 4, sm: 6 }, // Reduced padding on mobile
        fontFamily: "'Poppins', sans-serif",
      }}
    >
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
        Our Transformations
      </h2>
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
          }

          .transformations-container {
            display: flex;
            flex-wrap: wrap;
            gap: 2rem; /* Equivalent to spacing={4} (4 * 8px = 32px) */
            justify-content: center;
            max-width: 1200px;
            margin: 0 auto;
          }

          .transformation-item {
            flex: 1 1 100%; /* Full width on small screens */
            max-width: 500px; /* Match maxWidth of transformation box */
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          @media (min-width: 600px) {
            .transformation-item {
              flex: 1 1 calc(50% - 2rem); /* Two columns on small screens and up */
            }
          }
        `}
      </style>

      {/* Transformations flex container */}
      <Box className="transformations-container">
        {/* Hair Transformation */}
        <Box className="transformation-item">
          <Typography
            variant="h5"
            sx={{
              textAlign: "center",
              mb: 2,
              color: "#1abc9c",
              fontWeight: 600,
              fontSize: { xs: "1.2rem", sm: "1.5rem" }, // Smaller on mobile
            }}
          >
            Hair Transformation
          </Typography>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              maxWidth: { xs: "300px", sm: "500px" }, // Reduced size on mobile
              margin: "0 auto",
              touchAction: "none",
              padding: { xs: "10px", sm: "20px" }, // Reduced padding on mobile
              border: "6px solid #f5f5f5",
              borderRadius: "15px",
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "scale(1.02)",
                boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
              },
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: "100%",
                borderRadius: "10px",
                aspectRatio: "4/3",
                overflow: "hidden",
              }}
            >
              <Box
                component="img"
                src={afterhair}
                alt="After Hair"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "top center",
                  userSelect: "none",
                  pointerEvents: "none",
                  borderRadius: "10px",
                  display: "block",
                }}
              />
              <Box
                component="img"
                src={beforehair}
                alt="Before Hair"
                sx={{
                  position: "absolute",
                  top: 0, // Adjusted to align properly
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "top center",
                  clipPath: `inset(0 ${100 - hairSliderPosition}% 0 0)`,
                  transition: "clip-path 0.2s ease-out",
                  userSelect: "none",
                  pointerEvents: "none",
                  borderRadius: "10px",
                  display: "block",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: `${hairSliderPosition}%`,
                  width: "3px",
                  backgroundColor: "white",
                  transform: "translateX(-50%)",
                  zIndex: 2,
                  transition: "left 0.2s ease-out",
                  pointerEvents: "none",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: "8px",
                  left: "12px",
                  backgroundColor: "rgba(0,0,0,0.7)",
                  color: "white",
                  padding: "3px 8px",
                  borderRadius: "5px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  zIndex: 4,
                  backdropFilter: "blur(4px)",
                }}
              >
                Before
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  top: "8px",
                  right: "12px",
                  backgroundColor: "rgba(0,0,0,0.7)",
                  color: "white",
                  padding: "3px 8px",
                  borderRadius: "5px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  zIndex: 4,
                  backdropFilter: "blur(4px)",
                }}
              >
                After
              </Box>
              <Slider
                value={hairSliderPosition}
                onChange={(e, newValue) =>
                  handleHairSliderChange({ target: { value: newValue } })
                }
                min={0}
                max={100}
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  opacity: 0,
                  zIndex: 3,
                  cursor: "ew-resize",
                  "& .MuiSlider-thumb": { display: "none" },
                  "& .MuiSlider-track": { display: "none" },
                  "& .MuiSlider-rail": { display: "none" },
                }}
              />
            </Box>
          </Box>
        </Box>
        {/* Skin Transformation */}
        <Box className="transformation-item">
          <Typography
            variant="h5"
            sx={{
              textAlign: "center",
              mb: 2,
              color: "#1abc9c",
              fontWeight: 600,
              fontSize: { xs: "1.2rem", sm: "1.5rem" }, // Smaller on mobile
            }}
          >
            Skin Transformation
          </Typography>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              maxWidth: { xs: "300px", sm: "500px" }, // Reduced size on mobile
              margin: "0 auto",
              touchAction: "none",
              padding: { xs: "10px", sm: "20px" }, // Reduced padding on mobile
              border: "6px solid #f5f5f5",
              borderRadius: "15px",
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "scale(1.02)",
                boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
              },
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: "100%",
                borderRadius: "10px",
                aspectRatio: "4/3",
                overflow: "hidden",
              }}
            >
              <Box
                component="img"
                src={afterskin}
                alt="After Skin"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "top center",
                  userSelect: "none",
                  pointerEvents: "none",
                  borderRadius: "10px",
                  display: "block",
                }}
              />
              <Box
                component="img"
                src={beforeskin}
                alt="Before Skin"
                sx={{
                  position: "absolute",
                  top: 0, // Adjusted to align properly
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "top center",
                  clipPath: `inset(0 ${100 - skinSliderPosition}% 0 0)`,
                  transition: "clip-path 0.2s ease-out",
                  userSelect: "none",
                  pointerEvents: "none",
                  borderRadius: "10px",
                  display: "block",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: `${skinSliderPosition}%`,
                  width: "3px",
                  backgroundColor: "white",
                  transform: "translateX(-50%)",
                  zIndex: 2,
                  transition: "left 0.2s ease-out",
                  pointerEvents: "none",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: "8px",
                  left: "12px",
                  backgroundColor: "rgba(0,0,0,0.7)",
                  color: "white",
                  padding: "3px 8px",
                  borderRadius: "5px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  zIndex: 4,
                  backdropFilter: "blur(4px)",
                }}
              >
                Before
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  top: "8px",
                  right: "12px",
                  backgroundColor: "rgba(0,0,0,0.7)",
                  color: "white",
                  padding: "3px 8px",
                  borderRadius: "5px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  zIndex: 4,
                  backdropFilter: "blur(4px)",
                }}
              >
                After
              </Box>
              <Slider
                value={skinSliderPosition}
                onChange={handleSkinSliderChange}
                min={0}
                max={100}
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  opacity: 0,
                  zIndex: 3,
                  cursor: "ew-resize",
                  "& .MuiSlider-thumb": { display: "none" },
                  "& .MuiSlider-track": { display: "none" },
                  "& .MuiSlider-rail": { display: "none" },
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Transformation;
