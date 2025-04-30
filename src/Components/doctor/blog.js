import React, { useState } from 'react';
import {
  Container, Card, CardMedia, CardContent, Typography,
  Box, Chip, Modal, Button
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';

// Styled Modern Heading with new gradient
const ModernHeading = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  fontSize: '3rem',
  letterSpacing: '1.5px',
  background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textTransform: 'uppercase',
  padding: '0.8rem 2rem',
  borderRadius: '15px',
  display: 'inline-block',
  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
  transition: 'transform 0.4s ease, box-shadow 0.4s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.2)',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '2rem',
    padding: '0.6rem 1.5rem',
  },
}));

// Modal style
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: '80%', md: '70%', lg: '60%' },
  maxWidth: 800,
  bgcolor: 'background.paper',
  borderRadius: '25px',
  boxShadow: 24,
  p: 4,
  outline: 'none',
  maxHeight: '90vh',
  overflowY: 'auto',
};

// Blog data with expanded descriptions
const blogPosts = [
  {
    id: 1,
    title: 'Top Hair Care Tips by Experts',
    category: 'Hair Care',
    points: [
      'Trim regularly to prevent split ends',
      'Use deep conditioning weekly',
      'Massage scalp for better circulation',
      'Limit heat styling to protect hair'
    ],
    description: "Maintaining healthy hair requires consistent care. Regular trims every 6-8 weeks prevent split ends from traveling up the hair shaft. Deep conditioning treatments restore moisture, especially for chemically treated or heat-styled hair. Scalp massages stimulate blood flow, promoting hair growth. Minimizing heat tools and using heat protectant sprays can significantly reduce damage.",
    image: 'https://img.freepik.com/free-photo/woman-doing-herself-scalp-massage_23-2151228494.jpg',
  },
  {
    id: 2,
    title: 'Dermatologist-Approved Skincare Routine',
    category: 'Skincare',
    points: [
      'Cleanse gently twice daily',
      'Moisturize to lock in hydration',
      'Apply sunscreen every morning',
      'Use serums at night for repair'
    ],
    description: "A proper skincare routine forms the foundation of healthy skin. Morning cleansing removes overnight buildup without stripping natural oils. Moisturizers help maintain the skin's moisture barrier. Daily SPF 30+ sunscreen is non-negotiable for preventing premature aging. Nighttime is ideal for active ingredients like retinol or peptides that work while you sleep.",
    image: 'https://img.freepik.com/free-photo/front-view-woman-applying-face-cream_23-2148708051.jpg',
  },
  {
    id: 3,
    title: 'Top Natural Oils for Healthy Skin',
    category: 'Skincare',
    points: [
      'Jojoba oil balances skin',
      'Argan oil hydrates deeply',
      'Rosehip oil reduces scars',
      'Coconut oil soothes irritation'
    ],
    description: "Natural oils can be powerful skincare allies. Jojoba oil closely resembles human sebum, making it ideal for all skin types. Argan oil's high vitamin E content provides deep hydration. Rosehip oil contains trans-retinoic acid to improve skin texture and reduce scarring. Coconut oil has anti-inflammatory properties but should be used cautiously on acne-prone skin.",
    image: 'https://img.freepik.com/free-photo/spa-composition-with-natural-oils_23-2148578912.jpg',
  },
  {
    id: 4,
    title: 'Best Anti-Aging Skincare Products',
    category: 'Skincare',
    points: [
      'Retinol boosts cell turnover',
      'Vitamin C brightens skin',
      'Hyaluronic acid plumps skin',
      'Peptides firm and tighten'
    ],
    description: "Effective anti-aging combines multiple actives. Retinol (vitamin A) accelerates cell renewal and collagen production. Vitamin C is a powerful antioxidant that brightens and protects against environmental damage. Hyaluronic acid can hold 1000x its weight in water for instant plumping. Peptides signal skin to produce more collagen for long-term firming effects.",
    image: 'https://img.freepik.com/free-photo/top-view-gua-sha-face-products_23-2149401501.jpg',
  },
  {
    id: 5,
    title: 'Hair Transplant: What to Expect',
    category: 'Hair Treatment',
    points: [
      'Consult with a specialist',
      'Prepare for minor surgery',
      'Recover in 7–10 days',
      'See results in 6–12 months'
    ],
    description: "Hair transplantation has become a refined procedure. The consultation evaluates donor hair availability and sets realistic expectations. Modern FUE techniques extract individual follicles for natural-looking results. Initial recovery involves minor scabbing that heals within days. Transplanted hairs shed before regrowing permanently, with full results visible after a year.",
    image: 'https://img.freepik.com/free-photo/man-getting-hair-loss-treatment_23-2149152760.jpg',
  },
  {
    id: 6,
    title: 'Foods That Boost Hair and Skin Health',
    category: 'Nutrition',
    points: [
      'Eat fatty fish for omega-3s',
      'Add nuts for vitamin E',
      'Include greens for antioxidants',
      'Avocados support skin hydration'
    ],
    description: "Nutrition significantly impacts hair and skin quality. Omega-3 fatty acids in salmon reduce inflammation that can trigger hair loss. Almonds provide vitamin E to protect skin from oxidative stress. Dark leafy greens deliver antioxidants like lutein for skin elasticity. Avocados offer healthy fats and vitamin C for collagen synthesis and hydration.",
    image: 'https://img.freepik.com/free-photo/flat-lay-delicious-food-arrangement_23-2149235837.jpg',
  }
];

