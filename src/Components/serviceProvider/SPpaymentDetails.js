import React, { useState, useEffect, useCallback, useRef } from "react";
import "./serviceProvide.css";
import debounce from "lodash/debounce";


const BASE_URL = process.env.REACT_APP_API_URL;

const BookingPage = () => {
  const [bookings, setBookings] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [screenWidth, setScreenWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );
  const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const itemsPerPage = 5;
  const isVerySmallScreen = screenWidth <= 480;
  const tableContainerRef = useRef(null);

  // Update screenWidth on window resize
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Initialize scroll position to left for mobile screens
  useEffect(() => {
    if (tableContainerRef.current && screenWidth <= 1439) {
      tableContainerRef.current.scrollLeft = 0;
    }
  }, [screenWidth, currentPage, bookings]);

  // Fetch bookings
  useEffect(() => {
    const fetchBookings = async () => {
      setIsLoading(true);
      try {
        const email = localStorage.getItem("email");
        const response = await fetch(
          `${BASE_URL}/api/users/sp/bookings/${email}`
        );
        const data = await response.json();
        console.log("Fetched bookings:", data);
        setBookings(data);
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBookings();
  }, []);

  // Debounced search handler
  const debouncedSearch = useCallback(
    debounce((value) => {
      setFilterText(value);
      setCurrentPage(1);
    }, 300),
    []
  );

  // Handle input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    debouncedSearch(value);
  };

  // Filter bookings based on specific fields
  const filteredBookings = [...bookings].reverse().filter((booking) =>
    [
      booking.transactionId,
      booking.customerName,
      booking.customerEmail,
      booking.service,
      booking.favoriteEmployee,
      booking.paymentStatus,
      booking.upiId,
      new Date(booking.createdAt).toLocaleDateString(),
      booking.amount?.toString(),
      booking.refundedAmount?.toString(),
      booking.refundStatus,
    ].some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(filterText.toLowerCase())
    )
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBookings.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  console.log("Current items:", currentItems);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle refund action
  const openRefundModal = (booking) => {
    console.log("Selected booking for refund:", booking);
    setSelectedBooking(booking);
    setIsRefundModalOpen(true);
  };

  const closeRefundModal = () => {
    setIsRefundModalOpen(false);
    setSelectedBooking(null);
  };

  const handleRefundAction = async (action) => {
    if (!selectedBooking) return;

    try {
      const response = await fetch(
        `${BASE_URL}/api/users/sp/refund/action`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: localStorage.getItem("email"),
            orderId: selectedBooking.orderId,
            action,
          }),
        }
      );

      if (response.ok) {
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking.orderId === selectedBooking.orderId
              ? {
                  ...booking,
                  refundStatus: action === "accept" ? "APPROVED" : "REJECTED",
                }
              : booking
          )
        );
        alert(`Refund ${action}ed successfully`);
        closeRefundModal();
      } else {
        alert("Failed to process refund action");
      }
    } catch (error) {
      console.error("Error processing refund action:", error);
      alert("Error processing refund action");
    }
  };

  return (
    <div
      className="admin-container"
      style={{ padding: "20px", maxWidth: "100%", margin: "0 auto" }}
    >
      <h2
        style={{ textAlign: "center", marginBottom: "20px", color: "#2c3e50" }}
      >
        All Bookings
      </h2>

      {/* Search Input */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          placeholder="Search by customer, email, service, transaction ID, UPI, date, amount, refund..."
          value={searchInput}
          onChange={handleSearchChange}
          className="booking-filter-input"
          style={{
            padding: "12px",
            width: "100%",
            maxWidth: "400px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        />
        {searchInput && (
          <button
            onClick={() => {
              setSearchInput("");
              setFilterText("");
              debouncedSearch("");
              setCurrentPage(1);
            }}
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              backgroundColor: "#fff",
              cursor: "pointer",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              fontSize: "16px",
            }}
          >
            Clear
          </button>
        )}
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div style={{ textAlign: "center", padding: "20px", color: "#2c3e50" }}>
          Loading bookings...
        </div>
      ) : (
        <>
          <div
            className="employee-table"
            ref={tableContainerRef}
            style={{
              width: "100%",
              overflowX: "auto",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "separate",
                borderSpacing: 0,
                fontSize: screenWidth <= 1024 ? "0.85rem" : "0.95rem",
                color: "#2c3e50",
                backgroundColor: "#fff",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                border: "1px solid #dfe6e9",
                tableLayout: "auto",
              }}
            >
              <thead>
                <tr
                  style={{
                    background: "linear-gradient(135deg, #7bd0c9 0%, #4a90e2 100%)",
                    color: "#fff",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                    display: "table-row",
                    animation: "slideIn 0.5s ease-out",
                  }}
                >
                  <th
                    style={{
                      padding: "10px",
                      textAlign: "center",
                      width: "5%",
                      wordWrap: "break-word",
                      borderRadius: "12px 0 0 0",
                      display: "table-cell",
                      textShadow: "0 1px 2px rgba(0,0,0,0.2)",
                    }}
                    className="responsive-th"
                  >
                    S.No
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      textAlign: "center",
                      width: "12%",
                      wordWrap: "break-word",
                      display: "table-cell",
                      textShadow: "0 1px 2px rgba(0,0,0,0.2)",
                    }}
                    className="responsive-th no-wrap"
                  >
                    Transaction ID
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      textAlign: "center",
                      width: "8%",
                      wordWrap: "break-word",
                      display: "table-cell",
                      textShadow: "0 1px 2px rgba(0,0,0,0.2)",
                    }}
                    className="responsive-th"
                  >
                    Customer
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      textAlign: "center",
                      width: "12%",
                      wordWrap: "break-word",
                      display: "table-cell",
                      textShadow: "0 1px 2px rgba(0,0,0,0.2)",
                    }}
                    className="responsive-th"
                  >
                    Customer Email
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      textAlign: "center",
                      width: "10%",
                      wordWrap: "break-word",
                      display: "table-cell",
                      textShadow: "0 1px 2px rgba(0,0,0,0.2)",
                    }}
                    className="responsive-th"
                  >
                    Selected Employee
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      textAlign: "center",
                      width: "8%",
                      wordWrap: "break-word",
                      display: "table-cell",
                      textShadow: "0 1px 2px rgba(0,0,0,0.2)",
                    }}
                    className="responsive-th"
                  >
                    Service
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      textAlign: "center",
                      width: "8%",
                      wordWrap: "break-word",
                      display: "table-cell",
                      textShadow: "0 1px 2px rgba(0,0,0,0.2)",
                    }}
                    className="responsive-th"
                  >
                    Payment Date
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      textAlign: "center",
                      width: "8%",
                      wordWrap: "break-word",
                      display: "table-cell",
                      textShadow: "0 1px 2px rgba(0,0,0,0.2)",
                    }}
                    className="responsive-th"
                  >
                    Payment Status
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      textAlign: "center",
                      width: "7%",
                      wordWrap: "break-word",
                      display: "table-cell",
                      textShadow: "0 1px 2px rgba(0,0,0,0.2)",
                    }}
                    className="responsive-th"
                  >
                    Amount
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      textAlign: "center",
                      width: "7%",
                      wordWrap: "break-word",
                      display: "table-cell",
                      textShadow: "0 1px 2px rgba(0,0,0,0.2)",
                    }}
                    className="responsive-th"
                  >
                    Refund Amount
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      textAlign: "center",
                      width: "10%",
                      wordWrap: "break-word",
                      display: "table-cell",
                      textShadow: "0 1px 2px rgba(0,0,0,0.2)",
                    }}
                    className="responsive-th no-wrap"
                  >
                    UPI ID
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      textAlign: "center",
                      width: "12%",
                      wordWrap: "break-word",
                      borderRadius: "0 12px 0 0",
                      display: "table-cell",
                      textShadow: "0 1px 2px rgba(0,0,0,0.2)",
                    }}
                    className="responsive-th"
                  >
                    Refund Action
                  </th>
                </tr>
              </thead>
              <tbody style={{ display: "table-row-group" }}>
                {currentItems.length > 0 ? (
                  currentItems.map((booking, index) => (
                    <tr
                      key={index}
                      className="fade-in"
                      style={{
                        borderBottom: "1px solid #dfe6e9",
                        transition: "background 0.3s ease",
                        backgroundColor: index % 2 === 0 ? "#fff" : "#f9f9f9",
                        display: "table-row",
                        minHeight: 0,
                      }}
                    >
                      <td
                        style={{
                          padding: "10px",
                          whiteSpace: screenWidth <= 1439 ? "normal" : "nowrap",
                          wordWrap: screenWidth <= 1439 ? "break-word" : "initial",
                          textAlign: "center",
                          borderRight: "1px solid #dfe6e9",
                          display: "table-cell",
                        }}
                        className="responsive-td"
                      >
                        {indexOfFirstItem + index + 1}
                      </td>
                      <td
                        style={{
                          padding: "10px",
                          whiteSpace: "normal",
                          wordWrap: "break-word",
                          textAlign: "center",
                          borderRight: "1px solid #dfe6e9",
                          minWidth: "100px",
                          display: "table-cell",
                        }}
                        className="responsive-td transaction-id"
                        data-tooltip={booking.transactionId || "N/A"}
                      >
                        {booking.transactionId || "N/A"}
                      </td>
                      <td
                        style={{
                          padding: "10px",
                          whiteSpace: screenWidth <= 1439 ? "normal" : "nowrap",
                          wordWrap: screenWidth <= 1439 ? "break-word" : "initial",
                          textAlign: "center",
                          borderRight: "1px solid #dfe6e9",
                          display: "table-cell",
                        }}
                        className="responsive-td"
                      >
                        {booking.customerName}
                      </td>
                      <td
                        style={{
                          padding: "10px",
                          whiteSpace: "normal",
                          wordWrap: "break-word",
                          textAlign: "center",
                          borderRight: "1px solid #dfe6e9",
                          minWidth: "120px",
                          display: "table-cell",
                        }}
                        className="responsive-td customer-email"
                        data-tooltip={booking.customerEmail || "N/A"}
                      >
                        {booking.customerEmail || "N/A"}
                      </td>
                      <td
                        style={{
                          padding: "10px",
                          whiteSpace: screenWidth <= 1439 ? "normal" : "nowrap",
                          wordWrap: screenWidth <= 1439 ? "break-word" : "initial",
                          textAlign: "center",
                          borderRight: "1px solid #dfe6e9",
                          display: "table-cell",
                        }}
                        className="responsive-td"
                      >
                        {booking.favoriteEmployee}
                      </td>
                      <td
                        style={{
                          padding: "10px",
                          whiteSpace: screenWidth <= 1439 ? "normal" : "nowrap",
                          wordWrap: screenWidth <= 1439 ? "break-word" : "initial",
                          textAlign: "center",
                          borderRight: "1px solid #dfe6e9",
                          display: "table-cell",
                        }}
                        className="responsive-td"
                      >
                        {booking.service}
                      </td>
                      <td
                        style={{
                          padding: "10px",
                          whiteSpace: screenWidth <= 1439 ? "normal" : "nowrap",
                          wordWrap: screenWidth <= 1439 ? "break-word" : "initial",
                          textAlign: "center",
                          borderRight: "1px solid #dfe6e9",
                          display: "table-cell",
                        }}
                        className="responsive-td"
                      >
                        {new Date(booking.createdAt).toLocaleDateString()}
                      </td>
                      <td
                        style={{
                          padding: "10px",
                          whiteSpace: screenWidth <= 1439 ? "normal" : "nowrap",
                          wordWrap: screenWidth <= 1439 ? "break-word" : "initial",
                          textAlign: "center",
                          borderRight: "1px solid #dfe6e9",
                          display: "table-cell",
                        }}
                        className="responsive-td"
                      >
                        {booking.paymentStatus}
                      </td>
                      <td
                        style={{
                          padding: "10px",
                          whiteSpace: screenWidth <= 1439 ? "normal" : "nowrap",
                          wordWrap: screenWidth <= 1439 ? "break-word" : "initial",
                          textAlign: "center",
                          borderRight: "1px solid #dfe6e9",
                          display: "table-cell",
                        }}
                        className="responsive-td"
                      >
                        {booking.amount}
                      </td>
                      <td
                        style={{
                          padding: "10px",
                          whiteSpace: screenWidth <= 1439 ? "normal" : "nowrap",
                          wordWrap: screenWidth <= 1439 ? "break-word" : "initial",
                          textAlign: "center",
                          borderRight: "1px solid #dfe6e9",
                          display: "table-cell",
                        }}
                        className="responsive-td"
                      >
                        {booking.refundedAmount || "N/A"}
                      </td>
                      <td
                        style={{
                          padding: "10px",
                          whiteSpace: "normal",
                          wordWrap: "break-word",
                          textAlign: "center",
                          borderRight: "1px solid #dfe6e9",
                          minWidth: "80px",
                          display: "table-cell",
                        }}
                        className="responsive-td upi-id"
                        data-tooltip={booking.upiId || "N/A"}
                      >
                        {booking.upiId || "N/A"}
                      </td>
                      <td
                        style={{
                          padding: "10px",
                          whiteSpace: "normal",
                          wordWrap: "break-word",
                          textAlign: "center",
                          minWidth: "120px",
                          display: "table-cell",
                        }}
                        className="responsive-td refund-action"
                      >
                        {booking.paymentStatus === "CANCELLED" &&
                        booking.refundedAmount > 0 &&
                        booking.refundStatus === "PENDING" ? (
                          <button
                            onClick={() => openRefundModal(booking)}
                            style={{
                              padding: "6px 12px",
                              backgroundColor: "#7bd0c9",
                              color: "#fff",
                              border: "none",
                              borderRadius: "6px",
                              cursor: "pointer",
                              fontSize: "0.8rem",
                              width: "100%",
                              boxSizing: "border-box",
                            }}
                          >
                            Process Refund
                          </button>
                        ) : (
                          <span
                            style={{
                              color:
                                booking.refundStatus === "APPROVED"
                                  ? "#4CAF50"
                                  : booking.refundStatus === "REJECTED"
                                  ? "#F44336"
                                  : "#888",
                              display: "inline-block",
                              width: "100%",
                              textAlign: "center",
                            }}
                          >
                            {booking.refundStatus || "N/A"}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr
                    style={{
                      display: "table-row",
                      minHeight: 0,
                    }}
                  >
                    <td
                      colSpan="12"
                      style={{
                        padding: "20px",
                        textAlign: "center",
                        color: "#7f8c8d",
                        fontStyle: "italic",
                        fontSize: screenWidth <= 1024 ? "0.85rem" : "1rem",
                        backgroundColor: "#f9f9f9",
                        borderRadius: "0 0 12px 12px",
                        display: "table-cell",
                      }}
                      className="responsive-td-empty"
                    >
                      {filterText
                        ? `No bookings found for "${filterText}"`
                        : "No bookings available"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {filteredBookings.length > itemsPerPage && (
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={currentPage !== 1 ? "bounce" : ""}
                style={{
                  padding: screenWidth <= 1024 ? "8px 16px" : "10px 20px",
                  fontSize: screenWidth <= 1024 ? "0.9rem" : "1rem",
                  backgroundColor: currentPage === 1 ? "#e0e0e0" : "#7bd0c9",
                  color: currentPage === 1 ? "#888" : "#fff",
                  border: "none",
                  borderRadius: "10px",
                  cursor: currentPage === 1 ? "not-allowed" : "pointer",
                  transition:
                    "transform 0.3s ease, filter 0.3s ease, background-color 0.3s ease",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  transform: "scale(1)",
                  filter: "brightness(1)",
                  width: isVerySmallScreen ? "140px" : "auto",
                  fontWeight: 500,
                }}
                onMouseEnter={(e) => {
                  if (currentPage !== 1) {
                    e.target.style.transform = "scale(1.05)";
                    e.target.style.filter = "brightness(1.1)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "scale(1)";
                  e.target.style.filter = "brightness(1)";
                }}
              >
                Previous
              </button>
              <span
                style={{
                  fontSize: "16px",
                  fontWeight: "500",
                  color: "#2c3e50",
                }}
              >
                Page {currentPage} of {totalPages}  
              </span>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={currentPage !== totalPages ? "bounce" : ""}
                style={{
                  padding: screenWidth <= 1024 ? "8px 16px" : "10px 20px",
                  fontSize: screenWidth <= 1024 ? "0.9rem" : "1rem",
                  backgroundColor:
                    currentPage === totalPages ? "#e0e0e0" : "#7bd0c9",
                  color: currentPage === totalPages ? "#888" : "#fff",
                  border: "none",
                  borderRadius: "10px",
                  cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                  transition:
                    "transform 0.3s ease, filter 0.3s ease, background-color 0.3s ease",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  transform: "scale(1)",
                  filter: "brightness(1)",
                  width: isVerySmallScreen ? "140px" : "auto",
                  fontWeight: 500,
                }}
                onMouseEnter={(e) => {
                  if (currentPage !== totalPages) {
                    e.target.style.transform = "scale(1.05)";
                    e.target.style.filter = "brightness(1.1)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "scale(1)";
                  e.target.style.filter = "brightness(1)";
                }}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {/* Refund Modal */}
      {isRefundModalOpen && selectedBooking && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={closeRefundModal}
        >
          <div
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "8px",
              maxWidth: "400px",
              width: "90%",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3
              style={{
                textAlign: "center",
                marginBottom: "20px",
                color: "#2c3e50",
              }}
            >
              Process Refund
            </h3>
            <p>
              <strong>Customer:</strong> {selectedBooking.customerName}
            </p>
            <p>
              <strong>Service:</strong> {selectedBooking.service}
            </p>
            <p>
              <strong>Refund Amount:</strong> {selectedBooking.refundedAmount}
            </p>
            <p>
              <strong>UPI ID:</strong> {selectedBooking.upiId}
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px",
              }}
            >
              <button
                onClick={() => handleRefundAction("accept")}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#4CAF50",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Accept Refund
              </button>
              <button
                onClick={() => handleRefundAction("reject")}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#F44336",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Reject Refund
              </button>
            </div>
            <button
              onClick={closeRefundModal}
              style={{
                marginTop: "10px",
                padding: "10px 20px",
                backgroundColor: "#ccc",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                width: "100%",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Internal CSS for Table Styles */}
      <style>
        {`
          /* Tooltip Styles */
          .transaction-id,
          .customer-email,
          .upi-id {
            position: relative;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .transaction-id:hover::after,
          .customer-email:hover::after,
          .upi-id:hover::after {
            content: attr(data-tooltip);
            position: absolute;
            top: -30px;
            left: 50%;
            transform: translateX(-50%);
            background-color: #555;
            color: #fff;
            text-align: center;
            border-radius: 6px;
            padding: 5px 10px;
            white-space: nowrap;
            z-index: 10;
            opacity: 1;
            transition: opacity 0.3s ease;
          }

          .transaction-id::after,
          .customer-email::after,
          .upi-id::after {
            opacity: 0;
          }

          /* No-wrap for specific headers */
          .no-wrap {
            whiteSpace: nowrap;
          }

          /* Animations */
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateX(-20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes bounce {
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.1);
            }
          }

          .fade-in {
            animation: fadeIn 0.5s ease-out;
          }

          .bounce {
            animation: bounce 0.3s ease;
          }

          /* Default column styles */
          .responsive-th,
          .responsive-td {
            padding: 10px;
            font-size: 0.95rem;
            word-wrap: break-word;
            text-align: center;
            box-sizing: border-box;
            display: table-cell;
            transition: color 0.3s ease;
          }

          .responsive-td:hover {
            color: #1a73e8;
          }

          .responsive-td-empty {
            padding: 20px;
            font-size: 1rem;
            display: table-cell;
          }

          thead tr {
            background: linear-gradient(135deg, #7bd0c9 0%, #4a90e2 100%) !important;
            display: table-row;
          }

          tbody {
            display: table-row-group;
          }

          tr {
            display: table-row;
            min-height: 0;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
          }

          tr:hover {
            transform: scale(1.01);
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            background: linear-gradient(135deg, #e6f3f3 0%, #f0f8ff 100%) !important;
          }

          .employee-table {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            scroll-behavior: smooth;
            width: 100%;
            max-width: 100%;
          }

          table {
            width: 100%;
            max-width: 100%;
            table-layout: auto;
          }

          th,
          td {
            box-sizing: border-box;
            border-radius: 4px;
          }

          /* Specific styles for Transaction ID, Customer Email, UPI ID, and Refund Action */
          .transaction-id,
          .customer-email,
          .upi-id,
          .refund-action {
            whiteSpace: normal !important;
            word-wrap: break-word !important;
            min-width: 100px;
            padding: 10px;
          }

          .customer-email {
            min-width: 120px;
          }

          .upi-id {
            min-width: 80px;
          }

          .refund-action button {
            display: inline-block;
            width: 100%;
            text-align: center;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
          }

          .refund-action button:hover {
            transform: scale(1.05);
            box-shadow: 0 0 8px rgba(0,0,0,0.2);
          }

          .refund-action span {
            display: inline-block;
            width: 100%;
            text-align: center;
          }

          /* Default column styles for mobile */
          .responsive-td:not(.transaction-id):not(.customer-email):not(.upi-id):not(.refund-action) {
            whiteSpace: normal;
            word-wrap: break-word;
          }

          /* Media Queries */
          @media screen and (max-width: 1439px) {
            .employee-table {
              overflow-x: auto;
            }
            .responsive-th,
            .responsive-td {
              padding: 8px;
              font-size: 0.8rem;
            }
            .responsive-td-empty {
              padding: 15px;
              font-size: 0.85rem;
            }
            .transaction-id,
            .customer-email,
            .upi-id,
            .refund-action {
              padding: 8px;
              font-size: 0.8rem;
              min-width: 80px;
            }
            .customer-email {
              min-width: 100px;
            }
            .upi-id {
              min-width: 70px;
            }
            tr:hover {
              transform: scale(1);
            }
            .transaction-id:hover::after,
            .customer-email:hover::after,
            .upi-id:hover::after {
              top: -25px;
              padding: 4px 8px;
            }
            .no-wrap {
              font-size: 0.75rem;
            }
          }

          @media screen and (max-width: 1024px) {
            .responsive-th,
            .responsive-td {
              padding: 6px;
              font-size: 0.75rem;
            }
            .responsive-td-empty {
              padding: 12px;
              font-size: 0.8rem;
            }
            .transaction-id,
            .customer-email,
            .upi-id,
            .refund-action {
              padding: 6px;
              font-size: 0.75rem;
              min-width: 70px;
            }
            .customer-email {
              min-width: 90px;
            }
            .upi-id {
              min-width: 60px;
            }
            .no-wrap {
              font-size: 0.7rem;
            }
          }

          @media screen and (max-width: 768px) {
            .responsive-th,
            .responsive-td {
              padding: 5px;
              font-size: 0.7rem;
            }
            .responsive-td-empty {
              padding: 10px;
              font-size: 0.75rem;
            }
            .transaction-id,
            .customer-email,
            .upi-id,
            .refund-action {
              padding: 5px;
              font-size: 0.7rem;
              min-width: 60px;
            }
            .customer-email {
              min-width: 80px;
            }
            .upi-id {
              min-width: 50px;
            }
            .transaction-id:hover::after,
            .customer-email:hover::after,
            .upi-id:hover::after {
              top: -20px;
              padding: 3px 6px;
              font-size: 0.65rem;
            }
            .no-wrap {
              font-size: 0.65rem;
            }
          }

          @media screen and (max-width: 480px) {
            .responsive-th,
            .responsive-td {
              padding: 4px;
              font-size: 0.65rem;
            }
            .responsive-td-empty {
              padding: 8px;
              font-size: 0.7rem;
            }
            .transaction-id,
            .customer-email,
            .upi-id,
            .refund-action {
              padding: 4px;
              font-size: 0.65rem;
              min-width: 50px;
            }
            .customer-email {
              min-width: 70px;
            }
            .upi-id {
              min-width: 50px;
            }
            .fade-in {
              animation: fadeIn 0.3s ease-out;
            }
            .transaction-id:hover::after,
            .customer-email:hover::after,
            .upi-id:hover::after {
              top: -18px;
              padding: 2px 5px;
              font-size: 0.6rem;
            }
            .no-wrap {
              font-size: 0.6rem;
            }
          }

          @media screen and (max-width: 320px) {
            .responsive-th,
            .responsive-td {
              padding: 3px;
              font-size: 0.6rem;
            }
            .responsive-td-empty {
              padding: 6px;
              font-size: 0.65rem;
            }
            .transaction-id,
            .customer-email,
            .upi-id,
            .refund-action {
              padding: 3px;
              font-size: 0.6rem;
              min-width: 50px;
            }
            .customer-email {
              min-width: 70px;
            }
            .upi-id {
              min-width: 50px;
            }
            .transaction-id:hover::after,
            .customer-email:hover::after,
            .upi-id:hover::after {
              top: -16px;
              padding: 2px 4px;
              font-size: 0.55rem;
            }
            .no-wrap {
              font-size: 0.55rem;
            }
          }

          @media screen and (min-width: 1440px) {
            .employee-table {
              overflow-x: visible;
            }
            .responsive-th,
            .responsive-td {
              padding: 12px;
              font-size: 0.95rem;
            }
            .responsive-td-empty {
              padding: 20px;
              font-size: 1rem;
            }
            .transaction-id,
            .customer-email,
            .upi-id,
            .refund-action {
              padding: 12px;
              font-size: 0.95rem;
              min-width: 100px;
            }
            .customer-email {
              min-width: 120px;
            }
            .upi-id {
              min-width: 80px;
            }
            .responsive-td:not(.transaction-id):not(.customer-email):not(.upi-id):not(.refund-action) {
              whiteSpace: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }

          @media screen and (min-width: 2561px) {
            .responsive-th,
            .responsive-td {
              padding: 14px;
              font-size: 1.1rem;
            }
            .responsive-td-empty {
              padding: 25px;
              font-size: 1.15rem;
            }
            .transaction-id,
            .customer-email,
            .upi-id,
            .refund-action {
              padding: 14px;
              font-size: 1.1rem;
              min-width: 120px;
            }
            .customer-email {
              min-width: 140px;
            }
            .upi-id {
              min-width: 100px;
            }
            .transaction-id:hover::after,
            .customer-email:hover::after,
            .upi-id:hover::after {
              top: -35px;
              padding: 6px 12px;
              font-size: 1rem;
            }
          }
        `}
      </style>
    </div>
  );
};

export default BookingPage;