import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.exchange.newlink-asia.com/api',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true // <<< ADD THIS LINE
});
