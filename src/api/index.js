import axios from 'axios';
//import configStore  from '../store/configStore';
import configStore from '../store/configStore';

const baseURL = process.env.REACT_APP_ENV === "dev"? process.env.REACT_APP_APIURL: process.env.REACT_APP_DEPLOY_APIURL;
const store = configStore.store;

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
    //redux
    //const store = configStore.store;
    const state = store.getState();
    const jwtToken = state.auth.jwtToken;

    if (jwtToken !== "invalid token :))")
    {
      config.headers["Authorization"] = `Bearer ${jwtToken}`;
    }
    return config;
  });
export default axiosInstance;