'use client';

import Image from 'next/image';
import Link from 'next/link';
import { IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

export default function Footer() {
    return (
        <footer className="bg-blue-50 mt-12 pt-8 pb-3 px-6 md:px-16">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-6">
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <Link href="/" className="flex items-center mb-2">
                        <Image
                            src="/cloudcore_store.png"
                            alt="CloudCore Logo"
                            width={160}
                            height={60}
                            className="object-contain"
                        />
                    </Link>
                    <p className="text-gray-600 text-xs max-w-xs">
                        Your trusted store for premium jackets and hoodies. Designed for style, comfort, and durability.
                    </p>
                </div>

                <div>
                    <h3 className='uppercase text-sm text-center md:ml-2 md:text-left font-extrabold text-gray-400'>Socials</h3>
                    <div className="flex gap-[6px]">
                        <IconButton href="https://facebook.com" target="_blank" sx={{ color: '#1071f4' }}>
                            <Facebook />
                        </IconButton>
                        <IconButton href="https://twitter.com" target="_blank" sx={{ color: '#1071f4' }}>
                            <Twitter />
                        </IconButton>
                        <IconButton href="https://instagram.com" target="_blank" sx={{ color: '#1071f4' }}>
                            <Instagram />
                        </IconButton>
                        <IconButton href="https://linkedin.com" target="_blank" sx={{ color: '#1071f4' }}>
                            <LinkedIn />
                        </IconButton>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-300 pt-3 text-center text-gray-500 text-xs">
                © {new Date().getFullYear()} CloudCore Store. All rights reserved.
            </div>
        </footer>
    );
}