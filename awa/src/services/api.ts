
const API_URL = 'http://localhost:3000/api';

export const getProducts = async () => {
  try {
    const response = await fetch(`${API_URL}/products`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch products');
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const placeOrder = async (products: { productId: string; quantity: number }[]) => {
  try {
    const response = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ products }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to place order');
    return data;
  } catch (error) {
    console.error('Error placing order:', error);
    throw error;
  }
};
