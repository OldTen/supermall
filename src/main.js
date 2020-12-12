import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mitt from 'mitt'
// import toast from 'components/common/toast'
//toast插件引入
import DKToast from 'vue-dk-toast'
//解决移动端300ms延迟插件引入
import FastClick from 'fastclick'
//懒加载图片插件引入
import VueLazyLoad from 'vue3-lazyload'


const app = createApp(App)

//安装totas插件
// app.use(toast)
// const Vue = require('vue').default
// app.use(DKToast);

//解决移动端300ms延迟
FastClick.attach(document.body)

//使用VueLazyLoad,图片懒加载
app.use(VueLazyLoad, {
    loading: require('./assets/img/common/loadBg.jpg')
})

//创建$bus 事件总线
app.config.globalProperties.$bus = new mitt()
app.use(store).use(router).use(DKToast, {
    duration: 5000,
    positionY: 'bottom', // 'top' or 'bottom'
    positionX: 'right', // 'right' or 'left'
    styles: {
        color: '#fff',
        backgroundColor: 'rgba(0,0,0,.8)',
        // Vendor prefixes also supported
    },
}).mount('#app')