import HelloWorld from '@/components/HelloWorld';
import MainBoard from '@/components/mainBoard';

//项目路由集成
const allRoutes = [{
    path: '/home',
    name: '首页',
    component: MainBoard
},{
    path: '/',
    redirect: {
        path: '/home'
    },

},{
    path: '/helloWorld',
    name: '欢迎',
    component: HelloWorld
}]

//导出
export default [...allRoutes];