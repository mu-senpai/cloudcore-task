'use client';

import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/store';
import { removeFromCart, clearCart } from '@/lib/features/cartSlice';
import api from '@/utils/api';
import { TextField, Button, Dialog, DialogContent, DialogActions, Snackbar, Alert, Divider, Typography } from '@mui/material';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckoutForm, checkoutSchema } from '@/lib/validation/checkoutFormSchema';
import { Delete } from '@mui/icons-material';
import { fetchProducts } from '@/lib/features/productsSlice';
import { motion } from 'framer-motion';

export default function CheckoutPage() {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { cartItems } = useSelector((state: RootState) => state.cart);
    const { products } = useSelector((state: RootState) => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [orderId, setOrderId] = useState('');
    const [address, setAddress] = useState('');

    const { register, handleSubmit, reset, formState: { errors } } = useForm<CheckoutForm>({
        resolver: zodResolver(checkoutSchema),
    });

    const subtotal = cartItems.reduce((total, item) => {
        const product = products.find(p => p.id === item.id);
        return product ? total + product.price * item.quantity : total;
    }, 0);

    const deliveryCharge = (address: string) => {
        if (address.toLowerCase().includes('dhaka')) {
            return 70;
        } else {
            return 150;
        }
    };

    const totalAmount = subtotal + deliveryCharge(address);

    const handleRemove = (id: number) => {
        dispatch(removeFromCart(id));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const handleCheckout = async (data: CheckoutForm) => {
        try {
            if (cartItems.length === 0) {
                setErrorMessage('Your cart is empty!');
                setOpenError(true);
                return;
            }

            const productIds = cartItems.map(item => item.id).join(',');
            const productQuantities = cartItems.map(item => item.quantity).join(',');

            const response = await api.post('/public/order/create', {
                product_ids: productIds,
                s_product_qty: productQuantities,
                c_phone: data.phone,
                c_name: data.name,
                courier: data.courier,
                address: data.address,
                advance: null,
                cod_amount: subtotal,
                discount_amount: null,
                delivery_charge: deliveryCharge(data.address),
            });

            if (response.status === 200 || response.data.status === true) {
                const generatedOrderId = Math.floor(100000 + Math.random() * 900000).toString();
                setOrderId(generatedOrderId);
                setOpenSuccess(true);
                reset();
                setAddress('');
                dispatch(clearCart());
            } else {
                setErrorMessage('Order failed! Please try again.');
                setOpenError(true);
            }
        } catch (error) {
            console.error('Order Error:', error);
            setErrorMessage('Something went wrong. Please try again.');
            setOpenError(true);
        }
    };

    const handleContinueShopping = () => {
        setOpenSuccess(false);
        router.push('/products');
        dispatch(clearCart());
    };

    const handleCloseError = () => {
        setOpenError(false);
    };

    // Framer motion variants
    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.2,
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
    };

    return (
        <div className="p-6 md:p-12 lg:min-h-[35rem] lg:max-h-[41rem] flex flex-col-reverse gap-10 lg:flex-row">
            
            {/* Snackbar Error */}
            <Snackbar open={openError} autoHideDuration={3000} onClose={handleCloseError} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
                    {errorMessage}
                </Alert>
            </Snackbar>

            {/* Left: Form */}
            <motion.div
                className="w-full lg:w-2/3 bg-white rounded-xl shadow-md p-6 flex flex-col gap-6"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
            >
                <h2 className="text-2xl sm:text-3xl xl:text-4xl font-bold">Contact & Shipping</h2>
                <form className='flex flex-col gap-6' onSubmit={handleSubmit(handleCheckout)}>
                    <TextField fullWidth label="Name" {...register("name")} error={!!errors.name} helperText={errors.name?.message} />
                    <TextField fullWidth label="Phone Number" {...register("phone")} error={!!errors.phone} helperText={errors.phone?.message} />
                    <TextField fullWidth label="Address" {...register("address")} error={!!errors.address} helperText={errors.address?.message} onChange={(e) => setAddress(e.target.value)} />
                    <TextField fullWidth label="Courier Name" {...register("courier")} error={!!errors.courier} helperText={errors.courier?.message} />
                    <Button type="submit" variant="contained" color="primary" sx={{ textTransform: 'none', borderRadius: 2, fontWeight: 'bold' }}>
                        Proceed to Checkout
                    </Button>
                </form>
            </motion.div>

            {/* Right: Cart Items */}
            <motion.div
                className="w-full lg:w-1/3 overflow-y-auto bg-white rounded-xl shadow-md p-6 flex flex-col gap-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.h2 variants={itemVariants} className="text-2xl sm:text-3xl xl:text-4xl font-bold">
                    Your Cart
                </motion.h2>

                {cartItems.length === 0 ? (
                    <motion.p variants={itemVariants} className="text-gray-600">Your cart is empty.</motion.p>
                ) : (
                    <>
                        {cartItems.map((item) => {
                            const product = products.find((p) => p.id === item.id);
                            if (!product) return null;

                            return (
                                <motion.div key={item.id} variants={itemVariants} className="flex items-center gap-4 border-b pb-4">
                                    <div className="w-16 h-16 relative">
                                        <Image
                                            src={`https://admin.refabry.com/storage/product/${product.image}`}
                                            alt={product.name}
                                            fill
                                            className="object-contain rounded-md"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold">{product.name}</p>
                                        <p className="text-gray-600 text-sm">৳{product.price} × {item.quantity}</p>
                                    </div>
                                    <Button variant="outlined" size="small" color="error" onClick={() => handleRemove(item.id)} sx={{ textTransform: 'none', borderRadius: 2 }}>
                                        <Delete fontSize='small'/>
                                    </Button>
                                </motion.div>
                            );
                        })}

                        {/* Total Section */}
                        <motion.div variants={itemVariants} className="mt-6 flex flex-col gap-2">
                            <div className="flex justify-between font-semibold">
                                <span>Subtotal:</span>
                                <span>৳{subtotal}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Delivery Charge:</span>
                                <span>৳{deliveryCharge(address)}</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total:</span>
                                <span>৳{totalAmount}</span>
                            </div>
                            <Button startIcon={<Delete />} variant="outlined" color="error" onClick={handleClearCart} sx={{ textTransform: 'none', borderRadius: 2 }}>
                                Clear Cart
                            </Button>
                        </motion.div>
                    </>
                )}
            </motion.div>

            {/* Success Dialog */}
            <Dialog open={openSuccess} onClose={() => setOpenSuccess(false)}>
                <DialogContent className="flex flex-col items-center justify-center p-8">
                    <CheckCircleOutlineIcon color="success" sx={{ fontSize: 60 }} />
                    <Typography variant="h5" fontWeight="bold" color="success.main" sx={{ marginY: 2, textAlign: 'center' }}>
                        Order Successfully Placed!
                    </Typography>
                    <Divider sx={{ width: '100%' }} />
                    <div className="text-center space-y-2 py-6">
                        <Typography variant="subtitle1">
                            <strong>Order ID:</strong> #{orderId}
                        </Typography>
                        <Typography variant="subtitle1">
                            <strong>Total Amount:</strong> ৳{totalAmount}
                        </Typography>
                        <Typography variant="subtitle2" color="text.secondary">
                            Thank you for shopping with CloudCore Store.
                        </Typography>
                    </div>
                    <Divider sx={{ width: '100%' }} />
                    <DialogActions>
                        <Button variant="contained" color="success" onClick={handleContinueShopping} sx={{ textTransform: 'none', fontWeight: 'bold', width: '100%', marginTop: 2 }}>
                            Continue Shopping
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </div>
    );
}