import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/utils/api';

export interface Product {
    id: number;
    unique_id: string;
    name: string;
    short_desc: string;
    image: string;
    category: {
        id: number;
        name: string;
    };
    price: number;
    stock: number;
    discount_amount: string;
    is_discount: number;
    discount_date: string | null;
}

interface ProductsState {
    products: Product[];
    loading: boolean;
    error: string | null;
}

const initialState: ProductsState = {
    products: [],
    loading: false,
    error: null,
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await api.get('/all/product/get');
    const productsData = response.data.data.data;

    const filteredProducts: Product[] = productsData.map((product: Product) => ({
        id: product.id,
        unique_id: product.unique_id,
        name: product.name,
        short_desc: product.short_desc,
        image: product.image,
        category: product.category,
        price: product.price,
        stock: product.stock,
        discount_amount: product.discount_amount,
        is_discount: product.is_discount,
        discount_date: product.discount_date,
    }));

    return filteredProducts;
});

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Something went wrong';
            });
    },
});

export default productsSlice.reducer;