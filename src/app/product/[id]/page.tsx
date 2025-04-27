'use client';

import { useParams } from 'next/navigation';
import { Key, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, Product } from '@/lib/features/productsSlice';
import { addToCart } from '@/lib/features/cartSlice';
import { Button, TextField, Skeleton, useTheme, useMediaQuery, Snackbar, Alert } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { AppDispatch, RootState } from '@/lib/store';
import { motion } from 'framer-motion';

export default function ProductDetailPage() {
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const { products, loading } = useSelector((state: RootState) => state.products);
    const theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.down(768));

    const [product, setProduct] = useState<Product | null>(null);
    const [stock, setStock] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    useEffect(() => {
        if (products.length === 0) {
            dispatch(fetchProducts());
        }
        const product = products.find((product: Product) => product.id === Number(id));
        setProduct(product || null);
        setStock(product ? product.stock : 0);
    }, [dispatch, products, id]);

    if (loading || !product) {
        return (
            <div className="p-6 md:p-12 flex flex-col gap-6 items-center">
                <Skeleton variant="text" width="40%" height={50} />
                <Skeleton variant="text" width="20%" height={30} />
                <div className="flex flex-col md:flex-row gap-8 justify-center items-center w-full mt-8">
                    <Skeleton variant="rectangular" width={400} height={400} />
                    <div className="flex flex-col gap-4 max-w-lg w-full">
                        <Skeleton variant="text" width="80%" height={40} />
                        <Skeleton variant="text" width="30%" height={30} />
                        <Skeleton variant="text" width="60%" height={30} />
                        <Skeleton variant="text" width="90%" height={80} />
                        <Skeleton variant="rectangular" width="100%" height={40} />
                    </div>
                </div>
            </div>
        );
    }

    const formattedDescription = product.short_desc
        .replace(/\r\n/g, '\n')
        .split('\n')
        .filter((line: string) => line.trim() !== '');

    const imageUrl = `https://admin.refabry.com/storage/product/${product.image}`;

    const handleAddToCart = () => {
        if (quantity > stock) {
            setAlertMessage('Quantity exceeds available stock!');
            setAlertOpen(true);
        } else {
            dispatch(addToCart({ id: product.id, quantity }));
            setAlertMessage('Product added to cart!');
            setAlertOpen(true);
            setStock(product.stock - quantity);
        }
    };

    const handleCloseAlert = () => {
        setAlertOpen(false);
    };

    return (
        <div className="p-6 md:p-12">

            {/* Snackbar Alert */}
            <Snackbar
                open={alertOpen}
                autoHideDuration={3000}
                onClose={handleCloseAlert}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseAlert} severity={quantity > stock ? 'error' : 'success'} sx={{ width: '100%' }}>
                    {alertMessage}
                </Alert>
            </Snackbar>

            {/* Page Title */}
            <motion.div
                className="text-center mb-6 md:mb-12"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className="text-2xl sm:text-3xl lg:text-4xl md:text-3xl font-bold">Product Details</h1>
                <p className="text-gray-600 text-sm mt-2 sm:mt-3">
                    <Link href="/">Home</Link> &gt; <Link href="/products">All Products</Link> &gt; <span className="text-blue-500">Product Details</span>
                </p>
            </motion.div>

            {/* Product Main Content */}
            <div className="flex flex-col md:flex-row gap-8 lg:gap-10 xl:gap-16 justify-center items-center">

                {/* Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <Image
                        src={imageUrl}
                        alt={product.name}
                        width={isMediumScreen ? 768 : 400}
                        height={400}
                        className="w-full rounded-lg object-cover"
                    />
                </motion.div>

                {/* Info */}
                <motion.div
                    className="flex flex-col gap-4 md:gap-5 max-w-lg"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">{product.name}</h2>

                    {/* Price */}
                    <div className="flex items-center gap-4">
                        <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600">৳{product.price}</span>
                        {product.is_discount ? (
                            <span className="line-through text-gray-400">
                                ৳{Number(product.price) + Number(product.discount_amount)}
                            </span>
                        ) : null}
                    </div>

                    {/* Description */}
                    <div className="text-gray-700 space-y-1">
                        {formattedDescription.map((line: string, index: Key) => (
                            <p key={index} className="text-xs sm:text-sm">{line}</p>
                        ))}
                    </div>

                    {/* Stock */}
                    <div className="text-gray-700 text-sm">
                        <strong>Stock Available:</strong> {stock} items
                    </div>

                    {/* Quantity and Button */}
                    <div className="flex items-center gap-4">
                        <TextField
                            label="Quantity"
                            type="number"
                            size="small"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            InputProps={{ inputProps: { min: 1, max: product.stock } }}
                            sx={{ width: 100 }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleAddToCart}
                            sx={{ textTransform: 'none', borderRadius: 2 }}
                        >
                            Add to Cart
                        </Button>
                    </div>

                    {/* Category */}
                    <div className="text-sm text-gray-600">
                        <strong>Category:</strong> {product.category.name}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}