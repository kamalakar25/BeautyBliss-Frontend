import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { styled } from "@mui/material/styles";

// Styled FilterToggleButton
const FilterToggleButton = styled(IconButton)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down("lg")]: {
    // Show toggle button below 1024px
    display: "block",
    color: "#1abc9c",
    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor: "rgba(26, 188, 156, 0.1)",
    },
  },
}));

// DeleteButton component (unchanged)
const DeleteButton = ({ onClick }) => {
  return (
    <Box
      component="button"
      className="button"
      onClick={onClick}
      sx={{
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        background: "linear-gradient(135deg, #2c3e50, #34495e)",
        border: "none",
        fontWeight: 600,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.164)",
        cursor: "pointer",
        transitionDuration: "0.3s",
        overflow: "hidden",
        position: "relative",
        gap: "1px",
        "&:hover": {
          width: "120px",
          borderRadius: "40px",
          transitionDuration: "0.3s",
          background: "linear-gradient(135deg, #ff6b6b, #ff8c8c)",
          alignItems: "center",
          gap: "0",
        },
        "&:before": {
          position: "absolute",
          top: "-15px",
          content: '"Delete"',
          color: "white",
          transitionDuration: "0.3s",
          fontSize: "2px",
        },
        "&:hover:before": {
          fontSize: "11px",
          opacity: 1,
          transform: "translateY(25px)",
          transitionDuration: "0.3s",
        },
        "& .svgIcon": {
          width: "10px",
          transitionDuration: "0.3s",
          "& path": {
            fill: "white",
          },
        },
        "&:hover .bin-bottom": {
          width: "40px",
          transitionDuration: "0.3s",
          transform: "translateY(60%)",
        },
        "& .bin-top": {
          transformOrigin: "bottom right",
        },
        "&:hover .bin-top": {
          width: "40px",
          transitionDuration: "0.3s",
          transform: "translateY(60%) rotate(160deg)",
        },
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 55 11"
        className="svgIcon bin-top"
      >
        <g clipPath="url(#clip0_35_24)">
          <path
            fill="black"
            d="M16.6586 2.10187L15.9958 3.37043C15.8579 3.63447 15.5846 3.8 15.2868 3.8H3.94286C1.76197 3.8 0 5.49813 0 7.6C0 9.70187 1.76197 11.4 3.94286 11.4H51.2571C53.438 11.4 55.2 9.70187 55.2 7.6C55.2 5.49813 53.438 3.8 51.2571 3.8H39.9132C39.6154 3.8 39.3421 3.63447 39.2042 3.37043L38.5414 2.10187C37.8761 0.807504 36.5084 0 34.6175 0H20.1825C18.2916 0 16.9239 0.807504 16.6586 2.10187ZM51.2018 16.0518C51.2318 15.5906 50.8658 15.2 50.4035 15.2H4.79645C4.3342 15.2 3.9682 15.5906 3.99813 16.0518L6.555 55.4562C6.75214 58.4606 9.33968 60.8 12.457 60.8H42.743C45.8603 60.8 48.4479 58.4606 48.645 55.4562L51.2018 16.0518Z"
          ></path>
        </g>
        <defs>
          <clipPath id="clip0_35_24">
            <rect fill="white" height="11" width="55"></rect>
          </clipPath>
        </defs>
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 55 46"
        className="svgIcon bin-bottom"
      >
        <g clipPath="url(#clip0_35_22)">
          <path
            fill="black"
            d="M16.6586 -13.0981L15.9958 -11.8296C15.8579 -11.5655 15.5846 -11.4 15.2868 -11.4H3.94286C1.76197 -11.4 0 -9.70187 0 -7.6C0 -5.49813 1.76197 -3.8 3.94286 -3.8H51.2571C53.438 -3.8 55.2 -5.49813 55.2 -7.6C55.2 -9.70187 53.438 -11.4 51.2571 -11.4H39.9132C39.6154 -11.4 39.3421 -11.5655 39.2042 -11.8296L38.5414 -13.0981C37.8761 -14.3925 36.5084 -15.2 34.6175 -15.2H20.1825C18.2916 -15.2 16.9239 -14.3925 16.6586 -13.0981ZM51.2018 0.85184C51.2318 0.39056 50.8658 0 50.4035 0H4.79645C4.3342 0 3.9682 0.39056 3.99813 0.85184L6.555 40.2562C6.75214 43.2606 9.33968 45.6 12.457 45.6H42.743C45.8603 45.6 48.4479 43.2606 48.645 40.2562L51.2018 0.85184Z"
          ></path>
        </g>
        <defs>
          <clipPath id="clip0_35_22">
            <rect fill="white" height="46" width="55"></rect>
          </clipPath>
        </defs>
      </svg>
    </Box>
  );
};

const UserDetails = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [startDateFilter, setStartDateFilter] = useState("");
  const [endDateFilter, setEndDateFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false); // State for toggling filters on small screens
  const usersPerPage = 10;

  const BASE_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/users/get/all/users`
        );
        setUsers(response.data);
        setFilteredUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    let filtered = users;

    // Search filter by name, email, phone, dob, or createdAt
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (user) =>
          user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.phone?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.dob?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.createdAt?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Date filter
    if (startDateFilter || endDateFilter) {
      filtered = filtered.filter((user) => {
        if (!user.createdAt) return false;
        try {
          const joinDate = new Date(user.createdAt);
          if (isNaN(joinDate.getTime())) return false;
          const startDate = startDateFilter ? new Date(startDateFilter) : null;
          const endDate = endDateFilter ? new Date(endDateFilter) : null;
          if (endDate) endDate.setHours(23, 59, 59, 999);
          if (startDate && endDate) {
            return joinDate >= startDate && joinDate <= endDate;
          } else if (startDate) {
            return joinDate >= startDate;
          } else if (endDate) {
            return joinDate <= endDate;
          }
          return true;
        } catch (error) {
          console.warn(`Invalid date for user ${user._id}:`, user.createdAt);
          return false;
        }
      });
    }
    setFilteredUsers(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchQuery, startDateFilter, endDateFilter, users]);

  const handleDelete = async () => {
    if (userToDelete) {
      try {
        await axios.delete(`${BASE_URL}/api/users/${userToDelete}`);
        setUsers(users.filter((user) => user._id !== userToDelete));
        setShowModal(false);
        setUserToDelete(null);
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const openDeleteModal = (userId) => {
    setUserToDelete(userId);
    setShowModal(true);
  };

  const closeDeleteModal = () => {
    setShowModal(false);
    setUserToDelete(null);
  };

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      closeDeleteModal();
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Invalid Date";
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    } catch (error) {
      console.warn(`Invalid date: ${dateString}`);
      return "Invalid Date";
    }
  };

  const clearFilters = () => {
    setSearchQuery("");
    setStartDateFilter("");
    setEndDateFilter("");
    setShowFilters(false); // Hide filters on small screens when clearing
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleToggleFilters = () => {
    setShowFilters((prev) => !prev);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: { xs: "20px 10px", sm: "20px" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "1200px",
          background: "linear-gradient(135deg, #f0f4f8, #e0e7ff)",
          borderRadius: "12px",
          p: "20px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          margin: "0 auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: "20px",
            gap: "20px",
          }}
        >
          <Box
            component="h2"
            sx={{
              fontSize: { xs: "1.5rem", sm: "1.8rem" },
              background: "linear-gradient(135deg, #2c3e50, #34495e)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              m: 0,
              textAlign: "center",
            }}
          >
            User Details
          </Box>
          <Box
            sx={{
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row", lg: "row" },
                flexWrap: { sm: "wrap" },
                justifyContent: "center",
                alignItems: "center",
                gap: { xs: 2, sm: 3 },
                width: "100%",
              }}
            >
              {/* Mobile view: Search bar with toggle button */}
              <Box
                sx={{
                  display: { xs: "flex", lg: "none" }, // Show search with toggle below 1024px
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 1,
                  width: "100%",
                  maxWidth: { xs: "100%", sm: "400px" },
                }}
              >
                <Box
                  component="input"
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  sx={{
                    p: "8px",
                    borderRadius: "6px",
                    border: "1px solid #e0e7ff",
                    background: "linear-gradient(135deg, #ffffff, #edf2f7)",
                    fontSize: "0.9rem",
                    width: "100%",
                    maxWidth: { xs: "100%", sm: "200px" },
                    color: "#2d3436",
                    textAlign: "center",
                  }}
                />
                <FilterToggleButton onClick={handleToggleFilters}>
                  <FilterListIcon />
                </FilterToggleButton>
              </Box>
              <Box
                component="span"
                sx={{
                  fontSize: "1rem",
                  background: "linear-gradient(135deg, #34495e, #4a5568)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mt: { xs: 0, sm: "25px" },
                  textAlign: "center",
                }}
              >
                Total Users: <strong>{filteredUsers.length}</strong>
              </Box>
              {/* Filters: Always show on lg and above, toggle on smaller screens */}
              <Box
                sx={{
                  display: { xs: showFilters ? "flex" : "none", lg: "flex" }, // Always show on lg (1024px and above)
                  flexDirection: { xs: "column", sm: "row" },
                  flexWrap: { sm: "wrap" },
                  justifyContent: "center",
                  alignItems: "center",
                  gap: { xs: 2, sm: 3 },
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    width: { xs: "100%", sm: "auto" },
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: { xs: "50%", sm: "auto" },
                    }}
                  >
                    <Box
                      component="label"
                      htmlFor="startDate"
                      sx={{
                        fontSize: "0.9rem",
                        background: "linear-gradient(135deg, #34495e, #4a5568)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        mb: "4px",
                        zIndex: 3,
                      }}
                    >
                      From
                    </Box>
                    <Box
                      component="input"
                      id="startDate"
                      type="date"
                      value={startDateFilter}
                      onChange={(e) => setStartDateFilter(e.target.value)}
                      sx={{
                        p: "8px",
                        borderRadius: "6px",
                        border: "1px solid #e0e7ff",
                        background: "linear-gradient(135deg, #ffffff, #edf2f7)",
                        fontSize: "0.9rem",
                        width: "100%",
                        maxWidth: { xs: "150px", sm: "200px" },
                        textAlign: "center",
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: { xs: "50%", sm: "auto" },
                    }}
                  >
                    <Box
                      component="label"
                      htmlFor="endDate"
                      sx={{
                        fontSize: "0.9rem",
                        background: "linear-gradient(135deg, #34495e, #4a5568)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        mb: "4px",
                      }}
                    >
                      To
                    </Box>
                    <Box
                      component="input"
                      id="endDate"
                      type="date"
                      value={endDateFilter}
                      onChange={(e) => setEndDateFilter(e.target.value)}
                      min={startDateFilter || undefined}
                      max={new Date().toISOString().split("T")[0]}
                      sx={{
                        p: "8px",
                        borderRadius: "6px",
                        border: "1px solid #e0e7ff",
                        background: "linear-gradient(135deg, #ffffff, #edf2f7)",
                        fontSize: "0.9rem",
                        width: "100%",
                        maxWidth: { xs: "150px", sm: "200px" },
                        textAlign: "center",
                        color: "#2d3436",
                      }}
                    />
                  </Box>
                </Box>
                <Box
                  component="button"
                  onClick={clearFilters}
                  disabled={!searchQuery && !startDateFilter && !endDateFilter}
                  className="text-white"
                  sx={{
                    p: "8px 16px",
                    borderRadius: "6px",
                    border: "1px solid rgb(252, 252, 252)",
                    bgcolor: "rgb(86,176,167)",
                    fontSize: "0.9rem",
                    fontWeight: "medium",
                    cursor:
                      !searchQuery && !startDateFilter && !endDateFilter
                        ? "not-allowed"
                        : "pointer",
                    mt: { xs: 0, sm: "25px" },
                    transition: "all 0.3s ease",
                    "&:hover": {
                      ...(searchQuery || startDateFilter || endDateFilter
                        ? {
                            bgcolor:
                              "linear-gradient(135deg, #2563eb, #3b82f6)",
                            transform: "scale(1.05)",
                            boxShadow: "0 4px 12px rgb(9, 66, 255)",
                          }
                        : {}),
                    },
                  }}
                >
                  Clear Filters
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box sx={{ overflowX: "auto", width: "100%" }}>
          <Box
            component="table"
            sx={{
              width: "100%",
              borderCollapse: "collapse",
              background:
                "linear-gradient(135deg,rgb(255, 255, 255),rgb(255, 255, 255))",
              borderRadius: "8px",
              overflow: "hidden",
              border: "1px solid #d3d8ff",
            }}
          >
            <Box
              component="thead"
              sx={{
                background:
                  "linear-gradient(135deg,rgba(42, 157, 144, 0.73),rgba(45, 156, 145, 0.81))",
                color: "#fff",
              }}
            >
              <tr>
                {[
                  "Sl. No",
                  "Name",
                  "Email",
                  "Phone",
                  "DOB",
                  "Date of Joining",
                  "Actions",
                ].map((header, idx) => (
                  <Box
                    component="th"
                    key={idx}
                    sx={{
                      p: "12px",
                      textAlign: "center",
                      fontSize: "0.9rem",
                      border: "1px solid #d3d8ff",
                      ...(header === "Actions" ? { width: "150px" } : {}),
                    }}
                  >
                    {header}
                  </Box>
                ))}
              </tr>
            </Box>
            <Box component="tbody">
              {currentUsers.map((user, index) => (
                <tr
                  key={user._id}
                  style={{ borderBottom: "1px solid #d3d8ff" }}
                >
                  <Box
                    component="td"
                    sx={{
                      p: "12px",
                      fontSize: "0.9rem",
                      textAlign: "center",
                      border: "1px solid #d3d8ff",
                    }}
                  >
                    {indexOfFirstUser + index + 1}
                  </Box>
                  <Box
                    component="td"
                    sx={{
                      p: "12px",
                      fontSize: "0.9rem",
                      textAlign: "center",
                      border: "1px solid #d3d8ff",
                    }}
                  >
                    {user.name || "N/A"}
                  </Box>
                  <Box
                    component="td"
                    sx={{
                      p: "12px",
                      fontSize: "0.9rem",
                      textAlign: "center",
                      border: "1px solid #d3d8ff",
                    }}
                  >
                    {user.email || "N/A"}
                  </Box>
                  <Box
                    component="td"
                    sx={{
                      p: "12px",
                      fontSize: "0.9rem",
                      textAlign: "center",
                      border: "1px solid #d3d8ff",
                    }}
                  >
                    {user.phone || "N/A"}
                  </Box>
                  <Box
                    component="td"
                    sx={{
                      p: "12px",
                      fontSize: "0.9rem",
                      textAlign: "center",
                      border: "1px solid #d3d8ff",
                    }}
                  >
                    {formatDate(user.dob)}
                  </Box>
                  <Box
                    component="td"
                    sx={{
                      p: "12px",
                      fontSize: "0.9rem",
                      textAlign: "center",
                      border: "1px solid #d3d8ff",
                    }}
                  >
                    {formatDate(user.createdAt)}
                  </Box>
                  <Box
                    component="td"
                    sx={{
                      p: "12px",
                      textAlign: "center",
                      width: "150px",
                      display: "flex",
                      justifyContent: "center",
                      border: "1px solid #d3d8ff",
                    }}
                  >
                    <DeleteButton onClick={() => openDeleteModal(user._id)} />
                  </Box>
                </tr>
              ))}
              {currentUsers.length === 0 && (
                <tr>
                  <Box
                    component="td"
                    colSpan="7"
                    sx={{
                      textAlign: "center",
                      p: "20px",
                      background:
                        "linear-gradient(135deg, #457b9d,rgba(69, 123, 157, 0.84))",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontSize: "1rem",
                      border: "1px solid #d3d8ff",
                    }}
                  >
                    No users found.
                  </Box>
                </tr>
              )}
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            mt: 3,
          }}
        >
          <Box
            component="button"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            sx={{
              p: "6px 18px",
              borderRadius: "20px",
              border: "1px solid rgb(255, 255, 255)",
              color: " #34495e",
              fontSize: "0.8rem",
              fontWeight: "medium",
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
              background: "rgb(229, 229, 230)",
              "&:hover": {
                ...(currentPage !== 1
                  ? {
                      background: "linear-gradient(135deg, #34495e, #4a5568)",
                      color: "#ffffff",
                      transform: "scale(1.05)",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                    }
                  : {}),
              },
            }}
          >
            Previous
          </Box>
          <Box
            component="span"
            sx={{
              fontSize: "0.9rem",
              background: "linear-gradient(135deg, #34495e, #4a5568)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Page {currentPage} of {totalPages}
          </Box>
          <Box
            component="button"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            sx={{
              p: "6px 18px",
              borderRadius: "20px",
              border: "1px solid rgb(255, 255, 255)",
              color: "rgb(50, 70, 90)",
              fontSize: "0.8rem",
              fontWeight: "medium",
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
              transition: "all 0.3s ease",
              background: "rgb(229, 229, 230)",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.37)",
              "&:hover": {
                ...(currentPage !== totalPages
                  ? {
                      background: "linear-gradient(135deg, #34495e, #4a5568)",
                      color: "#ffffff",
                      transform: "scale(1.05)",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                    }
                  : {}),
              },
            }}
          >
            Next
          </Box>
        </Box>
      </Box>

      {showModal && (
        <Box
          onClick={handleBackdropClick}
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(135deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5))",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            animation: "fadeIn 0.3s ease-in",
            "@keyframes fadeIn": {
              from: { opacity: 0 },
              to: { opacity: 1 },
            },
          }}
        >
          <Box
            sx={{
              width: { xs: "90%", sm: "400px", md: "450px" },
              maxWidth: "450px",
              background: "linear-gradient(135deg, #ffffff, #f8fafc)",
              borderRadius: "12px",
              p: { xs: 3, sm: 4 },
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              animation: "slideIn 0.3s ease-out",
              "@keyframes slideIn": {
                from: { transform: "translateY(-20px)", opacity: 0 },
                to: { transform: "translateY(0)", opacity: 1 },
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mb: 3,
                "&:hover .delete-icon": {
                  transform: "scale(1.2)",
                  transition: "transform 0.3s ease",
                },
              }}
            >
              <DeleteIcon
                className="delete-icon"
                sx={{
                  fontSize: { xs: 48, sm: 56 },
                  background: "linear-gradient(135deg, #ff6b6b, #ff8c8c)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  transition: "transform 0.3s ease",
                }}
              />
            </Box>
            <Box
              component="h2"
              sx={{
                fontSize: { xs: "1.5rem", sm: "1.75rem" },
                fontWeight: "bold",
                background: "linear-gradient(135deg, #1f2937, #374151)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 2,
              }}
            >
              Are You Sure?
            </Box>
            <Box
              component="p"
              sx={{
                fontSize: { xs: "0.875rem", sm: "1rem" },
                background: "linear-gradient(135deg, #6b7280, #9ca3af)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 4,
                px: { xs: 2, sm: 0 },
              }}
            >
              Do you really want to delete this user? This process cannot be
              undone.
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
                width: "100%",
                justifyContent: "center",
              }}
            >
              <Box
                component="button"
                onClick={closeDeleteModal}
                sx={{
                  flex: { xs: "1 1 100%", sm: "1 1 auto" },
                  background:
                    "linear-gradient(135deg,rgb(55, 65, 81), #4b5563)",
                  color: "#d1d5db",
                  px: 4,
                  py: 1.5,
                  fontSize: "0.875rem",
                  fontWeight: "medium",
                  borderRadius: "9999px",
                  border: "2px solid transparent",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg,rgb(75, 85, 99), #6b7280)",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                  },
                }}
              >
                Cancel
              </Box>
              <Box
                component="button"
                onClick={handleDelete}
                sx={{
                  flex: { xs: "1 1 100%", sm: "1 1 auto" },
                  background: "linear-gradient(135deg, #ff6b6b, #ff8c8c)",
                  color: "#ffffff",
                  px: 4,
                  py: 1.5,
                  fontSize: "0.875rem",
                  fontWeight: "medium",
                  borderRadius: "9999px",
                  border: "2px solid transparent",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background: "linear-gradient(135deg, #ef4444, #f87171)",
                    color: "#ffffff",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                  },
                }}
              >
                Confirm
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default UserDetails;
