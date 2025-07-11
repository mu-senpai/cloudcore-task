'use client';

import { useState } from 'react';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, Badge, ListItemIcon, ListItemButton } from '@mui/material';
import { Menu as MenuIcon, ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import Link from 'next/link';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store'; // adjust path if needed

export default function Navbar() {
    const [drawerOpen, setDrawerOpen] = useState(false);

    // Get cart items from Redux
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }
        setDrawerOpen(open);
    };

    const drawerList = (
        <div className="w-64" role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
            {/* Logo Section */}
            <div className="flex justify-center p-4">
                <Link href="/">
                    <Image
                        src="/cloudcore_store.png"
                        alt="CloudCore Logo"
                        width={120}
                        height={60}
                        className="object-contain"
                    />
                </Link>
            </div>
            
            {/* Navigation List */}
            <List>
                <Link href="/products">
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <CheckroomIcon />
                            </ListItemIcon>
                            <ListItemText primary="All Products" />
                        </ListItemButton>
                    </ListItem>
                </Link>
                <Link href="/checkout">
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <Badge badgeContent={cartCount} color="primary">
                                    <ShoppingCartIcon />
                                </Badge>
                            </ListItemIcon>
                            <ListItemText primary="Cart" />
                        </ListItemButton>
                    </ListItem>
                </Link>
            </List>
        </div>
    );

    return (
        <>
            <AppBar position="sticky" sx={{ backgroundColor: "#eff6ff", boxShadow: 'none' }} className="top-0 z-10">
                <Toolbar className="flex justify-between">
                    {/* Logo */}
                    <Link href="/">
                        <Image
                            src="/cloudcore_store.png"
                            alt="CloudCore Logo"
                            width={120}
                            height={60}
                            className="object-contain"
                        />
                    </Link>

                    <div className="flex items-center gap-2 md:gap-6">
                        <Link href="/products" className="text-gray-700 hover:text-[#1976d2] font-medium hidden md:flex">
                            All Products
                        </Link>
                        <Link href="/checkout" className="text-gray-700 hover:text-[#1976d2] relative">
                            <Badge badgeContent={cartCount} color="primary">
                                <ShoppingCartIcon />
                            </Badge>
                        </Link>
                        {/* Mobile Hamburger */}
                        <div className="md:hidden">
                            <IconButton edge="end" color="inherit" onClick={toggleDrawer(true)}>
                                <MenuIcon sx={{ color: 'black' }} />
                            </IconButton>
                        </div>
                    </div>
                </Toolbar>
            </AppBar>

            {/* Mobile Drawer */}
            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
                {drawerList}
            </Drawer>
        </>
    );
}