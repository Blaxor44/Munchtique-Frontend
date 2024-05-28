import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

const register = (name, email, password) => {
  return axios.post(API_URL + '/register', {
    name,
    email,
    password,
  });
};

const login = (email, password) => {
  return axios.post(API_URL + '/login', {
    email,
    password,
  });
};

const forgotPassword = (email) => {
  return axios.post(API_URL + '/forgot-password', {
    email,
  });
};

const resetPassword = (resetToken, password) => {
  return axios.post(API_URL + '/reset-password', {
    resetToken,
    password,
  });
};

export default {
  register,
  login,
  forgotPassword,
  resetPassword,
};
