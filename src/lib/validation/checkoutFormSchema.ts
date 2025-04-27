import { z } from 'zod';

export const checkoutSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    phone: z.string().min(10, 'Phone number must be at least 10 characters'),
    address: z.string().min(1, 'Address is required'),
    courier: z.string().min(1, 'Courier name is required'),
});

export type CheckoutForm = z.infer<typeof checkoutSchema>;