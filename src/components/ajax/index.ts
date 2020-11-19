import axios from 'axios';
import * as config from '@/config';
import store from '@/store';

export { default as axios } from 'axios';

const instance = axios.create({
    baseURL: config.BASE_URL
});

// 添加请求拦截器
instance.interceptors.request.use(
    function(config) {
        const token = (store.state as any).user.token;
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    function(error) {
        return Promise.reject(error);
    }
);

// 添加响应拦截器
instance.interceptors.response.use(
    function(response) {
        return response;
    },
    function(error) {
        return Promise.reject(error);
    }
);

export const get = instance.get;

export const post = instance.post;

export const del = instance.delete;

export default instance;
