import request from '@/util/request';

export function getInputData() {
    return request({
        url: '/hello/getInputData',
        methods: 'get'
    })
}