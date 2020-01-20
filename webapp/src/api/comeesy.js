import axios from 'axios';
import { BASE_API_URL } from '../config';

export default axios.create({
  baseURL: BASE_API_URL,
});
