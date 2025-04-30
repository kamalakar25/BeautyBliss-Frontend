import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { styled } from "@mui/material/styles";

// Styled FilterToggleButton (aligned with UserDetails)
const FilterToggleButton = styled(IconButton)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down("lg")]: {
    display: "block",
    color: "#1abc9c",
    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor: "rgba(26, 188, 156, 0.1)",
    },
  },
}));

// Modified DeleteButton component with smaller size and corrected SVG
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
        viewBox="0 0 24 6"
        className="svgIcon bin-top"
      >
        <path fill="white" d="M6 2h12a2 2 0 0 1 2 2H4a2 2 0 0 1 2-2z" />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 18"
        className="svgIcon bin-bottom"
      >
        <path fill="white" d="M4 2h16v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2z" />
      </svg>
    </Box>
  );
};

// Function to parse latitude and longitude from location string
const parseCoordinates = (location) => {
  if (!location || typeof location !== "string") {
    return { latitude: null, longitude: null };
  }
  try {
    const latMatch = location.match(/Lat: ([\d.-]+)/);
    const lonMatch = location.match(/Lon: ([\d.-]+)/);
    const latitude = latMatch ? parseFloat(latMatch[1]) : null;
    const longitude = lonMatch ? parseFloat(lonMatch[1]) : null;
    return { latitude, longitude };
  } catch (error) {
    // console.warn("Error parsing coordinates:", error);
    return { latitude: null, longitude: null };
  }
};

// Function to get Google Maps link
const getMapLink = (location) => {
  const { latitude, longitude } = parseCoordinates(location);
  const lat = latitude !== null ? latitude : 17.359699; // Default latitude
  const lon = longitude !== null ? longitude : 78.534277; // Default longitude
  return `https://www.google.com/maps?q=${lat},${lon}`;
};

