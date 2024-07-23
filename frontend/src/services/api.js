import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5001', // URL de base de l'API
});

export default api;