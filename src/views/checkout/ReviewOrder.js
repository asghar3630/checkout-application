import React, { useState } from 'react';
import { Box, Typography, Button, Card, Grid, Stack, IconButton, Divider, TextField } from '@mui/material';
import { Add, Remove, Close, ArrowBackIos } from '@mui/icons-material';
import vintageChair from '../../assets/images/vintage.png';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const initialProducts = [
    {
        id: 1,
        name: 'Modern Chair',
        price: 100,
        quantity: 1,
        image: 'https://via.placeholder.com/60'
    },
    {
        id: 2,
        name: 'Vintage Chair',
        price: 100,
        quantity: 1,
        image: 'https://via.placeholder.com/60'
    },
    {
        id: 3,
        name: 'Massage Chair',
        price: 200,
        quantity: 2,
        image: 'https://via.placeholder.com/60'
    },
    {
        id: 4,
        name: 'Relaxing Chair',
        price: 300,
        quantity: 1,
        image: 'https://via.placeholder.com/60'
    }
];

const ReviewOrder = ({ onBack, onNext }) => {
    const [products, setProducts] = useState(initialProducts);
    const shippingFee = 10;
    const [coupon, setCoupon] = useState('');
    const [discount, setDiscount] = useState(0);
    const [error, setError] = useState('');

    const handleQuantityChange = (id, delta) => {
        setProducts((prev) =>
            prev
                .map((p) => {
                    if (p.id === id) {
                        const newQty = p.quantity + delta;
                        return newQty > 0 ? { ...p, quantity: newQty } : null;
                    }
                    return p;
                })
                .filter(Boolean)
        );
    };

    const handleRemove = (id) => {
        setProducts((prev) => prev.filter((p) => p.id !== id));
    };

    const handleVerifyCoupon = () => {
        if (coupon.trim().toLowerCase() === 'save10') {
            setDiscount(10);
            setError('');
        } else {
            setDiscount(0);
            setError('Not a valid coupon code');
        }
    };

    const subtotal = products.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const total = subtotal + shippingFee - discount;

    return (
        <Box>
            <Typography variant="h4" align="center" mb={3} fontWeight={600}>
                Review Your Order
            </Typography>
            <Grid container spacing={4}>
                {/* Left side - Product list */}
                <Grid item xs={12} md={6}>
                    {products.map((product) => (
                        <Card
                            key={product.id}
                            sx={{ mb: 2, display: 'flex', alignItems: 'center', p: 2, bgcolor: '#f5f7fa', borderRadius: 3, boxShadow: 3 }}
                        >
                            <Box component="img" src={vintageChair} alt={product.name} width={60} height={60} mr={2} />
                            <Box flexGrow={1}>
                                <Typography variant="subtitle1" fontWeight={600}>
                                    {product.name}
                                </Typography>
                                <Typography variant="body2">${product.price}</Typography>
                            </Box>
                            {/* <Stack spacing={1} alignItems="center">
                                <IconButton onClick={() => handleQuantityChange(product.id, 1)}>
                                    <Add fontSize="small" />
                                </IconButton>
                                <Typography>{product.quantity}</Typography>
                                <IconButton onClick={() => handleQuantityChange(product.id, -1)}>
                                    <Remove fontSize="small" />
                                </IconButton>
                            </Stack> */}
                            <IconButton onClick={() => handleRemove(product.id)}>
                                <Close color="error" />
                            </IconButton>
                        </Card>
                    ))}
                </Grid>

                {/* Right side - Payment summary */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3, bgcolor: '#ffffff' }}>
                        <Typography variant="h6" mb={2} fontWeight={600}>
                            Payment Summary
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        {products.map((product) => (
                            <Box key={product.id} mb={1} display="flex" justifyContent="space-between">
                                <Typography variant="body1">
                                    {product.name} (x{product.quantity})
                                </Typography>
                                <Typography variant="body1">${product.price * product.quantity}</Typography>
                            </Box>
                        ))}
                        <Divider sx={{ my: 2 }} />
                        <Box display="flex" justifyContent="space-between">
                            <Typography variant="body1">Shipping Fee</Typography>
                            <Typography variant="body1">${shippingFee}</Typography>
                        </Box>

                        {/* Coupon Field */}
                        <Box mt={3}>
                            <Box display="flex" gap={1}>
                                <TextField
                                    label="Coupon Code"
                                    value={coupon}
                                    onChange={(e) => setCoupon(e.target.value)}
                                    size="small"
                                    fullWidth
                                />
                                <Button
                                    variant="outlined"
                                    onClick={handleVerifyCoupon}
                                    sx={{
                                        whiteSpace: 'nowrap',

                                        color: '#3a0ca3',
                                        textTransform: 'none',
                                        fontWeight: 'bold',
                                        border: '1px solid #3a0ca3',
                                        '&:hover': {
                                            border: '1px solid #3a0ca3'
                                        }
                                    }}
                                >
                                    Verify Coupon
                                </Button>
                            </Box>
                            {error && (
                                <Typography color="error" mt={1} ml={0.5}>
                                    {error}
                                </Typography>
                            )}
                        </Box>

                        {/* Total Section */}
                        <Box display="flex" justifyContent="space-between" mt={3}>
                            <Typography variant="h6">Total</Typography>
                            <Typography variant="h6">${total}</Typography>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
            <Stack direction="row" spacing={2} mt={4} justifyContent="flex-end">
                <Button
                    variant="outlined"
                    onClick={onBack}
                    startIcon={<ArrowBackIos />}
                    sx={{
                        px: 4,
                        color: '#3a0ca3',
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
                    onClick={() => {
                        generatePDFReceipt(products, 300, 20);
                        onNext();
                    }}
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

export default ReviewOrder;

const generatePDFReceipt = (products, shippingFee, discount) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Order Receipt', 14, 22);

    doc.setFontSize(12);
    const tableData = products.map((p) => [p.name, p.quantity, `$${p.price}`, `$${p.quantity * p.price}`]);

    autoTable(doc, {
        startY: 30,
        head: [['Product Name', 'Quantity', 'Price', 'Total']],
        body: tableData
    });

    const subtotal = products.reduce((sum, p) => sum + p.price * p.quantity, 0);
    const total = subtotal + shippingFee - discount;

    // Summary section
    autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 10,
        body: [
            ['Subtotal', `$${subtotal.toFixed(2)}`],
            ['Shipping Fee', `$${shippingFee.toFixed(2)}`],
            ['Discount', `- $${discount.toFixed(2)}`],
            ['Total', `$${total.toFixed(2)}`]
        ],
        theme: 'plain',
        styles: { fontSize: 12, fontStyle: 'bold' },
        columnStyles: {
            0: { cellWidth: 100 },
            1: { cellWidth: 50, halign: 'right' }
        }
    });

    // Open in new tab
    const pdfBlob = doc.output('blob');
    const url = URL.createObjectURL(pdfBlob);
    window.open(url, '_blank');
};
