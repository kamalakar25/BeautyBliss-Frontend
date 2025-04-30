import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, IconButton } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { styled } from '@mui/material/styles';

const BASE_URL = process.env.REACT_APP_API_URL;

// Styled FilterToggleButton (aligned with ServiceProviderDetails)
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

const BookingDetails = () => {
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [bookingDateFilter, setBookingDateFilter] = useState('');
    const [showFilters, setShowFilters] = useState(false); // State for toggling date and clear filters
    const itemsPerPage = 5;

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/users/all/bookings`);
                const data = Array.isArray(response.data) ? response.data : response.data.bookings || [];
                setBookings(data);
                setFilteredBookings(data);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);

    useEffect(() => {
        let filtered = bookings;

        // Search filter
        if (searchQuery.trim()) {
            filtered = filtered.filter(b =>
                b._id?.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
                b.name?.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
                b.service?.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
                (Array.isArray(b.relatedServices) && b.relatedServices.some(rs => rs.toLowerCase().includes(searchQuery.trim().toLowerCase()))) ||
                b.amount?.toString().includes(searchQuery.trim().toLowerCase()) ||
                b.date?.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
                b.time?.toLowerCase().includes(searchQuery.trim().toLowerCase())
            );
        }

        // Booking date filter
        if (bookingDateFilter) {
            filtered = filtered.filter((booking) => {
                if (!booking.date) return false;
                try {
                    const bookingDate = new Date(booking.date);
                    if (isNaN(bookingDate.getTime())) return false;
                    const filterDate = new Date(bookingDateFilter);
                    return (
                        bookingDate.getFullYear() === filterDate.getFullYear() &&
                        bookingDate.getMonth() === filterDate.getMonth() &&
                        bookingDate.getDate() === filterDate.getDate()
                    );
                } catch (error) {
                    console.warn(`Invalid date for booking ${booking._id}:`, booking.date);
                    return false;
                }
            });
        }

        setFilteredBookings(filtered);
        setCurrentPage(1); // Reset to first page after filtering
    }, [searchQuery, bookingDateFilter, bookings]);

    const handleClearFilters = () => {
        setSearchQuery('');
        setBookingDateFilter('');
        setFilteredBookings(bookings);
        setCurrentPage(1);
        setShowFilters(false); // Hide date and clear filters on clear
    };

    // Function to format date to dd/mm/yyyy
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

    const handleToggleFilters = () => {
        setShowFilters((prev) => !prev);
    };

    const reversedBookings = [...filteredBookings].reverse();
    const indexOfLastBooking = currentPage * itemsPerPage;
    const indexOfFirstBooking = indexOfLastBooking - itemsPerPage;
    const currentBookings = reversedBookings.slice(indexOfFirstBooking, indexOfLastBooking);
    const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
                        Booking Details
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
                                    placeholder="Search by ID, name, service..."
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
                                Total Bookings: <strong>{filteredBookings.length}</strong>
                            </Box>
                            {/* Filters: Always show on lg and above, toggle date filter on smaller screens */}
                            <Box
                                sx={{
                                    display: { xs: showFilters ? 'flex' : 'none', lg: 'flex' }, // Toggle date filter on xs, always show on lg
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
                                    placeholder="Search by ID, name, service..."
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
                                            htmlFor="bookingDate"
                                            sx={{
                                                fontSize: '0.9rem',
                                                background: 'linear-gradient(135deg, #34495e, #4a5568)',
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent',
                                                mb: '4px',
                                                zIndex: 3,
                                                textAlign: 'center',
                                            }}
                                        >
                                            Booking Date
                                        </Box>
                                        <Box
                                            component="input"
                                            id="bookingDate"
                                            type="date"
                                            value={bookingDateFilter}
                                            onChange={(e) => setBookingDateFilter(e.target.value)}
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
                                    onClick={handleClearFilters}
                                    disabled={!searchQuery && !bookingDateFilter}
                                    className="text-white"
                                    sx={{
                                        p: '8px 16px',
                                        borderRadius: '6px',
                                        border: '1px solid rgb(252, 252, 252)',
                                        bgcolor: 'rgb(86,176,167)',
                                        fontSize: '0.9rem',
                                        fontWeight: 'medium',
                                        cursor: !searchQuery && !bookingDateFilter ? 'not-allowed' : 'pointer',
                                        mt: { xs: 0, sm: '25px' },
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            ...(searchQuery || bookingDateFilter
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
                        <Box component="thead" sx={{ background: 'linear-gradient(135deg, #2a9d8f, #457b9d)', color: '#fff' }}>
                            <tr>
                                {['#', 'Booking ID', 'Name', 'Booking Slot Date & Time', 'Service', 'Related Services', 'Amount'].map((header, idx) => (
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
                            {loading ? (
                                <Box component="tr">
                                    <Box
                                        component="td"
                                        colSpan="7"
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
                                        Loading bookings...
                                    </Box>
                                </Box>
                            ) : currentBookings.length === 0 ? (
                                <Box component="tr">
                                    <Box
                                        component="td"
                                        colSpan="7"
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
                                        No bookings available.
                                    </Box>
                                </Box>
                            ) : (
                                currentBookings.map((booking, index) => (
                                    <Box component="tr" key={booking._id || index}>
                                        <Box
                                            component="td"
                                            sx={{
                                                p: '12px',
                                                fontSize: '0.9rem',
                                                textAlign: 'center',
                                                border: '1px solid #d3d8ff',
                                            }}
                                        >
                                            {indexOfFirstBooking + index + 1}
                                        </Box>
                                        <Box
                                            component="td"
                                            sx={{
                                                p: '12px',
                                                fontSize: '0.9rem',
                                                textAlign: 'center',
                                                border: '1px solid #d3d8ff',
                                            }}
                                        >
                                            {booking._id || 'N/A'}
                                        </Box>
                                        <Box
                                            component="td"
                                            sx={{
                                                p: '12px',
                                                fontSize: '0.9rem',
                                                textAlign: 'center',
                                                border: '1px solid #d3d8ff',
                                            }}
                                        >
                                            {booking.name || 'N/A'}
                                        </Box>
                                        <Box
                                            component="td"
                                            sx={{
                                                p: '12px',
                                                fontSize: '0.9rem',
                                                textAlign: 'center',
                                                border: '1px solid #d3d8ff',
                                            }}
                                        >
                                            {formatDate(booking.date)} {booking.time ? `& ${booking.time}` : ''}
                                        </Box>
                                        <Box
                                            component="td"
                                            sx={{
                                                p: '12px',
                                                fontSize: '0.9rem',
                                                textAlign: 'center',
                                                border: '1px solid #d3d8ff',
                                            }}
                                        >
                                            {booking.service || 'N/A'}
                                        </Box>
                                        <Box
                                            component="td"
                                            sx={{
                                                p: '12px',
                                                fontSize: '0.9rem',
                                                textAlign: 'center',
                                                border: '1px solid #d3d8ff',
                                            }}
                                        >
                                            {Array.isArray(booking.relatedServices) ? booking.relatedServices.join(', ') : 'N/A'}
                                        </Box>
                                        <Box
                                            component="td"
                                            sx={{
                                                p: '12px',
                                                fontSize: '0.9rem',
                                                textAlign: 'center',
                                                border: '1px solid #d3d8ff',
                                            }}
                                        >
                                            {booking.amount || 'N/A'}
                                        </Box>
                                    </Box>
                                ))
                            )}
                        </Box>
                    </Box>
                </Box>

                {filteredBookings.length > itemsPerPage && (
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

export default BookingDetails;