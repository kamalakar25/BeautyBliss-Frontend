import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";

const services = [
  {
    title: "Hair Treatment",
    description:
      "Specialized care for hair loss, dandruff, and scalp issues. Treatments include PRP, laser therapy, and regrowth plans.",
    image:
      "https://img.freepik.com/premium-photo/hair-treatment-procedure-with-professional-applying-serum_37732-6171.jpg?w=360",
    color: "#1abc9c",
    bgColor: "#d8f4ee",
  },
  {
    title: "Skin Treatment",
    description:
      "Advanced solutions for acne, pigmentation, and anti-aging. Services include chemical peels, laser, and rejuvenation.",
    image: "https://img1.wsimg.com/isteam/stock/gYlVpPP",
    color: "#1abc9c",
    bgColor: "#d8f4ee",
  },
];

const OurServices = () => {
  const navigate = useNavigate();

  const handleServiceClick = (service) => {
    navigate("/products", { state: { designation: "Doctor", service } });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,rgb(255, 255, 255) 0%,rgb(255, 255, 255) 100%)",
        px: { xs: 2, sm: 4 },
        py: { xs: 6, sm: 10 },
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
            borderRadius: 2px;
          }

          .services-container {
            display: flex;
            flex-wrap: wrap;
            gap: 2rem; /* Equivalent to spacing={4} (4 * 8px = 32px) */
            justify-content: center;
            align-items: stretch;
          }

          .service-item {
            flex: 1 1 100%; /* Full width on small screens */
            max-width: 420px; /* Match maxWidth of Card */
            display: flex;
            justify-content: center;
          }

          @media (min-width: 960px) {
            .service-item {
              flex: 1 1 calc(50% - 2rem); /* Two columns on medium screens and up */
            }
          }
        `}
      </style>
      {/* Title with logo */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        mb={4}
        flexWrap="wrap"
        gap={0.1}
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
          Our Services
        </h2>
        <Box
          component="img"
          sx={{
            height: { xs: "2.2rem", sm: "3rem", md: "3.5rem" },
            width: "auto",
            ml: 1,
          }}
        />
      </Box>

      {/* Services flex container */}
      <Box className="services-container">
        {services.map((service, index) => (
          <Box className="service-item" key={index}>
            <Card
              elevation={8}
              sx={{
                width: "100%",
                maxWidth: 420,
                height: "100%",
                borderRadius: 4,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                backgroundColor: service.bgColor,
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: 12,
                },
              }}
            >
              <CardMedia
                component="img"
                height="240"
                image={service.image}
                alt={service.title}
                loading="lazy"
              />
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color: service.color,
                    mb: 1.5,
                  }}
                >
                  {service.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#000", mb: 3, fontSize: "0.95rem" }}
                >
                  {service.description}
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => handleServiceClick(service.title)}
                  sx={{
                    background: "rgba(26, 188, 156, 0.1)",
                    color: "#1abc9c",
                    padding: "0.6rem 1rem",
                    borderRadius: "8px",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid rgba(26, 188, 156, 0.3)",
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    width: "fit-content",
                    marginTop: "auto",
                    alignSelf: "flex-start",
                    "&:hover": {
                      background: "rgba(26, 188, 156, 0.62)",
                      borderColor: "#1abc9c",
                    },
                  }}
                  aria-label={`View more about ${service.title}`}
                  title={`View more about ${service.title}`}
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default OurServices;
