'use client';

import { Product } from '@/lib/features/productsSlice';
import { Card, CardContent, CardMedia, Typography, Button, useTheme, useMediaQuery } from '@mui/material';
import Link from 'next/link';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const imageUrl = `https://admin.refabry.com/storage/product/${product.image}`;
    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.down('lg'));

    return (
        <Card
            sx={{
                width: '100%',
                borderRadius: '8px',
                ":hover": {
                    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)',
                    transform: 'scale(1.001)',
                    transition: 'transform box-shadow 0.3s ease-in-out',
                }
            }}
        >
            <CardMedia
                component="img"
                image={imageUrl}
                alt={product.name}
                sx={{
                    width: '100%',
                    height: { xs: '450px', sm: '400px', md: isLargeScreen ? '300px' : '400px', xl: '350px' },
                    objectFit: 'cover',
                }}
            />
            <CardContent className="flex flex-col items-start gap-2">
                <Typography variant="h6" fontWeight="bold" component="div">
                    {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.category.name}
                </Typography>
                <Typography variant="subtitle1" fontWeight="bold">
                    ৳{product.price}
                </Typography>
                <Link href={`/product/${product.id}`} className="w-full">
                    <Button
                        variant="outlined"
                        fullWidth
                        sx={{
                            mt: 1,
                            textTransform: 'none',
                            fontWeight: 'bold',
                            borderRadius: 2,
                        }}
                    >
                        View Details
                    </Button>
                </Link>
            </CardContent>
        </Card>
    );
}
