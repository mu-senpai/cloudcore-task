'use client';

import { useEffect } from 'react';
import { fetchProducts } from '@/lib/features/productsSlice';
import ProductCard from './ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Skeleton } from '@mui/material';
import { AppDispatch, RootState } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function BestsellerProducts() {
    const dispatch = useDispatch<AppDispatch>();
    const { products, loading } = useSelector((state: RootState) => state.products);
    const router = useRouter();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const bestsellerProducts = [...products]
        .sort((a, b) => a.price - b.price)
        .slice(0, 4);

    // Animation Variants
    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.2,
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
    };

    return (
        <section className="w-full p-6 pb-0 md:pb-0 md:p-12">
            <motion.h2
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                Featured Products
            </motion.h2>

            <motion.p
                className="text-gray-600 text-sm sm:text-base mt-2 mb-8 text-center max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                Handpicked selections just for you. Explore our best-quality jackets and hoodies at the best prices.
            </motion.p>

            {loading ? (
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-items-center mb-8">
                    {[1, 2, 3, 4].map((n) => (
                        <div key={n} className="w-full max-w-xs md:max-w-sm">
                            <Skeleton variant="rectangular" width="100%" height={200} />
                            <Skeleton width="60%" sx={{ marginTop: 2 }} />
                            <Skeleton width="40%" />
                            <Skeleton width="80%" />
                        </div>
                    ))}
                </div>
            ) : (
                <motion.div
                    className='w-full flex flex-col items-center gap-3 md:gap-6'
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                >
                    <div className="w-full grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-items-center">
                        {bestsellerProducts.map((product) => (
                            <motion.div
                                key={product.id}
                                variants={cardVariants}
                                className="w-full max-w-xs md:max-w-sm"
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </div>
                    <Button
                        variant="outlined"
                        sx={{
                            mt: 1,
                            textTransform: 'none',
                            fontWeight: 'bold',
                            borderRadius: 2,
                        }}
                        onClick={() => router.push('/products')}
                    >
                        See All Products
                    </Button>
                </motion.div>
            )}
        </section>
    );
}