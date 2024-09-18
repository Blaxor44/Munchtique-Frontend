import axios from 'axios';

const API_URL = 'https://munchrestapi.onrender.com/api/users';

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


export default {
  register,
  login,
};
