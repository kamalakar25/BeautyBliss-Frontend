import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box } from '@mui/material';

const BASE_URL = process.env.REACT_APP_API_URL;

const Complaints = () => {
  const [userComplaints, setUserComplaints] = useState([]);
  const [spComplaints, setSpComplaints] = useState([]);
  const [activeView, setActiveView] = useState('user'); // Default to user complaints
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/users/get/all/complaints`);
        setUserComplaints(res.data.userComplaints || []);
        setSpComplaints(res.data.spComplaints || []);
      } catch (err) {
        // console.error('Error fetching complaints:', err);
      }
    };

    fetchComplaints();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return '';
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    } catch (error) {
      // console.warn(`Invalid date format: ${dateString}`);
      return '';
    }
  };

  // Pagination logic
  const dataToDisplay = activeView === 'user' ? userComplaints : spComplaints;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dataToDisplay.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(dataToDisplay.length / itemsPerPage) || 1; // Ensure at least 1 page

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #e0e7ff, #f0f4f8)',
        p: { xs: '20px 10px', sm: '20px' },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mt: '100px',
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
          component="h2"
          sx={{
            fontSize: { xs: '1.5rem', sm: '1.8rem' },
            background: 'linear-gradient(135deg, #2c3e50, #34495e)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            m: 0,
            textAlign: 'center',
            mb: '20px',
          }}
        >
          Complaints Overview
        </Box>

        {/* Toggle Buttons */}
        <Box
          sx={{
            mb: '20px',
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: '16px',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Box
            component="button"
            onClick={() => {
              setActiveView('user');
              setCurrentPage(1);
            }}
            sx={{
              p: '8px 16px',
              fontSize: '0.9rem',
              fontWeight: 'medium',
              minWidth: '120px',
              borderRadius: '6px',
              bgcolor: 'rgb(54,142,149)',
              boxShadow: '0 0px 4px rgba(0, 0, 0, 0.8)',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              width: { xs: '100%', sm: 'auto' },
              maxWidth: { xs: '200px', sm: 'none' },
              '&:hover': {
                bgcolor: "rgb(255, 255, 255)",
                color: "rgb(54,142,149)",
                border: '2px solid rgb(54,142,149)',
              },
            }}
          >
            User Complaints
          </Box>
          <Box
            component="button"
            onClick={() => {
              setActiveView('sp');
              setCurrentPage(1);
            }}
            sx={{
              p: '8px 16px',
              fontSize: '0.9rem',
              fontWeight: 'medium',
              minWidth: '120px',
              borderRadius: '6px',
              bgcolor: 'white',
              boxShadow: '0 0px 4px rgba(0, 0, 0, 0.8)',
              color: "rgb(54,142,149)",
              border: '2px solid rgb(54,142,149)',
              cursor: 'pointer',
              width: { xs: '100%', sm: 'auto' },
              maxWidth: { xs: '200px', sm: 'none' },
              '&:hover': {
                bgcolor: 'rgb(54,142,149)',
                color: '#fff',
              },
            }}
          >
            SP Complaints
          </Box>
        </Box>

        {/* Complaints Table */}
        <Box sx={{ overflowX: 'auto', width: '100%' }}>
          <Box
            component="table"
            sx={{
              width: '100%',
              borderCollapse: 'collapse',
              background: 'linear-gradient(135deg, rgb(255, 255, 255), rgb(255, 255, 255))',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            }}
          >
            <Box
              component="thead"
              sx={{
                background: 'linear-gradient(135deg, #2a9d8f,  #457b9d)',
                color: '#fff',
              }}
            >
              <tr>
                {activeView === 'user'
                  ? [
                      '#',
                      'Customer Email',
                      'SP Email',
                      'Shop/Clinic Name',
                      'Complaint',
                      'Date',
                      'Service',
                    ].map((header, idx) => (
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
                    ))
                  : ['#', 'SP Email', 'Customer Email', 'Complaint', 'Date', 'Service'].map(
                      (header, idx) => (
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
                      )
                    )}
              </tr>
            </Box>
            <Box component="tbody">
              {currentItems.length > 0 ? (
                currentItems.map((c, index) => (
                  <Box
                    component="tr"
                    key={index}
                    sx={{ borderBottom: '1px solid #d3d8ff' }}
                  >
                    <Box
                      component="td"
                      sx={{
                        p: '12px',
                        fontSize: '0.9rem',
                        textAlign: 'center',
                        border: '1px solid #d3d8ff',
                      }}
                    >
                      {indexOfFirstItem + index + 1}
                    </Box>
                    {activeView === 'user' ? (
                      <>
                        <Box
                          component="td"
                          sx={{
                            p: '12px',
                            fontSize: '0.9rem',
                            textAlign: 'center',
                            border: '1px solid #d3d8ff',
                          }}
                        >
                          {c.email}
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
                          {c.parlorEmail}
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
                          {c.parlorName}
                        </Box>
                        <Box
                          component="td"
                          sx={{
                            p: '12px',
                            fontSize: '0.9rem',
                            textAlign: 'center',
                            border: '1px solid #d3d8ff',
                            background: '#f05d6a',
                          }}
                        >
                          <span
                            style={{
                              // background: '#dc3545',
                              color: '#fff',
                              padding: '4px 8px',
                              borderRadius: '4px',
                              
                            }}
                          >
                            {c.complaint}
                          </span>
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
                          {formatDate(c.date)}
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
                          {c.service}
                        </Box>
                      </>
                    ) : (
                      <>
                        <Box
                          component="td"
                          sx={{
                            p: '12px',
                            fontSize: '0.9rem',
                            textAlign: 'center',
                            border: '1px solid #d3d8ff',
                          }}
                        >
                          {c.email}
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
                          {c.userEmail}
                        </Box>
                        <Box
                          component="td"
                          sx={{
                            p: '12px',
                            fontSize: '0.9rem',
                            textAlign: 'center',
                            border: '1px solid #d3d8ff',
                            background: '#f05d6a',
                          }}
                        >
                          <span
                            style={{
                             
                              color: '#fff',
                              padding: '4px 8px',
                              borderRadius: '4px',
                            }}
                          >
                            {c.complaint}
                          </span>
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
                          {formatDate(c.date)}
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
                          {c.service}
                        </Box>
                      </>
                    )}
                  </Box>
                ))
              ) : (
                <Box component="tr">
                  <Box
                    component="td"
                    colSpan={activeView === 'user' ? 7 : 6}
                    sx={{
                      textAlign: 'center',
                      p: '20px',
                      background: 'linear-gradient(135deg, #457b9d, #457b9d)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      fontSize: '1rem',
                      border: '1px solid #d3d8ff',
                    }}
                  >
                    No {activeView === 'user' ? 'user' : 'service provider'} complaints available
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </Box>

        {/* Pagination */}
        {dataToDisplay.length > 0 && (
          <Box
            sx={{
              mt: '20px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '10px',
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
                fontSize: '16px',
                fontWeight: '500',
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

export default Complaints;