import axios from 'axios';

const API_URL = 'https://munchrestapi.onrender.com/api/users';

// User registration
const register = (fullName, username, email, password) => {
  return axios.post(API_URL + '/register', {
    fullName, // Changed from 'name' to 'fullName'
    username, // Added username to match expected params
    email,
    password,
  });
};

// User login
const login = (email, password) => {
  return axios.post(API_URL + '/login', {
    email,
    password,
  });
};

export default {
  register,
  login,
};
