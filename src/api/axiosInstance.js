const axios = require('axios');
const baseURL = "";

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 10000,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE",
        "Access-Control-Allow-Headers":"Origin, X-Requested-With, Content-Type, Accept,Authorization",

    }
});

axiosInstance.interceptors.request.use((config) => {
    //if token is exists, set header
  
});

export default axiosInstance;


