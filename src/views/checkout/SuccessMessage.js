import React from 'react';
import { Typography, Button, Box } from '@mui/material';

const SuccessMessage = () => (
    <Box textAlign="center" mt={5}>
        <img src="https://img.icons8.com/fluency/96/checked.png" alt="Success" />
        <Typography variant="h4" mt={2}>
            Your order has been placed successfully
        </Typography>
        <Typography variant="body2" mt={1}>
            Thank you for choosing us! Invoice has been sent to your email.
        </Typography>
        <Button variant="contained" sx={{ mt: 3 }}>
            Continue Shopping
        </Button>
    </Box>
);

export default SuccessMessage;
