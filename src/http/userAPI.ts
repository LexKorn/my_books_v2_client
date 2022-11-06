import { $authHost, $host } from "./index";
import jwt_decode from 'jwt-decode';

export const registration = async (username: string, password: string) => {
    const {data} = await $host.post('api/user/register', {username, password}); 
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
};

export const login = async (username: string, password: string) => {
    const {data} = await $host.post('api/user/login', {username, password});
    localStorage.setItem('token', data.token);    
    return jwt_decode(data.token);

    // const response = await $host.post('api/user/login', {username, password});
    // if (response.status !== 200) {
    //     return console.error(response.data);        
    // }
    // localStorage.setItem('token', response.data.token);    
    // return jwt_decode(response.data.token);
};

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth');
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
};