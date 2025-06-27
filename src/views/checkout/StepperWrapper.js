import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Container, Paper, Box, Typography, Grid, StepConnector, stepConnectorClasses } from '@mui/material';
import { LocalShipping, Payment, Reviews } from '@mui/icons-material';
import ShippingForm from './ShippingForm';
import PaymentOptions from './PaymentOptions';
import SuccessMessage from './SuccessMessage';
import ReviewOrder from './ReviewOrder';
import { styled, useTheme } from '@mui/material/styles';
import { useParams } from 'react-router';

const steps = ['Shipping', 'Payment', 'Review'];

const ColorfulConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundImage: 'linear-gradient(to right, #5E60CE, #64dfdf)',
        borderRadius: 1
    }
}));

const getIcon = (index, active, completed) => {
    const iconStyle = {
        fontSize: '2rem',
        color: completed ? '#80ed99' : active ? '#5E60CE' : '#c0c0c0'
    };

    switch (index) {
        case 0:
            return <LocalShipping sx={iconStyle} />;
        case 1:
            return <Payment sx={iconStyle} />;
        case 2:
            return <Reviews sx={iconStyle} />;
        default:
            return null;
    }
};

const StepperWrapper = () => {
    const { userId, productId } = useParams();
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => setActiveStep((prev) => prev + 1);
    const handleBack = () => setActiveStep((prev) => prev - 1);

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return <ShippingForm onNext={handleNext} />;

            case 1:
                return <PaymentOptions onNext={handleNext} onBack={handleBack} />;
            case 2:
                return <ReviewOrder onNext={handleNext} onBack={handleBack} />;
            case 3:
                return <SuccessMessage />;
            default:
                return null;
        }
    };

    return (
        <Container maxWidth="lg">
            <Grid container justifyContent="center" mt={4}>
                <Grid item xs={12}>
                    <Paper
                        elevation={4}
                        sx={{
                            p: 4,
                            mt: 2,
                            borderRadius: '20px',
                            backgroundColor: theme.palette.headerBackgroundColor.lightBlue,
                            boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
                        }}
                    >
                        <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#3a0ca3' }}>
                            Checkout Process
                        </Typography>

                        <Stepper activeStep={activeStep} alternativeLabel connector={<ColorfulConnector />} sx={{ mb: 4 }}>
                            {steps.map((label, index) => {
                                const stepProps = {};
                                const labelProps = {
                                    StepIconComponent: () => getIcon(index, activeStep === index, activeStep > index)
                                };
                                return (
                                    <Step key={label} {...stepProps}>
                                        <StepLabel {...labelProps}>{label}</StepLabel>
                                    </Step>
                                );
                            })}
                        </Stepper>

                        <Box>{getStepContent(activeStep)}</Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default StepperWrapper;
