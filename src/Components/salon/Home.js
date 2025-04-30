import React, { useRef, useState, useEffect } from "react";
// import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import salonImage from "../Assets/salon.jpg";
import hairImage from "../Assets/hair.jpg";
import beautyImage from "../Assets/beauty.jpg";
import skincareImage from "../Assets/skincare.jpg";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/salon");
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
        minHeight: "100vh",
      }}
    >
      {/* Home Hero Section (unchanged) */}
      <div
        className="container-fluid d-flex align-items-center justify-content-center px-3 px-md-5"
        style={{ backgroundColor: "rgb(217, 245, 239)", minHeight: "82vh" }}
      >
        <style>
          {`
            .btn-conteiner {
              display: flex;
              justify-content: center;
              --color-text: #000;
              --color-background:rgb(198, 245, 235);
              --color-background1: rgba(20, 255, 255, 0.9);
              --color-outline: rgba(20, 255, 255, 0.5);
              --color-shadow: rgba(29, 86, 100, 0.5);
            }

          .btn-content {
    display: flex;
    align-items: center;
    padding: 5px 30px;
    text-decoration: none;
    font-family: 'Poppins', sans-serif;
    font-weight: 100;
    font-size: 20px;
    color: var(--color-text);
    background: rgb(176 232 232 / 90%);
    transition: 1s;
    border-radius: 100px;
    box-shadow: 0 0 0.2em 0 var(--color-background);
    border: 1px solid darkgreen;
}


            .btn-content:hover, .btn-content:focus {
              transition: 0.5s;
              -webkit-animation: btn-content 1s;
              animation: btn-content 1s;
              outline: 0.1em solid transparent;
              outline-offset: 0.2em;
              box-shadow: 0 0 0.4em 0 var(--color-background);
            }

            .btn-content .icon-arrow {
              transition: 0.5s;
              margin-right: 0px;
              transform: scale(0.6);
            }

            .btn-content:hover .icon-arrow {
              transition: 0.5s;
              margin-right: 25px;
            }

            .icon-arrow {
              width: 20px;
              margin-left: 15px;
              position: relative;
              top: 6%;
            }

            #arrow-icon-one {
              transition: 0.4s;
              transform: translateX(-60%);
              
              color: #fff !important;
            }

            #arrow-icon-two {
              transition: 0.5s;
              transform: translateX(-30%);
              color: #fff !important;
            }

            .btn-content:hover #arrow-icon-three {
              animation: color_anim 1s infinite 0.2s;
            }

            .btn-content:hover #arrow-icon-one {
              transform: translateX(0%);
              animation: color_anim 1s infinite 0.6s;
            }

            .btn-content:hover #arrow-icon-two {
              transform: translateX(0%);
              animation: color_anim 1s infinite 0.4s;
            }

            @keyframes color_anim {
              0% { fill: white; }
              50% { fill: var(--color-background); }
              100% { fill: white; }
            }

            @-webkit-keyframes btn-content {
              0% { outline: 0.2em solid var(--color-background); outline-offset: 0; }
            }

            @keyframes btn-content {
              0% { outline: 0.2em solid var(--color-background); outline-offset: 0; }
            }

            @media (max-width: 576px) {
              .btn-content {
                font-size: 20px;
                padding: 5px 20px;
              }
              .icon-arrow {
                width: 15px;
                margin-left: 10px;
              }
            }

            /* Responsive Adjustments for Skincare Section */
@media (max-width: 767px) {
  #skincare .col-md-6.text-start {
    text-align: center !important; /* Center text on small screens */
    padding: 0 15px; /* Add padding to prevent content from touching edges */
  }

  #skincare h2.text-primary {
    font-size: 1.8rem !important; /* Reduce heading size */
    margin-bottom: 1rem;
  }

  #skincare h3.fw-bold {
    font-size: 1.5rem !important; /* Reduce subheading size */
    line-height: 1.4;
  }

  #skincare p.lead {
    font-size: 1rem !important; /* Reduce paragraph size */
    line-height: 1.5;
    max-width: 100%; /* Ensure paragraph fits within container */
  }

  #skincare ul.list-unstyled li {
    max-width: 100% !important; /* Remove max-width constraint */
    padding: 10px 15px; /* Adjust padding for better spacing */
    font-size: 0.9rem; /* Reduce font size */
    border: 1px solid #dfe6e9; /* Softer border color */
  }

  #skincare ul.list-unstyled li span.text-primary {
    font-size: 1.2rem; /* Adjust checkmark size */
  }

  /* Optimize animations for performance */
  #skincare .animate__animated {
    animation-duration: 0.8s; /* Slightly faster animations */
  }

  /* Adjust image stacking for smaller screens */
  #skincare .img-wrapper {
    position: relative !important;
    top: 0 !important;
    left: 0 !important;
    margin-bottom: 10px;
  }

  #skincare .custom-img {
    width: 330px;
    height: 200px !important; /* Reduce image height */
    max-width: 300px;
    margin: 0 auto;
  }

  #skincare .position-relative.d-flex {
    height: auto !important; /* Remove fixed height */
    flex-direction: column;
    align-items: center;
  }
}

/* Ensure list items don't overflow */
ul.list-unstyled li {
  width: 100%;
  max-width: 100%; /* Override previous max-width */
  box-sizing: border-box; /* Ensure padding doesn't cause overflow */
}

/* General section padding */
section#skincare {
  padding: 30px 0; /* Reduce padding on small screens */
}

/* Fix for text wrapping */
#skincare .col-md-6.text-start p,
#skincare .col-md-6.text-start li {
  word-wrap: break-word; /* Ensure long words break properly */
}


              
          `}
        </style>

        <div className="row w-100 align-items-center text-white g-4">
          <div className="col-md-6 text-center text-md-start">
            <h1 className="display-md-5 text-dark fw-bold animate__animated animate__fadeInDown">
              Your One-Stop{" "}
              <span className="text-warning">Beauty Destination</span>
            </h1>
            <p
              className=" text-dark mt-3 animate__animated animate__fadeInUp"
              style={{ animationDelay: "0.3s" }}
            >
              Discover expert services from salon to skincare in one elegant
              space.
            </p>
            <div className="mt-4 d-flex flex-column flex-sm-row flex-wrap gap-3 justify-content-center justify-content-md-start">
              <div
                className="btn-conteiner animate__animated animate__zoomIn"
                style={{ animationDelay: "0.5s" }}
              >
                <a href="/salon" className="btn-content">
                  <span>Salon</span>
                  <svg
                    className="icon-arrow"
                    viewBox="30 0 10 43"
                    height="20"
                    width="20"
                  >
                    <path
                      id="arrow-icon-one"
                      d="M40.154 0L65.651 21.945L40.154 43.891L37.172 40.909L56.127 21.945L37.172 3L40.154 0Z"
                    />
                    <path
                      id="arrow-icon-two"
                      d="M25.497 0L50.994 21.945L25.497 43.891L22.515 40.909L41.47 21.945L22.515 3L25.497 0Z"
                    />
                    <path
                      id="arrow-icon-three"
                      d="M10.841 0L36.338 21.945L10.841 43.891L7.859 40.909L26.814 21.945L7.859 3L10.841 0Z"
                    />
                  </svg>
                </a>
              </div>
              <div
                className="btn-conteiner animate__animated animate__zoomIn"
                style={{ animationDelay: "0.7s" }}
              >
                <a href="/beauty" className="btn-content">
                  <span>Beauty</span>
                  <svg
                    className="icon-arrow"
                    viewBox="30 0 10 43"
                    height="20"
                    width="20"
                  >
                    <path
                      id="arrow-icon-one"
                      d="M40.154 0L65.651 21.945L40.154 43.891L37.172 40.909L56.127 21.945L37.172 3L40.154 0Z"
                    />
                    <path
                      id="arrow-icon-two"
                      d="M25.497 0L50.994 21.945L25.497 43.891L22.515 40.909L41.47 21.945L22.515 3L25.497 0Z"
                    />
                    <path
                      id="arrow-icon-three"
                      d="M10.841 0L36.338 21.945L10.841 43.891L7.859 40.909L26.814 21.945L7.859 3L10.841 0Z"
                    />
                  </svg>
                </a>
              </div>
              <div
                className="btn-conteiner animate__animated animate__zoomIn"
                style={{ animationDelay: "0.9s" }}
              >
                <a href="/skincare" className="btn-content">
                  <span>Skincare</span>
                  <svg
                    className="icon-arrow"
                    viewBox="30 0 10 43"
                    height="20"
                    width="20"
                  >
                    <path
                      id="arrow-icon-one"
                      d="M40.154 0L65.651 21.945L40.154 43.891L37.172 40.909L56.127 21.945L37.172 3L40.154 0Z"
                    />
                    <path
                      id="arrow-icon-two"
                      d="M25.497 0L50.994 21.945L25.497 43.891L22.515 40.909L41.47 21.945L22.515 3L25.497 0Z"
                    />
                    <path
                      id="arrow-icon-three"
                      d="M10.841 0L36.338 21.945L10.841 43.891L7.859 40.909L26.814 21.945L7.859 3L10.841 0Z"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="col-md-6 text-center">
            <img
              src={salonImage}
              alt="Beauty Services"
              className="img-fluid rounded animate__animated animate__pulse"
              style={{
                maxHeight: "320px",
                objectFit: "cover",
                border: "2px solid #566573",
                boxShadow: "0px 4px 1px 10px rgba(26, 188, 156, 0.61)",
                width: "100%",
                maxWidth: "500px",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                marginBottom: "20px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow =
                  "6px 0px 12px 11px rgba(26, 188, 156, 0.61)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="container-fluid px-0">
        {/* Salon Section */}
        <section
          className="py-5"
          id="salon"
          style={{
            background: "#ebece2",
          }}
        >
          <div className="container">
            <div className="row align-items-center">
              <div className="col-12 text-center">
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
                  Premium Salon Services
                </h2>
                <motion.p
                  className="mb-5 text-dark"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 1.5 }}
                >
                  Experience luxury hair care with our expert stylists using
                  top-quality products for your perfect look.
                </motion.p>

                <div className="row g-4">
                  {/* Card 1 */}
                  <motion.div
                    className="col-12 col-sm-6 col-lg-3"
                    initial={{ y: -100, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ delay: 0.3, duration: 1 }}
                  >
                    <div
                      className="card h-100 shadow-lg border-0"
                      style={cardStyle}
                    >
                      <img
                        src="https://images.fresha.com/lead-images/placeholders/barbershop-54.jpg?class=venue-gallery-mobile"
                        alt="Precision Haircut"
                        className="card-img-top"
                        style={imgStyle}
                      />
                      <div className="card-body p-4 text-center">
                        <h5 className="card-title mb-3" style={titleStyle}>
                          Precision Haircuts
                        </h5>
                        <p
                          className="card-text text-muted mb-4"
                          style={textStyle}
                        >
                          Tailored cuts to suit your style and face shape,
                          crafted by master stylists.
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Card 2 */}
                  <motion.div
                    className="col-12 col-sm-6 col-lg-3"
                    initial={{ y: -100, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ delay: 0.5, duration: 1 }}
                  >
                    <div
                      className="card h-100 shadow-lg border-0"
                      style={cardStyle}
                    >
                      <img
                        src="https://trademarksalon.com/wp-content/uploads/2024/03/Balayage-vs.-Highlights.jpg"
                        alt="Balayage & Highlights"
                        className="card-img-top"
                        style={imgStyle}
                      />
                      <div className="card-body p-4 text-center">
                        <h5 className="card-title mb-3" style={titleStyle}>
                          Balayage & Highlights
                        </h5>
                        <p
                          className="card-text text-muted mb-4"
                          style={textStyle}
                        >
                          Vibrant, hand-painted color for a natural, glowing
                          finish.
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Card 3 */}
                  <motion.div
                    className="col-12 col-sm-6 col-lg-3"
                    initial={{ y: -100, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ delay: 0.7, duration: 1 }}
                  >
                    <div
                      className="card h-100 shadow-lg border-0"
                      style={cardStyle}
                    >
                      <img
                        src="https://limelitesalonandspa.com/wp-content/uploads/2022/10/image-4-1024x719.png"
                        alt="Keratin Treatment"
                        className="card-img-top"
                        style={imgStyle}
                      />
                      <div className="card-body p-4 text-center">
                        <h5 className="card-title mb-3" style={titleStyle}>
                          Keratin Treatments
                        </h5>
                        <p
                          className="card-text text-muted mb-4"
                          style={textStyle}
                        >
                          Smooth and strengthen your hair with frizz-free shine
                          lasting weeks.
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Card 4 */}
                  <motion.div
                    className="col-12 col-sm-6 col-lg-3"
                    initial={{ y: -100, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ delay: 0.9, duration: 1 }}
                  >
                    <div
                      className="card h-100 shadow-lg border-0"
                      style={cardStyle}
                    >
                      <img
                        src="https://www.theestheticclinic.com/blog/wp-content/uploads/2018/05/Regrow-hair-follicles-Acquire-stem-cell-hair-transplant-India.jpg"
                        alt="Scalp Treatment"
                        className="card-img-top"
                        style={imgStyle}
                      />
                      <div className="card-body p-4 text-center">
                        <h5 className="card-title mb-3" style={titleStyle}>
                          Scalp Treatments
                        </h5>
                        <p
                          className="card-text text-muted mb-4"
                          style={textStyle}
                        >
                          Revitalize your scalp and boost healthy hair growth
                          naturally.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Beauty Section */}
        <section
          className="py-5"
          id="beauty"
          style={{
            background: "rgb(217, 245, 239)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            overflowX: "hidden",
          }}
        >
          <div className="container">
            <div className="text-center animate__animated animate__fadeInUp">
              <h2
                className="text-primary fw-bold mb-4 animate__animated animate__fadeInDown"
                style={{
                  animationDuration: "1s",
                  fontSize: "1.5rem",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: "#1abc9c",
                }}
              >
                Luxury Beauty Treatments
              </h2>

              <p
                className="lead mb-5 animate__animated animate__fadeIn"
                style={{
                  animationDelay: "0.5s",
                  fontSize: "1rem",
                  color: "#000",
                  letterSpacing: "1px",
                }}
              >
                Discover the best beauty treatments to indulge yourself.
              </p>

              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                {[
                  {
                    title: "Bridal Makeup",
                    text: "Flawless makeup for your big day.",
                    img: "https://queensinstyle.com/assets/images/logo-3.png", // Bridal Makeup Icon
                    color: "text-danger",
                  },
                  {
                    title: "Gel Manicures",
                    text: "Perfect nails with vibrant gel colors.",
                    img: "https://mademynail.com/cdn/shop/products/handmade-rose-gold-bling-nail-art-design-838185_1000x.jpg?v=1670334645", // Gel Manicure Icon
                    color: "text-primary",
                  },
                  {
                    title: "Nail Art Design",
                    text: "Creative designs to showcase your style.",
                    img: "https://png.pngtree.com/png-vector/20240607/ourmid/pngtree-d-hand-with-a-metallic-rose-gold-nail-polish-on-transparent-png-image_12641216.png", // Nail Art Icon
                    color: "text-success",
                  },
                  {
                    title: "Spa Pedicures",
                    text: "Relaxing treatments for soft, pampered feet.",
                    img: "https://png.pngtree.com/png-vector/20230924/ourmid/pngtree-pedicure-and-manicure-toe-png-image_9990440.png", // Spa Pedicure Icon
                    color: "text-warning",
                  },
                ].map((card, idx) => (
                  <div className="col" key={idx}>
                    <div
                      className="card shadow-lg rounded-4 transform-hover border border-light"
                      style={{
                        background: "#e6e6fa",
                        transition:
                          "transform 0.3s ease, box-shadow 0.3s ease-in-out",
                        borderWidth: "2px",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.05)";
                        e.currentTarget.style.boxShadow =
                          "0 15px 30px rgba(0, 0, 0, 0.4)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.boxShadow =
                          "0 10px 20px rgba(0, 0, 0, 0.2)";
                      }}
                    >
                      <img
                        src={card.img}
                        alt={card.title}
                        className="card-img-top mx-auto"
                        style={{
                          width: "100px",
                          height: "100px",
                          margin: "20px auto 15px",
                          objectFit: "contain",
                          transition: "all 0.3s ease",
                        }}
                      />
                      <div className="card-body text-center">
                        <h5
                          className={`card-title ${card.color} fw-bold`}
                          style={{ fontSize: "1.3rem" }}
                        >
                          {card.title}
                        </h5>
                        <p
                          className="card-text text-dark"
                          style={{ fontSize: "1rem" }}
                        >
                          {card.text}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Skincare Section */}
        <section className="py-5" id="skincare">
          <div className="container">
            <div className="row align-items-center py-5">
              {/* Left Side: Images (unchanged) */}
              <div className="col-md-6 text-center mb-4 mb-md-0 animate__animated animate__slideInLeft">
                <div
                  className="position-relative d-flex justify-content-center"
                  style={{ height: "400px" }}
                >
                  <div
                    className="position-absolute img-wrapper"
                    style={{ top: "0", left: "0" }}
                  >
                    <img
                      src="https://plus.unsplash.com/premium_photo-1674739375749-7efe56fc8bbb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c2tpbiUyMGNhcmV8ZW58MHx8MHx8fDA%3D"
                      alt="Skincare Services 1"
                      className="img-fluid rounded shadow custom-img"
                    />
                  </div>
                  <div
                    className="position-absolute img-wrapper"
                    style={{ top: "40px", left: "80px" }}
                  >
                    <img
                      src="https://healthwire.pk/wp-content/uploads/2022/06/skin-care-tips-for-summer.jpg"
                      alt="Skincare Services 2"
                      className="img-fluid rounded shadow custom-img"
                    />
                  </div>
                  <div
                    className="position-absolute img-wrapper"
                    style={{ top: "80px", left: "160px" }}
                  >
                    <img
                      src="https://images.pexels.com/photos/3757657/pexels-photo-3757657.jpeg?auto=compress&cs=tinysrgb&w=600"
                      alt="Skincare Services 3"
                      className="img-fluid rounded shadow custom-img"
                    />
                  </div>
                </div>
              </div>

              {/* Right Side: Text (Updated) */}
              <div className="col-md-6 text-start animate__animated animate__fadeInRight">
                <h2
                  className="text-primary fw-bold mb-3 animate__animated animate__fadeInDown"
                  style={{ fontSize: "1.8rem" }}
                >
                  Radiant Skincare
                </h2>
                <h3 className="fw-bold mb-4">
                  Transform your skin with Beauty Bliss
                </h3>
                <p
                  className="lead mb-4 animate__animated animate__fadeInUp"
                  style={{ animationDelay: "0.2s" }}
                >
                  At Beauty Bliss, our expert skincare treatments rejuvenate and
                  nourish your skin, helping you achieve a flawless, glowing
                  complexion with personalized care.
                </p>
                <ul className="list-unstyled">
                  <li
                    className="d-flex align-items-start mb-3 animate__animated animate__bounceIn"
                    style={{ animationDelay: "0.4s" }}
                  >
                    <span className="text-primary me-2">✔️</span> Customized
                    facials tailored to your skin type
                  </li>
                  <li
                    className="d-flex align-items-start mb-3 animate__animated animate__bounceIn"
                    style={{ animationDelay: "0.6s" }}
                  >
                    <span className="text-primary me-2">✔️</span> Advanced
                    treatments for lasting hydration
                  </li>
                  <li
                    className="d-flex align-items-start mb-3 animate__animated animate__bounceIn"
                    style={{ animationDelay: "0.8s" }}
                  >
                    <span className="text-primary me-2">✔️</span> Natural
                    products for a healthy, radiant glow
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <footer className="    py-5">
          <div className="container">
            <div className="row g-4">
              {/* Contact Info */}
              <div
                className="col-md-4 text-center text-md-start animate__animated animate__fadeInUp"
                style={{ animationDelay: "0.2s" }}
              >
                <h4 className="fw-bold mb-4 animate__animated animate__fadeInDown">
                  Contact Us
                </h4>
                <p
                  className="mb-2 animate__animated animate__fadeInUp"
                  style={{ animationDelay: "0.4s" }}
                >
                  <i className="bi bi-geo-alt me-2"></i>Lb nagar vanasthalipuram
                  hyderabad 500070
                </p>
                <p
                  className="mb-2 animate__animated animate__fadeInUp"
                  style={{ animationDelay: "0.6s" }}
                >
                  <i className="bi bi-telephone me-2"></i> (+91) 9777733220
                </p>
                <p
                  className="mb-2 animate__animated animate__fadeInUp"
                  style={{ animationDelay: "0.8s" }}
                >
                  <i className="bi bi-envelope me-2"></i> beautybliss@gmail.com
                </p>
              </div>

              {/* Quick Links */}
              <div
                className="col-md-4 text-center animate__animated animate__fadeInUp"
                style={{ animationDelay: "0.4s" }}
              >
                <h4 className="fw-bold mb-4 animate__animated animate__fadeInDown">
                  Quick Links
                </h4>
                <div className="d-flex flex-column">
                  <a
                    href="/salon"
                    className="mb-2 text-primary text-decoration-none animate__animated animate__fadeInUp link-hover-red"
                    style={{ animationDelay: "0.6s" }}
                  >
                    Salon Services
                  </a>
                  <a
                    href="/beauty"
                    className="mb-2 text-primary text-decoration-none animate__animated animate__fadeInUp link-hover-red"
                    style={{ animationDelay: "0.8s" }}
                  >
                    Beauty Treatments
                  </a>
                  <a
                    href="/skincare"
                    className="mb-2 text-primary text-decoration-none animate__animated animate__fadeInUp link-hover-red"
                    style={{ animationDelay: "1.0s" }}
                  >
                    Skincare Solutions
                  </a>
                </div>
              </div>

              {/* Social Media */}
              <div
                className="col-md-4 text-center text-md-end animate__animated animate__fadeInUp"
                style={{ animationDelay: "0.6s" }}
              >
                <h4 className="fw-bold mb-4 animate__animated animate__fadeInDown">
                  Follow Us
                </h4>
                <div className="d-flex justify-content-center justify-content-md-end gap-3">
                  <a
                    href="https://facebook.com"
                    className="text-dark animate__animated animate__bounceIn"
                    style={{ animationDelay: "0.8s" }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="bi bi-facebook fs-3"></i>
                  </a>
                  <a
                    href="https://twitter.com"
                    className="text-dark animate__animated animate__bounceIn"
                    style={{ animationDelay: "1.0s" }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="bi bi-twitter fs-3"></i>
                  </a>
                  <a
                    href="https://instagram.com"
                    className="text-dark animate__animated animate__bounceIn"
                    style={{ animationDelay: "1.2s" }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="bi bi-instagram fs-3"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Copyright */}
            <div
              className="text-center mt-5 animate__animated animate__fadeInUp"
              style={{ animationDelay: "0.8s" }}
            >
              <p className="mb-0">
                ©️ {new Date().getFullYear()} BeautyBliss. All rights reserved.
              </p>
            </div>
          </div>

          {/* Footer Styles */}
          <style>
            {`

.link-hover-red:hover {
  color: black !important;
}


/* Add this in your CSS file */
/* Elegant Button Styles */
.elegant-button {
  background: transparent;
  color: #1abc9c;
  border: 2px solid #1abc9c;
  padding: 12px 25px;
  font-size: 1.1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-radius: 40px;
  box-shadow: 0 4px 12px rgba(26, 188, 156, 0.2);
  transition: all 0.3s ease-in-out;
}

.elegant-button:hover {
  background: #1abc9c;
  color: white;
  box-shadow: 0 8px 24px rgba(26, 188, 156, 0.3);
  transform: translateY(-5px);
  cursor: pointer;
}

.elegant-button:focus {
  outline: none;
  box-shadow: 0 0 8px rgba(26, 188, 156, 0.5);
}


 .custom-img {
    
    width: 300px;
    height: 362px;
    object-fit: cover;
    border-radius: 15px;
    border: 2px solid #3498db;
    transition: transform 0.4s ease, box-shadow 0.4s ease, z-index 0.4s ease;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    position: relative;
    z-index: 1;
  }

  .img-wrapper:hover .custom-img {
    transform: scale(1.08);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
    z-index: 5;
  }

              footer  {
                background: #e6e6fa;
                border-top: 5px solid #1abc9c;
              }

              footer h4 {
                font-family: 'Poppins', sans-serif;
                font-weight: 700;
                font-size: 1.8rem;
                color: #1abc9c; ;
                position: relative;
                margin-bottom: 1.5rem;
              }

              footer h4::after {
                content: '';
                // position: absolute;
                // bottom: -5px;
                // left: 50%;
                transform: translateX(-50%);
                width: 50px;
                height: 3px;
                background: #1abc9c;
                border-radius: 2px;
              }

              footer p,
              footer a.text-white {
                font-family: 'Poppins', sans-serif;
                font-size: 1rem;
                color:rgb(0, 0, 0);
                transition: color 0.3s ease;
              }

              footer a.text-white:hover {
                color:rgba(16, 12, 240, 0.8) !important;
              }

              footer .bi {
                font-size: 1.8rem;
                transition: transform 0.3s ease, color 0.3s ease;
              }

              footer .bi:hover {
                transform: scale(1.3);
                color: #1abc9c;
              }

              @media (max-width: 767px) {
                footer .text-md-start,
                footer .text-md-end {
                  text-align: center !important;
                }

                footer .d-flex.justify-content-md-start,
                footer .d-flex.justify-content-md-end {
                  justify-content: center !important;
                }
              }
            `}
          </style>
        </footer>
      </div>

      {/* Animation Styles */}
      <style>
        {`
          /* Existing Animations */
          @keyframes fadeInUp {
            from { opacity: 0; transform: translate3d(0, 20px, 0); }
            to { opacity: 1; transform: translate3d(0, 0, 0); }
          }

          @keyframes fadeInDown {
            from { opacity: 0; transform: translate3d(0, -20px, 0); }
            to { opacity: 1; transform: translate3d(0, 0, 0); }
          }

          @keyframes slideInLeft {
            from { opacity: 0; transform: translate3d(-50px, 0, 0); }
            to { opacity: 1; transform: translate3d(0, 0, 0); }
          }

          @keyframes slideInRight {
            from { opacity: 0; transform: translate3d(50px, 0, 0); }
            to { opacity: 1; transform: translate3d(0, 0, 0); }
          }

          @keyframes zoomIn {
            from { opacity: 0; transform: scale(0.8); }
            to { opacity: 1; transform: scale(1); }
          }

          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.02); }
            100% { transform: scale(1); }
          }

          /* New Animation */
          @keyframes bounceIn {
            0% { opacity: 0; transform: scale(0.3); }
            50% { opacity: 1; transform: scale(1.05); }
            70% { transform: scale(0.9); }
            100% { transform: scale(1); }
          }

          .animate__animated {
            animation-duration: 1s;
            animation-fill-mode: both;
          }

          .animate__fadeInUp { animation-name: fadeInUp; }
          .animate__fadeInDown { animation-name: fadeInDown; }
          .animate__slideInLeft { animation-name: slideInLeft; }
          .animate__slideInRight { animation-name: slideInRight; }
          .animate__zoomIn { animation-name: zoomIn; }
          .animate__pulse { animation-name: pulse; animation-iteration-count: infinite; }
          .animate__bounceIn { animation-name: bounceIn; }

          /* General Section Styles */
          section {
            background: #ffffff;
            border-radius: 15px;
            margin: 20px 0;
            padding: 40px 0;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          section:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
          }

          /* Section Headings */
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

          /* Section Paragraphs */
          p.lead {
            font-family: 'Poppins', sans-serif;
            font-size: 1.25rem;
            color: #566573;
            line-height: 1.6;
            max-width: 600px;
            margin: 0 auto 1.5rem;
          }

          /* List Items */
          ul.list-unstyled li {
            // background: #f8f9fa;
            border-radius: 10px;
            padding: 15px;
            margin-bottom: 15px;
            width: 100%;
            max-width: 400px;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            border:1px solid  wheat;
          }

          ul.list-unstyled li:hover {
            transform: translateY(-3px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          }

          ul.list-unstyled li strong {
            font-family: 'Poppins', sans-serif;
            font-weight: 600;
            font-size: 1.1rem;
            color: #34495e;
          }

          ul.list-unstyled li p.text-muted {
            font-family: 'Poppins', sans-serif;
            font-size: 0.9rem;
            color: #7f8c8d;
            margin: 0;
          }

          /* Responsive Adjustments */
          @media (max-width: 767px) {
            .display-5 { font-size: 2.5rem; }
            .lead { font-size: 1.1rem; }
            ul.list-unstyled li strong { font-size: 0.95rem; }
            ul.list-unstyled li p { font-size: 0.8rem; }
            section { padding: 20px 0; margin: 10px 0; }
            h2.text-primary { font-size: 2rem; }
            ul.list-unstyled li { padding: 10px; max-width: 100%; }
          }

          @media (min-width: 768px) and (max-width: 1199px) {
            .display-5 { font-size: 3rem; }
            ul.list-unstyled li strong { font-size: 1rem; }
            ul.list-unstyled li p { font-size: 0.85rem; }
          }

          @media (min-width: 1200px) {
            .display-5 { font-size: 3.5rem; }
            ul.list-unstyled li strong { font-size: 1.05rem; }
            ul.list-unstyled li p { font-size: 0.9rem; }
          }

          @media (min-width: 1600px) {
            .container { max-width: 1500px; }
            ul.list-unstyled li strong { font-size: 1.1rem; }
            ul.list-unstyled li p { font-size: 0.95rem; }
          }

          @media (min-width: 2000px) {
            .container { max-width: 1800px; }
            .display-5 { font-size: 4rem; }
            .lead { font-size: 1.5rem; }
            ul.list-unstyled li strong { font-size: 1.2rem; }
            ul.list-unstyled li p { font-size: 1rem; }
          }
        `}
      </style>
    </div>
  );
};

// Styles
const cardStyle = {
  borderRadius: "15px",
  overflow: "hidden",
  background: "#fff",
};

const imgStyle = {
  height: "200px",
  objectFit: "cover",
  filter: "brightness(85%)",
};

const titleStyle = {
  color: "#1abc9c",
  fontWeight: "bold",
};

const textStyle = {
  fontSize: "0.9rem",
};

const buttonStyle = {
  borderColor: "#1abc9c",
  color: "#1abc9c",
};

export default Home;
