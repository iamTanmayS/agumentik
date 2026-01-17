
const API_URL = 'https://agumentik-0t7m.onrender.com/api';

export const register = async (username: string, password: string, role: string = 'user') => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, role }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to register');
    return data;
  } catch (error) {
    console.error('Error registering:', error);
    throw error;
  }
};

export const login = async (username: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to login');
    return data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

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

export const addProduct = async (product: { name: string; price: number; category: string; stock: number }, token: string) => {
  try {
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(product),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to add product');
    return data;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

export const placeOrder = async (products: { productId: string; quantity: number }[], token: string) => {
  try {
    const response = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
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
