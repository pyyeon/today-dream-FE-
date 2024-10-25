import axios, { Axios, AxiosRequestConfig, AxiosResponse } from 'axios';
import { APIResponse } from '../interfaces/response.ts';

const client: Axios = axios.create({
    baseURL: process.env.REACT_APP_BASED_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    validateStatus: (status) => status >= 200 && status < 510,
});

// POST 메서드
export const postData = async <T>(url: string, data?: any, config?: AxiosRequestConfig) => {
    const response: AxiosResponse<T> = await client.post<T>(url, data, config);
    console.log("POSTDATA" + response);
    return response;
};

export const login = async <T>(url: string, data?: any, config?: AxiosRequestConfig) => {
    console.log('=============== login ==================');
    const response: AxiosResponse<T> = await client.post<T>(url, data, config);
    console.log(response);
    return response;
};

// PATCH 메서드
export const patchData = async <T>(url: string, data?: any, config?: AxiosRequestConfig) => {
    const response: AxiosResponse<T> = await client.patch<T>(url, data, config);
    console.log(response);
    return response;
};

// GET 메서드
export const getData = async <T>(url: string, config?: AxiosRequestConfig) => {
    console.log('=============== get ==================');
    const response: AxiosResponse<T> = await client.get<T>(url, config);
    console.log(response);
    return response;
};

// DELETE 메서드
export const deleteData = async <T>(url: string, config?: AxiosRequestConfig) => {
    const response: AxiosResponse<T> = await client.delete<T>(url, config);
    console.log(response);
    return response;
};