import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://10.0.3.2:3000', //Change to http://10.0.2.2 for AVD and http://localhost for iOS
  headers: {
    'Content-Type': 'application/json'
  }
});
