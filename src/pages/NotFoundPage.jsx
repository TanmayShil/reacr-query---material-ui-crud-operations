// src/pages/NotFoundPage.jsx
import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import Lottie from 'lottie-react';
import animationData from '../json/lottie/404.json';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundColor: '#f5f5f5',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                p: 3,
            }}
        >
            <Box sx={{ width: 300, mb: 2 }}>
                <Lottie animationData={animationData} loop autoplay />
            </Box>
            <Typography variant="h4" gutterBottom>
                Oops! Page not found
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={3}>
                The page you're looking for doesn't exist.
            </Typography>
            <Button variant="contained" onClick={() => navigate(-1)}>
                Go Back
            </Button>
        </Box>
    );
};

export default NotFoundPage;
