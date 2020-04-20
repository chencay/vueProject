import request from '@/util/request';
import qs from 'qs';

export function register(data) {
    return request({
        url: '/user/register',
        method: 'post',
        headers: {
            'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
        },
        data: qs.stringify(data)
    })
}

export function login(data) {
    return request({
        url: '/user/login',
        method: 'post',
        headers: {
            'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
        },
        data: qs.stringify(data)
    })
}