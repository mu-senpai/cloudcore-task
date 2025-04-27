import api from './api';

// Fetch all products
export const getAllProducts = async () => {
  const response = await api.get('/all/product/get');
  return response.data.data.data;
};

// Submit an order
export const submitOrder = async (orderData: unknown) => {
  const response = await api.post('/public/order/create', orderData);
  return response.data;
};
