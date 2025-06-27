import React, { useState } from 'react';
import { Button, Typography, RadioGroup, FormControlLabel, Radio, Box, Stack, Alert } from '@mui/material';
import { ArrowBackIos, Mastercard, PayPal } from '@mui/icons-material';
import { deliveryTime } from 'store/constant';

const PaymentOptions = ({ onNext, onBack }) => {
    const [value, setValue] = useState('standard');

    const isAfterSixPM = () => {
        debugger;
        const currentTime = new Date();
        const currentHour = currentTime.getHours();
        return currentHour >= 18 || currentHour < 10;
        // return currentHour >= 18; // 18 corresponds to 6 PM in 24-hour format
    };

    return (
        <Box>
            <Typography variant="h4" align="center" mb={3}>
                Select Delivery Options
            </Typography>
            <RadioGroup value={value} onChange={(e) => setValue(e.target.value)}>
                <FormControlLabel value="standard" control={<Radio />} label="Standard Delivery (Free)" />
                <Typography ml={4} variant="body2" color="textSecondary">
                    {deliveryTime}
                    {/* 10 AM – 12 PM / 4 PM – 6 PM */}
                </Typography>
                <FormControlLabel value="urgent" control={<Radio disabled={isAfterSixPM()} />} label="Urgent (Paid - $199)" />
            </RadioGroup>
            {isAfterSixPM() && (
                <Alert severity="warning" color="warning" sx={{ mt: 2, maxWidth: '760px', backgroundColor: '#FFF4E5' }}>
                    We recommend selecting Standard Delivery for orders placed after 6 PM. Urgent delivery may not be available.
                </Alert>
            )}
            {/* <Stack direction="row" spacing={2} mt={4} display="flex" justifyContent="flex-end">
                <Button
                    variant="outlined"
                    onClick={onBack}
                    type="submit"
                    startIcon={<ArrowBackIos />}
                    sx={{
                        px: 5,
                        py: 1.5,
                        // backgroundColor: '#5E60CE',
                        color: '#3a0ca3',
                        borderRadius: '30px',
                        textTransform: 'none',
                        fontWeight: 'bold'
                        // border: '1px solid #3a0ca3',
                        // '&:hover': {
                        //     backgroundColor: ' #3a0ca3'
                        // }
                    }}
                >
                    Back
                </Button>

                <Button
                    onClick={onNext}
                    type="submit"
                    variant="contained"
                    sx={{
                        px: 5,
                        py: 1.5,
                        backgroundColor: '#5E60CE',
                        color: '#fff',
                        borderRadius: '30px',
                        textTransform: 'none',
                        fontWeight: 'bold',
                        border: '1px solid #3a0ca3',
                        '&:hover': {
                            backgroundColor: ' #3a0ca3'
                        }
                    }}
                >
                    Confirm
                </Button>
            </Stack> */}
            <Stack direction="row" spacing={2} mt={4} justifyContent="flex-end">
                <Button
                    variant="outlined"
                    onClick={onBack}
                    startIcon={<ArrowBackIos />}
                    sx={{
                        px: 4,
                        // py: 1.5,
                        // backgroundColor: '#5E60CE',
                        color: '#3a0ca3',
                        // borderRadius: '30px',
                        textTransform: 'none',
                        fontWeight: 'bold',
                        border: '1px solid #3a0ca3',
                        '&:hover': {
                            border: '1px solid #3a0ca3'
                        }
                    }}
                >
                    Back
                </Button>
                <Button
                    variant="contained"
                    onClick={onNext}
                    sx={{
                        px: 4,
                        bgcolor: '#5E60CE',
                        '&:hover': { bgcolor: '#4EA8DE' },
                        border: '1px solid #3a0ca3',
                        '&:hover': {
                            backgroundColor: ' #3a0ca3'
                        }
                    }}
                >
                    Confirm Order
                </Button>
            </Stack>
        </Box>
    );
};

export default PaymentOptions;
