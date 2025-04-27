'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button, Chip, useMediaQuery, useTheme } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';
import ShieldRoundedIcon from '@mui/icons-material/ShieldRounded';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VerifiedIcon from '@mui/icons-material/Verified';
import { useRouter } from 'next/navigation';

export default function Banner() {
    const router = useRouter();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <section className="flex flex-col md:flex-row items-center justify-between p-6 pb-16 sm:pb-12 sm:p-12 gap-16 md:gap-0 bg-blue-50 overflow-hidden relative">
            
            {/* Left Section: Text */}
            <motion.div
                className="w-full md:w-[60%] lg:w-[65%] space-y-4 sm:space-y-5"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            >
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                    Welcome to CloudCore Store!
                </h2>
                <p className="text-sm sm:text-lg lg:text-xl text-gray-600">
                    Discover the best premium jackets and hoodies designed for ultimate comfort and style.
                </p>
                <div className="flex flex-wrap gap-3 md:gap-4">
                    <Chip icon={<LocalShippingIcon />} label="Fast Delivery" color="success" variant="outlined" size={isSmallScreen ? "small" : "medium"} />
                    <Chip icon={<EmojiEventsRoundedIcon />} label="Best Quality" color="primary" variant="outlined" size={isSmallScreen ? "small" : "medium"} />
                    <Chip icon={<ShieldRoundedIcon />} label="Secure Pay" color="secondary" variant="outlined" size={isSmallScreen ? "small" : "medium"} />
                </div>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{
                        width: { xs: '100%', md: '200px' },
                        textTransform: 'none',
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        borderRadius: 2,
                    }}
                    onClick={() => router.push('/products')}
                >
                    Shop Now
                </Button>
            </motion.div>

            {/* Right Section: Banner Image + Decorative Designs */}
            <motion.div
                className="w-full md:w-1/2 flex justify-center items-center relative"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            >
                {/* Background Circle */}
                <div className="absolute w-80 h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full opacity-50 animate-pulse"></div>

                {/* Hoodie Image */}
                <div className="relative w-72 h-72 lg:w-96 lg:h-96 flex justify-center items-center">
                    <Image
                        src="/banner_image.webp"
                        alt="Banner Image"
                        fill
                        style={{ objectFit: 'contain' }}
                    />

                    {/* Floating Icons */}
                    <motion.div
                        className="absolute top-0 left-2 bg-white p-2 rounded-full shadow-md inline-flex items-center justify-center"
                        whileInView={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    >
                        <ShoppingBagIcon color="primary" fontSize="small" />
                    </motion.div>

                    <motion.div
                        className="absolute bottom-4 left-0 bg-white p-2 rounded-full shadow-md inline-flex items-center justify-center"
whileInView={{ y: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 2.5 }}
                    >
                        <FavoriteIcon color="error" fontSize="small" />
                    </motion.div>

                    <motion.div
                        className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md inline-flex items-center justify-center"
                        whileInView={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 2.2 }}
                    >
                        <VerifiedIcon color="success" fontSize="small" />
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}