const ServiceProviderDetails = () => {
  const [serviceProviders, setServiceProviders] = useState([]);
  const [filteredProviders, setFilteredProviders] = useState([]);
  const [startDateFilter, setStartDateFilter] = useState("");
  const [endDateFilter, setEndDateFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [providerToDelete, setProviderToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [addresses, setAddresses] = useState({});
  const [showFilters, setShowFilters] = useState(false); // State for toggling filters
  const [error, setError] = useState(""); // Added error state
  const itemsPerPage = 5;

  const BASE_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchServiceProviders = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/main/admin/get/all/service-providers`
        );
        const providers = response.data;
        setServiceProviders(providers);
        setFilteredProviders(providers);
      } catch (error) {
        // console.error("Error fetching service providers:", error);
        setError("Failed to load service providers. Please try again.");
      }
    };
    fetchServiceProviders();
  }, []);

  useEffect(() => {
    let filtered = serviceProviders;

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter((provider) => {
        const fieldsToSearch = [
          provider.name || "",
          provider.email || "",
          provider.phone || "",
          provider.shopName || "",
          provider.designation || "",
          provider.location || "",
          formatDate(provider.createdAt) || "",
          formatDate(provider.dob) || "",
        ];
        return fieldsToSearch.some((field) =>
          field.toLowerCase().includes(query)
        );
      });
    }

    // Apply date filters
    if (startDateFilter || endDateFilter) {
      filtered = filtered.filter((provider) => {
        if (!provider.createdAt) return false;
        try {
          const joinDate = new Date(provider.createdAt);
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
          // console.warn(
          //   `Invalid date for provider ${provider._id}:`,
          //   provider.createdAt
          // );
          return false;
        }
      });
    }

    setFilteredProviders(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchQuery, startDateFilter, endDateFilter, serviceProviders]);

  const handleDelete = async () => {
    if (providerToDelete) {
      try {
        await axios.delete(
          `${BASE_URL}/api/main/admin/delete/${providerToDelete}`
        );
        setServiceProviders(
          serviceProviders.filter(
            (provider) => provider._id !== providerToDelete
          )
        );
        setFilteredProviders(
          filteredProviders.filter(
            (provider) => provider._id !== providerToDelete
          )
        );
        setShowModal(false);
        setProviderToDelete(null);
      } catch (error) {
        // console.error("Error deleting service provider:", error);
        setError("Failed to delete service provider. Please try again.");
      }
    }
  };

  const openDeleteModal = (providerId) => {
    setProviderToDelete(providerId);
    setShowModal(true);
  };

  const closeDeleteModal = () => {
    setShowModal(false);
    setProviderToDelete(null);
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
      // console.warn(`Invalid date: ${dateString}`);
      return "Invalid Date";
    }
  };

  const clearAllFilters = () => {
    setStartDateFilter("");
    setEndDateFilter("");
    setSearchQuery("");
    setShowFilters(false); // Hide filters on clear
  };

  const handleToggleFilters = () => {
    setShowFilters((prev) => !prev);
  };

  const totalPages = Math.ceil(filteredProviders.length / itemsPerPage);
  const paginatedProviders = filteredProviders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
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
            Service Provider Details
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
                Total Service Providers:{" "}
                <strong>{filteredProviders.length}</strong>
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
                {/*  */}
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
                  onClick={clearAllFilters}
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
        {error && (
          <Box
            sx={{
              color: "#ff6b6b",
              fontSize: "0.9rem",
              textAlign: "center",
              mb: 2,
            }}
          >
            {error}
          </Box>
        )}
        <Box sx={{ overflowX: "auto", width: "100%" }}>
          <Box
            component="table"
            sx={{
              width: "100%",
              borderCollapse: "collapse",
              background: "linear-gradient(135deg, #ffffff, #ffffff)",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <Box
              component="thead"
              sx={{
                background:
                  "linear-gradient(135deg, #2a9d8f, rgb(98, 187, 178))",
                color: "#fff",
              }}
            >
              <tr>
                {[
                  "Sl. No",
                  "Name",
                  "Email",
                  "Shop Name",
                  "Phone",
                  "DOB",
                  "Designation",
                  "Address",
                  "Date of Join",
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
              {paginatedProviders.map((provider, index) => {
                const { latitude, longitude } = parseCoordinates(
                  provider.location
                );
                const displayLocation =
                  addresses[provider._id] ||
                  (latitude && longitude
                    ? `${latitude}, ${longitude}`
                    : provider.location || "N/A");
                return (
                  <tr
                    key={provider._id}
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
                      {(currentPage - 1) * itemsPerPage + index + 1}
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
                      {provider.name || "N/A"}
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
                      {provider.email || "N/A"}
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
                      {provider.shopName || "N/A"}
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
                      {provider.phone || "N/A"}
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
                      {formatDate(provider.dob)}
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
                      {provider.designation || "N/A"}
                    </Box>
                    <Box
                      component="td"
                      sx={{
                        p: "8px",
                        fontSize: "0.9rem",
                        textAlign: "center",
                        border: "1px solid #d3d8ff",
                      }}
                    >
                      {latitude && longitude ? (
                        <a
                          href={getMapLink(provider.location)}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: "inline-block",
                            marginBottom: "4px",
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="24"
                            height="24"
                            viewBox="0 0 48 48"
                          >
                            <path
                              fill="#1c9957"
                              d="M42,39V9c0-1.657-1.343-3-3-3H9C7.343,6,6,7.343,6,9v30c0,1.657,1.343,3,3,3h30C40.657,42,42,40.657,42,39z"
                            ></path>
                            <path
                              fill="#3e7bf1"
                              d="M9,42h30c1.657,0-15-16-15-16S7.343,42,9,42z"
                            ></path>
                            <path
                              fill="#cbccc9"
                              d="M42,39V9c0-1.657-16,15-16,15S42,40.657,42,39z"
                            ></path>
                            <path
                              fill="#efefef"
                              d="M39,42c1.657,0,3-1.343,3-3v-0.245L26.245,23L23,26.245L38.755,42H39z"
                            ></path>
                            <path
                              fill="#ffd73d"
                              d="M42,9c0-1.657-1.343-3-3-3h-0.245L6,38.755V39c0,1.657,1.343,3,3,3h0.245L42,9.245V9z"
                            ></path>
                            <path
                              fill="#d73f35"
                              d="M36,2c-5.523,0-10,4.477-10,10c0,6.813,7.666,9.295,9.333,19.851C35.44,32.531,35.448,33,36,33s0.56-0.469,0.667-1.149C38.334,21.295,46,18.813,46,12C46,6.477,41.523,2,36,2z"
                            ></path>
                            <path
                              fill="#752622"
                              d="M36 8.5A3.5 3.5 0 1 0 36 15.5A3.5 3.5 0 1 0 36 8.5Z"
                            ></path>
                          </svg>
                        </a>
                      ) : (
                        displayLocation
                      )}
                      <Box
                        sx={{
                          maxHeight: "40px",
                          overflowY: "auto",
                          mt: 1,
                          whiteSpace: "normal",
                          wordBreak: "break-word",
                          fontSize: "0.8rem",
                          color: "#333",
                        }}
                      >
                        {provider.spAddress ? provider.spAddress : "N/A"}
                      </Box>
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
                      {formatDate(provider.createdAt)}
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
                      <DeleteButton
                        onClick={() => openDeleteModal(provider._id)}
                      />
                    </Box>
                  </tr>
                );
              })}
              {filteredProviders.length === 0 && (
                <tr>
                  <Box
                    component="td"
                    colSpan="10"
                    sx={{
                      textAlign: "center",
                      p: "20px",
                      background: "linear-gradient(135deg, #457b9d, #7209b7)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontSize: "1rem",
                      border: "1px solid #d3d8ff",
                    }}
                  >
                    No service providers found.
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
            mt: 4,
          }}
        >
          <Box
            component="button"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            sx={{
              p: "6px 14px",
              borderRadius: "20px",
              border: "1px solid rgb(255, 255, 255)",
              color: "#34495e",
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
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            sx={{
              p: "6px 14px",
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
              Do you really want to delete this service provider? This process
              cannot be undone.
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
                  background: "linear-gradient(135deg, #374151, #4b5563)",
                  color: "#d1d5db",
                  px: 3,
                  py: 1,
                  fontSize: "0.8rem",
                  fontWeight: "medium",
                  borderRadius: "9999px",
                  border: "2px solid transparent",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background: "linear-gradient(135deg, #4b5563, #6b7280)",
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
                  px: 3,
                  py: 1,
                  fontSize: "0.8rem",
                  fontWeight: "medium",
                  borderRadius: "9999px",
                  border: "2px solid transparent",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background: "linear-gradient(135deg, #ef4444, #f87171)",
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

export default ServiceProviderDetails;
