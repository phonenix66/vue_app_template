import axios from 'axios';
import { Toast } from 'vant';

import { baseApi } from '@/config';
const service = axios.create({
    baseURL: baseApi,
    withCredentials: true,
    timeout: 5000,
    headers: {
        'content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
});

service.interceptors.request.use(
    config => {
        // axios 默认是application/json,修改默认设置form data
        /* config.headers = {
            'content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        } */
        if (config.dataJson) {
            config.headers = {
                'Content-Type': 'application/json;charset=UTF-8'
            };
        }
        if (!config.hideloading) {
            Toast.loading({
                forbidClick: true
            });
        }

        return config;
    },
    error => {
        console.log(error);
        return Promise.reject(error);
    }
);

service.interceptors.response.use(
    response => {
        Toast.clear();
        const res = response.data;
        if (res.status && res.status !== 200) {
            // 登录超时，重新登录
            return Promise.reject(res || 'error');
        } else {
            return Promise.resolve(res);
        }
    },
    error => {
        Toast.clear();
        console.log('err' + error); // for debug
        return Promise.reject(error);
    }
);

export default service;
