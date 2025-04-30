
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

// ConfirmationModal Component
const ConfirmationModal = ({
  isOpen,
  onClose,
  booking,
  inputId,
  setInputId,
  isConfirmed,
  setIsConfirmed,
  error,
  setError,
  onConfirm,
}) => {
  if (!isOpen || !booking) return null;

  const handleSubmit = async () => {
    const userEmail = localStorage.getItem("email");

    if (inputId === booking.pin) {
      try {
        const response = await axios.put(
          `${BASE_URL}/api/users/update-confirmation`,
          {
            email: userEmail,
            bookingId: booking._id,
          }
        );

        setIsConfirmed(true);
        setError("");
        onConfirm(booking._id);
        console.log("Confirmation updated:", response.data);
      } catch (err) {
        console.error("Error updating booking confirmation:", err);
        setError("Failed to confirm booking. Please try again later.");
      }
    } else {
      setError("Invalid Booking ID. Please try again.");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        animation: "fadeIn 0.3s ease-in-out",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "15px",
          padding: window.innerWidth <= 400 ? "4vw" : "2vw",
          maxWidth: window.innerWidth <= 400 ? "90vw" : "400px",
          width: "90%",
          textAlign: "center",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
          transform: "scale(0.7)",
          animation: "scaleIn 0.3s ease-in-out forwards",
          fontFamily: "'Poppins', sans-serif",
          boxSizing: "border-box",
        }}
      >
        {!isConfirmed ? (
          <>
            <h3
              style={{
                fontSize: window.innerWidth <= 400 ? "1.2rem" : "1.5rem",
                color: "#2c3e50",
                marginBottom: "4vw",
                fontWeight: 600,
              }}
            >
              Verify PIN
            </h3>
            <input
              type="text"
              placeholder="Enter Secret PIN"
              value={inputId}
              onChange={(e) => setInputId(e.target.value)}
              style={{
                padding: "2vw",
                width: "100%",
                fontSize: window.innerWidth <= 400 ? "0.9rem" : "1rem",
                border: "2px solid #dfe6e9",
                borderRadius: "8px",
                color: "#2c3e50",
                outline: "none",
                transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                boxSizing: "border-box",
                marginBottom: "3vw",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#1abc9c";
                e.target.style.boxShadow = "0 3px 12px rgba(26,188,156,0.3)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#dfe6e9";
                e.target.style.boxShadow = "none";
              }}
            />
            {error && (
              <p
                style={{
                  color: "#e74c3c",
                  fontSize: window.innerWidth <= 400 ? "0.8rem" : "0.9rem",
                  marginBottom: "3vw",
                }}
              >
                {error}
              </p>
            )}
            <div
              style={{ display: "flex", justifyContent: "center", gap: "3vw" }}
            >
              <button
                onClick={handleSubmit}
                style={{
                  padding: window.innerWidth <= 400 ? "2vw 4vw" : "1vw 2vw",
                  fontSize: window.innerWidth <= 400 ? "0.9rem" : "1rem",
                  backgroundColor: "#1abc9c",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "transform 0.3s ease, filter 0.3s ease",
                  boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
                  transform: "scale(1)",
                  filter: "brightness(1)",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "scale(1.05)";
                  e.target.style.filter = "brightness(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "scale(1)";
                  e.target.style.filter = "brightness(1)";
                }}
              >
                Submit
              </button>
              <button
                onClick={onClose}
                style={{
                  padding: window.innerWidth <= 400 ? "2vw 4vw" : "1vw 2vw",
                  fontSize: window.innerWidth <= 400 ? "0.9rem" : "1rem",
                  backgroundColor: "#7f8c8d",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "transform 0.3s ease, filter 0.3s ease",
                  boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
                  transform: "scale(1)",
                  filter: "brightness(1)",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "scale(1.05)";
                  e.target.style.filter = "brightness(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "scale(1)";
                  e.target.style.filter = "brightness(1)";
                }}
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "15vw",
                height: "15vw",
                maxWidth: "60px",
                maxHeight: "60px",
                backgroundColor: "#1abc9c",
                borderRadius: "50%",
                margin: "0 auto 4vw",
                animation: "pulse 1.5s infinite",
              }}
            >
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h3
              style={{
                fontSize: window.innerWidth <= 400 ? "1.2rem" : "1.5rem",
                color: "#2c3e50",
                marginBottom: "3vw",
                fontWeight: 600,
              }}
            >
              Booking Confirmed!
            </h3>
            <p
              style={{
                fontSize: window.innerWidth <= 400 ? "0.9rem" : "1rem",
                color: "#7f8c8d",
                marginBottom: "4vw",
              }}
            >
              PIN: {booking.pin} verified successfully.
            </p>
            <button
              onClick={onClose}
              style={{
                padding: window.innerWidth <= 400 ? "2vw 4vw" : "1vw 2vw",
                fontSize: window.innerWidth <= 400 ? "0.9rem" : "1rem",
                backgroundColor: "#1abc9c",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "transform 0.3s ease, filter 0.3s ease",
                boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
                transform: "scale(1)",
                filter: "brightness(1)",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.05)";
                e.target.style.filter = "brightness(1.1)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.filter = "brightness(1)";
              }}
            >
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
};

