import Axios from 'axios';
import { API_URL } from '../../constant/API';

export const registerUser = (firstName, lastName, email, password) => {
  return (dispatch) => {
    Axios.post(`${API_URL}/user`, {
      firstName,
      lastName,
      email,
      password,
      role: 'user',
    })
      .then(() => {
        alert('Registration successful');
        // You can dispatch any success action here if needed.
      })
      .catch((error) => {
        alert('Registration failed');
        // You can dispatch any error action here if needed.
      });
  };
};
