import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, IconButton } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { styled } from '@mui/material/styles';

const BASE_URL = process.env.REACT_APP_API_URL;

// Styled FilterToggleButton (aligned with ServiceProviderDetails and BookingDetails)
const FilterToggleButton = styled(IconButton)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.down('lg')]: {
    display: 'block',
    color: '#1abc9c',
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: 'rgba(26, 188, 156, 0.1)',
    },
  },
}));

const RevenuePage = () => {
  const [revenueData, setRevenueData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false); // State for toggling date filters
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/main/admin/revenue`);
        const flatData = response.data.flat().reverse();
        setRevenueData(flatData);
        setFilteredData(flatData);
      } catch (error) {
        console.error('Error fetching revenue data:', error);
      }
    };
    fetchRevenue();
  }, []);

  useEffect(() => {
    // Filter by search query
    let filtered = revenueData.filter((booking) => {
      const bookingDate = formatDate(booking.date).toLowerCase();
      const search = searchQuery.toLowerCase().trim();
      return (
        (booking._id || '').toLowerCase().includes(search) ||
        (booking.parlorEmail || 'n/a').toLowerCase().includes(search) ||
        (booking.name || booking.user?.name || 'n/a').toLowerCase().includes(search) ||
        bookingDate.includes(search) ||
        (booking.amount || 0).toString().includes(search)
      );
    });

    // Apply date filter if fromDate and toDate are set
    if (fromDate || toDate) {
      filtered = filtered.filter((booking) => {
        if (!booking.date) return false;
        try {
          const bookingDate = new Date(booking.date);
          if (isNaN(bookingDate.getTime())) return false;
          const from = fromDate ? new Date(fromDate) : null;
          const to = toDate ? new Date(toDate) : null;
          if (to) to.setHours(23, 59, 59, 999);
          if (from && to) {
            return bookingDate >= from && bookingDate <= to;
          } else if (from) {
            return bookingDate >= from;
          } else if (to) {
            return bookingDate <= to;
          }
          return true;
        } catch (error) {
          console.warn(`Invalid date for booking ${booking._id}:`, booking.date);
          return false;
        }
      });
    }

    setFilteredData(filtered);
    setCurrentPage(1);
  }, [searchQuery, revenueData, fromDate, toDate]);

  const clearFilter = () => {
    setFromDate('');
    setToDate('');
    setSearchQuery('');
    setFilteredData(revenueData);
    setCurrentPage(1);
    setShowFilters(false); // Hide date filters on clear
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Invalid Date';
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    } catch (error) {
      console.warn(`Invalid date format: ${dateString}`);
      return 'Invalid Date';
    }
  };

  const totalAmount = filteredData.reduce((sum, booking) => sum + (booking.amount || 0), 0);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleToggleFilters = () => {
    setShowFilters((prev) => !prev);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        p: { xs: '20px 10px', sm: '20px' },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '1200px',
          background: 'linear-gradient(135deg, #f0f4f8, #e0e7ff)',
          borderRadius: '12px',
          p: '20px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          margin: '0 auto',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: '20px',
            gap: '20px',
          }}
        >
          <Box
            component="h2"
            sx={{
              fontSize: { xs: '1.5rem', sm: '1.8rem' },
              background: 'linear-gradient(135deg, #2c3e50, #34495e)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              m: 0,
              textAlign: 'center',
            }}
          >
            Revenue Report
          </Box>
          <Box
            component="h5"
            sx={{
              fontSize: '1rem',
              background: 'linear-gradient(135deg, #34495e, #4a5568)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              m: 0,
              textAlign: 'center',
            }}
          >
            Total Revenue: ₹{totalAmount}
          </Box>
          <Box
            sx={{
              width: '100%',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row', lg: 'row' },
                flexWrap: { sm: 'wrap' },
                justifyContent: 'center',
                alignItems: 'center',
                gap: { xs: 2, sm: 3 },
                width: '100%',
              }}
            >
              {/* Mobile view: Search bar with toggle button */}
              <Box
                sx={{
                  display: { xs: 'flex', lg: 'none' }, // Show search with toggle below 1024px
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 1,
                  width: '100%',
                  maxWidth: { xs: '100%', sm: '400px' },
                }}
              >
                <Box
                  component="input"
                  type="text"
                  placeholder="Search by email, user, date..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  sx={{
                    p: '8px',
                    borderRadius: '6px',
                    border: '1px solid #e0e7ff',
                    background: 'linear-gradient(135deg, #ffffff, #edf2f7)',
                    fontSize: '0.9rem',
                    width: '100%',
                    maxWidth: { xs: '100%', sm: '200px' },
                    color: '#2d3436',
                    textAlign: 'center',
                  }}
                />
                <FilterToggleButton onClick={handleToggleFilters}>
                  <FilterListIcon />
                </FilterToggleButton>
              </Box>
              <Box
                component="span"
                sx={{
                  fontSize: '1rem',
                  background: 'linear-gradient(135deg, #34495e, #4a5568)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mt: { xs: 0, sm: '25px' },
                  textAlign: 'center',
                }}
              >
                Total Records: <strong>{filteredData.length}</strong>
              </Box>
              {/* Filters: Always show on lg and above, toggle date filters on smaller screens */}
              <Box
                sx={{
                  display: { xs: showFilters ? 'flex' : 'none', lg: 'flex' }, // Toggle date filters on xs, always show on lg
                  flexDirection: { xs: 'column', sm: 'row' },
                  flexWrap: { sm: 'wrap' },
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: { xs: 2, sm: 3 },
                  width: '100%',
                }}
              >
                <Box
                  component="input"
                  type="text"
                  placeholder="Search by email, user, date..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  sx={{
                    p: '8px',
                    borderRadius: '6px',
                    border: '1px solid #e0e7ff',
                    background: 'linear-gradient(135deg, #ffffff, #edf2f7)',
                    fontSize: '0.9rem',
                    width: { xs: '100%', sm: '200px' },
                    maxWidth: '200px',
                    color: '#2d3436',
                    mt: { xs: 0, sm: '25px' },
                    textAlign: 'center',
                    display: { xs: 'none', lg: 'block' }, // Hide on xs, show on lg
                  }}
                />
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: { xs: '100%', sm: 'auto' },
                    gap: 2,
                    justifyContent: 'center',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      width: { xs: '50%', sm: 'auto' },
                    }}
                  >
                    <Box
                      component="label"
                      htmlFor="fromDate"
                      sx={{
                        fontSize: '0.9rem',
                        background: 'linear-gradient(135deg, #34495e, #4a5568)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        mb: '4px',
                        textAlign: 'center',
                        zIndex: 3,
                      }}
                    >
                      From Date
                    </Box>
                    <Box
                      component="input"
                      id="fromDate"
                      type="date"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                      sx={{
                        p: '8px',
                        borderRadius: '6px',
                        border: '1px solid #e0e7ff',
                        background: 'linear-gradient(135deg, #ffffff, #edf2f7)',
                        fontSize: '0.9rem',
                        width: '100%',
                        maxWidth: { xs: '150px', sm: '200px' },
                        textAlign: 'center',
                        color: '#2d3436',
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      width: { xs: '50%', sm: 'auto' },
                    }}
                  >
                    <Box
                      component="label"
                      htmlFor="toDate"
                      sx={{
                        fontSize: '0.9rem',
                        background: 'linear-gradient(135deg, #34495e, #4a5568)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        mb: '4px',
                        textAlign: 'center',
                        zIndex: 3,
                      }}
                    >
                      To Date
                    </Box>
                    <Box
                      component="input"
                      id="toDate"
                      type="date"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                      min={fromDate || undefined}
                      max={new Date().toISOString().split('T')[0]}
                      sx={{
                        p: '8px',
                        borderRadius: '6px',
                        border: '1px solid #e0e7ff',
                        background: 'linear-gradient(135deg, #ffffff, #edf2f7)',
                        fontSize: '0.9rem',
                        width: '100%',
                        maxWidth: { xs: '150px', sm: '200px' },
                        textAlign: 'center',
                        color: '#2d3436',
                      }}
                    />
                  </Box>
                </Box>
                <Box
                  component="button"
                  onClick={clearFilter}
                  disabled={!searchQuery && !fromDate && !toDate}
                  className="text-white"
                  sx={{
                    p: '8px 16px',
                    borderRadius: '6px',
                    border: '1px solid rgb(252, 252, 252)',
                    bgcolor: 'rgb(86,176,167)',
                    fontSize: '0.9rem',
                    fontWeight: 'medium',
                    cursor: !searchQuery && !fromDate && !toDate ? 'not-allowed' : 'pointer',
                    mt: { xs: 0, sm: '25px' },
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      ...(searchQuery || fromDate || toDate
                        ? {
                            bgcolor: 'linear-gradient(135deg, #2563eb, #3b82f6)',
                            transform: 'scale(1.05)',
                            boxShadow: '0 4px 12px rgb(9, 66, 255)',
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

        <Box sx={{ overflowX: 'auto', width: '100%' }}>
          <Box
            component="table"
            sx={{
              width: '100%',
              borderCollapse: 'collapse',
              background: 'linear-gradient(135deg, #ffffff, #ffffff)',
              borderRadius: '8px',
              overflow: 'hidden',
            }}
          >
            <Box
              component="thead"
              sx={{ background: 'linear-gradient(135deg, #2a9d8f, rgb(98, 187, 178))', color: '#fff' }}
            >
              <tr>
                {['#', 'Booking ID', 'Shop Email', 'User', 'Date', 'Amount'].map((header, idx) => (
                  <Box
                    component="th"
                    key={idx}
                    sx={{
                      p: '12px',
                      textAlign: 'center',
                      fontSize: '0.9rem',
                      border: '1px solid #d3d8ff',
                    }}
                  >
                    {header}
                  </Box>
                ))}
              </tr>
            </Box>
            <Box component="tbody">
              {currentItems.length > 0 ? (
                currentItems.map((booking, index) => (
                  <Box component="tr" key={booking._id || index} sx={{ borderBottom: '1px solid #d3d8ff' }}>
                    <Box
                      component="td"
                      sx={{ p: '12px', fontSize: '0.9rem', textAlign: 'center', border: '1px solid #d3d8ff' }}
                    >
                      {indexOfFirstItem + index + 1}
                    </Box>
                    <Box
                      component="td"
                      sx={{ p: '12px', fontSize: '0.9rem', textAlign: 'center', border: '1px solid #d3d8ff' }}
                    >
                      {booking._id || 'N/A'}
                    </Box>
                    <Box
                      component="td"
                      sx={{ p: '12px', fontSize: '0.9rem', textAlign: 'center', border: '1px solid #d3d8ff' }}
                    >
                      {booking.parlorEmail || 'N/A'}
                    </Box>
                    <Box
                      component="td"
                      sx={{ p: '12px', fontSize: '0.9rem', textAlign: 'center', border: '1px solid #d3d8ff' }}
                    >
                      {booking.name || booking.user?.name || 'N/A'}
                    </Box>
                    <Box
                      component="td"
                      sx={{ p: '12px', fontSize: '0.9rem', textAlign: 'center', border: '1px solid #d3d8ff' }}
                    >
                      {formatDate(booking.date)}
                    </Box>
                    <Box
                      component="td"
                      sx={{ p: '12px', fontSize: '0.9rem', textAlign: 'center', border: '1px solid #d3d8ff' }}
                    >
                      ₹{booking.amount || 0}
                    </Box>
                  </Box>
                ))
              ) : (
                <Box component="tr">
                  <Box
                    component="td"
                    colSpan="6"
                    sx={{
                      textAlign: 'center',
                      p: '20px',
                      background: 'linear-gradient(135deg, #457b9d, #7209b7)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      fontSize: '1rem',
                      border: '1px solid #d3d8ff',
                    }}
                  >
                    No revenue data available
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </Box>

        {filteredData.length > itemsPerPage && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 2,
              mt: 4,
            }}
          >
            <Box
              component="button"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              sx={{
                p: '6px 14px',
                borderRadius: '20px',
                border: '1px solid rgb(255, 255, 255)',
                color: '#34495e',
                fontSize: '0.8rem',
                fontWeight: 'medium',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
                background: 'rgb(229, 229, 230)',
                '&:hover': {
                  ...(currentPage !== 1
                    ? {
                        background: 'linear-gradient(135deg, #34495e, #4a5568)',
                        color: '#ffffff',
                        transform: 'scale(1.05)',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
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
                fontSize: '0.9rem',
                background: 'linear-gradient(135deg, #34495e, #4a5568)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Page {currentPage} of {totalPages}
            </Box>
            <Box
              component="button"
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              sx={{
                p: '6px 14px',
                borderRadius: '20px',
                border: '1px solid rgb(255, 255, 255)',
                color: 'rgb(50, 70, 90)',
                fontSize: '0.8rem',
                fontWeight: 'medium',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                background: 'rgb(229, 229, 230)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.37)',
                '&:hover': {
                  ...(currentPage !== totalPages
                    ? {
                        background: 'linear-gradient(135deg, #34495e, #4a5568)',
                        color: '#ffffff',
                        transform: 'scale(1.05)',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                      }
                    : {}),
                },
              }}
            >
              Next
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default RevenuePage;