// ComplaintModal Component
const ComplaintModal = ({
  isOpen,
  onClose,
  booking,
  complaintText,
  setComplaintText,
  isSubmitted,
  setIsSubmitted,
  error,
  setError,
  onSubmit,
}) => {
  if (!isOpen || !booking) return null;

  const handleSubmit = async () => {
    const userEmail = localStorage.getItem("email");

    if (complaintText.trim() === "") {
      setError("Please enter a complaint.");
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/api/users/submit-complaint`,
        {
          email: userEmail,
          bookingId: booking._id,
          complaint: complaintText,
        }
      );

      setIsSubmitted(true);
      setError("");
      onSubmit(booking._id);
      console.log("Complaint submitted:", response.data);
    } catch (err) {
      console.error("Error submitting complaint:", err);
      setError("Failed to submit complaint. Please try again later.");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        animation: "fadeIn 0.3s ease-in-out",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "15px",
          padding: window.innerWidth <= 400 ? "4vw" : "2vw",
          maxWidth: window.innerWidth <= 400 ? "90vw" : "400px",
          width: "90%",
          textAlign: "center",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
          transform: "scale(0.7)",
          animation: "scaleIn 0.3s ease-in-out forwards",
          fontFamily: "'Poppins', sans-serif",
          boxSizing: "border-box",
        }}
      >
        {!isSubmitted ? (
          <>
            <h3
              style={{
                fontSize: window.innerWidth <= 400 ? "1.2rem" : "1.5rem",
                color: "#2c3e50",
                marginBottom: "4vw",
                fontWeight: 600,
              }}
            >
              Submit Complaint
            </h3>
            <textarea
              placeholder="Describe your complaint..."
              value={complaintText}
              onChange={(e) => setComplaintText(e.target.value)}
              style={{
                padding: "2vw",
                width: "100%",
                height: "25vw",
                maxHeight: "150px",
                fontSize: window.innerWidth <= 400 ? "0.9rem" : "1rem",
                border: "2px solid #dfe6e9",
                borderRadius: "8px",
                color: "#2c3e50",
                outline: "none",
                transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                boxSizing: "border-box",
                marginBottom: "3vw",
                resize: "vertical",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#1abc9c";
                e.target.style.boxShadow = "0 3px 12px rgba(26,188,156,0.3)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#dfe6e9";
                e.target.style.boxShadow = "none";
              }}
            />
            {error && (
              <p
                style={{
                  color: "#e74c3c",
                  fontSize: window.innerWidth <= 400 ? "0.8rem" : "0.9rem",
                  marginBottom: "3vw",
                }}
              >
                {error}
              </p>
            )}
            <div
              style={{ display: "flex", justifyContent: "center", gap: "3vw" }}
            >
              <button
                onClick={handleSubmit}
                style={{
                  padding: window.innerWidth <= 400 ? "2vw 4vw" : "1vw 2vw",
                  fontSize: window.innerWidth <= 400 ? "0.9rem" : "1rem",
                  backgroundColor: "#1abc9c",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "transform 0.3s ease, filter 0.3s ease",
                  boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
                  transform: "scale(1)",
                  filter: "brightness(1)",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "scale(1.05)";
                  e.target.style.filter = "brightness(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "scale(1)";
                  e.target.style.filter = "brightness(1)";
                }}
              >
                Submit
              </button>
              <button
                onClick={onClose}
                style={{
                  padding: window.innerWidth <= 400 ? "2vw 4vw" : "1vw 2vw",
                  fontSize: window.innerWidth <= 400 ? "0.9rem" : "1rem",
                  backgroundColor: "#7f8c8d",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "transform 0.3s ease, filter 0.3s ease",
                  boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
                  transform: "scale(1)",
                  filter: "brightness(1)",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "scale(1.05)";
                  e.target.style.filter = "brightness(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "scale(1)";
                  e.target.style.filter = "brightness(1)";
                }}
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "15vw",
                height: "15vw",
                maxWidth: "60px",
                maxHeight: "60px",
                backgroundColor: "#1abc9c",
                borderRadius: "50%",
                margin: "0 auto 4vw",
                animation: "pulse 1.5s infinite",
              }}
            >
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h3
              style={{
                fontSize: window.innerWidth <= 400 ? "1.2rem" : "1.5rem",
                color: "#2c3e50",
                marginBottom: "3vw",
                fontWeight: 600,
              }}
            >
              Complaint Submitted!
            </h3>
            <button
              onClick={onClose}
              style={{
                padding: window.innerWidth <= 400 ? "2vw 4vw" : "1vw 2vw",
                fontSize: window.innerWidth <= 400 ? "0.9rem" : "1rem",
                backgroundColor: "#1abc9c",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "transform 0.3s ease, filter 0.3s ease",
                boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
                transform: "scale(1)",
                filter: "brightness(1)",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.05)";
                e.target.style.filter = "brightness(1.1)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.filter = "brightness(1)";
              }}
            >
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
};

// ComplaintViewModal Component
const ComplaintViewModal = ({ isOpen, onClose, booking }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !booking) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        animation: "fadeIn 0.3s ease-in-out",
      }}
    >
      <div
        ref={modalRef}
        style={{
          backgroundColor: "#fff",
          borderRadius: "15px",
          padding: window.innerWidth <= 400 ? "4vw" : "2vw",
          maxWidth: window.innerWidth <= 400 ? "90vw" : "400px",
          width: "90%",
          textAlign: "left",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
          transform: "scale(0.7)",
          animation: "scaleIn 0.3s ease-in-out forwards",
          fontFamily: "'Poppins', sans-serif",
          boxSizing: "border-box",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "2vw",
            left: "2vw",
            background: "none",
            border: "none",
            fontSize: window.innerWidth <= 400 ? "1rem" : "1.2rem",
            color: "#2c3e50",
            cursor: "pointer",
            transition: "color 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.color = "#e74c3c";
          }}
          onMouseLeave={(e) => {
            e.target.style.color = "#2c3e50";
          }}
        >
          ✕
        </button>
        <h3
          style={{
            fontSize: window.innerWidth <= 400 ? "1.2rem" : "1.5rem",
            color: "#2c3e50",
            marginBottom: "4vw",
            fontWeight: 600,
          }}
        >
          Complaint Details
        </h3>
        <p
          style={{
            fontSize: window.innerWidth <= 400 ? "0.9rem" : "1rem",
            color: "#2c3e50",
            marginBottom: "3vw",
            wordBreak: "break-word",
          }}
        >
          <strong>Booking ID:</strong> {booking._id}
        </p>
        <p
          style={{
            fontSize: window.innerWidth <= 400 ? "0.9rem" : "1rem",
            color: "#2c3e50",
            marginBottom: "3vw",
            wordBreak: "break-word",
          }}
        >
          <strong>Service Provider Complaint:</strong>{" "}
          {booking.spComplaint || "No complaint provided."}
        </p>
      </div>
    </div>
  );
};

// PaymentModal Component
const PaymentModal = ({
  isOpen,
  onClose,
  booking,
  paymentAmount,
  setPaymentAmount,
  isPaid,
  setIsPaid,
  error,
  setError,
  onPayment,
}) => {
  if (!isOpen || !booking) return null;

  const remainingAmount = booking.total_amount - (booking.amount || 0);

  const handleSubmit = async () => {
    const amountToPay = parseFloat(paymentAmount);

    if (!amountToPay || amountToPay <= 0) {
      setError("Please enter a valid payment amount.");
      return;
    }

    if (amountToPay > remainingAmount) {
      setError(
        `Payment amount cannot exceed remaining amount of ${remainingAmount}.`
      );
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/api/users/collect/payment`,
        {
          bookingId: booking._id,
          paymentAmount: amountToPay,
        }
      );

      setIsPaid(true);
      setError("");
      onPayment(booking._id, amountToPay, response.data.paymentStatus);
      console.log("Payment updated:", response.data);
    } catch (err) {
      console.error("Error updating payment:", err);
      setError("Failed to process payment. Please try again later.");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        animation: "fadeIn 0.3s ease-in-out",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "15px",
          padding: window.innerWidth <= 400 ? "4vw" : "2vw",
          maxWidth: window.innerWidth <= 400 ? "90vw" : "400px",
          width: "90%",
          textAlign: "center",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
          transform: "scale(0.7)",
          animation: "scaleIn 0.3s ease-in-out forwards",
          fontFamily: "'Poppins', sans-serif",
          boxSizing: "border-box",
        }}
      >
        {!isPaid ? (
          <>
            <h3
              style={{
                fontSize: window.innerWidth <= 400 ? "1.2rem" : "1.5rem",
                color: "#2c3e50",
                marginBottom: "4vw",
                fontWeight: 600,
              }}
            >
              Collect Payment
            </h3>
            <p
              style={{
                fontSize: window.innerWidth <= 400 ? "0.9rem" : "1rem",
                color: "#7f8c8d",
                marginBottom: "3vw",
              }}
            >
              Remaining Amount: {remainingAmount}
            </p>
            <input
              type="number"
              placeholder="Enter Payment Amount"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
              style={{
                padding: "2vw",
                width: "100%",
                fontSize: window.innerWidth <= 400 ? "0.9rem" : "1rem",
                border: "2px solid #dfe6e9",
                borderRadius: "8px",
                color: "#2c3e50",
                outline: "none",
                transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                boxSizing: "border-box",
                marginBottom: "3vw",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#1abc9c";
                e.target.style.boxShadow = "0 3px 12px rgba(26,188,156,0.3)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#dfe6e9";
                e.target.style.boxShadow = "none";
              }}
            />
            {error && (
              <p
                style={{
                  color: "#e74c3c",
                  fontSize: window.innerWidth <= 400 ? "0.8rem" : "0.9rem",
                  marginBottom: "3vw",
                }}
              >
                {error}
              </p>
            )}
            <div
              style={{ display: "flex", justifyContent: "center", gap: "3vw" }}
            >
              <button
                onClick={handleSubmit}
                style={{
                  padding: window.innerWidth <= 400 ? "2vw 4vw" : "1vw 2vw",
                  fontSize: window.innerWidth <= 400 ? "0.9rem" : "1rem",
                  backgroundColor: "#1abc9c",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "transform 0.3s ease, filter 0.3s ease",
                  boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
                  transform: "scale(1)",
                  filter: "brightness(1)",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "scale(1.05)";
                  e.target.style.filter = "brightness(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "scale(1)";
                  e.target.style.filter = "brightness(1)";
                }}
              >
                Submit
              </button>
              <button
                onClick={onClose}
                style={{
                  padding: window.innerWidth <= 400 ? "2vw 4vw" : "1vw 2vw",
                  fontSize: window.innerWidth <= 400 ? "0.9rem" : "1rem",
                  backgroundColor: "#7f8c8d",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "transform 0.3s ease, filter 0.3s ease",
                  boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
                  transform: "scale(1)",
                  filter: "brightness(1)",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "scale(1.05)";
                  e.target.style.filter = "brightness(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "scale(1)";
                  e.target.style.filter = "brightness(1)";
                }}
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "15vw",
                height: "15vw",
                maxWidth: "60px",
                maxHeight: "60px",
                backgroundColor: "#1abc9c",
                borderRadius: "50%",
                margin: "0 auto 4vw",
                animation: "pulse 1.5s infinite",
              }}
            >
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h3
              style={{
                fontSize: window.innerWidth <= 400 ? "1.2rem" : "1.5rem",
                color: "#2c3e50",
                marginBottom: "3vw",
                fontWeight: 600,
              }}
            >
              Payment Collected!
            </h3>
            <p
              style={{
                fontSize: window.innerWidth <= 400 ? "0.9rem" : "1rem",
                color: "#7f8c8d",
                marginBottom: "4vw",
              }}
            >
              Amount {paymentAmount} collected for Booking ID: {booking.pin}.
            </p>
            <button
              onClick={onClose}
              style={{
                padding: window.innerWidth <= 400 ? "2vw 4vw" : "1vw 2vw",
                fontSize: window.innerWidth <= 400 ? "0.9rem" : "1rem",
                backgroundColor: "#1abc9c",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "transform 0.3s ease, filter 0.3s ease",
                boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
                transform: "scale(1)",
                filter: "brightness(1)",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.05)";
                e.target.style.filter = "brightness(1.1)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.filter = "brightness(1)";
              }}
            >
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
};

