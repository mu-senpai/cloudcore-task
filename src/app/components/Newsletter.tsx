'use client';

import { useState } from 'react';
import { TextField, Button, Alert, Snackbar } from '@mui/material';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import { motion } from 'framer-motion';

export default function Newsletter() {
    const [email, setEmail] = useState('');
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertType, setAlertType] = useState<'success' | 'error'>('success');

    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleSubscribe = () => {
        if (validateEmail(email)) {
            setAlertType('success');
        } else {
            setAlertType('error');
        }
        setAlertOpen(true);
    };

    const handleCloseAlert = () => {
        setAlertOpen(false);
    };

    return (
        <motion.section
            className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl p-8 m-6 md:m-12 flex flex-col items-center text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
        >
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <EmailRoundedIcon sx={{ fontSize: 48, color: 'white', mb: 2 }} />
            </motion.div>

            <motion.h2
                className="text-2xl sm:text-3xl font-bold mb-2"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
            >
                Subscribe to newsletter
            </motion.h2>

            <motion.p
                className="text-sm sm:text-base text-white/90 mb-6 max-w-2xl"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                Stay up to date! Get all the latest posts delivered straight to your inbox.
            </motion.p>

            <motion.div
                className="w-full max-w-lg flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
            >
                <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{
                        bgcolor: 'white',
                        borderRadius: 2,
                        input: { color: 'black' },
                    }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubscribe}
                    sx={{
                        textTransform: 'none',
                        fontWeight: 'bold',
                        px: 4,
                        borderRadius: 2,
                    }}
                >
                    Subscribe
                </Button>
            </motion.div>

            <Snackbar
                open={alertOpen}
                autoHideDuration={3000}
                onClose={handleCloseAlert}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleCloseAlert}
                    severity={alertType}
                    sx={{ width: '100%' }}
                >
                    {alertType === 'success'
                        ? 'Successfully Subscribed!'
                        : 'Invalid Email Address!'}
                </Alert>
            </Snackbar>
        </motion.section>
    );
}