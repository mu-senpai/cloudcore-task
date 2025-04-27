'use client';

import { useEffect, useState } from 'react';
import { fetchProducts } from '@/lib/features/productsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { AppDispatch, RootState } from '@/lib/store';
import ProductCard from '../components/ProductCard';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AllProducts() {
    const dispatch = useDispatch<AppDispatch>();
    const { products, loading } = useSelector((state: RootState) => state.products);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [filteredProducts, setFilteredProducts] = useState(products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    // Filter products based on search and selected category
    useEffect(() => {
        let filtered = [...products];

        if (selectedCategory !== 'all') {
            filtered = filtered.filter(product => product.category.name === selectedCategory);
        }

        if (searchQuery) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.unique_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.id.toString().includes(searchQuery) ||
                product.category.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredProducts(filtered);
    }, [products, searchQuery, selectedCategory]);

    // Motion Variants
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
            
            {/* Page Heading */}
            <motion.div
                className="text-center mb-6 md:mb-12"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-2xl sm:text-3xl lg:text-4xl md:text-3xl font-bold">All Products</h2>
                <p className="text-gray-600 text-sm mt-2 sm:mt-3">
                    <Link href="/">Home</Link> &gt; <span className="text-blue-500">All Products</span>
                </p>
            </motion.div>

            {/* Search and Category Filters */}
            <motion.div
                className="w-full flex flex-col min-[900px]:flex-row justify-between items-center gap-4 min-[900px]:gap-0 mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <TextField
                    label="Search Products by name, ID, or category"
                    variant="outlined"
                    fullWidth
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{
                        width: { xs: '100%', md: '70%' },
                    }}
                />

                <FormControl
                    sx={{
                        width: { xs: '100%', md: '28%' },
                    }}
                >
                    <InputLabel>Category</InputLabel>
                    <Select
                        value={selectedCategory}
                        label="Category"
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <MenuItem value="all">All Products</MenuItem>
                        {Array.from(new Set(products.map((product) => product.category.name))).map((category) => (
                            <MenuItem key={category} value={category}>
                                {category}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </motion.div>

            {/* Products Grid */}
            {loading ? (
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-items-center mb-8">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
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
                    className='w-full flex flex-col items-center gap-6'
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <div className="w-full grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-items-center">
                        {filteredProducts.length === 0 ? (
                            <motion.div
                                className="w-full sm:col-span-2 lg:col-end-4 min-h-screen flex flex-col items-center justify-center text-xl text-gray-600 text-center"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.6 }}
                            >
                                No products found.
                            </motion.div>
                        ) : (
                            filteredProducts.map((product) => (
                                <motion.div
                                    key={product.id}
                                    variants={cardVariants}
                                    className="w-full max-w-xs md:max-w-sm"
                                >
                                    <ProductCard product={product} />
                                </motion.div>
                            ))
                        )}
                    </div>
                </motion.div>
            )}
        </section>
    );
}