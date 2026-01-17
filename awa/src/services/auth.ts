import { register, login } from './api';

export const handleSignup = async (username: string, password: string, role: string = 'user') => {
  try {
    const { token, user } = await register(username, password, role);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    return { success: true, token, user };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const handleLogin = async (username: string, password: string) => {
  try {
    const { token, user } = await login(username, password);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    return { success: true, token, user };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};
