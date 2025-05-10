import axios from 'axios';

export default axios.create({
  baseURL: 'https://app.exchange.newlink-asia.com/api',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true // <<< ADD THIS LINE
});