import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button } from '@mui/material';

const BASE_URL = process.env.REACT_APP_API_URL;

const Approvals = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [providersPerPage] = useState(5); // Adjust number of providers per page as needed

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/main/admin/service-providers/pending`)
      .then((res) => {
        setProviders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        // console.error('Error fetching service providers:', err);
        setLoading(false);
      });
  }, []);

  const handleApprove = (id) => {
    const isConfirmed = window.confirm('Are you sure you want to approve this service provider?');
    if (isConfirmed) {
      axios
        .post(`${BASE_URL}/api/main/admin/service-providers/approve/${id}`)
        .then((res) => {
          setProviders((prev) => prev.filter((provider) => provider._id !== id));
        })
        .catch((err) => console.error('Error approving provider:', err));
    }
  };

  const handleReject = (id) => {
    const isConfirmed = window.confirm('Are you sure you want to reject this service provider?');
    if (isConfirmed) {
      axios
        .post(`${BASE_URL}/api/main/admin/service-providers/reject/${id}`)
        .then((res) => {
          setProviders((prev) => prev.filter((provider) => provider._id !== id));
        })
        .catch((err) => console.error('Error rejecting provider:', err));
    }
  };

  // Pagination logic
  const indexOfLastProvider = currentPage * providersPerPage;
  const indexOfFirstProvider = indexOfLastProvider - providersPerPage;
  const currentProviders = providers.slice(indexOfFirstProvider, indexOfLastProvider);
  const totalPages = Math.ceil(providers.length / providersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Box
      sx={{
        minHeight: '100vh',
       
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
          Pending Service Provider Approvals
        </Box>

        {loading ? (
          <Box
            sx={{
              fontSize: '1rem',
              textAlign: 'center',
              background: 'linear-gradient(135deg, #34495e, #4a5568)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Loading...
          </Box>
        ) : providers.length === 0 ? (
          <Box
            sx={{
              textAlign: 'center',
              mt: '40px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box
              component="img"
              src="https://cdn-icons-png.flaticon.com/512/190/190411.png"
              alt="All approved"
              sx={{ width: '120px', opacity: 0.6 }}
            />
            <Box
              component="h5"
              sx={{
                mt: '16px',
                fontSize: '1.2rem',
                background: 'linear-gradient(135deg, #34495e, #4a5568)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              All service providers are approved!
            </Box>
          </Box>
        ) : (
          <>
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
                    background: 'linear-gradient(135deg, #2a9d8f,rgb(98, 187, 178))',
                    color: '#fff',
                  }}
                >
                  <tr>
                    {[
                      'Sl. No',
                      'Name',
                      'Email',
                      'Phone',
                      'Designation',
                      'Shop Name',
                      'Address',
                      'Actions',
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
                    ))}
                  </tr>
                </Box>
                <Box component="tbody">
                  {currentProviders.map((provider, index) => (
                    <Box
                      component="tr"
                      key={provider._id}
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
                        {indexOfFirstProvider + index + 1}
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
                        {provider.name}
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
                        {provider.email}
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
                        {provider.phone}
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
                        {provider.designation}
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
                        {provider.shopName}
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
                        {provider.spAddress}
                      </Box>
                      <Box
                        component="td"
                        sx={{
                          p: '12px',
                          fontSize: '0.9rem',
                          textAlign: 'center',
                          // border: '1px solid #d3d8ff',
                          display: 'flex',
                          justifyContent: 'center',
                          gap: '8px',
                        }}
                      >
                        <Button
                          onClick={() => handleApprove(provider._id)}
                          sx={{
                            p: '6px 12px',
                            fontSize: '0.8rem',
                            fontWeight: 'medium',
                            borderRadius: '6px',
                            border: '2px solid #e0e7ff',
                            background: 'rgb(71, 212, 205)',
                            color: 'white',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              background: 'white',
                              transform: 'scale(1.05)',
                              border: '2px solid rgb(71, 212, 205)',
                              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                              color: 'rgb(71, 212, 205)',
                            },
                          }}
                        >
                          Approve
                        </Button>
                        <Button
                          onClick={() => handleReject(provider._id)}
                          sx={{
                            p: '6px 12px',
                            fontSize: '0.8rem',
                            fontWeight: 'medium',
                            borderRadius: '6px',
                            border: '1px solid rgb(248, 113, 113)',
                            background: 'white',
                            color: 'rgb(243, 100, 100)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              background: 'linear-gradient(135deg,rgb(250, 11, 11), #ffffff)',
                              transform: 'scale(1.05)',
                              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                              color: 'white',
                            },
                          }}
                        >
                          Reject
                        </Button>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
            {providers.length > 0 && (
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
          </>
        )}
      </Box>
    </Box>
  );
};

export default Approvals;