// SpBookingDetails Component
const SpBookingDetails = () => {
  // State hooks
  const [bookings, setBookings] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isComplaintModalOpen, setIsComplaintModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isComplaintViewModalOpen, setIsComplaintViewModalOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [inputId, setInputId] = useState("");
  const [complaintText, setComplaintText] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isComplaintSubmitted, setIsComplaintSubmitted] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [error, setError] = useState("");
  const [complaintError, setComplaintError] = useState("");
  const [paymentError, setPaymentError] = useState("");
  const itemsPerPage = 5;

  // Effect to handle window resize
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch bookings from API on component mount
  useEffect(() => {
    const email = localStorage.getItem("email");
    fetch(`${BASE_URL}/api/users/sp/bookings/${email}`)
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .catch((err) => console.error("Failed to fetch bookings:", err));
  }, []);

  // Filtered bookings based on search text
  const filteredBookings = [...bookings]
    .reverse()
    .filter((booking) =>
      Object.values(booking).some(
        (value) =>
          value &&
          value.toString().toLowerCase().includes(filterText.toLowerCase())
      )
    );

  // Pagination calculations
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBookings.slice(indexOfFirstItem, indexOfLastItem);

  // Paginate to the specified page number
  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Open confirm booking modal
  const handleConfirmBooking = (bookingId) => {
    setSelectedBookingId(bookingId);
    setInputId("");
    setIsConfirmed(false);
    setError("");
    setIsModalOpen(true);
  };

  // Open complaint booking modal
  const handleComplaintBooking = (bookingId) => {
    setSelectedBookingId(bookingId);
    setComplaintText("");
    setIsComplaintSubmitted(false);
    setComplaintError("");
    setIsComplaintModalOpen(true);
  };

  // Open view complaint modal
  const handleViewComplaint = (bookingId) => {
    setSelectedBookingId(bookingId);
    setIsComplaintViewModalOpen(true);
  };

  // Open collect payment modal
  const handleCollectPayment = (bookingId) => {
    setSelectedBookingId(bookingId);
    setPaymentAmount("");
    setIsPaid(false);
    setPaymentError("");
    setIsPaymentModalOpen(true);
  };

  // Confirm booking success
  const handleConfirmSuccess = (bookingId) => {
    setBookings(
      bookings.map((booking) =>
        booking._id === bookingId ? { ...booking, confirmed: true } : booking
      )
    );
    setIsConfirmed(true);
  };

  // Complaint submission success
  const handleComplaintSuccess = (bookingId) => {
    setBookings(
      bookings.map((booking) =>
        booking._id === bookingId
          ? { ...booking, spComplaint: complaintText }
          : booking
      )
    );
    setIsComplaintSubmitted(true);
  };

  // Payment collection success
  const handlePaymentSuccess = (bookingId, amountPaid, paymentStatus) => {
    setBookings(
      bookings.map((booking) =>
        booking._id === bookingId
          ? {
              ...booking,
              amount: (booking.amount || 0) + amountPaid,
              paymentStatus: paymentStatus,
            }
          : booking
      )
    );
    setIsPaid(true);
  };

  // Close confirmation modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBookingId(null);
    setInputId("");
    setIsConfirmed(false);
    setError("");
  };

  // Close complaint modal
  const closeComplaintModal = () => {
    setIsComplaintModalOpen(false);
    setSelectedBookingId(null);
    setComplaintText("");
    setIsComplaintSubmitted(false);
    setComplaintError("");
  };

  // Close complaint view modal
  const closeComplaintViewModal = () => {
    setIsComplaintViewModalOpen(false);
    setSelectedBookingId(null);
  };

  // Close payment modal
  const closePaymentModal = () => {
    setIsPaymentModalOpen(false);
    setSelectedBookingId(null);
    setPaymentAmount("");
    setIsPaid(false);
    setPaymentError("");
  };

  // Determine if the screen is mobile-sized
  const isMobile = screenWidth <= 768;
  const isVerySmallScreen = screenWidth <= 400;

  // Define visible columns based on screen size
  const visibleColumns = screenWidth <= 1024
    ? ["S.No", "Booking ID", "Date", "Report", "Claim"]
    : [
        "S.No",
        "Booking ID",
        "UserMail",
        "Staffed",
        "Service",
        "Date",
        "Receipt",
        "Balance",
        "Report",
        "Claim",
      ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        padding: isMobile ? "4vw 2vw" : "3vw 4vw",
        fontFamily: "'Poppins', sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <h2
        style={{
          fontSize: isMobile ? "1.6rem" : "2rem",
          color: "#2c3e50",
          marginBottom: isMobile ? "4vw" : "2vw",
          textTransform: "uppercase",
          letterSpacing: "0.1rem",
          textShadow: "0.1rem 0.1rem 0.2rem rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        All Bookings
      </h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: isMobile ? "4vw" : "2vw",
          width: "100%",
          maxWidth: isMobile ? "90vw" : "50vw",
        }}
      >
        <input
          type="text"
          placeholder="Search by any field in bookings..."
          value={filterText}
          onChange={(e) => {
            setFilterText(e.target.value);
            setCurrentPage(1);
          }}
          style={{
            padding: isMobile ? "2vw" : "1vw",
            width: "100%",
            fontSize: isMobile ? "0.9rem" : "1rem",
            border: "2px solid #dfe6e9",
            borderRadius: "10px",
            color: "#2c3e50",
            outline: "none",
            transition: "border-color 0.3s ease, box-shadow 0.3s ease",
            boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
            boxSizing: "border-box",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "#1abc9c";
            e.target.style.boxShadow = "0 3px 12px rgba(26,188,156,0.3)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#dfe6e9";
            e.target.style.boxShadow = "0 3px 8px rgba(0,0,0,0.1)";
          }}
        />
      </div>

      <div
        style={{
          width: "100%",
          maxWidth: "100%",
          background: "#fff",
          borderRadius: "15px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          boxSizing: "border-box",
        }}
      >
        {isMobile ? (
          // Mobile: Card-based layout
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "3vw",
              padding: "3vw",
            }}
          >
            {currentItems.length > 0 ? (
              currentItems.map((booking, index) => (
                <div
                  key={booking._id}
                  style={{
                    backgroundColor: "#f9f9f9",
                    borderRadius: "10px",
                    padding: "4vw",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.02)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "#2c3e50",
                      marginBottom: "2vw",
                    }}
                  >
                    <strong>S.No:</strong> {indexOfFirstItem + index + 1}
                  </p>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "#2c3e50",
                      marginBottom: "2vw",
                      wordBreak: "break-word",
                    }}
                  >
                    <strong>Booking ID:</strong> {booking._id}
                  </p>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "#2c3e50",
                      marginBottom: "2vw",
                    }}
                  >
                    <strong>Date-Time:</strong>{" "}
                    {new Date(booking.date).toLocaleDateString()} &{" "}
                    {booking.time}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "2vw",
                      marginTop: "3vw",
                    }}
                  >
                    <button
                      onClick={() => handleConfirmBooking(booking._id)}
                      disabled={booking.confirmed}
                      style={{
                        padding: "2vw 4vw",
                        fontSize: "0.9rem",
                        backgroundColor: booking.confirmed
                          ? "#d6f5ec"
                          : "#4EE0C0",
                        color: booking.confirmed ? "#888" : "#fff",
                        border: "none",
                        borderRadius: "8px",
                        cursor: booking.confirmed ? "not-allowed" : "pointer",
                        transition: "transform 0.3s ease, filter 0.3s ease",
                        boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
                        flex: "1 1 45%",
                      }}
                      onMouseEnter={(e) => {
                        if (!booking.confirmed) {
                          e.target.style.transform = "scale(1.05)";
                          e.target.style.filter = "brightness(1.1)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = "scale(1)";
                        e.target.style.filter = "brightness(1)";
                      }}
                    >
                      {booking.confirmed ? "Confirmed" : "Confirm"}
                    </button>
                    {booking.spComplaint ? (
                      <button
                        onClick={() => handleViewComplaint(booking._id)}
                        style={{
                          padding: "2vw 4vw",
                          fontSize: "0.9rem",
                          backgroundColor: "#3498db",
                          color: "#fff",
                          border: "none",
                          borderRadius: "8px",
                          cursor: "pointer",
                          transition: "transform 0.3s ease, filter 0.3s ease",
                          boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
                          flex: "1 1 45%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "5px",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = "scale(1.05)";
                          e.target.style.filter = "brightness(1.1)";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = "scale(1)";
                          e.target.style.filter = "brightness(1)";
                        }}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#fff"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                        View
                      </button>
                    ) : (
                      <button
                        onClick={() => handleComplaintBooking(booking._id)}
                        style={{
                          padding: "2vw 4vw",
                          fontSize: "0.9rem",
                          backgroundColor: "#e74c3c",
                          color: "#fff",
                          border: "none",
                          borderRadius: "8px",
                          cursor: "pointer",
                          transition: "transform 0.3s ease, filter 0.3s ease",
                          boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
                          flex: "1 1 45%",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = "scale(1.05)";
                          e.target.style.filter = "brightness(1.1)";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = "scale(1)";
                          e.target.style.filter = "brightness(1)";
                        }}
                      >
                        Complain
                      </button>
                    )}
                    <button
                      onClick={() => handleCollectPayment(booking._id)}
                      disabled={booking.total_amount <= (booking.amount || 0)}
                      style={{
                        padding: "2vw 4vw",
                        fontSize: "0.9rem",
                        backgroundColor:
                          booking.total_amount <= (booking.amount || 0)
                            ? "#e9fcf7"
                            : "#5ee0bb",
                        color:
                          booking.total_amount <= (booking.amount || 0)
                            ? "#888"
                            : "#fff",
                        border: "none",
                        borderRadius: "8px",
                        cursor:
                          booking.total_amount <= (booking.amount || 0)
                            ? "not-allowed"
                            : "pointer",
                        transition: "transform 0.3s ease, filter 0.3s ease",
                        boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
                        flex: "1 1 45%",
                      }}
                      onMouseEnter={(e) => {
                        if (!(booking.total_amount <= (booking.amount || 0))) {
                          e.target.style.transform = "scale(1.05)";
                          e.target.style.filter = "brightness(1.1)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = "scale(1)";
                        e.target.style.filter = "brightness(1)";
                      }}
                    >
                      {booking.total_amount <= (booking.amount || 0)
                        ? "Paid"
                        : "Collect"}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div
                style={{
                  padding: "4vw",
                  textAlign: "center",
                  color: "#7f8c8d",
                  fontStyle: "italic",
                  fontSize: "0.9rem",
                }}
              >
                No Bookings Found
              </div>
            )}
          </div>
        ) : (
          // Desktop/Tablet: Table layout
          <div
            style={{
              width: "100%",
            }}
          >
            <table
              style={{
                width: "100%",
                maxWidth: "100%",
                borderCollapse: "collapse",
                fontSize: isMobile ? "0.85rem" : "0.95rem",
                color: "#2c3e50",
                tableLayout: "auto",
                boxSizing: "border-box",
              }}
            >
              <thead>
                <tr
                  style={{
                    background: "#7bd0c9",
                    color: "#fff",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                  }}
                >
                  {visibleColumns.map((col) => (
                    <th
                      key={col}
                      style={{
                        padding: isMobile ? "2vw" : "1vw",
                        textAlign: "left",
                        whiteSpace: "nowrap",
                        fontSize: isMobile ? "0.8rem" : "0.9rem",
                      }}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((booking, index) => (
                    <tr
                      key={booking._id}
                      style={{
                        borderBottom: "1px solid #dfe6e9",
                        transition: "background 0.3s ease",
                        backgroundColor: index % 2 === 0 ? "#fff" : "#f9f9f9",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = "#e6f3f3")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          index % 2 === 0 ? "#fff" : "#f9f9f9")
                      }
                    >
                      {visibleColumns.includes("S.No") && (
                        <td
                          style={{
                            padding: isMobile ? "2vw" : "1vw",
                            whiteSpace: "nowrap",
                            textAlign: "center",
                            fontSize: isMobile ? "0.8rem" : "0.9rem",
                          }}
                        >
                          {indexOfFirstItem + index + 1}
                        </td>
                      )}
                      {visibleColumns.includes("Booking ID") && (
                        <td
                          style={{
                            padding: isMobile ? "2vw" : "1vw",
                            whiteSpace: "normal",
                            textAlign: "center",
                            fontSize: isMobile ? "0.8rem" : "0.9rem",
                            wordBreak: "break-word",
                            maxWidth: "20vw",
                          }}
                        >
                          {booking._id}
                        </td>
                      )}
                      {visibleColumns.includes("UserMail") && (
                        <td
                          style={{
                            padding: isMobile ? "2vw" : "1vw",
                            whiteSpace: "nowrap",
                            textAlign: "center",
                            fontSize: isMobile ? "0.8rem" : "0.9rem",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: "15vw",
                          }}
                        >
                          {booking.customerEmail || "N/A"}
                        </td>
                      )}
                      {visibleColumns.includes("Staffed") && (
                        <td
                          style={{
                            padding: isMobile ? "2vw" : "1vw",
                            whiteSpace: "nowrap",
                            textAlign: "center",
                            fontSize: isMobile ? "0.8rem" : "0.9rem",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: "10vw",
                          }}
                        >
                          {booking.favoriteEmployee}
                        </td>
                      )}
                      {visibleColumns.includes("Service") && (
                        <td
                          style={{
                            padding: isMobile ? "2vw" : "1vw",
                            whiteSpace: "nowrap",
                            textAlign: "center",
                            fontSize: isMobile ? "0.8rem" : "0.9rem",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: "10vw",
                          }}
                        >
                          {booking.service}
                        </td>
                      )}
                      {visibleColumns.includes("Date") && (
                        <td
                          style={{
                            padding: isMobile ? "2vw" : "1vw",
                            whiteSpace: "normal",
                            textAlign: "center",
                            fontSize: isMobile ? "0.8rem" : "0.9rem",
                            maxWidth: "15vw",
                          }}
                        >
                          {new Date(booking.createdAt).toLocaleDateString()}
                        </td>
                      )}
                      {visibleColumns.includes("Receipt") && (
                        <td
                          style={{
                            padding: isMobile ? "2vw" : "1vw",
                            whiteSpace: "nowrap",
                            textAlign: "center",
                            fontSize: isMobile ? "0.8rem" : "0.9rem",
                          }}
                        >
                          {booking.amount || 0}
                        </td>
                      )}
                      {visibleColumns.includes("Balance") && (
                        <td
                          style={{
                            padding: isMobile ? "2vw" : "1vw",
                            whiteSpace: "nowrap",
                            textAlign: "center",
                            fontSize: isMobile ? "0.8rem" : "0.9rem",
                          }}
                        >
                          {booking.total_amount - (booking.amount || 0)}
                        </td>
                      )}
                      {visibleColumns.includes("Report") && (
                        <td
                          style={{
                            padding: isMobile ? "2vw" : "1vw",
                            textAlign: "center",
                            fontSize: isMobile ? "0.8rem" : "0.9rem",
                          }}
                        >
                          {booking.spComplaint ? (
                            <button
                              onClick={() => handleViewComplaint(booking._id)}
                              style={{
                                padding: isMobile ? "2vw 4vw" : "1vw 2vw",
                                fontSize: isMobile ? "0.8rem" : "0.9rem",
                                backgroundColor: "#3498db",
                                color: "#fff",
                                border: "none",
                                borderRadius: "8px",
                                cursor: "pointer",
                                transition:
                                  "transform 0.3s ease, filter 0.3s ease",
                                boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
                                width: "100%",
                                maxWidth: "100px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "5px",
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.transform = "scale(1.1)";
                                e.target.style.filter = "brightness(1.1)";
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.transform = "scale(1)";
                                e.target.style.filter = "brightness(1)";
                              }}
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#fff"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                <circle cx="12" cy="12" r="3" />
                              </svg>
                              View
                            </button>
                          ) : (
                            <button
                              onClick={() => handleComplaintBooking(booking._id)}
                              style={{
                                padding: isMobile ? "2vw 4vw" : "1vw 2vw",
                                fontSize: isMobile ? "0.8rem" : "0.9rem",
                                backgroundColor: "#e74c3c",
                                color: "#fff",
                                border: "none",
                                borderRadius: "8px",
                                cursor: "pointer",
                                transition:
                                  "transform 0.3s ease, filter 0.3s ease",
                                boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
                                width: "100%",
                                maxWidth: "100px",
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.transform = "scale(1.1)";
                                e.target.style.filter = "brightness(1.1)";
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.transform = "scale(1)";
                                e.target.style.filter = "brightness(1)";
                              }}
                            >
                              Complain
                            </button>
                          )}
                        </td>
                      )}
                      {visibleColumns.includes("Claim") && (
                        <td
                          style={{
                            padding: isMobile ? "2vw" : "1vw",
                            textAlign: "center",
                            fontSize: isMobile ? "0.8rem" : "0.9rem",
                          }}
                        >
                          <button
                            onClick={() => handleCollectPayment(booking._id)}
                            disabled={
                              booking.total_amount <= (booking.amount || 0)
                            }
                            style={{
                              padding: isMobile ? "2vw 4vw" : "1vw 2vw",
                              fontSize: isMobile ? "0.8rem" : "0.9rem",
                              backgroundColor:
                                booking.total_amount <= (booking.amount || 0)
                                  ? "#e9fcf7"
                                  : "#5ee0bb",
                              color:
                                booking.total_amount <= (booking.amount || 0)
                                  ? "#888"
                                  : "#fff",
                              border: "none",
                              borderRadius: "8px",
                              cursor:
                                booking.total_amount <= (booking.amount || 0)
                                  ? "not-allowed"
                                  : "pointer",
                              transition:
                                "transform 0.3s ease, filter 0.3s ease",
                              boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
                              width: "100%",
                              maxWidth: "100px",
                            }}
                            onMouseEnter={(e) => {
                              if (
                                !(booking.total_amount <= (booking.amount || 0))
                              ) {
                                e.target.style.transform = "scale(1.1)";
                                e.target.style.filter = "brightness(1.1)";
                              }
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.transform = "scale(1)";
                              e.target.style.filter = "brightness(1)";
                            }}
                          >
                            {booking.total_amount <= (booking.amount || 0)
                              ? "Paid"
                              : "Collect"}
                          </button>
                        </td>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={visibleColumns.length}
                      style={{
                        padding: isMobile ? "4vw" : "2vw",
                        textAlign: "center",
                        color: "#7f8c8d",
                        fontStyle: "italic",
                        fontSize: isMobile ? "0.9rem" : "1rem",
                      }}
                    >
                      No Bookings Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {filteredBookings.length > itemsPerPage && (
        <div
          style={{
            marginTop: isMobile ? "4vw" : "2vw",
            display: "flex",
            flexDirection: isVerySmallScreen ? "column" : "row",
            justifyContent: "center",
            alignItems: "center",
            gap: isVerySmallScreen ? "3vw" : "2vw",
            padding: "2vw",
            width: "100%",
            maxWidth: "90vw",
            boxSizing: "border-box",
          }}
        >
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            style={{
              padding: isMobile ? "2vw 4vw" : "1vw 2vw",
              fontSize: isMobile ? "0.9rem" : "1rem",
              backgroundColor: currentPage === 1 ? "#7bd0c9" : "#7bd0c9",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
              transition: "transform 0.3s ease, filter 0.3s ease",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              flex: isVerySmallScreen ? "1 1 100%" : "0 1 auto",
            }}
            onMouseEnter={(e) => {
              if (currentPage !== 1) {
                e.target.style.transform = "scale(1.05)";
                e.target.style.filter = "brightness(1.1)";
                e.target.style.boxShadow = "0 6px 16px rgba(26,188,156,0.3)";
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.filter = "brightness(1)";
              e.target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
            }}
          >
            Previous
          </button>

          <span
            style={{
              fontSize: isMobile ? "0.9rem" : "1rem",
              fontWeight: 500,
              color: "#2c3e50",
              padding: "0 2vw",
              lineHeight: "1.5",
            }}
          >
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={{
              padding: isMobile ? "2vw 4vw" : "1vw 2vw",
              fontSize: isMobile ? "0.9rem" : "1rem",
              backgroundColor:
                currentPage === totalPages ? "#7bd0c9" : "#2dceae",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
              transition: "transform 0.3s ease, filter 0.3s ease",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              flex: isVerySmallScreen ? "1 1 100%" : "0 1 auto",
            }}
            onMouseEnter={(e) => {
              if (currentPage !== totalPages) {
                e.target.style.transform = "scale(1.05)";
                e.target.style.filter = "brightness(1.1)";
                e.target.style.boxShadow = "0 6px 16px rgba(26,188,156,0.3)";
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.filter = "brightness(1)";
              e.target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
            }}
          >
            Next
          </button>
        </div>
      )}

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        booking={bookings.find((booking) => booking._id === selectedBookingId)}
        inputId={inputId}
        setInputId={setInputId}
        isConfirmed={isConfirmed}
        setIsConfirmed={setIsConfirmed}
        error={error}
        setError={setError}
        onConfirm={handleConfirmSuccess}
      />

      <ComplaintModal
        isOpen={isComplaintModalOpen}
        onClose={closeComplaintModal}
        booking={bookings.find((booking) => booking._id === selectedBookingId)}
        complaintText={complaintText}
        setComplaintText={setComplaintText}
        isSubmitted={isComplaintSubmitted}
        setIsSubmitted={setIsComplaintSubmitted}
        error={complaintError}
        setError={setComplaintError}
        onSubmit={handleComplaintSuccess}
      />

      <ComplaintViewModal
        isOpen={isComplaintViewModalOpen}
        onClose={closeComplaintViewModal}
        booking={bookings.find((booking) => booking._id === selectedBookingId)}
      />

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={closePaymentModal}
        booking={bookings.find((booking) => booking._id === selectedBookingId)}
        paymentAmount={paymentAmount}
        setPaymentAmount={setPaymentAmount}
        isPaid={isPaid}
        setIsPaid={setIsPaid}
        error={paymentError}
        setError={setPaymentError}
        onPayment={handlePaymentSuccess}
      />
    </div>
  );
};

// Inline CSS animations
const styles = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes scaleIn {
    from { transform: scale(0.7); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
`;

if (typeof window !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}

export default SpBookingDetails;