// Single card style for uniformity with updated colors
const cardStyle = {
  sx: {
    borderRadius: '25px',
    background: 'linear-gradient(135deg, #f0f9f7 0%, #e6f7f3 100%)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.12), inset 0 0 10px rgba(255, 255, 255, 0.3)',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0 12px 35px rgba(0, 0, 0, 0.2)',
    },
    transition: 'all 0.4s ease',
    width: '100%',
    maxWidth: 400,
    minHeight: 450,
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
  },
  imageSx: {
    height: 220,
    borderRadius: '25px 25px 0 0',
    objectFit: 'cover',
    transition: 'transform 0.4s ease',
    '&:hover': { transform: 'scale(1.03)' },
  },
  contentSx: {
    flexGrow: 1,
    p: 3,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: 200,
    textAlign: 'center',
  }
};

// Blog Cards component
const BlogCardsWithDropdown = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const handleOpenModal = (post) => {
    setSelectedPost(post);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedPost(null);
  };

  return (
    <Box sx={{ 
      background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
      py: 8,
      minHeight: '100vh'
    }}>
      <Container sx={{ py: 4 }}>
        {/* Animated Modern Heading */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 8 }}>
            <ModernHeading variant="h4" align="center">
              Hair & Skincare Blog
            </ModernHeading>
          </Box>
        </motion.div>

        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }, 
          gap: 4
        }}>
          <AnimatePresence>
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
                whileHover={{ scale: 1.02 }}
                style={{ display: 'flex', justifyContent: 'center' }}
              >
                <Card
                  sx={{
                    ...cardStyle.sx,
                  }}
                  onClick={() => handleOpenModal(post)}
                >
                  <CardMedia
                    component="img"
                    sx={cardStyle.imageSx}
                    image={post.image}
                    alt={post.title}
                  />
                  <CardContent sx={cardStyle.contentSx}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                      <Chip 
                        label={post.category} 
                        size="small" 
                        sx={{ 
                          background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
                          color: '#fff',
                          fontWeight: 600,
                        }} 
                      />
                    </Box>
                    <Typography 
                      variant="h6" 
                      component="div" 
                      sx={{ 
                        fontWeight: 700, 
                        mb: 2, 
                        background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        minHeight: 60,
                      }}
                    >
                      {post.title}
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      {post.points.map((point, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: (index * 0.1) + (idx * 0.1) }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 500,
                              color: '#2c3e50',
                              fontSize: '0.95rem',
                              textAlign: 'center',
                              mb: 1,
                            }}
                          >
                            {point}
                          </Typography>
                        </motion.div>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </Box>
      </Container>

      {/* Modal for detailed view */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          {selectedPost && (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography id="modal-modal-title" variant="h5" component="h2" sx={{
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  {selectedPost.title}
                </Typography>
                <Button onClick={handleCloseModal} sx={{ minWidth: 0, p: 1 }}>
                  <CloseIcon sx={{ color: '#2c3e50' }} />
                </Button>
              </Box>
              
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
                <Box sx={{ flex: 1 }}>
                  <CardMedia
                    component="img"
                    image={selectedPost.image}
                    alt={selectedPost.title}
                    sx={{ 
                      borderRadius: '15px',
                      width: '100%',
                      maxHeight: 300,
                      objectFit: 'cover'
                    }}
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Chip 
                    label={selectedPost.category} 
                    size="medium" 
                    sx={{ 
                      background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
                      color: '#fff',
                      fontWeight: 600,
                      mb: 2
                    }} 
                  />
                  <Typography id="modal-modal-description" sx={{ 
                    mt: 2,
                    color: '#2c3e50',
                    lineHeight: 1.6,
                    mb: 2
                  }}>
                    {selectedPost.description}
                  </Typography>
                  {selectedPost.points.map((point, idx) => (
                    <Typography
                      key={idx}
                      sx={{ 
                        color: '#2c3e50',
                        lineHeight: 1.6,
                        mb: 1,
                        textAlign: 'left'
                      }}
                    >
                      {point}
                    </Typography>
                  ))}
                </Box>
              </Box>
            </>
          )}
        </Box>
      </Modal>

      <style>
        {`
          .MuiChip-root {
            background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%) !important;
            color: white !important;
          }
        `}
      </style>
    </Box>
  );
};

export default BlogCardsWithDropdown;