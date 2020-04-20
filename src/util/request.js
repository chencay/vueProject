import axios from 'axios';
import router from '@/router';
import {Message} from 'element-ui';

//创建一个 axios 实例
const service = axios.create({
    baseURL: process.env.VUE_APP_API,
    timeout: 1000000 // 请求超时时间
});

//请求拦截器
service.interceptors.request.use(
    config => {
        if(localStorage.token) {
            config.headers.Authorization = localStorage.token;
        } else if(config.url !== '/user/login'){
            // token过期
            router.push({
                path: '/home'
            });
            logError("token不存在");
            return Promise.reject('error');
        }
        return config;
    },
    error =>{
        //发送失败
        return Promise.reject(error);
    }
)

//响应拦截器
service.interceptors.response.use(
    response => {
        debugger
        const headers = response.headers;
        const responseData = response.data;
        if(responseData) {
            return responseData;
        }
    },
    error =>{
        debugger
        if(error && error.response) {
            switch (error.response.status) {
                case 400:
                    error.message = "请求错误";
                    break;
                case 401:
                    error.message = "请求认证失效";
                    if(error.response.data && error.response.data.msg) {
                        error.message = error.response.data.msg;
                    }
                    localStorage.removeItem('token');
                    router.push({
                        path: '/home'
                    })
                    break;
                case 403:
                    error.message = '拒绝访问';
                    break;
                case 404:
                    error.message = `请求地址出错：${error.response.config.url}`;
                    router.push({
                        path: '/home'
                    })
                    break;
                case 408:
                    error.message = '请求超时';
                    break;
                case 500:
                    error.message = '服务器内部错误';
                    break;
                default:
                    break;
            }
        }
        logError(error.message);
        if(error) {
            return Promise.reject(error);
        }
    }
)

function logError(errMsg) {
    //打印到控制台
    if (process.env.NODE_ENV === 'development' && errMsg) {
        console.log(">>>错误信息<<<\r\n" + errMsg);
    }
    if (process.env.NODE_ENV === 'development' && errMsg) {
        Message({
            message: errMsg,
            type: 'error',
            duration: 5*1000
        })
    }
}

export default service;