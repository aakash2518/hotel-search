import axios from 'axios';
import { REQUEST_TIMEOUT_MS } from '@/constants';

const apiClient = axios.create({
  baseURL: '/',
  timeout: REQUEST_TIMEOUT_MS,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
