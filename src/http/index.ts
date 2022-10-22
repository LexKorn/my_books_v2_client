import axios, { AxiosRequestConfig } from 'axios';

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

// const authInterception = (config: AxiosRequestConfig): AxiosRequestConfig  => {
//     config.headers?authorization = `Bearer ${localStorage.getItem('token')}`;
//     return config;
// };

const authInterception = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
};

$authHost.interceptors.request.use(authInterception);

export {
    $host,
    $authHost
};