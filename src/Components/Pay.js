import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  Alert,
  Chip,
} from "@mui/material";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

const Pay = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    parlor,
    totalAmount,
    service,
    relatedServices,
    name,
    date,
    time,
    favoriteEmployee,
  } = location.state || {};

  const [paymentAmountOption, setPaymentAmountOption] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (
      !totalAmount ||
      !name ||
      !service ||
      !date ||
      !time ||
      !favoriteEmployee
    ) {
      setError(
        "Missing booking details. Please start the booking process again."
      );
      setTimeout(() => navigate("/bookslot"), 3000);
    }
  }, [totalAmount, name, service, date, time, favoriteEmployee, navigate]);

  const handlePaymentAmountChange = (e) => {
    setPaymentAmountOption(e.target.value);
    setError("");
  };

  const calculatePaymentAmount = () => {
    if (!totalAmount) return 0;
    return paymentAmountOption === "25%" ? totalAmount * 0.25 : totalAmount;
  };

  const handleConfirm = async () => {
    if (!paymentAmountOption) {
      setError("Please select a payment amount (25% or Full).");
      return;
    }

    if (!totalAmount || totalAmount <= 0) {
      setError("Invalid total amount. Please try again.");
      return;
    }

    if (!window.Razorpay) {
      setError("Razorpay SDK not loaded. Please refresh the page.");
      return;
    }

    try {
      const userEmail = localStorage.getItem("email");
      if (!userEmail) {
        setError("User email not found. Please log in again.");
        return;
      }

      const bookingData = {
        parlorEmail: parlor.email,
        parlorName: parlor.name,
        name,
        date,
        time,
        service,
        amount: calculatePaymentAmount(), // Amount to be paid
        total_amount: totalAmount, // Full service amount
        relatedServices,
        favoriteEmployee,
        userEmail,
      };

      // console.log("Sending booking data to /order:", bookingData);
      const response = await axios.post(
        `${BASE_URL}/api/razorpay/order`,
        bookingData
      );
      const { order, bookingId } = response.data;

      // console.log("Received response from /order:", { order, bookingId });
      // console.log("Order amount (in paise):", order.amount); // Debug the amount

      if (!order || !bookingId) {
        throw new Error("Failed to create order or booking");
      }

      const options = {
        key: "rzp_test_UlCC6Rw2IJrhyh",
        amount: order.amount, // This should now reflect the amount to be paid
        currency: order.currency,
        name: "Parlor Booking",
        description: `Payment for booking ${bookingId}`,
        order_id: order.id,
        handler: async function (response) {
          // console.log("Razorpay payment response:", response);
          let pin = Math.floor(Math.random() * 90000) + 10000;
          try {
            const validationResponse = await axios.post(
              `${BASE_URL}/api/razorpay/order/validate`,
              {
                pin,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                userEmail,
                bookingId,
              }
            );
            // console.log("Payment validated:", validationResponse.data);
            navigate(
              `/payment/callback?order_id=${response.razorpay_order_id}`,
              {
                state: {
                  ...location.state,
                  bookingId,
                  paymentStatus: "PAID",
                  transactionId: response.razorpay_payment_id,
                  orderId: response.razorpay_order_id,
                  currency: order.currency,
                  amount: bookingData.amount, // Amount paid
                  total_amount: bookingData.total_amount, // Full amount
                  Payment_Mode: validationResponse.data.paymentMethod || "UNKNOWN",
                  createdAt: new Date().toISOString(),
                },
              }
            );
          } catch (err) {
            // console.error("Payment validation error:", err.response?.data || err);
            setError(
              `Payment verification failed: ${
                err.response?.data?.error || err.message
              }`
            );
            navigate(
              `/payment/callback?order_id=${response.razorpay_order_id}`,
              {
                state: {
                  ...location.state,
                  bookingId,
                  paymentStatus: "FAILED",
                  transactionId: response.razorpay_payment_id,
                  orderId: response.razorpay_order_id,
                  failureReason:
                    err.response?.data?.reason || "Validation failed",
                  currency: order.currency,
                  amount: bookingData.amount,
                  total_amount: bookingData.total_amount,
                  Payment_Mode: "UNKNOWN",
                  createdAt: new Date().toISOString(),
                },
              }
            );
          }
        },
        prefill: {
          name,
          email: userEmail,
          contact: "9234567890", // Replace with actual user phone
        },
        notes: { bookingId, userEmail },
        theme: { color: "#1abc9c" },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", async function (response) {
        // console.error("Razorpay payment failed:", response.error);
        const failureReason = response.error.description || "Payment failed";
        setError(`Payment failed: ${failureReason}`);
        try {
          const errorResponse = await axios.post(
            `${BASE_URL}/api/razorpay/order/validate`,
            {
              razorpay_order_id: response.error.metadata.order_id,
              razorpay_payment_id: response.error.metadata.payment_id,
              razorpay_signature: "",
              userEmail,
              bookingId,
              failureReason,
            }
          );
          // console.log("Failed payment status updated:", errorResponse.data);
        } catch (err) {
          // console.error(
          //   "Failed to update failed payment status:",
          //   err.response?.data || err
          // );
        }
        navigate(
          `/payment/callback?order_id=${response.error.metadata.order_id}`,
          {
            state: {
              ...location.state,
              bookingId,
              paymentStatus: "FAILED",
              transactionId: response.error.metadata.payment_id,
              orderId: response.error.metadata.order_id,
              failureReason,
              currency: order.currency,
              amount: bookingData.amount,
              total_amount: bookingData.total_amount,
              Payment_Mode: "UNKNOWN",
              createdAt: new Date().toISOString(),
            },
          }
        );
      });
      rzp.open();

      setShowSuccess(true);
      setError("");
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message;
      // console.error("Error during payment or booking:", err);
      setError(`Error processing request: ${errorMessage}`);
    }
  };

  return (
    <Box
      sx={{
        p: 4,
        maxWidth: 1000,
        mx: "auto",
        backgroundColor: "rgb(217, 245, 239)",
        borderRadius: 4,
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
        transition: "all 0.3s ease",
        "&:hover": { boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)" },
        display: "flex",
        flexDirection: "column",
        gap: 3,
        // background: "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)",
        marginTop: "120px", // Add margin-top here to push it below the navbar
 
      }}
    >
      {/* <Typography variant="h4" sx={{ mb: 3, textAlign: "center", color: "#fff" }}>
      
      </Typography> */}
      <h2
                className="text-primary fw-bold mb-4 animate_animated animate_fadeInDown"
                style={{
                  animationDuration: "1s",
                  fontSize: "2.5rem",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: "#1abc9c",
                }}
              >
                Payment for Booking
              </h2>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 3,
          flexWrap: "wrap",
          
        }}
      >
        {/* Booking Summary Section */}
        <Box
          sx={{
            flex: 1,
            minWidth: "48%",
            p: 4,
            borderRadius: 2,
            backgroundColor: "#ffffff00",
            color:"#fff",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.3s ease",
            "&:hover": { transform: "scale(1.05)" },
            border: "1px solid #1abc9c",
          }}
        >
          <Typography variant="h6" sx={{ color: "#1abc9c", mb: 2  ,textDecoration:"underline"}}>
            Booking Summary
          </Typography>
          <Typography sx={{ mb: 1 ,color:"black"}}>
            <strong>Parlor:</strong> {parlor?.name || "N/A"}
          </Typography>
          <Typography sx={{ mb: 1 ,color:"black"}}>
            <strong>Service:</strong> {service || "N/A"}
          </Typography>
          <Typography sx={{ mb: 1 ,color:"black"}}>
            <strong>Date:</strong> {date || "N/A"}
          </Typography>
          <Typography sx={{ mb: 1 ,color:"black"}}>
            <strong>Time:</strong> {time || "N/A"}
          </Typography>
          <Typography sx={{ mb: 1 ,color:"black"}}>
            <strong>Employee:</strong> {favoriteEmployee || "N/A"}
          </Typography>
          <Typography sx={{ fontWeight: "bold", color: "#1abc9c" }}>
            Total Amount: ₹{totalAmount || "0"}
          </Typography>
        </Box>

        {/* Select Payment Amount Section */}
        <Box
          sx={{
            flex: 1,
            minWidth: "48%",
            p: 4,
            borderRadius: 2,
            backgroundColor: "#ffffff00",
            color:"#fff",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.3s ease",
            "&:hover": { transform: "scale(1.05)" },
            border: "1px solid #1abc9c",
          }}
        >
          <Typography variant="h6" sx={{ color: "#1abc9c", mb: 2  ,textDecoration:"underline"}}>
            Select Payment Amount
          </Typography>
          <RadioGroup
            value={paymentAmountOption}
            onChange={handlePaymentAmountChange}
          >
            <FormControlLabel
            style={{color:"black"}}
              value="25%" 
              control={<Radio />}
              label={`25% of Total Amount (₹${(totalAmount * 0.25).toFixed(2)})`}
            />
            <FormControlLabel
             style={{color:"black"}}
              value="full"
              control={<Radio />}
              label={`Full Amount (₹${totalAmount})`}
            />
          </RadioGroup>

          {error && <Alert severity="error">{error}</Alert>}
          {showSuccess && <Alert severity="success">Payment option selected successfully!</Alert>}

          <motion.button
  onClick={handleConfirm}
  style={{
    background: "rgba(26, 188, 156, 0.1)", // Light green background
    color: "#1abc9c", // Text color
    padding: "0.6rem 1rem", // Padding for the button
    borderRadius: "8px", // Rounded corners
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid rgba(26, 188, 156, 0.3)", // Light border color
    fontSize: "1rem", // Font size for text
    fontWeight: 500, // Medium font weight
    width: "fit-content", // Adjust width based on content
    marginTop: "20px",
    cursor: "pointer", // Cursor pointer to indicate interactivity
    transition: "background-color 0.3s ease, border-color 0.3s ease", // Smooth transitions
  }}
  whileHover={{
    background: "rgba(26, 188, 156, 0.2)", // Darker green on hover
    borderColor: "#1abc9c", // Border color changes to green on hover
  }}
  transition={{ duration: 0.3 }} // Smooth transition for hover effects
>
  Confirm Payment
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#1abc9c"
    style={{ marginLeft: "8px" }} // Margin for the arrow
  >
    <path
      d="M5 12h14M12 5l7 7-7 7"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
</motion.button>
        </Box>
      </Box>
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
            border-radius: 2px;
          }`}
      </style>
    </Box>
  );
};

export default Pay;
