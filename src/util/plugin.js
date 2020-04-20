//element组件+样式文件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import swal from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export default {
    install(Vue, options) {
        //Element
        Vue.use(ElementUI);
        //swal2
        Vue.use(swal);
    }
}