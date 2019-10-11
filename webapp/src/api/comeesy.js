import axios from 'axios';
import variables from '../config/config';

const BASE_URL = variables.BASE_API_URL;

export default axios.create({
  baseURL: BASE_URL,
});
