import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";
import { Button, Fab } from "@mui/material";
import {
  Box,
  Card,
  CardMedia,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Salon1 from "../Assets/salon1.jpg";
import Salon2 from "../Assets/salon2.jpg";
import Salon3 from "../Assets/salon3.webp";
import haircut from "../Assets/salon4.jpg";
import facial from "../Assets/salon5.png";
import haircolor from "../Assets/salon6.jpg";
import shaving from "../Assets/salon7.png";
import ourwork from "../Assets/salon8.webp";
import ourwork2 from "../Assets/salon9.jpg";
import ourwork3 from "../Assets/salon10.jpg";
import ourwork4 from "../Assets/salon11.jpg";
import ourwork5 from "../Assets/salon12.jpg";
import About from "../Assets/salon13.jpg";
// New imports for additional services

import pedicure from "../Assets/pedicure.jpg";

const SalonPage = () => {
  const carouselRef = useRef(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [activeIndex, setActiveIndex] = useState(0);
  const descriptions = [
    "Revitalize your skin with our rejuvenating facial treatments, tailored to refresh and hydrate your complexion.",
    "Get the perfect look with our expert men's haircut services, designed to match your style and personality.",
    "Enhance your hair’s natural beauty with our stunning balayage and highlights, creating seamless, sun-kissed looks.",
    "Transform your style with our professional women's hair coloring services, offering vibrant and lasting results.",
    "Add volume and movement to your hair with our trendy layer cuts, customized to suit your face shape and style.",
  ];
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  const SalonCards = [
    {
      id: 1,
      title: "HairCut",
      img: haircut,
      description:
        "Get a fresh and stylish haircut that suits your personality and enhances your look!",
    },
    {
      id: 2,
      title: "Facial",
      img: facial,
      description:
        "Enhance your skin's natural glow with our expert facial treatments.",
    },
    {
      id: 3,
      title: "HairColor",
      img: haircolor,
      description:
        "Transform your hair with our expert hair coloring services.",
    },
    {
      id: 4,
      title: "Shaving",
      img: shaving,
      description:
        "Experience a smooth and clean shave with our professional shaving services.",
    },
  ];

  const images = [ourwork, ourwork2, ourwork3, ourwork4, ourwork5];

  const gradientBackground = {
    background: "linear-gradient(135deg, #e6f3ff 0%, #ffffff 100%)",
    padding: "40px 0",
  };

  const sx = {
    container: {
      maxWidth: "2560px",
      margin: "0 auto",
      fontFamily: "Arial, sans-serif",
      overflowX: "hidden",
    },
    carouselContainer: { width: "100%", marginBottom: "0" },
    carouselImage: {
      width: "100%",
      height: isMobile ? "300px" : "500px",
      objectFit: "cover",
    },
    cardsSection: {
      padding: isMobile ? "20px" : "40px",
      ...gradientBackground,
    },
    servicesCarousel: { maxWidth: "1200px", margin: "0 auto" },
    card: {
      position: "relative",
      borderRadius: "12px",
      overflow: "hidden",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      cursor: "pointer",
      height: isMobile ? "250px" : "300px",
      transition: "transform 0.3s ease",
      marginBottom: isMobile ? "20px" : "0",
      "&:hover": {
        transform: "scale(1.05)",
      },
    },
    cardImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transition: "transform 0.3s ease",
      "&:hover": {
        transform: "scale(1.1)",
      },
    },
    overlay: {
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "100%",
      background: "rgba(0,0,0,0.6)",
      color: "white",
      padding: "10px 0",
      textAlign: "center",
      fontSize: isMobile ? "16px" : "20px",
      fontWeight: "500",
      transition: "opacity 0.3s ease",
      "&:hover": {
        opacity: 0,
      },
    },
    title: {
      fontSize: isMobile ? "28px" : "36px",
      marginBottom: "30px",
      color: "#333",
      textAlign: "center",
      fontWeight: "bold",
    },
    aboutSection: {
      padding: isMobile ? "30px" : "60px",
      backgroundColor: "#000",
      background: "linear-gradient(135deg,rgb(255, 255, 255) 0%, #ffffff 100%)",
    },
    workContent: {
      maxWidth: "1200px",
      margin: "0 auto",
      textAlign: "center",
      ...gradientBackground,
    },
    mobileIndicator: {
      display: "flex",
      justifyContent: "center",
      marginTop: "15px",
      gap: "8px",
    },
    indicatorDot: {
      width: "10px",
      height: "10px",
      borderRadius: "50%",
      backgroundColor: "#ccc",
      cursor: "pointer",
    },
    activeDot: {
      backgroundColor: "#333",
    },
  };

  const handleServiceClick = (service) => {
    navigate("/products", {
      state: { designation: "Salon", service: service },
    });
  };
  const handlePrev = () => {
    if (carouselRef.current) {
      const cardWidth =
        carouselRef.current.firstChild.getBoundingClientRect().width + 16; // 16px gap
      carouselRef.current.scrollBy({ left: -cardWidth, behavior: "smooth" });
    }
  };

  const handleNext = () => {
    if (carouselRef.current) {
      const cardWidth =
        carouselRef.current.firstChild.getBoundingClientRect().width + 16; // 16px gap
      carouselRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: activeIndex * (window.innerWidth * 0.8),
        behavior: "smooth",
      });
    }
  }, [activeIndex]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div style={sx.container}>
      <style>
        {`@keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
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
            border-radius: 2px;
          }
          `}
      </style>

      {/* Hero Carousel */}
      <div style={sx.carouselContainer}>
        {isMobile ? (
          <div style={{ position: "relative" }}>
            <Carousel
              showThumbs={false}
              autoPlay
              infiniteLoop
              showStatus={false}
              showArrows={true}
              renderArrowPrev={(onClickHandler, hasPrev, label) =>
                hasPrev && (
                  <button
                    type="button"
                    onClick={onClickHandler}
                    title={label}
                    style={{
                      position: "absolute",
                      zIndex: 2,
                      left: 15,
                      top: "50%",
                      transform: "translateY(-50%)",
                      backgroundColor: "rgba(0,0,0,0.5)",
                      color: "white",
                      border: "none",
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <ArrowBackIosIcon fontSize="small" />
                  </button>
                )
              }
              renderArrowNext={(onClickHandler, hasNext, label) =>
                hasNext && (
                  <button
                    type="button"
                    onClick={onClickHandler}
                    title={label}
                    style={{
                      position: "absolute",
                      zIndex: 2,
                      right: 15,
                      top: "50%",
                      transform: "translateY(-50%)",
                      backgroundColor: "rgba(0,0,0,0.5)",
                      color: "white",
                      border: "none",
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <ArrowForwardIosIcon fontSize="small" />
                  </button>
                )
              }
              selectedItem={activeIndex}
              onChange={setActiveIndex}
            >
              <div>
                <img src={Salon1} style={sx.carouselImage} alt="Salon 1" />
              </div>
              <div>
                <img src={Salon2} style={sx.carouselImage} alt="Salon 2" />
              </div>
              <div>
                <img src={Salon3} style={sx.carouselImage} alt="Salon 3" />
              </div>
            </Carousel>
            <div style={sx.mobileIndicator}>
              {[0, 1, 2].map((index) => (
                <div
                  key={index}
                  style={{
                    ...sx.indicatorDot,
                    ...(activeIndex === index ? sx.activeDot : {}),
                  }}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>
          </div>
        ) : (
          <Carousel showThumbs={false} autoPlay infiniteLoop showStatus={false}>
            <div>
              <img src={Salon1} style={sx.carouselImage} alt="Salon 1" />
            </div>
            <div>
              <img src={Salon2} style={sx.carouselImage} alt="Salon 2" />
            </div>
            <div>
              <img src={Salon3} style={sx.carouselImage} alt="Salon 3" />
            </div>
          </Carousel>
        )}
      </div>

      {/* Services Section */}
      <motion.section
        style={{
          background:
            "radial-gradient(circle at 10% 20%, rgba(248, 249, 250, 0.9) 0%, rgba(233, 236, 239, 0.95) 90%)",
          padding: "4rem 0",
          overflow: "hidden",
        }}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
          },
        }}
      >
        {/* --- Animated Title with Decorative Elements --- */}
        <motion.div
          style={{ textAlign: "center", marginBottom: "3rem" }}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-primary fw-bold mb-4 animate_animated animate_fadeInDown"
            style={{
              animationDuration: "1s",
              fontSize: "1.8rem",
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "#1abc9c",
            }}
          >
            Our Premium Services
          </h2>
          <motion.p
            style={{
              color: "#7f8c8d",
              fontSize: "1.1rem",
              maxWidth: "700px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Experience luxury and precision with our expertly crafted services
          </motion.p>
        </motion.div>

        {/* --- Services Grid --- */}
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "0 20px",
          }}
        >
          <div
            className="row"
            style={{
              justifyContent: "center",
              gap: "1.5rem 0", // Adds vertical and horizontal gap
            }}
          >
            {SalonCards.map((card, i) => (
              <motion.div
                key={card.id}
                className={isMobile ? "col-6" : "col-sm-6 col-md-4 col-lg-3"}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { y: 30, opacity: 0 },
                  visible: {
                    y: 0,
                    opacity: 1,
                    transition: {
                      type: "spring",
                      stiffness: 80,
                      damping: 12,
                      delay: i * 0.1,
                    },
                  },
                }}
                whileHover={{ y: -5 }} // Subtle lift on hover
              >
                {/* --- Service Card --- */}
                <motion.div
                  style={{
                    background:
                      "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)",
                    borderRadius: "16px",
                    overflow: "hidden",
                    boxShadow: "0 12px 24px -6px rgba(0,0,0,0.15)",
                    cursor: "pointer",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    border: "1px solid rgba(255,255,255,0.1)",
                    position: "relative",
                  }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 20px 40px -10px rgba(0,0,0,0.25)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleServiceClick(card.title)}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* --- Image with Gradient Overlay --- */}
                  <div
                    style={{
                      position: "relative",
                      height: "200px",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={card.img}
                      alt={card.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.5s ease",
                      }}
                      className="card-image-hover"
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background:
                          "linear-gradient(to top, rgba(44, 62, 80, 0.7) 0%, transparent 60%)",
                      }}
                    />
                  </div>

                  {/* --- Card Content --- */}
                  <div
                    style={{
                      padding: "1.5rem",
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      background: "#d9f5ef",
                    }}
                  >
                    <h3
                      style={{
                        color: "#1abc9c",
                        marginBottom: "0.75rem",
                        fontSize: "1.3rem",
                        fontWeight: 600,
                        letterSpacing: "0.3px",
                      }}
                    >
                      {card.title}
                    </h3>
                    <p
                      style={{
                        color: "rgba(0, 0, 0, 0.85)",
                        fontSize: "0.95rem",
                        lineHeight: 1.5,
                        marginBottom: "1.25rem",
                        flex: 1,
                      }}
                    >
                      {card.description ||
                        "Indulge in our premium service designed for exceptional results"}
                    </p>

                    {/* --- Animated CTA Button --- */}
                    <motion.div
                      style={{
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
                      }}
                      whileHover={{
                        background: "rgba(26, 188, 156, 0.2)",
                        borderColor: "#1abc9c",
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      Book
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#1abc9c"
                        style={{ marginLeft: "8px" }}
                      >
                        <path
                          d="M5 12h14M12 5l7 7-7 7"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* About Us Section */}
      <section
        style={{
          ...sx.aboutSection,
          background: "#d9f5ef",
          color: "#fff",
        }}
      >
        <div style={sx.aboutContent}>
          <h2
            className="text-primary fw-bold mb-4 animate_animated animate_fadeInDown"
            style={{
              ...sx.title,
              animationDuration: "1s",
              fontSize: "2rem",
              letterSpacing: "1px",
              textTransform: "uppercase",
              color: "#000",
              fontFamily: "'Lora', serif", // Title font (Lora)
              fontWeight: "700", // Make title bolder
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)", // Add shadow effect for depth
            }}
          >
            About Us
          </h2>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "50px",
              flexDirection: isMobile ? "column" : "row",
              color: "#000",
            }}
          >
            {/* Left section for non-mobile devices */}
            {!isMobile && (
              <Box sx={{ flex: 1, padding: "20px", color: "#000 !important" }}>
                <Typography
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: { xs: "0.9rem", md: "1.1rem" },
                    lineHeight: "1.8",
                    marginTop: "10px",
                    color: "#000 !important", // Force black color with !important
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      color: "#000",
                      transform: "scale(1.05)",
                    },
                    "&:focus, &:active": {
                      color: "#000 !important", // Ensure black on focus/active states
                    },
                  }}
                >
                  Welcome to Salon, your haven of beauty and relaxation. Located
                  in the heart of your city, we're passionate about helping you
                  shine. Our expert stylists and beauty professionals offer
                  personalized services, from stunning haircuts and bold colors
                  to soothing spa treatments and intricate nail art. At our
                  Salon, every visit is crafted to make you feel special, using
                  premium products and cutting-edge techniques. Our mission is
                  simple: to enhance your natural beauty while providing a warm,
                  inviting experience. Step in for a quick refresh or a full
                  transformation—leave feeling confident and radiant.
                </Typography>
              </Box>
            )}

            {/* Centered Image */}
            <Box sx={{ flex: 1, textAlign: "center", mb: isMobile ? 2 : 0 }}>
              <motion.img
                src={About}
                alt="Salon"
                style={{
                  width: "100%",
                  maxWidth: "450px",
                  borderRadius: "10px",
                  boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)", // Slight shadow for depth
                  transition: "transform 0.3s ease-in-out", // Smooth scaling effect
                  "&:hover": {
                    transform: "scale(1.05)", // Slight zoom-in effect on hover
                  },
                }}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              />
            </Box>

            {/* Right section for mobile devices */}
            {isMobile && (
              <Box sx={{ flex: 1, padding: "20px" }}>
                <Typography
                  sx={{
                    fontFamily: "'Poppins', sans-serif", // Content font (Poppins)
                    fontSize: { xs: "0.9rem", md: "1.1rem" },
                    lineHeight: "1.6",
                    marginTop: "10px",
                    color: "#000",
                    transition: "all 0.3s ease-in-out", // Smooth transition on hover
                    "&:hover": {
                      color: "#1abc9c", // Hover effect color change
                      transform: "scale(1.05)", // Slight zoom-in effect
                    },
                  }}
                >
                  Welcome to Salon, your haven of beauty and relaxation. Our
                  expert stylists offer personalized services using premium
                  products and cutting-edge techniques to enhance your natural
                  beauty.
                </Typography>
              </Box>
            )}
          </Box>
        </div>
      </section>

      {/* Our Work Section */}
      <section style={gradientBackground}>
        <div style={sx.workContent}>
          <h2
            className="text-primary fw-bold mb-4 animate_animated animate_fadeInDown"
            style={{
              animationDuration: "1s",
              fontSize: "1.8rem",
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "#1abc9c",
            }}
          >
            See Our Work
          </h2>

          <Box
            sx={{
              position: "relative",
              width: "100%",
              maxWidth: { xs: "100%", md: "1200px" },
              margin: "0 auto",
              padding: { xs: "0 10px", md: "0 20px" },
            }}
          >
            <Box
              ref={carouselRef}
              sx={{
                display: "flex",
                overflowX: "auto",
                scrollSnapType: "x mandatory",
                gap: { xs: 2, md: 4 },
                padding: { xs: "10px 0", md: "20px 0" },
                scrollBehavior: "smooth",
                WebkitOverflowScrolling: "touch",
                "&::-webkit-scrollbar": { display: "none" },
                msOverflowStyle: "none",
                scrollbarWidth: "none",
              }}
            >
              {images.map((img, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    sx={{
                      flex: "0 0 auto",
                      width: isMobile ? "80vw" : "30vw", // Mobile width: 80% of viewport width
                      maxWidth: "350px",
                      height: isMobile ? "40vh" : "60vh",
                      maxHeight: "450px",
                      scrollSnapAlign: "center",
                      borderRadius: 4,
                      boxShadow: 3,
                      overflow: "hidden",
                      transition: "transform 0.3s ease-in-out",
                      "&:hover": {
                        transform: "scale(1.05)",
                        "& .description-box": {
                          transform: "translateY(0)",
                        },
                      },
                      margin: "0 5px",
                      position: "relative",
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={img}
                      alt={`Work ${index + 1}`}
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    {/* Adjusting for small screens */}
                    <Box
                      className="description-box"
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                        color: "white",
                        padding: "16px",
                        transform: isMobile
                          ? "translateY(0)"
                          : "translateY(100%)",
                        transition: "transform 0.3s ease-in-out",
                        maxHeight: "50%",
                        overflow: "auto",
                        display: "flex",
                        flexDirection: "column", // Always stack vertically (even on larger screens)
                        justifyContent: "center",
                        alignItems: "center", // Optional: center text horizontally
                        textAlign: "center", // Optional: center text
                      }}
                    >
                      <Typography variant="h6" sx={{ mb: 1 }}>
                        What We've Done
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
                      >
                        {descriptions[index] || "Description not available"}
                      </Typography>
                    </Box>
                  </Card>
                </motion.div>
              ))}
            </Box>

            {/* Prev Button */}
            <Button
              onClick={handlePrev}
              sx={{
                position: "absolute",
                top: "50%",
                left: "10px",
                transform: "translateY(-50%)",
                minWidth: "40px",
                height: "40px",
                borderRadius: "50%",
                background:
                  "linear-gradient(135deg,rgb(77, 125, 153) 0%,rgb(10, 8, 10) 100%)",
                color: "white",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #1976D2 0%, #D81B60 100%)",
                },
              }}
            >
              <ArrowBackIosIcon fontSize="small" />
            </Button>

            {/* Next Button */}
            <Button
              onClick={handleNext}
              sx={{
                position: "absolute",
                top: "50%",
                right: "10px",
                transform: "translateY(-50%)",
                minWidth: "40px",
                height: "40px",
                borderRadius: "50%",
                background:
                  "linear-gradient(135deg,rgb(77, 125, 153) 0%,rgb(10, 8, 10) 100%)",
                color: "white",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #1976D2 0%, #D81B60 100%)",
                },
              }}
            >
              <ArrowForwardIosIcon fontSize="small" />
            </Button>
          </Box>
        </div>
      </section>

      {/* More Salon Services Section */}
      {/* <motion.section 
                style={{
                    padding: isMobile ? '30px 20px' : '60px',
                    background: 'linear-gradient(135deg, #f0f8ff 0%, #e6f7ff 100%)',
                }}
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
            >
                <motion.h2 style={sx.title}>More Salon Services</motion.h2>
                <div style={sx.servicesCarousel}>
                    <div className="row">
                        {MoreSalonCards.map((card, i) => (
                            <motion.div 
                                key={card.id} 
                                className={isMobile ? "col-6" : "col-sm-6 col-md-4 col-lg-3 mb-4"}
                                custom={i}
                                initial="hidden"
                                animate="visible"
                                variants={cardVariants}
                            >
                                <motion.div
                                    style={sx.card}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleServiceClick(card.title)}
                                >
                                    <img
                                        src={card.img}
                                        alt={card.title}
                                        style={sx.cardImage}
                                    />
                                    <div style={sx.overlay}>{card.title}</div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section> */}

      {/* Book Now Floating Button */}
      <Fab
        color="primary"
        variant="extended"
        sx={{
          position: "fixed",
          bottom: 20,
          right: isMobile ? 20 : 60,
          zIndex: 1000,
          px: 3,
          background: "#d9f5ef", // Initial background
          color: "#1abc9c", // Initial text color
          transition: "all 0.3s ease",
          boxShadow: "0 4px 12px rgba(26, 188, 156, 0.4)",
          fontWeight: "bold",
          boder: "1px solid #fff",
          "&:hover": {
            background: "#b8eae2", // Light teal color on hover
            color: "#1abc9c", // Keep text color teal
            // border:"1px solid green",
            boxShadow: "0 6px 16px rgba(26, 188, 156, 0.6)", // Slightly stronger glow on hover
          },
        }}
        onClick={() =>
          navigate("/products", { state: { designation: "Salon" } })
        }
      >
        <BookOnlineIcon sx={{ mr: 1 }} />
        Book Now
      </Fab>
    </div>
  );
};

export default SalonPage;
